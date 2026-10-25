function WH_MTY_Inventory_Inti(pData) {
    debugger;
    WH_MTY_Inventory_BindTableRows(JSON.parse(pData[0]));
    FillListFromObject(null, 2/*CodeThenName*/, "Select Container Type", "slContainerTypesID", pData[8]);
    FillListFromObject(null, 2, "Select Warehouse", "slWarehouseID", pData[3], null);
    FillListFromObject(null, 2, "Select Area", "slAreaID", pData[4], null);
    FillListFromObject(null, 2, "Select Row", "slRowID", pData[5], null);
    FillListFromObject(null, 1, "Select Location", "slRowLocationID", pData[6], null);
}
function WH_MTY_Inventory_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-ContainerYard").parent().addClass("active");
    ClearAllTableRows("tblWH_MTY_Inventory");

    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblWH_MTY_Inventory",
        ("<tr ID='" + item.ID + "' ondblclick='WH_MTY_Inventory_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' id='" + item.ID + "' type='checkbox' value='" + item.ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"
                    + "<td class='ContainerNumber' style='text-transform:uppercase' >" + item.ContainerNumber + "</td>"
                    + "<td class='ContainerType' style='text-transform:uppercase' >" + item.ContainerType + "</td>"
                    + "<td class='EntryDate' style=text-transform:uppercase' >" + ConvertDateFormat(GetDateWithFormatMDY(item.EntryDate)) + "</td>"
                    + "<td class='Warehouse' style='text-transform:uppercase' >" + item.WH_Warehouse + "</td>"
        + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblWH_MTY_Inventory", "ID");
    CheckAllCheckbox("HeaderDeleteWH_MTY_InventoryID");
    HighlightText("#tblWH_MTY_Inventory>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function WH_MTY_Inventory_LoadingWithPaging() {
    debugger;
    var pWhereClause = WH_MTY_Inventory_GetWhereClause();
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { WH_MTY_Inventory_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblWH_MTY_Inventory>tbody>tr", $("#txt-Search").val().trim());
}
function WH_MTY_Inventory_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1 and StorageEndDate is null and OperationID is null ";
    if ($("#txt-Search").val().trim() != "") {
        //pWhereClause = "  join invoicetype on Vw_InvoiceTemplate.InvoiceTypeID=InvoiceType.id where IsFreightInvoice=0 and IsStorageInvoice=0 and IsDemurrageInvoice=0 "
        pWhereClause += " AND (";
        pWhereClause += " ContainerNumber like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR [ContainerType] like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR [WH_Warehouse] like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += ")";
    }

    return pWhereClause;
}
function WH_MTY_Inventory_ClearAllControls() {
    debugger;
    ClearAll("#WH_MTY_InventoryModal");
    $("#liWH_MTY_Inventory").siblings().removeClass("active");

    $("#divWH_MTY_Inventory").siblings().removeClass("active");
    $("#divWH_MTY_Inventory").addClass("active");


    $("#btnSave").attr("onclick", "WH_MTY_Inventory_Insert();");
    //$("#btnSaveandNew").attr("onclick", "ShippingOrder_Insert(true);");
    jQuery("#WH_MTY_InventoryModal").modal("show");
}
function WH_MTY_Inventory_EditByDblClick(pID) {
    debugger;

    ClearAll("#WH_MTY_InventoryModal");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    //to quickly empty tables
    ////////$("#tblShippingOrderContainer tbody").html("");
    ////////$("#tblRORO tbody").html("");
    ////////$("#tblFreight tbody").html("");

    $("#liBasicData").siblings().removeClass("active");
    $("#liBasicData").addClass("active");
    $("#divBasicData").siblings().removeClass("active");
    $("#divBasicData").addClass("active");
    jQuery("#WH_MTY_InventoryModal").modal("show");

    var pParametersWithValues = { pID: pID };
    FadePageCover(true);
    var pAreaID = "";
    var pRowID = "";
    var pRowLocationID = "";
    CallGETFunctionWithParameters("/api/WH_MTY_Inventory/WH_MTY_Inventory_LoadItem", pParametersWithValues
        , function (pData) {
            var pWH_MTY_Inventory = JSON.parse(pData[1]);
            $("#hID").val(pID);
            $('#txtContainerNumber').val(pWH_MTY_Inventory.ContainerNumber);
            $("#slContainerTypesID").val((pWH_MTY_Inventory.ContainerTypesID == 0 ? "" : pWH_MTY_Inventory.ContainerTypesID));
            $('#txtEntryDate').val(ConvertDateFormat(GetDateWithFormatMDY(pWH_MTY_Inventory.EntryDate)));
            $("#slWarehouseID").val((pWH_MTY_Inventory.WarehouseID == 0 ? "" : pWH_MTY_Inventory.WarehouseID));
            pAreaID = (pWH_MTY_Inventory.AreaID == 0 ? "" : pWH_MTY_Inventory.AreaID);
            pRowID = (pWH_MTY_Inventory.RowID == 0 ? "" : pWH_MTY_Inventory.RowID);
            pRowLocationID = (pWH_MTY_Inventory.RowLocationID == 0 ? "" : pWH_MTY_Inventory.RowLocationID);
            $('#txtOtherRemarks').val(pWH_MTY_Inventory.OtherRemarks);
            $("#txtDriverNameIn").val(pWH_MTY_Inventory.DriverNameIn);
            $("#txtTruckNoIn").val(pWH_MTY_Inventory.TruckNoIn);
            FillListFromObject(null, 2, "Select Area", "slAreaID", pData[2], null);
            FillListFromObject(null, 2, "Select Row", "slRowID", pData[3], null);
            FillListFromObject(null, 1, "Select Location", "slRowLocationID", pData[4], null);
            //$("#slAreaID").val((pWH_MTY_Inventory.AreaID == 0 ? "" : pWH_MTY_Inventory.AreaID));
            //$("#slRowID").val((pWH_MTY_Inventory.RowID == 0 ? "" : pWH_MTY_Inventory.RowID));
            //$("#slRowLocationID").val((pWH_MTY_Inventory.RowLocationID == 0 ? "" : pWH_MTY_Inventory.RowLocationID));

            $("#btnSave").attr("onclick", "WH_MTY_Inventory_Update();");
            //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
            FadePageCover(false);
        }
        ,
        //null
        function () {
            $("#slAreaID").val(pAreaID);
            $("#slRowID").val(pRowID);
            $("#slRowLocationID").val(pRowLocationID);
        }
        );

    }
    function WH_MTY_Inventory_Insert() {
        debugger;
        if (!ValidateForm("form", "WH_MTY_InventoryModal")) {
            strMissingFields = WH_MTY_Inventory_GetMissingFields();
            swal("You are missing:", strMissingFields);
        }
        else { //start Inserting Procedure

            FadePageCover(true);
            var now = new Date();
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var thedate = now.getFullYear() + "-" + (month) + "-" + (day);
            var pParametersWithValues = {
                pID: 0,
                pContainerNumber: $("#txtContainerNumber").val(),
                pContainerTypesID: $("#slContainerTypesID").val(),
                pEntryDate: ConvertDateFormat($("#txtEntryDate").val()),
                pWarehouseID: $("#slWarehouseID").val(),
                pAreaID: $("#slAreaID").val(),
                pRowID: $("#slRowID").val(),
                pRowLocationID: $("#slRowLocationID").val(),
                pOtherRemarks: $("#txtOtherRemarks").val(),
                pDriverNameIn: $("#txtDriverNameIn").val(),
                pTruckNoIn: $("#txtTruckNoIn").val()
                //LoadWithPaging Parameters
                , pWhereClauseWH_MTY_Inventory: WH_MTY_Inventory_GetWhereClause()
                , pPageSize: $('#select-page-size').val()
                , pPageNumber: 1
                , pOrderBy: "ID DESC"
            };
            //CallPOSTFunctionWithParameters("/api/WH_MTY_Inventorys/WH_MTY_Inventory_Insert", pParametersWithValues
            CallPOSTFunctionWithParameters("/api/WH_MTY_Inventory/WH_MTY_Inventory_Save", pParametersWithValues
                , function (pData) {
                    if (pData[0]) {
                        $("#hID").val(pData[1]); //pBillID
                        WH_MTY_Inventory_BindTableRows(JSON.parse(pData[2])); //returned rows
                        $("#spn-total-count").text(pData[3]); //_RowCount
                        swal("Success", "Saved successfully.");
                        $("#btnSave").attr("onclick", "WH_MTY_Inventory_Update();");
                        //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
                    }
                    else
                        if (pData[4] == "")
                            swal("Sorry", "Connection failed, please try again.");
                        else if (pData[4] != "")
                            swal("Sorry", pData[4]);
                    FadePageCover(false);

                }
            , null);

        }
    }
    function WH_MTY_Inventory_Update() {
        debugger;

        if (!ValidateForm("form", "WH_MTY_InventoryModal")) {
            strMissingFields = WH_MTY_Inventory_GetMissingFields();
            swal("You are missing:", strMissingFields);
        }
        else { //start Inserting Procedure
            FadePageCover(true);
            var now = new Date();
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var thedate = now.getFullYear() + "-" + (month) + "-" + (day);
            var pParametersWithValues = {
                pID: $("#hID").val(),
                pContainerNumber: $("#txtContainerNumber").val(),
                pContainerTypesID: $("#slContainerTypesID").val(),
                pEntryDate: ConvertDateFormat($("#txtEntryDate").val()),
                pWarehouseID: $("#slWarehouseID").val(),
                pAreaID: $("#slAreaID").val(),
                pRowID: $("#slRowID").val(),
                pRowLocationID: $("#slRowLocationID").val(),
                pOtherRemarks: $("#txtOtherRemarks").val(),
                pDriverNameIn: $("#txtDriverNameIn").val(),
                pTruckNoIn: $("#txtTruckNoIn").val()
            //LoadWithPaging Parameters
                , pWhereClauseWH_MTY_Inventory: WH_MTY_Inventory_GetWhereClause()
                , pPageSize: $('#select-page-size').val()
                , pPageNumber: 1
                , pOrderBy: "ID DESC"

        };
        //CallPOSTFunctionWithParameters("/api/WH_MTY_Inventory/WH_MTY_Inventory_Update", pParametersWithValues
        CallPOSTFunctionWithParameters("/api/WH_MTY_Inventory/WH_MTY_Inventory_Save", pParametersWithValues
        , function (pData) {
            if (pData[0]) {
                //$("#hID").val(pData[1]); //pBillID
                WH_MTY_Inventory_BindTableRows(JSON.parse(pData[2])); //returned rows
                $("#spn-total-count").text(pData[3]); //_RowCount
                swal("Success", "Saved successfully.");
                $("#btnSave").attr("onclick", "WH_MTY_Inventory_Update();");
                //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
                $("#tabStrTariffItem").show();
                $("#tabStrTariffImo").show();
            }
            else
                if (pData[4] == "")
                    swal("Sorry", "Connection failed, please try again.");
                else if (pData[4] != "")
                    swal("Sorry", pData[4]);
            FadePageCover(false);
        }
    , null);

    }
}
function WH_MTY_Inventory_DeleteList() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblWH_MTY_Inventory');
    if (pSelectedIDs != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            //callback function in case of confirm delete
            function () {
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/WH_MTY_Inventory/WH_MTY_Inventory_DeleteList"
                    , {
                        pDeleteWH_MTY_InventoryIDs: GetAllSelectedIDsAsString('tblWH_MTY_Inventory')
                        //LoadWithPaging Parameters
                        , pWhereClauseWH_MTY_Inventory: WH_MTY_Inventory_GetWhereClause()
                        , pPageSize: $('#select-page-size').val()
                        , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                        , pOrderBy: "ID DESC"
                    }
                    , function (pData) {
                        if (!pData[0])
                            swal("Sorry", strDeleteFailMessage);
                        WH_MTY_Inventory_BindTableRows(JSON.parse(pData[1]));
                        FadePageCover(false);
                    });
            });
}
function WH_MTY_Inventory_GetMissingFields() {
    debugger;
    var strMissingFields = "";// i am sure there is at least 1 missing field isa
    var fieldCount = 0;
    //BasicData Tab
    if ($("#txtContainerNumber").val() == '')
        strMissingFields += ++fieldCount + " - Tariff Data --> Container Number.\n";
    if ($("#slContainerTypesID").val() == 0)
        strMissingFields += ++fieldCount + " - Tariff Data --> Container Types.\n";
    return strMissingFields;
}
function WH_MTY_Inventory_ResetControl(pControlID) {
    debugger;
    swal({
        title: "Are you sure?",
        text: "Data will be cleared.",
        type: "",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete!",
        closeOnConfirm: true
    },
    //callback function in case of pressing "Yes, delete"
    function () {
        $("#" + pControlID).val("");
    });
}

//#region O T H E R   F U N C T I O N S

function GetWarehouseAreas() {
    debugger;

    // $('#slRowID').val("") ;
    // $('#slAreaID').val() == "";
    var pParametersWithValues =
        {
            pWarehouseID: $('#slWarehouseID').val() == "" ? 0 : $('#slWarehouseID').val()
        }
    CallGETFunctionWithParameters("/api/WH_MTY_Inventory/GetWarehouseAreasI", pParametersWithValues
          , function (pData) {
              if (pData[0]) {
                  FillListFromObject(null, 2, "Select Area", "slAreaID", pData[1], function () { GetAreaRows(); })
              }
              else {
                  swal("Sorry", "Connection failed, please try again.");
              }
          }
          , null);
}

function GetAreaRows() {
    debugger;

    var pParametersWithValues =
        {
            pAreaID: $('#slAreaID').val() == "" ? 0 : $('#slAreaID').val()
        }
    CallGETFunctionWithParameters("/api/WH_MTY_Inventory/GetAreaRowsI", pParametersWithValues
          , function (pData) {
              if (pData[0]) {
                  FillListFromObject(null, 2, "Select Row", "slRowID", pData[1], function () { GetRowLocations(); })
              }
              else {
                  swal("Sorry", "Connection failed, please try again.");
              }
          }
          , null);
}

function GetRowLocations() {
    debugger;

    var pParametersWithValues =
        {
            pRowID: $('#slRowID').val() == "" ? 0 : $('#slRowID').val()
        }
    CallGETFunctionWithParameters("/api/WH_MTY_Inventory/GetRowLocationsI", pParametersWithValues
          , function (pData) {
              if (pData[0]) {
                  FillListFromObject(null, 1, "Select Location", "slRowLocationID", pData[1], null)
              }
              else {
                  swal("Sorry", "Connection failed, please try again.");
              }
          }
          , null);
}

//#endregion
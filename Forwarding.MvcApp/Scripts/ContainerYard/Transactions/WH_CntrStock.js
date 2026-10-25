function WH_CntrStock_Inti(pData) {
    debugger;
    WH_CntrStock_BindTableRows(JSON.parse(pData[0]));
    FillListFromObject(null, 2/*CodeThenName*/, "Select Container Type", "slContainerTypesID", pData[2]);
    FillListFromObject(null, 2/*CodeThenName*/, "Select Warehouse", "slWH_WarehouseIDC", pData[5]);
}

function WH_CntrStock_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-ContainerFreightStation").parent().addClass("active");
    ClearAllTableRows("tblWH_CntrStock");

    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblWH_CntrStock",
        ("<tr ID='" + item.ID + "' ondblclick='WH_CntrStock_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' id='" + item.ID + "' type='checkbox' value='" + item.ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"
                    + "<td class='ContainerNumber' style='text-transform:uppercase' >" + item.ContainerNumber + "</td>"
                    + "<td class='Code'>" + item.Code + "</td>"
        + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblWH_CntrStock", "ID");
    CheckAllCheckbox("HeaderDeleteWH_CntrStockID");
    HighlightText("#tblWH_CntrStock>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function WH_CntrStock_LoadingWithPaging() {
    debugger;
    var pWhereClause = WH_CntrStock_GetWhereClause();
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { WH_CntrStock_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblWH_CntrStock>tbody>tr", $("#txt-Search").val().trim());
}

function WH_CntrStock_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1 and isOwn=1 and id not in (select  WH_CntrStockID from WH_Hire where ishire=1 and (select count(*) from WH_Hire wh where wh.ishire=0 and wh.id>WH_Hire.id)=0) ";
    if ($("#txt-Search").val().trim() != "") {
        //pWhereClause = "  join invoicetype on Vw_InvoiceTemplate.InvoiceTypeID=InvoiceType.id where IsFreightInvoice=0 and IsStorageInvoice=0 and IsDemurrageInvoice=0 "
        pWhereClause += " AND (";
        pWhereClause += " Code like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR [ContainerNumber] like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += ")";
    }

    return pWhereClause;
}

function WH_CntrStock_ClearAllControls() {
    debugger;
    ClearAll("#WH_CntrStockModal");
    $("#liWH_CntrStock").siblings().removeClass("active");

    $("#divWH_CntrStock").siblings().removeClass("active");
    $("#divWH_CntrStock").addClass("active");


    $("#btnSave").attr("onclick", "WH_CntrStock_Insert();");
    //$("#btnSaveandNew").attr("onclick", "ShippingOrder_Insert(true);");
    jQuery("#WH_CntrStockModal").modal("show");
}
function WH_CntrStock_EditByDblClick(pID) {
    debugger;

    ClearAll("#WH_CntrStockModal");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    //to quickly empty tables
    ////////$("#tblShippingOrderContainer tbody").html("");
    ////////$("#tblRORO tbody").html("");
    ////////$("#tblFreight tbody").html("");

    $("#liBasicData").siblings().removeClass("active");
    $("#liBasicData").addClass("active");
    $("#divBasicData").siblings().removeClass("active");
    $("#divBasicData").addClass("active");
    jQuery("#WH_CntrStockModal").modal("show");

    var pParametersWithValues = { pWHFCLTariffIDForModal: pID };
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_CntrStocks/WH_CntrStock_LoadItem", pParametersWithValues
        , function (pData) {
            var pWH_CntrStock = JSON.parse(pData[0]);
            $("#hID").val(pID);
            $('#txtContainerNumber').val(pWH_CntrStock.ContainerNumber);
            $("#slContainerTypesID").val((pWH_CntrStock.ContainerTypesID == 0 ? "" : pWH_CntrStock.ContainerTypesID));
            $("#slWH_WarehouseIDC").val((pWH_CntrStock.WH_WarehouseID == 0 ? "" : pWH_CntrStock.WH_WarehouseID));
            $("#btnSave").attr("onclick", "WH_CntrStock_Update();");
            //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
            FadePageCover(false);
        }
        ,
        null
        );

}

function WH_CntrStock_Insert() {
    debugger;
    if (!ValidateForm("form", "WH_CntrStockModal")) {
        strMissingFields = WH_CntrStock_GetMissingFields();
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
            pWH_WarehouseID: $("#slWH_WarehouseIDC").val()
            //LoadWithPaging Parameters
            , pWhereClauseWH_CntrStock: WH_CntrStock_GetWhereClause()
            , pPageSize: $('#select-page-size').val()
            , pPageNumber: 1
            , pOrderBy: "ID DESC"
        };
        //CallPOSTFunctionWithParameters("/api/WH_CntrStocks/WH_CntrStock_Insert", pParametersWithValues
        CallPOSTFunctionWithParameters("/api/WH_CntrStocks/WH_CntrStock_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    $("#hID").val(pData[1]); //pBillID
                    WH_CntrStock_BindTableRows(JSON.parse(pData[2])); //returned rows
                    $("#spn-total-count").text(pData[3]); //_RowCount
                    swal("Success", "Saved successfully.");
                    $("#btnSave").attr("onclick", "WH_CntrStock_Update();");
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
function WH_CntrStock_Update() {
    debugger;

    if (!ValidateForm("form", "WH_CntrStockModal")) {
        strMissingFields = WH_CntrStock_GetMissingFields();
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
            pWH_WarehouseID: $("#slWH_WarehouseIDC").val()
            //LoadWithPaging Parameters
                , pWhereClauseWH_CntrStock: WH_CntrStock_GetWhereClause()
                , pPageSize: $('#select-page-size').val()
                , pPageNumber: 1
                , pOrderBy: "ID DESC"

        };
        //CallPOSTFunctionWithParameters("/api/WH_CntrStocks/WH_CntrStock_Update", pParametersWithValues
        CallPOSTFunctionWithParameters("/api/WH_CntrStocks/WH_CntrStock_Save", pParametersWithValues
        , function (pData) {
            if (pData[0]) {
                //$("#hID").val(pData[1]); //pBillID
                WH_CntrStock_BindTableRows(JSON.parse(pData[2])); //returned rows
                $("#spn-total-count").text(pData[3]); //_RowCount
                swal("Success", "Saved successfully.");
                $("#btnSave").attr("onclick", "WH_CntrStock_Update();");
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
function WH_CntrStock_DeleteList() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblWH_CntrStock');
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
                CallGETFunctionWithParameters("/api/WH_CntrStocks/WH_CntrStock_DeleteList"
                    , {
                        pDeleteWH_CntrStockIDs: GetAllSelectedIDsAsString('tblWH_CntrStock')
                        //LoadWithPaging Parameters
                        , pWhereClauseWH_CntrStock: WH_CntrStock_GetWhereClause()
                        , pPageSize: $('#select-page-size').val()
                        , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                        , pOrderBy: "ID DESC"
                    }
                    , function (pData) {
                        if (!pData[0])
                            swal("Sorry", strDeleteFailMessage);
                        WH_CntrStock_BindTableRows(JSON.parse(pData[1]));
                        FadePageCover(false);
                    });
            });
}

function WH_CntrStock_GetMissingFields() {
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
function WH_CntrStock_ResetControl(pControlID) {
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

//////////////////////////////////////////
////////////////WH_Hire///////////////////
/////////////////////////////////////////
function WH_Hire_Inti(pData) {
    debugger;
    WH_Hire_BindTableRows(JSON.parse(pData[3]));
    FillListFromObject(null, 2/*CodeThenName*/, "Select Container", "slWH_CntrStockID", pData[7]);
    FillListFromObject(null, 2/*CodeThenName*/, "Select Warehouse", "slWH_WarehouseID", pData[5]);
    FillListFromObject(null, 2/*CodeThenName*/, "Select Customer", "slCustomerID", pData[6]);
}

function WH_Hire_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-ContainerFreightStation").parent().addClass("active");
    ClearAllTableRows("tblWH_Hire");

    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblWH_Hire",
        ("<tr ID='" + item.ID + "' ondblclick='WH_Hire_EditByDblClick(" + item.ID + "," + item.WH_CntrStockID + ");'>"
                    + "<td class='ID'> <input name='Delete' id='" + item.ID + "' type='checkbox' value='" + item.ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"
                    + "<td class='ContainerNumber' style='text-transform:uppercase' >" + item.ContainerNumber + "</td>"
                    + "<td class='TransactionDate' style=text-transform:uppercase' >" + ConvertDateFormat(GetDateWithFormatMDY(item.TransactionDate)) + "</td>"
                    + "<td class='CustomersName' style='text-transform:uppercase' >" + item.CustomersName + "</td>"
                    + "<td class='WH_WarehouseName' style='text-transform:uppercase' >" + item.WH_WarehouseName + "</td>"
        + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblWH_Hire", "ID");
    CheckAllCheckbox("HeaderDeleteWH_HireID");
    HighlightText("#tblWH_Hire>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function WH_Hire_LoadingWithPaging() {
    debugger;
    var pWhereClause = WH_Hire_GetWhereClause();
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-sizeH').val();
    var pControllerParameters = { pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-PagerH", "select-page-sizeH", "spn-first-page-rowH", "spn-last-page-rowH", "spn-total-countH", "div-Text-TotalH", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { WH_Hire_BindTableRows(JSON.parse(pData[3])); });
    HighlightText("#tblWH_Hire>tbody>tr", $("#txt-SearchH").val().trim());
}

function WH_Hire_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1  and isOwn=1 and ishire=1 and (select count(*) from WH_Hire wh where wh.ishire=0 and wh.id>VwWH_Hire.id and wh.WH_CntrStockID=VwWH_Hire.WH_CntrStockID)=0";
    if ($("#txt-Search").val().trim() != "") {
        //pWhereClause = "  join invoicetype on Vw_InvoiceTemplate.InvoiceTypeID=InvoiceType.id where IsFreightInvoice=0 and IsStorageInvoice=0 and IsDemurrageInvoice=0 "
        pWhereClause += " AND (";
        pWhereClause += " WH_WarehouseName like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR [ContainerNumber] like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR [CustomersName] like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += ")";
    }

    return pWhereClause;
}

function WH_Hire_ClearAllControls() {
    debugger;
    ClearAll("#WH_HireModal");
    $("#liWH_Hire").siblings().removeClass("active");

    $("#divWH_Hire").siblings().removeClass("active");
    $("#divWH_Hire").addClass("active");


    $("#btnSaveH").attr("onclick", "WH_Hire_Insert();");
    //$("#btnSaveandNew").attr("onclick", "ShippingOrder_Insert(true);");
    jQuery("#WH_HireModal").modal("show");
    FunGetWH_CntrStockIDToNew();
}
function WH_Hire_EditByDblClick(pID, pWH_CntrStockID) {
    debugger;

    ClearAll("#WH_HireModal");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    //to quickly empty tables
    ////////$("#tblShippingOrderContainer tbody").html("");
    ////////$("#tblRORO tbody").html("");
    ////////$("#tblFreight tbody").html("");

    $("#liBasicData").siblings().removeClass("active");
    $("#liBasicData").addClass("active");
    $("#divBasicData").siblings().removeClass("active");
    $("#divBasicData").addClass("active");
    jQuery("#WH_HireModal").modal("show");
    var pParametersWithValues = {
        pWHFCLTariffIDForModal: pID,
        pWhereClause: "WHERE 1=1 and isOwn=1 and id not in (select  WH_CntrStockID from WH_Hire where ishire=1 and (select count(*) from WH_Hire wh where wh.ishire=0 and wh.id>WH_Hire.id and wh.WH_CntrStockID=WH_Hire.WH_CntrStockID)=0) or id=" + pWH_CntrStockID
    };
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_CntrStocks/WH_Hire_LoadItem", pParametersWithValues
        , function (pData) {
            FillListFromObject(null, 2/*CodeThenName*/, "Select Container", "slWH_CntrStockID", pData[1]);
            var pWH_Hire = JSON.parse(pData[0]);
            $("#hIDH").val(pID);
            $("#slWH_CntrStockID").val((pWH_Hire.WH_CntrStockID == 0 ? "" : pWH_Hire.WH_CntrStockID));
            $("#slWH_WarehouseID").val((pWH_Hire.WH_WarehouseID == 0 ? "" : pWH_Hire.WH_WarehouseID));
            //$('#dtpTransactionDate').val(ConvertDateFormat(GetDateWithFormatMDY(pWH_Hire.TransactionDate)));
            //$('#cKIsHire').prop('checked', pWH_CSL_Tariff.IsHire);
            $("#slCustomerID").val((pWH_Hire.CustomerID == 0 ? "" : pWH_Hire.CustomerID));
            $("#Remarks").val(pWH_Hire.WH_WarehouseID);

            $("#btnSaveH").attr("onclick", "WH_Hire_Update();");
            //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
            FadePageCover(false);
        }
        ,
        null
        //function () { $("#slWH_CntrStockID").val(VWH_CntrStockID); }
        );

}
function WH_Hire_Insert() {
    debugger;
    if (!ValidateForm("form", "WH_HireModal")) {
        strMissingFields = WH_Hire_GetMissingFields();
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
            pWH_CntrStockID: $("#slWH_CntrStockID").val(),
            pWH_WarehouseID: $("#slWH_WarehouseID").val(),
            //pTransactionDate: ConvertDateFormat($("#dtpTransactionDate").val()),
            pIsHire: $("#cKIsHire").prop('checked'),
            pCustomerID: $("#slCustomerID").val(),
            pRemarks: $("#txtRemarks").val()
            
            //LoadWithPaging Parameters
            , pWhereClauseWH_Hire: WH_Hire_GetWhereClause()
            , pPageSize: $('#select-page-sizeH').val()
            , pPageNumber: 1
            , pOrderBy: "ID DESC"
        };
        //CallPOSTFunctionWithParameters("/api/WH_CntrStocks/WH_Hire_Insert", pParametersWithValues
        CallPOSTFunctionWithParameters("/api/WH_CntrStocks/WH_Hire_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    $("#hIDH").val(pData[1]); //pBillID
                    WH_Hire_BindTableRows(JSON.parse(pData[2])); //returned rows
                    $("#spn-total-countH").text(pData[3]); //_RowCount
                    WH_CntrStock_BindTableRows(JSON.parse(pData[4])); //returned rows
                    $("#spn-total-count").text(pData[5]); //_RowCount
                    swal("Success", "Saved successfully.");
                    $("#btnSaveH").attr("onclick", "WH_Hire_Update();");
                    //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);

            }
        , null);

    }
}

function WH_Hire_Update() {
    debugger;

    if (!ValidateForm("form", "WH_HireModal")) {
        strMissingFields = WH_Hire_GetMissingFields();
        swal("You are missing:", strMissingFields);
    }
    else { //start Inserting Procedure
        FadePageCover(true);
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var thedate = now.getFullYear() + "-" + (month) + "-" + (day);
        var pParametersWithValues = {
            pID: $("#hIDH").val(),
            pWH_CntrStockID: $("#slWH_CntrStockID").val(),
            pWH_WarehouseID: $("#slWH_WarehouseID").val(),
            //pTransactionDate: ConvertDateFormat($("#dtpTransactionDate").val()),
            pIsHire: $("#cKIsHire").prop('checked'),
            pCustomerID: $("#slCustomerID").val(),
            pRemarks: $("#txtRemarks").val()
            //LoadWithPaging Parameters
                , pWhereClauseWH_Hire: WH_Hire_GetWhereClause()
                , pPageSize: $('#select-page-sizeH').val()
                , pPageNumber: 1
                , pOrderBy: "ID DESC"

        };
        //CallPOSTFunctionWithParameters("/api/WH_CntrStocks/WH_Hire_Update", pParametersWithValues
        CallPOSTFunctionWithParameters("/api/WH_CntrStocks/WH_Hire_Save", pParametersWithValues
        , function (pData) {
            if (pData[0]) {
                //$("#hIDH").val(pData[1]); //pBillID
                WH_Hire_BindTableRows(JSON.parse(pData[2])); //returned rows
                $("#spn-total-countH").text(pData[3]); //_RowCount
                WH_CntrStock_BindTableRows(JSON.parse(pData[4])); //returned rows
                $("#spn-total-count").text(pData[5]); //_RowCount
                swal("Success", "Saved successfully.");
                $("#btnSaveH").attr("onclick", "WH_Hire_Update();");
                //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
            }
            else
                swal("Sorry", "Connection failed, please try again.");
            FadePageCover(false);
        }
    , null);

    }
}

function WH_Hire_DeleteList() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblWH_Hire');
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
                CallGETFunctionWithParameters("/api/WH_CntrStocks/WH_Hire_DeleteList"
                    , {
                        pDeleteWH_HireIDs: GetAllSelectedIDsAsString('tblWH_Hire')
                        //LoadWithPaging Parameters
                        , pWhereClauseWH_Hire: WH_Hire_GetWhereClause()
                        , pPageSize: $('#select-page-sizeH').val()
                        , pPageNumber: $("#div-PagerH li.active a").text() == "" ? 1 : $("#div-PagerH li.active a").text()
                        , pOrderBy: "ID DESC"
                    }
                    , function (pData) {
                        if (!pData[0])
                            swal("Sorry", strDeleteFailMessage);
                        WH_Hire_BindTableRows(JSON.parse(pData[1]));
                        FadePageCover(false);
                    });
            });
}

function WH_Hire_GetMissingFields() {
    debugger;
    var strMissingFields = "";// i am sure there is at least 1 missing field isa
    var fieldCount = 0;
    //BasicData Tab
    if ($("#slWH_CntrStockID").val() == 0)
        strMissingFields += ++fieldCount + " - Tariff Data --> Container Number.\n";
    if ($("#dtTransactionDate").val().toString().trim() == '')
        strMissingFields += ++fieldCount + " - Tariff Data --> Transaction Date.\n";
    if ($("#slCustomerID").val() == 0)
        strMissingFields += ++fieldCount + " - Tariff Data --> Customer.\n";
    return strMissingFields;
}

function WH_Hire_ResetControl(pControlID) {
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

function FunGetWH_CntrStockIDToNew() {
    debugger;
    //GetWH_CntrStockID("/api/WH_CntrStocks/GetWH_CntrStockID", "ID", "Name", "#slWH_CntrStockID", "WHERE 1=1 and ishire=1 and (select count(*) from WH_Hire wh where wh.ishire=0 and wh.id>VwWH_Hire.id)>0");
    GetWH_CntrStockID("/api/WH_CntrStocks/GetWH_CntrStockID", "ID", "Name", "#slWH_CntrStockID", "WHERE 1=1 and isOwn=1 and id not in (select  WH_CntrStockID from WH_Hire where ishire=1 and (select count(*) from WH_Hire wh where wh.ishire=0 and wh.id>WH_Hire.id  and wh.WH_CntrStockID=WH_Hire.WH_CntrStockID)=0) ");
}
function FunGetWH_CntrStockIDToDbClick(PID) {
    debugger;
    GetWH_CntrStockID("/api/WH_CntrStocks/GetWH_CntrStockID", "ID", "Name", "#slWH_CntrStockID", "WHERE 1=1 and isOwn=1 and id not in (select  WH_CntrStockID from WH_Hire where ishire=1 and (select count(*) from WH_Hire wh where wh.ishire=0 and wh.id>WH_Hire.id  and wh.WH_CntrStockID=WH_Hire.WH_CntrStockID)=0) or id=" + PID);
}
function GetWH_CntrStockID(FunUrl, ID_Name, Item_Name, Selected_ID, WhereClause) {
    $.ajax({
        type: "GET",
        url: strServerURL + FunUrl,
        data: { pWhereClause: WhereClause },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            FillListFromObject(null, 2/*CodeThenName*/, "Select Container", "slWH_CntrStockID", d[0]);
        },
        error: function (jqXHR, exception) {
            swal("Oops!", "Please, contact your technical support!", "error");
        }
    });
}
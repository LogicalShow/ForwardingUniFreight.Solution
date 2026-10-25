function WH_FCL_Tariff_Inti(pData) {
    debugger;
    WH_FCL_Tariff_BindTableRows(JSON.parse(pData[0]));
    FillListFromObject(null, 2/*Name*/, "Select Customer", "slCustomerID", pData[2]);
    FillListFromObject(null, 2/*Name*/, "Select Warehouse", "slWH_WarehouseID", pData[3]);
    
}


function WH_FCL_Tariff_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-ContainerFreightStation").parent().addClass("active"); 
    ClearAllTableRows("tblWH_FCL_Tariff");

    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblWH_FCL_Tariff",
        ("<tr ID='" + item.ID + "' ondblclick='WH_FCL_Tariff_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' id='" + item.ID + "' type='checkbox' value='" + item.ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name' style='text-transform:uppercase' >" + item.Name + "</td>"
                    + "<td class='Customer'>" + (item.Customer==0?"":item.Customer) + "</td>"
                    + "<td class='WareHouse'>" + (item.WareHouse==0?"":item.WareHouse) + "</td>"
                    + "<td class='IsDefault'> <input type='checkbox' id='cbIsDefault" + item.ID + "' disabled='disabled' " + (item.IsDefault == true ? " checked='checked' " : "") + " /></td>"
                    + "<td class='IsHold'> <input type='checkbox' id='cbIsHold" + item.ID + "' disabled='disabled' " + (item.IsHold == true ? " checked='checked' " : "") + " /></td>"
                    //+ "<td class=''><a href='#WH_FCL_TariffModalCopy' data-toggle='modal' onclick='CopyTemplate(" + item.ID + ");' " + " class='btn btn-xs btn-rounded btn-lightblue' title='Edit'> <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>" + "</a></td>"


                    //+ "<td class='hide'><a href='#ShippingOrderModal' data-toggle='modal' onclick='ShippingOrder_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                    ///////////////sherif
                    //+ "<td class=''><a href='#' data-toggle='modal' onclick='InvoiceTemplate_Print(" + item.ID + ");' " + printControlsText + "</a></td>"
        + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblWH_FCL_Tariff", "ID");
    CheckAllCheckbox("HeaderDeleteWH_FCL_TariffID");
    HighlightText("#tblWH_FCL_Tariff>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function WH_FCL_Tariff_LoadingWithPaging() {
    debugger;
    var pWhereClause = WH_FCL_Tariff_GetWhereClause();
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { WH_FCL_Tariff_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblWH_FCL_Tariff>tbody>tr", $("#txt-Search").val().trim());
}

function WH_FCL_Tariff_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1";
    if ($("#txt-Search").val().trim() != "") {
        //pWhereClause = "  join invoicetype on Vw_InvoiceTemplate.InvoiceTypeID=InvoiceType.id where IsFreightInvoice=0 and IsStorageInvoice=0 and IsDemurrageInvoice=0 "
        pWhereClause += " AND (";
        pWhereClause += " Code like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR [Name] like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR [Customer] like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR [WareHouse] like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += ")";
    }

    return pWhereClause;
}

function WH_FCL_Tariff_ClearAllControls() {
    debugger;
    ClearAll("#WH_FCL_TariffModal");
    $("#liWH_FCL_Tariff").siblings().removeClass("active");

    $("#divWH_FCL_Tariff").siblings().removeClass("active");
    $("#divWH_FCL_Tariff").addClass("active");


    $("#btnSave").attr("onclick", "WH_FCL_Tariff_Insert();");
    //$("#btnSaveandNew").attr("onclick", "ShippingOrder_Insert(true);");
    $("#tabStrTariffItem").hide();
    $("#tabStrTariffImo").hide();
    $("#slCustomerID").removeAttr("disabled");
    jQuery("#WH_FCL_TariffModal").modal("show");
}

function WH_FCL_Tariff_EditByDblClick(pID) {
    debugger;

    ClearAll("#WH_FCL_TariffModal");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    //to quickly empty tables
    ////////$("#tblShippingOrderContainer tbody").html("");
    ////////$("#tblRORO tbody").html("");
    ////////$("#tblFreight tbody").html("");

    $("#liBasicData").siblings().removeClass("active");
    $("#liBasicData").addClass("active");
    $("#divBasicData").siblings().removeClass("active");
    $("#divBasicData").addClass("active");
    jQuery("#WH_FCL_TariffModal").modal("show");

    var pParametersWithValues = { pWHFCLTariffIDForModal: pID };
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_LoadItem", pParametersWithValues
        , function (pData) {
            var pWH_FCL_Tariff = JSON.parse(pData[0]);
            $("#hID").val(pID);
            $("#txtCode").val(pWH_FCL_Tariff.Code);
            $('#txtName').val(pWH_FCL_Tariff.Name);
            $("#slCustomerID").val((pWH_FCL_Tariff.CustomerID==0?"":pWH_FCL_Tariff.CustomerID));
            $("#slWH_WarehouseID").val((pWH_FCL_Tariff.WH_WarehouseID==0?"":pWH_FCL_Tariff.WH_WarehouseID));
            $("#cKIsDefault").prop('checked', pWH_FCL_Tariff.IsDefault);
            $("#cKIsHold").prop('checked', pWH_FCL_Tariff.IsHold);
            $("#cKIsActive").prop('checked', pWH_FCL_Tariff.IsActive);
            $('#dtpValidFromTo').val(ConvertDateFormat(GetDateWithFormatMDY(pWH_FCL_Tariff.ValidFromTo)));

            $("#btnSave").attr("onclick", "WH_FCL_Tariff_Update();");
            //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
            FadePageCover(false);
            $("#tabStrTariffItem").show();
            $("#tabStrTariffImo").show();
            if ($("#cKIsDefault").prop("checked") == true) {

                $("#slCustomerID").attr("disabled", "disabled");
                $("#slCustomerID").val("");
            }
            else if ($("#cKIsDefault").prop("checked") == false) {
                $("#slCustomerID").removeAttr("disabled");
            }

        }
        ,
        //null
        function () {
            LoadcntrType();
            LoadcntrTypeImo();
        }
        );

}

function WH_FCL_Tariff_Insert() {
    debugger;
    if (!ValidateForm("form", "WH_FCL_TariffModal")) {
        strMissingFields = WH_FCL_Tariff_GetMissingFields();
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
                pCode: $("#txtCode").val(),
                pName: $("#txtName").val(),
                pCustomerID: $("#slCustomerID").val(),
                pWH_WarehouseID: $("#slWH_WarehouseID").val(),
                pIsDefault: $("#cKIsDefault").prop('checked'),
                pIsHold: $("#cKIsHold").prop('checked'),
                pValidFromTo: ConvertDateFormat($("#dtpValidFromTo").val())
                //LoadWithPaging Parameters
                , pWhereClauseWH_FCL_Tariff: WH_FCL_Tariff_GetWhereClause()
                , pPageSize: $('#select-page-size').val()
                , pPageNumber: 1
                , pOrderBy: "ID DESC"
            };
            //CallPOSTFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Insert", pParametersWithValues
            CallPOSTFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Save", pParametersWithValues
                , function (pData) {
                    if (pData[0]) {
                        $("#hID").val(pData[1]); //pBillID
                        WH_FCL_Tariff_BindTableRows(JSON.parse(pData[2])); //returned rows
                        $("#spn-total-count").text(pData[3]); //_RowCount
                        swal("Success", "Saved successfully.");
                        $("#btnSave").attr("onclick", "WH_FCL_Tariff_Update();");
                        //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
                    }
                    else
                        swal("Sorry", "Connection failed, please try again.");
                    FadePageCover(false);
                    $("#tabStrTariffItem").show();
                    $("#tabStrTariffImo").show();
                }
            , null);
        
    }
}

function WH_FCL_Tariff_Update() {
    debugger;

    if (!ValidateForm("form", "WH_FCL_TariffModal")) {
        strMissingFields = WH_FCL_Tariff_GetMissingFields();
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
            pCode: $("#txtCode").val(),
            pName: $("#txtName").val(),
            pCustomerID: $("#slCustomerID").val(),
            pWH_WarehouseID: $("#slWH_WarehouseID").val(),
            pIsDefault: $("#cKIsDefault").prop('checked'),
            pIsHold: $("#cKIsHold").prop('checked'),
            pValidFromTo: ConvertDateFormat($("#dtpValidFromTo").val())
            //LoadWithPaging Parameters
                , pWhereClauseWH_FCL_Tariff: WH_FCL_Tariff_GetWhereClause()
                , pPageSize: $('#select-page-size').val()
                , pPageNumber: 1
                , pOrderBy: "ID DESC"

        };
        //CallPOSTFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Update", pParametersWithValues
        CallPOSTFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Save", pParametersWithValues
        , function (pData) {
            if (pData[0]) {
                //$("#hID").val(pData[1]); //pBillID
                WH_FCL_Tariff_BindTableRows(JSON.parse(pData[2])); //returned rows
                $("#spn-total-count").text(pData[3]); //_RowCount
                swal("Success", "Saved successfully.");
                $("#btnSave").attr("onclick", "WH_FCL_Tariff_Update();");
                //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
                $("#tabStrTariffItem").show();
                $("#tabStrTariffImo").show();
            }
            else
                swal("Sorry", "Connection failed, please try again.");
            FadePageCover(false);
        }
    , null);

    }
}

function WH_FCL_Tariff_DeleteList() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblWH_FCL_Tariff');
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
                CallGETFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_DeleteList"
                    , {
                        pDeleteWH_FCL_TariffIDs: GetAllSelectedIDsAsString('tblWH_FCL_Tariff')
                        //LoadWithPaging Parameters
                        , pWhereClauseWH_FCL_Tariff: WH_FCL_Tariff_GetWhereClause()
                        , pPageSize: $('#select-page-size').val()
                        , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                        , pOrderBy: "ID DESC"
                    }
                    , function (pData) {
                        if (!pData[0])
                            swal("Sorry", strDeleteFailMessage);
                        WH_FCL_Tariff_BindTableRows(JSON.parse(pData[1]));
                        FadePageCover(false);
                    });
            });
}

function WH_FCL_Tariff_GetMissingFields() {
    debugger;
    var strMissingFields = "";// i am sure there is at least 1 missing field isa
    var fieldCount = 0;
    //BasicData Tab
    if ($("#txtCode").val() == '')
        strMissingFields += ++fieldCount + " - Tariff Data --> Code.\n";
    if ($("#txtName").val() == '')
        strMissingFields += ++fieldCount + " - Tariff Data --> Name.\n";
    if ($("#dtpValidFromTo").val().toString().trim() == '')
        strMissingFields += ++fieldCount + " - Tariff Data --> Valid To.\n";
    if ($("#slWH_WarehouseID").val() == 0)
        strMissingFields += ++fieldCount + " - Tariff Data --> Ware house.\n";
    return strMissingFields;
}
function WH_FCL_Tariff_ResetControl(pControlID) {
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
$('input[type=checkbox][name=NMIsDefault]').change(function () {
    debugger;
    if ($(this).prop("checked") == true) {

        $("#slCustomerID").attr("disabled", "disabled");
        $("#slCustomerID").val("");
    }
    else if ($(this).prop("checked") == false) {
        $("#slCustomerID").removeAttr("disabled");
    }
});
/***************************************************************************************/
/********************************* WH_FCL_Tariff_Details ****************************/
/***************************************************************************************/
function WH_FCL_Tariff_Details_Inti(pData) {
    //ShippingOrderContainerTotals_BindTableRows(JSON.parse(pData[0]));
    debugger;
    FillListFromObject(null, 2/*CodeThenName*/, "Select Charge Type", "slChargeTypesID", pData[4]);
    FillListFromObject(null, 2/*CodeThenName*/, "Select Container Type", "slContainerTypesID", pData[5]);
    FillListFromObject(null, 2/*CodeThenName*/, "Select Calculation Type", "slCalcTypesID", pData[6]);

}
function WH_FCL_Tariff_Details_BindTableRows(pTableRows) {
    debugger;

    ClearAllTableRows("tblWH_FCL_Tariff_Details");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblWH_FCL_Tariff_Details",
        ("<tr ID='Item" + item.ID + "' ondblclick='WH_FCL_Tariff_Details_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ItemID'> <input name='Delete' id='" + item.ID + "' type='checkbox' value='" + item.ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"
                    + "<td class='ChargeType'>" + item.ChargeType + "</td>"
                    + "<td class='Rate'>" + item.Rate + "</td>"
                    + "<td class='ContainerType'>" + (item.ContainerType==0?"":item.ContainerType) + "</td>"
                    + "<td class='CalculatedAmount'>" + item.CalculatedAmount + "</td>"
                    + "<td class='Commission'>" + item.Commission + "</td>"
                    //+ "<td class='hide'><a href='#WH_FCL_Tariff_DetailsModal' data-toggle='modal' onclick='WH_FCL_Tariff_Details_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
        + "</tr>"));
    });
    BindAllCheckboxonTable("tblWH_FCL_Tariff_Details", "ItemID");
    CheckAllCheckbox("HeaderDeleteWH_FCL_Tariff_DetailsID");
    HighlightText("#tblWH_FCL_Tariff_Details>tbody>tr", $("#txt-SearchItem").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function WH_FCL_Tariff_Details_LoadingWithPaging() {
    debugger;
    //strLoadWithPagingFunctionName = "/api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    var pWhereClause = WH_FCL_Tariff_Details_GetWhereClause();
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { WH_FCL_Tariff_Details_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblWH_FCL_Tariff_Details>tbody>tr", $("#txt-SearchItem").val().trim());
}
function WH_FCL_Tariff_Details_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1    and   WH_FCL_TariffID= " + $("#hID").val();
    if ($("#txt-SearchItem").val().trim() != "") {
        pWhereClause += " AND (";
        pWhereClause += " [ChargeType] like N'%" + $("#txt-SearchItem").val().trim() + "%' ";
        pWhereClause += " [Rate] =" + $("#txt-SearchItem").val().trim() ;
        pWhereClause += " [ContainerType] like N'%" + $("#txt-SearchItem").val().trim() + "%' ";
        pWhereClause += " [CalculatedAmount] =" + $("#txt-SearchItem").val().trim();
        pWhereClause += " [Commission] =" + $("#txt-SearchItem").val().trim();
        pWhereClause += ")";
    }

    //if ($("#cbHideApprovedVoyages").prop("checked"))
    //    pWhereClause += " AND IsApproved=0 ";
    return pWhereClause;
}
function WH_FCL_Tariff_Details_ClearAllControls() {
    debugger;
    ClearAll("#WH_FCL_Tariff_DetailsModal");
    $("#btnSaveDSTCT").attr("onclick", "WH_FCL_Tariff_Details_Insert();");
    //$("#btnSaveandNew").attr("onclick", "ShippingOrder_Insert(true);");
    $("#WH_FCL_Tariff_Details_PeriodsModal").hide();
    $("#txtCalculatedAmount").val(100);
    LoadcntrPeriod();
    jQuery("#WH_FCL_Tariff_DetailsModal").modal("show");
}
function WH_FCL_Tariff_Details_EditByDblClick(pID) {
    debugger;

    ClearAll("#WH_FCL_Tariff_DetailsModal");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    jQuery("#WH_FCL_Tariff_DetailsModal").modal("show");

    var pParametersWithValues = { pWH_FCL_Tariff_DetailsIDForModal: pID };
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_LoadItem", pParametersWithValues
        , function (pData) {
            var pWH_FCL_Tariff_Details = JSON.parse(pData[0]);
            $("#hIDDSTCT").val(pID);
            $("#slChargeTypesID").val(pWH_FCL_Tariff_Details.ChargeTypesID);
            $("#txtRate").val(pWH_FCL_Tariff_Details.Rate);
            $("#slContainerTypesID").val((pWH_FCL_Tariff_Details.ContainerTypesID==0?"":pWH_FCL_Tariff_Details.ContainerTypesID));
            $("#slCalcTypesID").val((pWH_FCL_Tariff_Details.CalcTypesID==0?"":pWH_FCL_Tariff_Details.CalcTypesID));
            $("#txtCalculatedAmount").val(pWH_FCL_Tariff_Details.CalculatedAmount);
            $("#txtCommission").val(pWH_FCL_Tariff_Details.Commission);
            $("#cKisCalcOneTimeToDay").prop('checked', pWH_FCL_Tariff_Details.isCalcOneTimeToDay);

            //$("#txtRemarksDSTCT").val(pWH_FCL_Tariff_Details.PowerSupplyTariffValue);

            $("#btnSaveDSTCT").attr("onclick", "WH_FCL_Tariff_Details_Update();");
            FadePageCover(false);
            $("#tabWH_FCL_Tariff_Details_Periods").show();
        }
        //, null
    , function () { LoadcntrPeriod(); }
        );
}
function WH_FCL_Tariff_Details_Insert() {
    debugger;
    if (!ValidateForm("form", "WH_FCL_Tariff_DetailsModal")) {
        strMissingFields = WH_FCL_Tariff_Details_GetMissingFields();
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
            pWH_FCL_TariffID: $("#hID").val(),
            pChargeTypesID: $("#slChargeTypesID").val(),
            pRate: $("#txtRate").val(),
            pContainerTypesID: $("#slContainerTypesID").val(),
            pCalcTypesID: $("#slCalcTypesID").val(),
            pCalculatedAmount: $("#txtCalculatedAmount").val(),
            pisCalcOneTimeToDay: $("#cKisCalcOneTimeToDay").prop('checked'),
            pCommission: $("#txtCommission").val()
            //LoadWithPaging Parameters
                , pWhereClauseWH_FCL_Tariff_Details: WH_FCL_Tariff_Details_GetWhereClause()
                , pPageSize: $('#select-page-size').val()
                , pPageNumber: 1
                , pOrderBy: "ID DESC"
        };
        //CallPOSTFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_Insert", pParametersWithValues
        CallPOSTFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    $("#hIDDSTCT").val(pData[1]); //pBillID
                    WH_FCL_Tariff_Details_BindTableRows(JSON.parse(pData[2])); //returned rows
                    $("#spn-total-count").text(pData[3]); //_RowCount
                    swal("Success", "Saved successfully.");
                    $("#btnSaveDSTCT").attr("onclick", "WH_FCL_Tariff_Details_Update();");
                    //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
                $("#tabWH_FCL_Tariff_Details_Periods").show();
            }
        , null);
    }
}
function WH_FCL_Tariff_Details_Update() {
    debugger;

    if (!ValidateForm("form", "WH_FCL_Tariff_DetailsModal")) {
        strMissingFields = WH_FCL_Tariff_Details_GetMissingFields();
        swal("You are missing:", strMissingFields);
    }
    else { //start Inserting Procedure
        FadePageCover(true);
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var thedate = now.getFullYear() + "-" + (month) + "-" + (day);
        var pParametersWithValues = {
            pID: $("#hIDDSTCT").val(),
            pWH_FCL_TariffID: $("#hID").val(),
            pChargeTypesID: $("#slChargeTypesID").val(),
            pRate: $("#txtRate").val(),
            pContainerTypesID: $("#slContainerTypesID").val(),
            pCalcTypesID: $("#slCalcTypesID").val(),
            pCalculatedAmount: $("#txtCalculatedAmount").val(),
            pisCalcOneTimeToDay: $("#cKisCalcOneTimeToDay").prop('checked'),
            pCommission: $("#txtCommission").val()
            //LoadWithPaging Parameters
                , pWhereClauseWH_FCL_Tariff_Details: WH_FCL_Tariff_Details_GetWhereClause()
                , pPageSize: $('#select-page-size').val()
                , pPageNumber: 1
                , pOrderBy: "ID DESC"


        };
        //CallPOSTFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_Update", pParametersWithValues
        CallPOSTFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    //$("#hID").val(pData[1]); //pBillID
                    WH_FCL_Tariff_Details_BindTableRows(JSON.parse(pData[2])); //returned rows
                    $("#spn-total-count").text(pData[3]); //_RowCount
                    swal("Success", "Saved successfully.");
                    $("#btnSaveDSTCT").attr("onclick", "WH_FCL_Tariff_Details_Update();");
                    //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
                    $("#tabWH_FCL_Tariff_Details_Periods").show();
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
        , null);
    }
}
function WH_FCL_Tariff_Details_DeleteList() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblWH_FCL_Tariff_Details');
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
                CallGETFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_DeleteList"
                    , {
                        pDeleteWH_FCL_Tariff_DetailsIDs: GetAllSelectedIDsAsString('tblWH_FCL_Tariff_Details')
                        //LoadWithPaging Parameters
                        , pWhereClauseWH_FCL_Tariff_Details: WH_FCL_Tariff_Details_GetWhereClause()
                        , pPageSize: $('#select-page-size').val()
                        , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                        , pOrderBy: "ID DESC"
                    }
                    , function (pData) {
                        if (!pData[0])
                            swal("Sorry", strDeleteFailMessage);
                        WH_FCL_Tariff_Details_BindTableRows(JSON.parse(pData[1]));
                        FadePageCover(false);
                    });
            });
}
function WH_FCL_Tariff_Details_GetMissingFields() {
    debugger;
    var strMissingFields = "";// i am sure there is at least 1 missing field isa
    var fieldCount = 0;
    //BasicData Tab
    if ($("#slChargeTypesID").val() == 0)
        strMissingFields += ++fieldCount + " - Basic Data --> Charge Types.\n";
    if ($("#txtRate").val() == '')
        strMissingFields += ++fieldCount + " - Basic Data --> Rate.\n";

    return strMissingFields;
}
function WH_FCL_Tariff_Details_ResetControl(pControlID) {
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
function LoadcntrType() {
    debugger;





    //strBindTableRowsFunctionName = "ShippingOrderContainerTotals_BindTableRows";
    //strLoadWithPagingFunctionName = "/api/ShippingOrder/ShippingOrderContainerTotals_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    //LoadView("/Documentation/ShippingOrder", "div-content", function () {
    //    $.getScript(strServerURL + '/Scripts/Documentation/ShippingOrderTab/ShippingOrder.js', function () {
    var pWhereClause = "WHERE 1=1 and WH_FCL_TariffID= " + $("#hID").val();
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pPageNumberc: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy };
    //        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
    //            , function (pData) {

    //            });

    //    });
    //},
    //    function () { ShippingOrderContainerTotals_ClearAllControls(); },
    //    function () { ShippingOrderContainerTotals_DeleteList(); });
    CallGETFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
        pControllerParameters,
        function (pData) {
            WH_FCL_Tariff_Details_BindTableRows(JSON.parse(pData[0]))
        },
        null


        );
}

function FunGetCalcTypesID() {
    debugger;
    GetCalcTypesID("/api/WH_FCL_Tariffs/GetCalcTypesID", "ID", "Name", "#slCalcTypesID", "  where ChargeTypes.ID = " + $("#slChargeTypesID").val());
}

function GetCalcTypesID(FunUrl, ID_Name, Item_Name, Selected_ID, WhereClause) {
    $.ajax({
        type: "GET",
        url: strServerURL + FunUrl,
        data: { pWhereClause: WhereClause },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            //  console.log(r.d[0]);

            $(Selected_ID).val(JSON.parse(d));
        },
        error: function (jqXHR, exception) {
            swal("Oops!", "Please, contact your technical support!", "error");
        }
    });
}
/***************************************************************************************/
/********************************* WH_FCL_Tariff_Imo ****************************/
/***************************************************************************************/
function WH_FCL_Tariff_Imo_Inti(pData) {
    //ShippingOrderContainerTotals_BindTableRows(JSON.parse(pData[0]));
    debugger;
    //FillListFromObject(null, 2/*CodeThenName*/, "Select slCharge Type", "slChargeTypesID", pData[4]);
    //FillListFromObject(null, 2/*CodeThenName*/, "Select Container Type", "slContainerTypesID", pData[5]);
}
function WH_FCL_Tariff_Imo_BindTableRows(pTableRows) {
    debugger;

    ClearAllTableRows("tblWH_FCL_Tariff_Imo");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblWH_FCL_Tariff_Imo",
        ("<tr ID='Item" + item.ID + "' ondblclick='WH_FCL_Tariff_Imo_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ItemID'> <input name='Delete' id='" + item.ID + "' type='checkbox' value='" + item.ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"
                    + "<td class='ImoClassNo'>" + item.ImoClassNo + "</td>"
                    + "<td class='ImoRate'>" + item.ImoRate + "</td>"
                    //+ "<td class='hide'><a href='#WH_FCL_TariffImoModal' data-toggle='modal' onclick='WH_FCL_Tariff_Imo_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
        + "</tr>"));
    });
    BindAllCheckboxonTable("tblWH_FCL_Tariff_Imo", "ItemID");
    CheckAllCheckbox("HeaderDeleteWH_FCL_Tariff_ImoID");
    HighlightText("#tblWH_FCL_Tariff_Imo>tbody>tr", $("#txt-SearchItem").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function WH_FCL_Tariff_Imo_LoadingWithPaging() {
    debugger;
    //strLoadWithPagingFunctionName = "/api/WH_FCL_Tariffs/WH_FCL_Tariff_Imo_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    var pWhereClause = WH_FCL_Tariff_Imo_GetWhereClause();
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { WH_FCL_Tariff_Imo_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblWH_FCL_Tariff_Imo>tbody>tr", $("#txt-SearchItem").val().trim());
}
function WH_FCL_Tariff_Imo_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1    and   WH_FCL_TariffID= " + $("#hID").val();
    if ($("#txt-SearchItem").val().trim() != "") {
        pWhereClause += " AND (";
        pWhereClause += " [ImoClassNo] like N'%" + $("#txt-SearchItem").val().trim() + "%' ";
        pWhereClause += " [ImoRate] =" + $("#txt-SearchItem").val().trim();
        pWhereClause += ")";
    }
    //if ($("#cbHideApprovedVoyages").prop("checked"))
    //    pWhereClause += " AND IsApproved=0 ";
    return pWhereClause;
}
function WH_FCL_Tariff_Imo_ClearAllControls() {
    debugger;
    ClearAll("#WH_FCL_TariffImoModal");
    $("#btnSaveImo").attr("onclick", "WH_FCL_Tariff_Imo_Insert();");
    //$("#btnSaveandNew").attr("onclick", "ShippingOrder_Insert(true);");
    jQuery("#WH_FCL_TariffImoModal").modal("show");
}
function WH_FCL_Tariff_Imo_EditByDblClick(pID) {
    debugger;

    ClearAll("#WH_FCL_TariffImoModal");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    jQuery("#WH_FCL_TariffImoModal").modal("show");

    var pParametersWithValues = { pWH_FCL_Tariff_ImoIDForModal: pID };
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Imo_LoadItem", pParametersWithValues
        , function (pData) {
            var pWH_FCL_Tariff_Imo = JSON.parse(pData[0]);
            $("#hIDDImo").val(pID);

            $("#txtImoClassNo").val(pWH_FCL_Tariff_Imo.ImoClassNo);
            $("#txtImoRate").val(pWH_FCL_Tariff_Imo.ImoRate);
            //$("#txtRemarksDSTCT").val(pWH_FCL_Tariff_Imo.PowerSupplyTariffValue);

            $("#btnSaveImo").attr("onclick", "WH_FCL_Tariff_Imo_Update();");
            FadePageCover(false);
        }
        //, null
    , function () { LoadcntrPeriod(); }
        );
}
function WH_FCL_Tariff_Imo_Insert() {
    debugger;
    if (!ValidateForm("form", "WH_FCL_TariffImoModal")) {
        strMissingFields = WH_FCL_Tariff_Imo_GetMissingFields();
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
            pWH_FCL_TariffID: $("#hID").val(),
            pImoClassNo: $("#txtImoClassNo").val(),
            pImoRate: $("#txtImoRate").val()
            //LoadWithPaging Parameters
                , pWhereClauseWH_FCL_Tariff_Imo: WH_FCL_Tariff_Imo_GetWhereClause()
                , pPageSize: $('#select-page-size').val()
                , pPageNumber: 1
                , pOrderBy: "ID DESC"
        };
        //CallPOSTFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Imo_Insert", pParametersWithValues
        CallPOSTFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Imo_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    $("#hIDDImo").val(pData[1]); //pBillID
                    WH_FCL_Tariff_Imo_BindTableRows(JSON.parse(pData[2])); //returned rows
                    $("#spn-total-count").text(pData[3]); //_RowCount
                    swal("Success", "Saved successfully.");
                    $("#btnSaveImo").attr("onclick", "WH_FCL_Tariff_Imo_Update();");
                    //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
        , null);
    }
}
function WH_FCL_Tariff_Imo_Update() {
    debugger;

    if (!ValidateForm("form", "WH_FCL_TariffImoModal")) {
        strMissingFields = WH_FCL_Tariff_Imo_GetMissingFields();
        swal("You are missing:", strMissingFields);
    }
    else { //start Inserting Procedure
        FadePageCover(true);
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var thedate = now.getFullYear() + "-" + (month) + "-" + (day);
        var pParametersWithValues = {
            pID: $("#hIDDImo").val(),
            pWH_FCL_TariffID: $("#hID").val(),
            pImoClassNo: $("#txtImoClassNo").val(),
            pImoRate: $("#txtImoRate").val()
            //LoadWithPaging Parameters
                , pWhereClauseWH_FCL_Tariff_Imo: WH_FCL_Tariff_Imo_GetWhereClause()
                , pPageSize: $('#select-page-size').val()
                , pPageNumber: 1
                , pOrderBy: "ID DESC"


        };
        //CallPOSTFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Imo_Update", pParametersWithValues
        CallPOSTFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Imo_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    //$("#hID").val(pData[1]); //pBillID
                    WH_FCL_Tariff_Imo_BindTableRows(JSON.parse(pData[2])); //returned rows
                    $("#spn-total-count").text(pData[3]); //_RowCount
                    swal("Success", "Saved successfully.");
                    $("#btnSaveDSTCT").attr("onclick", "WH_FCL_Tariff_Imo_Update();");
                    //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
        , null);
    }
}
function WH_FCL_Tariff_Imo_DeleteList() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblWH_FCL_Tariff_Imo');
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
                CallGETFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Imo_DeleteList"
                    , {
                        pDeleteWH_FCL_Tariff_ImoIDs: GetAllSelectedIDsAsString('tblWH_FCL_Tariff_Imo')
                        //LoadWithPaging Parameters
                        , pWhereClauseWH_FCL_Tariff_Imo: WH_FCL_Tariff_Imo_GetWhereClause()
                        , pPageSize: $('#select-page-size').val()
                        , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                        , pOrderBy: "ID DESC"
                    }
                    , function (pData) {
                        if (!pData[0])
                            swal("Sorry", strDeleteFailMessage);
                        WH_FCL_Tariff_Imo_BindTableRows(JSON.parse(pData[1]));
                        FadePageCover(false);
                    });
            });
}
function WH_FCL_Tariff_Imo_GetMissingFields() {
    debugger;
    var strMissingFields = "";// i am sure there is at least 1 missing field isa
    var fieldCount = 0;
    //BasicData Tab
    if ($("#txtImoClassNo").val() == '')
        strMissingFields += ++fieldCount + " - Basic Data --> Imo Class No.\n";
    if ($("#txtImoRate").val() == '')
        strMissingFields += ++fieldCount + " - Basic Data --> Rate.\n";

    return strMissingFields;
}
function WH_FCL_Tariff_Imo_ResetControl(pControlID) {
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
function LoadcntrTypeImo() {
    debugger;
    //strBindTableRowsFunctionName = "ShippingOrderContainerTotals_BindTableRows";
    //strLoadWithPagingFunctionName = "/api/ShippingOrder/ShippingOrderContainerTotals_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    //LoadView("/Documentation/ShippingOrder", "div-content", function () {
    //    $.getScript(strServerURL + '/Scripts/Documentation/ShippingOrderTab/ShippingOrder.js', function () {
    var pWhereClause = "WHERE 1=1 and WH_FCL_TariffID= " + $("#hID").val();
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pPageNumberc: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy };
    //        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
    //            , function (pData) {

    //            });

    //    });
    //},
    //    function () { ShippingOrderContainerTotals_ClearAllControls(); },
    //    function () { ShippingOrderContainerTotals_DeleteList(); });
    CallGETFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Imo_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
        pControllerParameters,
        function (pData) {
            WH_FCL_Tariff_Imo_BindTableRows(JSON.parse(pData[0]))
        },
        null


        );
}
/***************************************************************************************/
/*********************************WH_FCL_Tariff_Details_Periods ***********************************/
/***************************************************************************************/
function WH_FCL_Tariff_Details_Periods_Inti(pData) {
    //ShippingOrderContainerTotals_BindTableRows(JSON.parse(pData[0]));
    //FillListFromObject(null, 2/*CodeThenName*/, "Select Container Type", "slContainerType", pData[4]);
}
function WH_FCL_Tariff_Details_Periods_BindTableRows(pTableRows) {
    debugger;

    ClearAllTableRows("tblWH_FCL_Tariff_Details_Periods");


    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
 
        $.each(pTableRows, function (i, item) {
            AppendRowtoTable("tblWH_FCL_Tariff_Details_Periods",
            ("<tr ID='Prd" + item.ID + "' ondblclick='WH_FCL_Tariff_Details_Periods_EditByDblClick(" + item.ID + ");'>"
                        + "<td class='PrdID'> <input name='Delete' id='" + item.ID + "' type='checkbox' value='" + item.ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"
                        + "<td class='Days'>" + item.Days + "</td>"
                        + "<td class='Rate'>" + item.Rate + "</td>"
                        + "<td class='PeriodOrder'>" + item.PeriodOrder + "</td>"
            + "</tr>"));
        });

    



    BindAllCheckboxonTable("tblWH_FCL_Tariff_Details_Periods", "PrdID");
    CheckAllCheckbox("HeaderDeleteWH_FCL_Tariff_Details_PeriodsID");
    HighlightText("#tblWH_FCL_Tariff_Details_Periods>tbody>tr", $("#txt-SearchPRd").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function WH_FCL_Tariff_Details_Periods_LoadingWithPaging() {
    debugger;
    var pWhereClause = WH_FCL_Tariff_Details_Periods_GetWhereClause();
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { WH_FCL_Tariff_Details_Periods_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblWH_FCL_Tariff_Details_Periods>tbody>tr", $("#txt-SearchPRd").val().trim());
}
function WH_FCL_Tariff_Details_Periods_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1    and   WH_FCL_Tariff_DetailsID= " + $("#hIDDSTCT").val();
    //if ($("#txt-SearchPRd").val().trim() != "") {
    //    pWhereClause += " AND (";
    //    pWhereClause += " [Remarks] like N'%" + $("#txt-SearchPRd").val().trim() + "%' ";
    //    pWhereClause += ")";
    //}
    return pWhereClause;
}
function WH_FCL_Tariff_Details_Periods_ClearAllControls() {
    debugger;
    ClearAll("#WH_FCL_Tariff_Details_PeriodsModal");
    $("#btnSaveDSTP").attr("onclick", "WH_FCL_Tariff_Details_Periods_Insert(false);");
    $("#btnSaveandNewDSTP").attr("onclick", "WH_FCL_Tariff_Details_Periods_Insert(true);");
    //$("#btnSaveandNew").attr("onclick", "ShippingOrder_Insert(true);");
}
function WH_FCL_Tariff_Details_Periods_EditByDblClick(pID) {
    debugger;

    ClearAll("#WH_FCL_Tariff_Details_PeriodsModal");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    jQuery("#WH_FCL_Tariff_Details_PeriodsModal").modal("show");

    var pParametersWithValues = { pWH_FCL_Tariff_Details_PeriodsIDForModal: pID };
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_Periods_LoadItem", pParametersWithValues
        , function (pData) {
            var pWH_FCL_Tariff_Details_Periods = JSON.parse(pData[0]);
            $("#hIDDSTP").val(pID);

            $("#txtWH_FCL_Tariff_DetailsID").val(pWH_FCL_Tariff_Details_Periods.WH_FCL_Tariff_DetailsID);
            $("#txtDays").val(pWH_FCL_Tariff_Details_Periods.Days);
            $("#txtRateP").val(pWH_FCL_Tariff_Details_Periods.Rate);
            $("#txtPeriodOrder").val(pWH_FCL_Tariff_Details_Periods.PeriodOrder);

            $("#btnSaveDSTP").attr("onclick", "WH_FCL_Tariff_Details_Periods_Update(false);");
            $("#btnSaveandNewDSTP").attr("onclick", "WH_FCL_Tariff_Details_Periods_Update(true);");
            FadePageCover(false);
        }
        , null);
}

function WH_FCL_Tariff_Details_Periods_Insert(PIsSaveNew) {
    debugger;
    if (!ValidateForm("form", "WH_FCL_Tariff_Details_PeriodsModal")) {
        strMissingFields = WH_FCL_Tariff_Details_Periods_GetMissingFields();
        swal("You are missing:", strMissingFields);
    }
    else { //start Inserting Procedure
        FadePageCover(true);
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var thedate = now.getFullYear() + "-" + (month) + "-" + (day);
        var pParametersWithValues;


        pParametersWithValues = {
            pID: 0,
            pWH_FCL_Tariff_DetailsID: $("#hIDDSTCT").val(),
            pDays: $("#txtDays").val(),
            pRate: $("#txtRateP").val(),
            pPeriodOrder: $("#txtPeriodOrder").val()

            //LoadWithPaging Parameters
                , pWhereClauseWH_FCL_Tariff_Details_Periods: WH_FCL_Tariff_Details_Periods_GetWhereClause()
                , pPageSize: $('#select-page-size').val()
                , pPageNumber: 1
                , pOrderBy: "ID"
        };
        //CallPOSTFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_Periods_Insert", pParametersWithValues
        CallPOSTFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_Periods_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    $("#hIDDSTP").val(pData[1]); //pBillID
                    WH_FCL_Tariff_Details_Periods_BindTableRows(JSON.parse(pData[2])); //returned rows
                    $("#spn-total-count").text(pData[3]); //_RowCount
                    swal("Success", "Saved successfully.");
                    $("#btnSaveDSTP").attr("onclick", "WH_FCL_Tariff_Details_Periods_Update();");
                    //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
        , 
                        //null
                   function () {
                       if (PIsSaveNew == true) {
                           WH_FCL_Tariff_Details_Periods_ClearAllControls();
                       }
                   }
        );

    }
}

function WH_FCL_Tariff_Details_Periods_Update(PIsSaveNew) {
    debugger;

    if (!ValidateForm("form", "WH_FCL_Tariff_Details_PeriodsModal")) {
        strMissingFields = WH_FCL_Tariff_Details_Periods_GetMissingFields();
        swal("You are missing:", strMissingFields);
    }
    else { //start Inserting Procedure
        FadePageCover(true);
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var thedate = now.getFullYear() + "-" + (month) + "-" + (day);
        var pParametersWithValues;

        pParametersWithValues = {
            pID: $("#hIDDSTP").val(),
            pWH_FCL_Tariff_DetailsID: $("#hIDDSTCT").val(),
            pDays: $("#txtDays").val(),
            pRate: $("#txtRateP").val(),
            pPeriodOrder: $("#txtPeriodOrder").val()

            //LoadWithPaging Parameters
     , pWhereClauseWH_FCL_Tariff_Details_Periods: WH_FCL_Tariff_Details_Periods_GetWhereClause()
     , pPageSize: $('#select-page-size').val()
     , pPageNumber: 1
     , pOrderBy: "ID"


        };


        //CallPOSTFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_Periods_Update", pParametersWithValues
        CallPOSTFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_Periods_Save", pParametersWithValues
        , function (pData) {
            if (pData[0]) {
                //$("#hID").val(pData[1]); //pBillID
                WH_FCL_Tariff_Details_Periods_BindTableRows(JSON.parse(pData[2])); //returned rows
                $("#spn-total-count").text(pData[3]); //_RowCount
                swal("Success", "Saved successfully.");
                $("#btnSaveDSTP").attr("onclick", "WH_FCL_Tariff_Details_Periods_Update();");
                //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
            }
            else
                swal("Sorry", "Connection failed, please try again.");
            FadePageCover(false);
        }
        , 
                //null
                   function () {
                       if (PIsSaveNew == true) {
                           WH_FCL_Tariff_Details_Periods_ClearAllControls();
                       }
                   }
        );

    }
}

function WH_FCL_Tariff_Details_Periods_DeleteList() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblWH_FCL_Tariff_Details_Periods');
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
                CallGETFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_Periods_DeleteList"
                    , {
                        pDeleteWH_FCL_Tariff_Details_PeriodsIDs: GetAllSelectedIDsAsString('tblWH_FCL_Tariff_Details_Periods')
                        //LoadWithPaging Parameters
                        , pWhereClauseWH_FCL_Tariff_Details_Periods: WH_FCL_Tariff_Details_Periods_GetWhereClause()
                        , pPageSize: $('#select-page-size').val()
                        , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                        , pOrderBy: "ID DESC"
                    }
                    , function (pData) {
                        if (!pData[0])
                            swal("Sorry", strDeleteFailMessage);
                        WH_FCL_Tariff_Details_Periods_BindTableRows(JSON.parse(pData[1]));
                        FadePageCover(false);
                    });
            });
}

function WH_FCL_Tariff_Details_Periods_GetMissingFields() {
    debugger;
    var strMissingFields = "";// i am sure there is at least 1 missing field isa
    var fieldCount = 0;
    //BasicData Tab
    if ($("#txtDays").val() == '')
        strMissingFields += ++fieldCount + " - Basic Data --> Days.\n";
    if ($("#txtRateP").val() == '')
        strMissingFields += ++fieldCount + " - Basic Data --> Rate.\n";
    if ($("#txtPeriodOrder").val() == '')
        strMissingFields += ++fieldCount + " - Basic Data --> Period Order.\n";
   
    return strMissingFields;
}

function WH_FCL_Tariff_Details_Periods_ResetControl(pControlID) {
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
function LoadcntrPeriod() {
    debugger;

    var pWhereClause = "WHERE 1=1 and WH_FCL_Tariff_DetailsID= " + $("#hIDDSTCT").val();
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pPageNumberz: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy };

    CallGETFunctionWithParameters("/api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_Periods_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
        pControllerParameters,
        function (pData) {

            WH_FCL_Tariff_Details_Periods_BindTableRows(JSON.parse(pData[0]))
        },
        null


        );
}
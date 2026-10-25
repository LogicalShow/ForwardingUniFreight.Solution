//#region M A I N   F U N C T I O N S
function WH_CSL_Tariff_Inti(pData) {
    debugger;
    WH_CSL_Tariff_BindTableRows(JSON.parse(pData[0]));
    FillListFromObject(null, 2/*Name*/, "Select Customer", "slCustomerID", pData[2]);
    FillListFromObject(null, 2/*Name*/, "Select Warehouse", "slWH_WarehouseID", pData[3]);
    FillListFromObject(null, 2/*Name*/, "Select InvoiceType", "slInvoiceType", pData[6]);
    FillListFromObject(null, 2/*Name*/, "Select Branch", "slBranchID", pData[7]);
    FillListFromObject(null, 2/*Name*/, "Select Group", "slChargeTypeGroup", pData[8]);

    FillListFromObject(null, 2/*Name*/, "Select Tax", "slTaxTypeID", pData[9]);

    if (pDefaults.IsTaxOnItems) {
        $("#slTaxTypeID").parent().addClass("hide");
    }
    //if (IsMESCOCompany)
    //{
    //    $("#slWH_WarehouseID").attr('data-required', "false");
    //    $("#slBranchID").attr('data-required', "true");
        $("#divCalcOneTimeToDay").addClass("hide");
        $("#divCommission").addClass("hide");
    //    //$("#divMinAmount").removeClass("hide");
    //    //$("#divMaxAmount").removeClass("hide");
    //}
    //else {
    //    $("#slWH_WarehouseID").attr('data-required', "true");
    //    $("#slBranchID").attr('data-required', "false");
    //    $("#divCalcOneTimeToDay").removeClass("hide");
    //    $("#divCommission").removeClass("hide");
    //    $("#divMinAmount").addClass("hide");
    //    $("#divMaxAmount").addClass("hide")
    //}


}

function WH_CSL_Tariff_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-ContainerFreightStation").parent().addClass("active");
    ClearAllTableRows("tblWH_CSL_Tariff");

    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblWH_CSL_Tariff",
            ("<tr ID='" + item.ID + "' ondblclick='WH_CSL_Tariff_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' id='" + item.ID + "' type='checkbox' value='" + item.ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"
                + "<td class='Code'>" + item.Code + "</td>"
                + "<td class='Name' style='text-transform:uppercase' >" + item.Name + "</td>"
                + "<td class='Customer'>" + (item.Customer==0?"":item.Customer) + "</td>"
                + "<td class='WareHouse'>" + (item.WareHouse==0?"":item.WareHouse) + "</td>"
                + "<td class='IsDefault'> <input type='checkbox' id='cbIsDefault" + item.ID + "' disabled='disabled' " + (item.IsDefault == true ? " checked='checked' " : "") + " /></td>"
                + "<td class='IsHold'> <input type='checkbox' id='cbIsHold" + item.ID + "' disabled='disabled' " + (item.IsHold == true ? " checked='checked' " : "") + " /></td>"
                //+ "<td class=''><a href='#WH_CSL_TariffModalCopy' data-toggle='modal' onclick='CopyTemplate(" + item.ID + ");' " + " class='btn btn-xs btn-rounded btn-lightblue' title='Edit'> <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>" + "</a></td>"


                //+ "<td class='hide'><a href='#ShippingOrderModal' data-toggle='modal' onclick='ShippingOrder_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                ///////////////sherif
                //+ "<td class=''><a href='#' data-toggle='modal' onclick='InvoiceTemplate_Print(" + item.ID + ");' " + printControlsText + "</a></td>"
                + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblWH_CSL_Tariff", "ID");
    CheckAllCheckbox("HeaderDeleteWH_CSL_TariffID");
    HighlightText("#tblWH_CSL_Tariff>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function WH_CSL_Tariff_LoadingWithPaging() {
    debugger;
    var pWhereClause = WH_CSL_Tariff_GetWhereClause();
    var pOrderBy = "ID ASC";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { WH_CSL_Tariff_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblWH_CSL_Tariff>tbody>tr", $("#txt-Search").val().trim());
}

function WH_CSL_Tariff_GetWhereClause() {
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

function WH_CSL_Tariff_ClearAllControls() {
    debugger;
    ClearAll("#WH_CSL_TariffModal");
    $("#liWH_CSL_Tariff").siblings().removeClass("active");

    $("#divWH_CSL_Tariff").siblings().removeClass("active");
    $("#divWH_CSL_Tariff").addClass("active");


    $("#btnSave").attr("onclick", "WH_CSL_Tariff_Insert();");
    //$("#btnSaveandNew").attr("onclick", "ShippingOrder_Insert(true);");
    $("#tabStrTariffItem").hide();
    $("#tabStrTariffImo").hide();
    $("#slCustomerID").removeAttr("disabled");
    jQuery("#WH_CSL_TariffModal").modal("show");
}

function WH_CSL_Tariff_EditByDblClick(pID) {
    debugger;

    ClearAll("#WH_CSL_TariffModal");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    //to quickly empty tables
    ////////$("#tblShippingOrderContainer tbody").html("");
    ////////$("#tblRORO tbody").html("");
    ////////$("#tblFreight tbody").html("");

    $("#liBasicData").siblings().removeClass("active");
    $("#liBasicData").addClass("active");
    $("#divBasicData").siblings().removeClass("active");
    $("#divBasicData").addClass("active");
    jQuery("#WH_CSL_TariffModal").modal("show");

    var pParametersWithValues = { pWHFCLTariffIDForModal: pID };
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_LoadItem", pParametersWithValues
        , function (pData) {
            var pWH_CSL_Tariff = JSON.parse(pData[0]);
            $("#hID").val(pID);
            $("#txtCode").val(pWH_CSL_Tariff.Code);
            $('#txtName').val(pWH_CSL_Tariff.Name);
            $("#slCustomerID").val((pWH_CSL_Tariff.CustomerID == 0 ? "" : pWH_CSL_Tariff.CustomerID));
            $("#slWH_WarehouseID").val((pWH_CSL_Tariff.WH_WarehouseID == 0 ? "" : pWH_CSL_Tariff.WH_WarehouseID));
            $("#cKIsDefault").prop('checked', pWH_CSL_Tariff.IsDefault);
            $("#cKIsHold").prop('checked', pWH_CSL_Tariff.IsHold);
            $("#cbInvoicingFromReceivable").prop('checked', pWH_CSL_Tariff.InvoicingFromReceivable);
            $("#cKIsActive").prop('checked', pWH_CSL_Tariff.IsActive);
            $('#dtpValidFromTo').val(ConvertDateFormat(GetDateWithFormatMDY(pWH_CSL_Tariff.ValidFromTo)));
            $("#slInvoiceType").val(pWH_CSL_Tariff.InvoiceTypeID);
            $("#slBranchID").val((pWH_CSL_Tariff.BranchID == 0 ? "" : pWH_CSL_Tariff.BranchID));
            $("#slChargeTypeGroup").val((pWH_CSL_Tariff.ChargeTypeGroupID > 0 ? pWH_CSL_Tariff.ChargeTypeGroupID : 0));
            $("#slTaxTypeID").val((pWH_CSL_Tariff.TaxTypeID == 0 ? "" : pWH_CSL_Tariff.TaxTypeID));

            $("#btnSave").attr("onclick", "WH_CSL_Tariff_Update();");
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

function WH_CSL_Tariff_Insert() {
    debugger;
    if (!ValidateForm("form", "WH_CSL_TariffModal")) {
        strMissingFields = WH_CSL_Tariff_GetMissingFields();
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
            pInvoicingFromReceivable: $("#cbInvoicingFromReceivable").prop('checked'),
            pValidFromTo: ConvertDateFormat($("#dtpValidFromTo").val()),
            pInvoiceTypeID : ($("#slInvoiceType").val() == 0 || $("#slInvoiceType").val() == null ? 0 : $("#slInvoiceType").val()) ,
            pBranchID: $("#slBranchID").val(),
            pChargeTypeGroupID: $("#slChargeTypeGroup").val() > 0 ? $("#slChargeTypeGroup").val():0
            //LoadWithPaging Parameters
            , pWhereClauseWH_CSL_Tariff: WH_CSL_Tariff_GetWhereClause()
            , pPageSize: $('#select-page-size').val()
            , pPageNumber: 1
            , pOrderBy: "ID ASC"
            , pTaxTypeID: CheckValueIsValidInput("#slTaxTypeID") ? $("#slTaxTypeID").val() : 0
        };
        //CallPOSTFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Insert", pParametersWithValues
        CallPOSTFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    $("#hID").val(pData[1]); //pBillID
                    WH_CSL_Tariff_BindTableRows(JSON.parse(pData[2])); //returned rows
                    $("#spn-total-count").text(pData[3]); //_RowCount
                    $("#txtCode").val(pData[4]);
                    swal("Success", "Saved successfully.");
                    $("#btnSave").attr("onclick", "WH_CSL_Tariff_Update();");
                    //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
                }
                else {
                    if (pData[5])
                        swal("Sorry", "Duplicated Default Tarrif.");
                    else
                        swal("Sorry", "Connection failed, please try again.");
                }
                FadePageCover(false);
                $("#tabStrTariffItem").show();
                $("#tabStrTariffImo").show();
            }
            , null);

    }
}

function WH_CSL_Tariff_Update() {
    debugger;

    if (!ValidateForm("form", "WH_CSL_TariffModal")) {
        strMissingFields = WH_CSL_Tariff_GetMissingFields();
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
            pInvoicingFromReceivable: $("#cbInvoicingFromReceivable").prop('checked'),
            pValidFromTo: ConvertDateFormat($("#dtpValidFromTo").val()),
            pInvoiceTypeID: ($("#slInvoiceType").val() == 0 || $("#slInvoiceType").val() == null ? 0 : $("#slInvoiceType").val()),
            pBranchID: $("#slBranchID").val(),
            pChargeTypeGroupID: $("#slChargeTypeGroup").val() > 0 ? $("#slChargeTypeGroup").val() : 0

            //LoadWithPaging Parameters
            , pWhereClauseWH_CSL_Tariff: WH_CSL_Tariff_GetWhereClause()
            , pPageSize: $('#select-page-size').val()
            , pPageNumber: 1
            , pOrderBy: "ID ASC"
            , pTaxTypeID: CheckValueIsValidInput("#slTaxTypeID") ? $("#slTaxTypeID").val() : 0
        };
        //CallPOSTFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Update", pParametersWithValues
        CallPOSTFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    //$("#hID").val(pData[1]); //pBillID
                    WH_CSL_Tariff_BindTableRows(JSON.parse(pData[2])); //returned rows
                    $("#spn-total-count").text(pData[3]); //_RowCount
                    swal("Success", "Saved successfully.");
                    $("#btnSave").attr("onclick", "WH_CSL_Tariff_Update();");
                    //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
                    $("#tabStrTariffItem").show();
                    $("#tabStrTariffImo").show();
                }
                else {
                    if (pData[5]) 
                        swal("Sorry", "Duplicated Default Tarrif.");
                    else
                        swal("Sorry", "Connection failed, please try again.");
                }
                FadePageCover(false);
            }
            , null);

    }
}

function WH_CSL_Tariff_DeleteList() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblWH_CSL_Tariff');
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
                CallGETFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_DeleteList"
                    , {
                        pDeleteWH_CSL_TariffIDs: GetAllSelectedIDsAsString('tblWH_CSL_Tariff')
                        //LoadWithPaging Parameters
                        , pWhereClauseWH_CSL_Tariff: WH_CSL_Tariff_GetWhereClause()
                        , pPageSize: $('#select-page-size').val()
                        , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                        , pOrderBy: "ID ASC"
                    }
                    , function (pData) {
                        if (!pData[0])
                            swal("Sorry", strDeleteFailMessage);
                        WH_CSL_Tariff_BindTableRows(JSON.parse(pData[1]));
                        FadePageCover(false);
                    });
            });
}

function WH_CSL_Tariff_GetMissingFields() {
    debugger;
    var strMissingFields = "";// i am sure there is at least 1 missing field isa
    var fieldCount = 0;
    //BasicData Tab
    //if ($("#txtCode").val() == '')
    //    strMissingFields += ++fieldCount + " - Tariff Data --> Code.\n";
    if ($("#txtName").val() == '')
        strMissingFields += ++fieldCount + " - Tariff Data --> Name.\n";
    if ($("#dtpValidFromTo").val().toString().trim() == '')
        strMissingFields += ++fieldCount + " - Tariff Data --> Valid To.\n";

    if (($("#slWH_WarehouseID").val() == 0 || $("#slWH_WarehouseID").val() == null) && IsMESCOCompany == false)
        strMissingFields += ++fieldCount + " - Tariff Data --> Warehouse.\n";

    if (($("#slBranchID").val() == 0 || $("#slBranchID").val() == null) && IsMESCOCompany == true)
        strMissingFields += ++fieldCount + " - Tariff Data --> BranchID.\n";

    if ($("#slInvoiceType").val() == 0 || $("#slInvoiceType").val() == null)
        strMissingFields += ++fieldCount + " - Tariff Data --> Invoice Type.\n";
    return strMissingFields;
}

function WH_CSL_Tariff_ResetControl(pControlID) {
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
//#endregion

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

//#region WH_CSL_Tariff_Details
function WH_CSL_Tariff_Details_Inti(pData) {
    //ShippingOrderContainerTotals_BindTableRows(JSON.parse(pData[0]));
    debugger;
    FillListFromObject(null, 2/*CodeThenName*/, "Select Charge Type", "slChargeTypesID", pData[4]);
    FillListFromObject(null, 2/*CodeThenName*/, "Select Calculation Type", "slCalcTypesID", pData[5]);
}
function WH_CSL_Tariff_Details_BindTableRows(pTableRows) {
    debugger;

    ClearAllTableRows("tblWH_CSL_Tariff_Details");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblWH_CSL_Tariff_Details",
            ("<tr ID='Item" + item.ID + "' ondblclick='WH_CSL_Tariff_Details_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ItemID'> <input " + "disabled='disabled'" + " type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='ChargeType'>" + item.ChargeType + "</td>"
                + "<td class='Rate'>" + item.Rate + "</td>"
                + "<td class='CalcType'>" + (item.CalcType==0?"":item.CalcType) + "</td>"
                + "<td class='CalculatedAmount'>" + item.CalculatedAmount + "</td>"
                + "<td class='Commission'>" + item.Commission + "</td>"
                //+ "<td class='hide'><a href='#WH_CSL_Tariff_DetailsModal' data-toggle='modal' onclick='WH_CSL_Tariff_Details_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "</tr>"));
    });
    BindAllCheckboxonTable("tblWH_CSL_Tariff_Details", "ItemID");
    CheckAllCheckbox("HeaderDeleteWH_CSL_Tariff_DetailsID");
    HighlightText("#tblWH_CSL_Tariff_Details>tbody>tr", $("#txt-SearchItem").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function WH_CSL_Tariff_Details_LoadingWithPaging() {
    debugger;
    //strLoadWithPagingFunctionName = "/api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    var pWhereClause = WH_CSL_Tariff_Details_GetWhereClause();
    var pOrderBy = "ID ASC";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { WH_CSL_Tariff_Details_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblWH_CSL_Tariff_Details>tbody>tr", $("#txt-SearchItem").val().trim());
}
function WH_CSL_Tariff_Details_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1    and   WH_CSL_TariffID= " + $("#hID").val();
    if ($("#txt-SearchItem").val().trim() != "") {
        pWhereClause += " AND (";
        pWhereClause += " [ChargeType] like N'%" + $("#txt-SearchItem").val().trim() + "%' ";
        pWhereClause += " [Rate] =" + $("#txt-SearchItem").val().trim();
        pWhereClause += " [CalcType] like N'%" + $("#txt-SearchItem").val().trim() + "%' ";
        pWhereClause += " [CalculatedAmount] =" + $("#txt-SearchItem").val().trim();
        pWhereClause += " [Commission] =" + $("#txt-SearchItem").val().trim();
        pWhereClause += ")";
    }

    //if ($("#cbHideApprovedVoyages").prop("checked"))
    //    pWhereClause += " AND IsApproved=0 ";
    return pWhereClause;
}
function WH_CSL_Tariff_Details_ClearAllControls() {
    debugger;
    ClearAll("#WH_CSL_Tariff_DetailsModal");
    $("#btnSaveDSTCT").attr("onclick", "WH_CSL_Tariff_Details_Insert();");
    //$("#btnSaveandNew").attr("onclick", "ShippingOrder_Insert(true);");
    $("#WH_CSL_Tariff_Details_PeriodsModal").hide();
    LoadcntrPeriod();
    $("#txtCalculatedAmount").val(100);
    $("#txtRate").val(0);
    jQuery("#WH_CSL_Tariff_DetailsModal").modal("show");
}
function WH_CSL_Tariff_Details_EditByDblClick(pID) {
    debugger;

    ClearAll("#WH_CSL_Tariff_DetailsModal");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    jQuery("#WH_CSL_Tariff_DetailsModal").modal("show");

    var pParametersWithValues = { pWH_CSL_Tariff_DetailsIDForModal: pID };
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_LoadItem", pParametersWithValues
        , function (pData) {
            var pWH_CSL_Tariff_Details = JSON.parse(pData[0]);
            $("#hIDDSTCT").val(pID);

            $("#slChargeTypesID").val(pWH_CSL_Tariff_Details.ChargeTypesID);
            $("#txtRate").val(pWH_CSL_Tariff_Details.Rate);
            $("#slCalcTypesID").val((pWH_CSL_Tariff_Details.CalcTypesID==0?"":pWH_CSL_Tariff_Details.CalcTypesID));
            $("#txtCalculatedAmount").val(pWH_CSL_Tariff_Details.CalculatedAmount);
            $("#txtCommission").val(pWH_CSL_Tariff_Details.Commission);
            $("#cKisCalcOneTimeToDay").prop('checked', pWH_CSL_Tariff_Details.isCalcOneTimeToDay);
            $("#cKApplayIMOTariff").prop('checked', pWH_CSL_Tariff_Details.ApplayIMOTariff);
            //$("#txtRemarksDSTCT").val(pWH_CSL_Tariff_Details.PowerSupplyTariffValue);
            $("#txtMinAmount").val(pWH_CSL_Tariff_Details.MinAmount);
            $("#txtMaxAmount").val(pWH_CSL_Tariff_Details.MaxAmount);

            $("#btnSaveDSTCT").attr("onclick", "WH_CSL_Tariff_Details_Update();");
            FadePageCover(false);
            $("#tabWH_CSL_Tariff_Details_Periods").show();
        }
        //, null
        , function () { LoadcntrPeriod(); }
    );
}
function WH_CSL_Tariff_Details_Insert() {
    debugger;
    if (!ValidateForm("form", "WH_CSL_Tariff_DetailsModal")) {
        strMissingFields = WH_CSL_Tariff_Details_GetMissingFields();
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
            pWH_CSL_TariffID: $("#hID").val(),
            pChargeTypesID: $("#slChargeTypesID").val(),
            pRate: $("#txtRate").val(),
            pCalcTypesID: $("#slCalcTypesID").val(),
            pCalculatedAmount: $("#txtCalculatedAmount").val(),
            pCommission: $("#txtCommission").val(),
            pisCalcOneTimeToDay: $("#cKisCalcOneTimeToDay").prop('checked'),
            pApplayIMOTariff: $("#cKApplayIMOTariff").prop('checked'),
            pMinAmount: $("#txtMinAmount").val(),
            pMaxAmount: $("#txtMaxAmount").val()
            //LoadWithPaging Parameters
            , pWhereClauseWH_CSL_Tariff_Details: WH_CSL_Tariff_Details_GetWhereClause()
            , pPageSize: $('#select-page-size').val()
            , pPageNumber: 1
            , pOrderBy: "ID ASC"
        };
        //CallPOSTFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_Insert", pParametersWithValues
        CallPOSTFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    $("#hIDDSTCT").val(pData[1]); //pBillID
                    WH_CSL_Tariff_Details_BindTableRows(JSON.parse(pData[2])); //returned rows
                    $("#spn-total-count").text(pData[3]); //_RowCount
                    swal("Success", "Saved successfully.");
                    $("#btnSaveDSTCT").attr("onclick", "WH_CSL_Tariff_Details_Update();");
                    //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
                $("#tabWH_CSL_Tariff_Details_Periods").show();
            }
            , null);
    }
}
function WH_CSL_Tariff_Details_Update() {
    debugger;

    if (!ValidateForm("form", "WH_CSL_Tariff_DetailsModal")) {
        strMissingFields = WH_CSL_Tariff_Details_GetMissingFields();
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
            pWH_CSL_TariffID: $("#hID").val(),
            pChargeTypesID: $("#slChargeTypesID").val(),
            pRate: $("#txtRate").val(),
            pCalcTypesID: $("#slCalcTypesID").val(),
            pCalculatedAmount: $("#txtCalculatedAmount").val(),
            pCommission: $("#txtCommission").val(),
            pisCalcOneTimeToDay: $("#cKisCalcOneTimeToDay").prop('checked'),
            pApplayIMOTariff: $("#cKApplayIMOTariff").prop('checked'),
            pMinAmount: $("#txtMinAmount").val(),
            pMaxAmount: $("#txtMaxAmount").val()
            //LoadWithPaging Parameters
            , pWhereClauseWH_CSL_Tariff_Details: WH_CSL_Tariff_Details_GetWhereClause()
            , pPageSize: $('#select-page-size').val()
            , pPageNumber: 1
            , pOrderBy: "ID ASC"


        };
        //CallPOSTFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_Update", pParametersWithValues
        CallPOSTFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    //$("#hID").val(pData[1]); //pBillID
                    WH_CSL_Tariff_Details_BindTableRows(JSON.parse(pData[2])); //returned rows
                    $("#spn-total-count").text(pData[3]); //_RowCount
                    swal("Success", "Saved successfully.");
                    $("#btnSaveDSTCT").attr("onclick", "WH_CSL_Tariff_Details_Update();");
                    //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
                    $("#tabWH_CSL_Tariff_Details_Periods").show();
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}
function WH_CSL_Tariff_Details_DeleteList() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblWH_CSL_Tariff_Details');
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
                CallGETFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_DeleteList"
                    , {
                        pDeleteWH_CSL_Tariff_DetailsIDs: GetAllSelectedIDsAsString('tblWH_CSL_Tariff_Details')
                        //LoadWithPaging Parameters
                        , pWhereClauseWH_CSL_Tariff_Details: WH_CSL_Tariff_Details_GetWhereClause()
                        , pPageSize: $('#select-page-size').val()
                        , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                        , pOrderBy: "ID ASC"
                    }
                    , function (pData) {
                        if (!pData[0])
                            swal("Sorry", strDeleteFailMessage);
                        WH_CSL_Tariff_Details_BindTableRows(JSON.parse(pData[1]));
                        FadePageCover(false);
                    });
            });
}
function WH_CSL_Tariff_Details_GetMissingFields() {
    debugger;
    var strMissingFields = "";// i am sure there is at least 1 missing field isa
    var fieldCount = 0;
    //BasicData Tab
    if ($("#slChargeTypesID").val() == 0 || $("#slChargeTypesID").val() == null)
        strMissingFields += ++fieldCount + " - Basic Data --> Charge Types.\n";

    if ($("#slCalcTypesID").val() == 0 || $("#slCalcTypesID").val() == null)
        strMissingFields += ++fieldCount + " - Basic Data --> Calculation Type.\n";

    if ($("#txtRate").val() == '')
        strMissingFields += ++fieldCount + " - Basic Data --> Rate.\n";

    return strMissingFields;
}
function WH_CSL_Tariff_Details_ResetControl(pControlID) {
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
    var pWhereClause = "WHERE 1=1 and WH_CSL_TariffID= " + $("#hID").val();
    var pOrderBy = "ID ASC";
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
    CallGETFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
        pControllerParameters,
        function (pData) {
            WH_CSL_Tariff_Details_BindTableRows(JSON.parse(pData[0]))
        },
        null


    );
}
function FunGetCalcTypesID() {
    debugger;
    GetCalcTypesID("/api/WH_CSL_Tariffs/GetCalcTypesIDCSL", "ID", "Name", "#slCalcTypesID", "  where ChargeTypes.ID = " + $("#slChargeTypesID").val());
}

function GetCalcTypesID(FunUrl, ID_Name, Item_Name, Selected_ID, WhereClause) {
    debugger;
    $.ajax({
        type: "GET",
        url: strServerURL + FunUrl,
        data: { WhereClause: WhereClause },
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
//#endregion

//#region WH_CSL_Tariff_Imo
function WH_CSL_Tariff_Imo_Inti(pData) {
    //ShippingOrderContainerTotals_BindTableRows(JSON.parse(pData[0]));
    debugger;
    //FillListFromObject(null, 2/*CodeThenName*/, "Select slCharge Type", "slChargeTypesID", pData[4]);
    //FillListFromObject(null, 2/*CodeThenName*/, "Select Container Type", "slContainerTypesID", pData[5]);
}
function WH_CSL_Tariff_Imo_BindTableRows(pTableRows) {
    debugger;

    ClearAllTableRows("tblWH_CSL_Tariff_Imo");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblWH_CSL_Tariff_Imo",
            ("<tr ID='Item" + item.ID + "' ondblclick='WH_CSL_Tariff_Imo_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ItemID'> <input name='Delete' id='" + item.ID + "' type='checkbox' value='" + item.ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"
                + "<td class='ImoClassNo'>" + item.ImoClassNo + "</td>"
                + "<td class='ImoRate'>" + item.ImoRate + "</td>"
                //+ "<td class='hide'><a href='#WH_CSL_TariffImoModal' data-toggle='modal' onclick='WH_CSL_Tariff_Imo_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "</tr>"));
    });
    BindAllCheckboxonTable("tblWH_CSL_Tariff_Imo", "ItemID");
    CheckAllCheckbox("HeaderDeleteWH_CSL_Tariff_ImoID");
    HighlightText("#tblWH_CSL_Tariff_Imo>tbody>tr", $("#txt-SearchItem").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function WH_CSL_Tariff_Imo_LoadingWithPaging() {
    debugger;
    //strLoadWithPagingFunctionName = "/api/WH_CSL_Tariffs/WH_CSL_Tariff_Imo_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    var pWhereClause = WH_CSL_Tariff_Imo_GetWhereClause();
    var pOrderBy = "ID ASC";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { WH_CSL_Tariff_Imo_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblWH_CSL_Tariff_Imo>tbody>tr", $("#txt-SearchItem").val().trim());
}
function WH_CSL_Tariff_Imo_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1    and   WH_CSL_TariffID= " + $("#hID").val();
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
function WH_CSL_Tariff_Imo_ClearAllControls() {
    debugger;
    ClearAll("#WH_CSL_TariffImoModal");
    $("#btnSaveImo").attr("onclick", "WH_CSL_Tariff_Imo_Insert();");
    //$("#btnSaveandNew").attr("onclick", "ShippingOrder_Insert(true);");
    jQuery("#WH_CSL_TariffImoModal").modal("show");
}
function WH_CSL_Tariff_Imo_EditByDblClick(pID) {
    debugger;

    ClearAll("#WH_CSL_TariffImoModal");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    jQuery("#WH_CSL_TariffImoModal").modal("show");

    var pParametersWithValues = { pWH_CSL_Tariff_ImoIDForModal: pID };
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Imo_LoadItem", pParametersWithValues
        , function (pData) {
            var pWH_CSL_Tariff_Imo = JSON.parse(pData[0]);
            $("#hIDDImo").val(pID);

            $("#txtImoClassNo").val(pWH_CSL_Tariff_Imo.ImoClassNo);
            $("#txtImoRate").val(pWH_CSL_Tariff_Imo.ImoRate);
            //$("#txtRemarksDSTCT").val(pWH_CSL_Tariff_Imo.PowerSupplyTariffValue);

            $("#btnSaveImo").attr("onclick", "WH_CSL_Tariff_Imo_Update();");
            FadePageCover(false);
        }
        //, null
        , function () { LoadcntrPeriod(); }
    );
}
function WH_CSL_Tariff_Imo_Insert() {
    debugger;
    if (!ValidateForm("form", "WH_CSL_TariffImoModal")) {
        strMissingFields = WH_CSL_Tariff_Imo_GetMissingFields();
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
            pWH_CSL_TariffID: $("#hID").val(),
            pImoClassNo: $("#txtImoClassNo").val(),
            pImoRate: $("#txtImoRate").val()
            //LoadWithPaging Parameters
            , pWhereClauseWH_CSL_Tariff_Imo: WH_CSL_Tariff_Imo_GetWhereClause()
            , pPageSize: $('#select-page-size').val()
            , pPageNumber: 1
            , pOrderBy: "ID ASC"
        };
        //CallPOSTFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Imo_Insert", pParametersWithValues
        CallPOSTFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Imo_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    $("#hIDDImo").val(pData[1]); //pBillID
                    WH_CSL_Tariff_Imo_BindTableRows(JSON.parse(pData[2])); //returned rows
                    $("#spn-total-count").text(pData[3]); //_RowCount
                    swal("Success", "Saved successfully.");
                    $("#btnSaveImo").attr("onclick", "WH_CSL_Tariff_Imo_Update();");
                    //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}
function WH_CSL_Tariff_Imo_Update() {
    debugger;

    if (!ValidateForm("form", "WH_CSL_TariffImoModal")) {
        strMissingFields = WH_CSL_Tariff_Imo_GetMissingFields();
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
            pWH_CSL_TariffID: $("#hID").val(),
            pImoClassNo: $("#txtImoClassNo").val(),
            pImoRate: $("#txtImoRate").val()
            //LoadWithPaging Parameters
            , pWhereClauseWH_CSL_Tariff_Imo: WH_CSL_Tariff_Imo_GetWhereClause()
            , pPageSize: $('#select-page-size').val()
            , pPageNumber: 1
            , pOrderBy: "ID ASC"


        };
        //CallPOSTFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Imo_Update", pParametersWithValues
        CallPOSTFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Imo_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    //$("#hID").val(pData[1]); //pBillID
                    WH_CSL_Tariff_Imo_BindTableRows(JSON.parse(pData[2])); //returned rows
                    $("#spn-total-count").text(pData[3]); //_RowCount
                    swal("Success", "Saved successfully.");
                    $("#btnSaveDSTCT").attr("onclick", "WH_CSL_Tariff_Imo_Update();");
                    //$("#btnSaveandNew").attr("onclick", "Bill_Update();");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}
function WH_CSL_Tariff_Imo_DeleteList() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblWH_CSL_Tariff_Imo');
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
                CallGETFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Imo_DeleteList"
                    , {
                        pDeleteWH_CSL_Tariff_ImoIDs: GetAllSelectedIDsAsString('tblWH_CSL_Tariff_Imo')
                        //LoadWithPaging Parameters
                        , pWhereClauseWH_CSL_Tariff_Imo: WH_CSL_Tariff_Imo_GetWhereClause()
                        , pPageSize: $('#select-page-size').val()
                        , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                        , pOrderBy: "ID ASC"
                    }
                    , function (pData) {
                        if (!pData[0])
                            swal("Sorry", strDeleteFailMessage);
                        WH_CSL_Tariff_Imo_BindTableRows(JSON.parse(pData[1]));
                        FadePageCover(false);
                    });
            });
}
function WH_CSL_Tariff_Imo_GetMissingFields() {
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
function WH_CSL_Tariff_Imo_ResetControl(pControlID) {
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
    var pWhereClause = "WHERE 1=1 and WH_CSL_TariffID= " + $("#hID").val();
    var pOrderBy = "ID ASC";
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
    CallGETFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Imo_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
        pControllerParameters,
        function (pData) {
            WH_CSL_Tariff_Imo_BindTableRows(JSON.parse(pData[0]))
        },
        null


    );
}
//#endregion

//#region WH_CSL_Tariff_Details_Periods
function WH_CSL_Tariff_Details_Periods_Inti(pData) {
    //ShippingOrderContainerTotals_BindTableRows(JSON.parse(pData[0]));
    //FillListFromObject(null, 2/*CodeThenName*/, "Select Container Type", "slContainerType", pData[4]);
}
function WH_CSL_Tariff_Details_Periods_BindTableRows(pTableRows) {
    debugger;

    ClearAllTableRows("tblWH_CSL_Tariff_Details_Periods");


    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";

    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblWH_CSL_Tariff_Details_Periods",
            ("<tr ID='Prd" + item.ID + "' ondblclick='WH_CSL_Tariff_Details_Periods_EditByDblClick(" + item.ID + ");'>"
                + "<td class='PrdID'> <input name='Delete' id='" + item.ID + "' type='checkbox' value='" + item.ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"
                + "<td class='Days'>" + item.Days + "</td>"
                + "<td class='Rate'>" + item.Rate + "</td>"
                + "<td class='PeriodOrder'>" + item.PeriodOrder + "</td>"
                + "</tr>"));
    });





    BindAllCheckboxonTable("tblWH_CSL_Tariff_Details_Periods", "PrdID");
    CheckAllCheckbox("HeaderDeleteWH_CSL_Tariff_Details_PeriodsID");
    HighlightText("#tblWH_CSL_Tariff_Details_Periods>tbody>tr", $("#txt-SearchPRd").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function WH_CSL_Tariff_Details_Periods_LoadingWithPaging() {
    debugger;
    var pWhereClause = WH_CSL_Tariff_Details_Periods_GetWhereClause();
    var pOrderBy = "ID ASC";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { WH_CSL_Tariff_Details_Periods_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblWH_CSL_Tariff_Details_Periods>tbody>tr", $("#txt-SearchPRd").val().trim());
}
function WH_CSL_Tariff_Details_Periods_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1    and   WH_CSL_Tariff_DetailsID= " + $("#hIDDSTCT").val();
    //if ($("#txt-SearchPRd").val().trim() != "") {
    //    pWhereClause += " AND (";
    //    pWhereClause += " [Remarks] like N'%" + $("#txt-SearchPRd").val().trim() + "%' ";
    //    pWhereClause += ")";
    //}
    return pWhereClause;
}
function WH_CSL_Tariff_Details_Periods_ClearAllControls() {
    debugger;
    ClearAll("#WH_CSL_Tariff_Details_PeriodsModal");
    $("#btnSaveDSTP").attr("onclick", "WH_CSL_Tariff_Details_Periods_Insert(false);");
    $("#btnSaveandNewDSTP").attr("onclick", "WH_CSL_Tariff_Details_Periods_Insert(true);");
}
function WH_CSL_Tariff_Details_Periods_EditByDblClick(pID) {
    debugger;

    ClearAll("#WH_CSL_Tariff_Details_PeriodsModal");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    jQuery("#WH_CSL_Tariff_Details_PeriodsModal").modal("show");

    var pParametersWithValues = { pWH_CSL_Tariff_Details_PeriodsIDForModal: pID };
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_Periods_LoadItem", pParametersWithValues
        , function (pData) {
            var pWH_CSL_Tariff_Details_Periods = JSON.parse(pData[0]);
            $("#hIDDSTP").val(pID);

            $("#txtWH_CSL_Tariff_DetailsID").val(pWH_CSL_Tariff_Details_Periods.WH_CSL_Tariff_DetailsID);
            $("#txtDays").val(pWH_CSL_Tariff_Details_Periods.Days);
            $("#txtRateP").val(pWH_CSL_Tariff_Details_Periods.Rate);
            $("#txtPeriodOrder").val(pWH_CSL_Tariff_Details_Periods.PeriodOrder);

            $("#btnSaveDSTP").attr("onclick", "WH_CSL_Tariff_Details_Periods_Update(false);");
            $("#btnSaveandNewDSTP").attr("onclick", "WH_CSL_Tariff_Details_Periods_Update(true);");

            FadePageCover(false);
        }
        , null);
}
function WH_CSL_Tariff_Details_Periods_Insert(PIsSaveNew) {
    debugger;
    if (!ValidateForm("form", "WH_CSL_Tariff_Details_PeriodsModal")) {
        strMissingFields = WH_CSL_Tariff_Details_Periods_GetMissingFields();
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
            pWH_CSL_Tariff_DetailsID: $("#hIDDSTCT").val(),
            pDays: $("#txtDays").val(),
            pRate: $("#txtRateP").val(),
            pPeriodOrder: $("#txtPeriodOrder").val()

            //LoadWithPaging Parameters
            , pWhereClauseWH_CSL_Tariff_Details_Periods: WH_CSL_Tariff_Details_Periods_GetWhereClause()
            , pPageSize: $('#select-page-size').val()
            , pPageNumber: 1
            , pOrderBy: "ID"
        };
        //CallPOSTFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_Periods_Insert", pParametersWithValues
        CallPOSTFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_Periods_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    $("#hIDDSTP").val(pData[1]); //pBillID
                    WH_CSL_Tariff_Details_Periods_BindTableRows(JSON.parse(pData[2])); //returned rows
                    $("#spn-total-count").text(pData[3]); //_RowCount
                    swal("Success", "Saved successfully.");
                    $("#btnSaveDSTP").attr("onclick", "WH_CSL_Tariff_Details_Periods_Update(false);");
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
                    WH_CSL_Tariff_Details_Periods_ClearAllControls();
                }
            }
        );

    }
}
function WH_CSL_Tariff_Details_Periods_Update(PIsSaveNew) {
    debugger;

    if (!ValidateForm("form", "WH_CSL_Tariff_Details_PeriodsModal")) {
        strMissingFields = WH_CSL_Tariff_Details_Periods_GetMissingFields();
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
            pWH_CSL_Tariff_DetailsID: $("#hIDDSTCT").val(),
            pDays: $("#txtDays").val(),
            pRate: $("#txtRateP").val(),
            pPeriodOrder: $("#txtPeriodOrder").val()

            //LoadWithPaging Parameters
            , pWhereClauseWH_CSL_Tariff_Details_Periods: WH_CSL_Tariff_Details_Periods_GetWhereClause()
            , pPageSize: $('#select-page-size').val()
            , pPageNumber: 1
            , pOrderBy: "ID"


        };


        //CallPOSTFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_Periods_Update", pParametersWithValues
        CallPOSTFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_Periods_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    //$("#hID").val(pData[1]); //pBillID
                    WH_CSL_Tariff_Details_Periods_BindTableRows(JSON.parse(pData[2])); //returned rows
                    $("#spn-total-count").text(pData[3]); //_RowCount
                    swal("Success", "Saved successfully.");
                    $("#btnSaveDSTP").attr("onclick", "WH_CSL_Tariff_Details_Periods_Update(false);");
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
                    WH_CSL_Tariff_Details_Periods_ClearAllControls();
                }
            }
        );

    }
}
function WH_CSL_Tariff_Details_Periods_DeleteList() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblWH_CSL_Tariff_Details_Periods');
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
                CallGETFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_Periods_DeleteList"
                    , {
                        pDeleteWH_CSL_Tariff_Details_PeriodsIDs: GetAllSelectedIDsAsString('tblWH_CSL_Tariff_Details_Periods')
                        //LoadWithPaging Parameters
                        , pWhereClauseWH_CSL_Tariff_Details_Periods: WH_CSL_Tariff_Details_Periods_GetWhereClause()
                        , pPageSize: $('#select-page-size').val()
                        , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                        , pOrderBy: "ID ASC"
                    }
                    , function (pData) {
                        if (!pData[0])
                            swal("Sorry", strDeleteFailMessage);
                        WH_CSL_Tariff_Details_Periods_BindTableRows(JSON.parse(pData[1]));
                        FadePageCover(false);
                    });
            });
}
function WH_CSL_Tariff_Details_Periods_GetMissingFields() {
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
function WH_CSL_Tariff_Details_Periods_ResetControl(pControlID) {
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

    var pWhereClause = "WHERE 1=1 and WH_CSL_Tariff_DetailsID= " + $("#hIDDSTCT").val();
    var pOrderBy = "ID ASC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pPageNumberz: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy };

    CallGETFunctionWithParameters("/api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_Periods_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
        pControllerParameters,
        function (pData) {

            WH_CSL_Tariff_Details_Periods_BindTableRows(JSON.parse(pData[0]))
        },
        null


    );
}
//#endregion

function InvoicingFromReceivable_Change(elm) {
    if ($(elm).is(':checked')) {
        $('#tblWH_CSL_Tariff_Details tbody').html('');
        $('#tabStrTariffItem a').prop('disabled', true);
    }
    else {
        $('#tabStrTariffItem a').prop('disabled', false);
    }
}
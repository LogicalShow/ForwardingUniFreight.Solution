//this file is for both Packages and containers depending wether FCL or LCL, .......
function QuotationContainersAndPackages_BindTableRows(pQuotationContainersAndPackages) {
    ClearAllTableRows("tblQuotationContainersAndPackages");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pQuotationContainersAndPackages, function (i, item) {
        debugger;
        AppendRowtoTable("tblQuotationContainersAndPackages",
        ("<tr ID='" + item.ID + "' " + (QEPac ? ("ondblclick='QuotationContainersAndPackages_EditByDblClick(" + item.ID + ");'") : "") + ">"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='Container' val='" + item.ContainerTypeID + "'>" + item.ContainerTypeCode + "</td>") : "")
                    + "<td class='Quantity'>" + item.Quantity + "</td>"
                    + ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='Package' val='" + item.PackageTypeID + "'>" + item.PackageTypeName + "</td>") : "")
                    + ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='Length'>" + item.Length + "</td>") : "")
                    + ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='Width'>" + item.Width + "</td>") : "")
                    + ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='Height'>" + item.Height + "</td>") : "")
                    + ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='Volume'>" + item.Volume + "</td>") : "")
                    + ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='VolumetricWeight'>" + item.VolumetricWeight + "</td>") : "")
                    + ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='NetWeight hide'>" + item.NetWeight + "</td>") : "")
                    + ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='GrossWeight'>" + item.GrossWeight + "</td>") : "")
                    //+ ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='ChargeableWeight'>" + item.ChargeableWeight + "</td>") : "")

                    + "<td class='hide'><a href='#EditContainerOrPackageModal' data-toggle='modal' onclick='QuotationContainersAndPackages_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ShowHidetblQuotationContainersAndPackagesHeaders();
    //ApplyPermissions();
    if (QAPac) $("#btn-SelectContainersAndPackages").removeClass("hide"); else $("#btn-SelectContainersAndPackages").addClass("hide");
    if (QDPac) $("#btn-DeleteContainerOrPackage").removeClass("hide"); else $("#btn-DeleteContainerOrPackage").addClass("hide");
    BindAllCheckboxonTable("tblQuotationContainersAndPackages", "ID", "cb-CheckAll-QuotationContainersAndPackages");
    CheckAllCheckbox("HeaderDeleteQuotationContainersAndPackagesID");
    HighlightText("#tblQuotationContainersAndPackages>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    QuotationContainersAndPackages_CalculateSummary();
}
function ShowHidetblQuotationContainersAndPackagesHeaders() {
    if (($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')) && QVPac) {
        $("#stepsContainers").removeClass("hide"); // in the wizard header
        $("#ContainerTypeHeader").removeClass("hide");
        $("#PackageTypeHeader").addClass("hide");
        $("#LengthHeader").addClass("hide");
        $("#WidthHeader").addClass("hide");
        $("#HeightHeader").addClass("hide");
        $("#VolumeHeader").addClass("hide");
        $("#VolumetricWeightHeader").addClass("hide");
        //$("#NetWeightHeader").addClass("hide");
        $("#GrossWeightHeader").addClass("hide");
        $("#ChargeableWeightHeader").addClass("hide");
    }
    if (($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) && QVPac) {
        $("#stepsPackages").removeClass("hide"); // in the wizard header
        $("#ContainerTypeHeader").addClass("hide");
        $("#PackageTypeHeader").removeClass("hide");
        $("#LengthHeader").removeClass("hide");
        $("#WidthHeader").removeClass("hide");
        $("#HeightHeader").removeClass("hide");
        $("#VolumeHeader").removeClass("hide");
        $("#VolumetricWeightHeader").removeClass("hide");
        //$("#NetWeightHeader").removeClass("hide");
        $("#GrossWeightHeader").removeClass("hide");
        $("#ChargeableWeightHeader").removeClass("hide");
    }
}
function QuotationContainersAndPackages_EditByDblClick(pID) {
    jQuery("#EditContainerOrPackageModal").modal("show");
    QuotationContainersAndPackages_FillControls(pID);
}
function QuotationContainersAndPackages_LoadWithPagingWithWhereClause() {
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/QuotationContainersAndPackages/LoadWithWhereClause", " where QuotationID = " + $("#hQuotationID").val(), 0, 1000, function (pTabelRows) { QuotationContainersAndPackages_BindTableRows(pTabelRows); });
}
function QuotationContainersAndPackages_DeleteList(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblQuotationContainersAndPackages') != "")
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
            DeleteListFunction("/api/QuotationContainersAndPackages/Delete"
                , { "pQuotationContainersAndPackagesIDs": GetAllSelectedIDsAsString('tblQuotationContainersAndPackages') }
                , function () {
                    QuotationContainersAndPackages_LoadWithPagingWithWhereClause();
                });
        });
    //DeleteListFunction("/api/QuotationContainersAndPackages/Delete", { "pQuotationContainersAndPackagesIDs": GetAllSelectedIDsAsString('tblQuotationContainersAndPackages') }, function () { LoadViews("QuotationsEdit", null, $("#hQuotationID").val()); });
}
function QuotationContainersAndPackages_GetAvailableContainersAndPackages(callback) {
    debugger;
    var pStrFnName = (($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked'))
        ? "/api/PackageTypes/LoadAll"
        : "/api/ContainerTypes/LoadAll");
    var pDivName = "divSelectContainersAndPackages";
    var pCheckboxNameAttr = "cbSelectContainersAndPackages";
    var pWhereClause = "";
    pWhereClause += " WHERE IsInactive = 0 ";
    //the next 3 lines are used just incase of LCL, LTL or Air with packages
    pWhereClause += ($("#cbIsLCL").prop('checked') ? " AND IsOcean = 1 " : "")
    pWhereClause += ($("#cbIsLTL").prop('checked') ? " AND IsInland = 1 " : "")
    pWhereClause += ($("#cbIsAir").prop('checked') ? " AND IsAir = 1 " : "")

    ////the next lines are to exclude the already selected types
    //pWhereClause += " AND ( Code LIKE '%" + $("#txtSearchContainersAndPackages").val().trim().toUpperCase() + "%' OR Name LIKE '%" + $("#txtSearchContainersAndPackages").val().trim().toUpperCase() + "%') ";
    //pWhereClause += (($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) 
    //    ? " AND ID NOT IN (SELECT PackageTypeID from QuotationContainersAndPackages "
    //    : " AND ID NOT IN (SELECT ContainerTypeID from QuotationContainersAndPackages ");
    //pWhereClause += "  WHERE QuotationID = " + $("#hQuotationID").val() + ") ";

    pWhereClause += " ORDER BY Code ";
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () { HighlightText("#divSelectContainersAndPackages", $("#txtSearchContainersAndPackages").val().trim().toUpperCase()); });
    $("#btn-SearchContainersAndPackages").attr("onclick", "QuotationContainersAndPackages_GetAvailableContainersAndPackages();");
    $("#btnSelectContainersAndPackagesApply").attr("onclick", "QuotationContainersAndPackages_Insert(true);");
}
//called when pressing Apply in SelectContainersAndPackages Modal
function QuotationContainersAndPackages_Insert(pSaveandAddNew) {
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectContainersAndPackages");//returns string array of IDs
    debugger;
    if (pSelectedIDs != "")
        InsertSelectedCheckboxItems("/api/QuotationContainersAndPackages/InsertList"
            , { "pQuotationID": $("#hQuotationID").val(), "pSelectedIDs": pSelectedIDs, "pShipmentType": ($('input[name=cbShipmentType]:checked').val() == undefined ? 0 : $('input[name=cbShipmentType]:checked').val()), "pTransportType": $('input[name=cbTransportType]:checked').val() } //ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL
            , pSaveandAddNew
            , "SelectContainersAndPackagesModal" //pModalID
            , function () { QuotationContainersAndPackages_GetAvailableContainersAndPackages(); }
            , function () {
                QuotationContainersAndPackages_LoadWithPagingWithWhereClause();
            });
}
function QuotationContainersAndPackages_Update(pSaveandAddNew) {
    debugger;
    if (QuotationContainersAndPackages_Validate_Properties()) //check that decimal doesn't contain 2 decimal pts
        InsertUpdateFunction("form", "/api/QuotationContainersAndPackages/Update", {
            pID: $("#hContainerOrPackageID").val()
            , pQuotationID: $("#hQuotationID").val()
            , pContainerTypeID: ($("#txtContainerType").attr("ContainerTypeID") == undefined ? 0 : $("#txtContainerType").attr("ContainerTypeID"))
            , pPackageTypeID: ($("#txtPackageType").attr("PackageTypeID") == undefined ? 0 : $("#txtPackageType").attr("PackageTypeID"))
            , pLength: ($("#txtLength").val() == "" ? 0 : $("#txtLength").val())
            , pWidth: ($("#txtWidth").val() == "" ? 0 : $("#txtWidth").val())
            , pHeight: ($("#txtHeight").val() == "" ? 0 : $("#txtHeight").val())
            , pVolume: ($("#txtVolume").val() == "" ? 0 : $("#txtVolume").val())
            , pVolumetricWeight: ($("#txtVolumetricWeight").val() == "" ? 0 : $("#txtVolumetricWeight").val())
            , pNetWeight: ($("#txtNetWeight").val() == "" ? 0 : $("#txtNetWeight").val())
            , pGrossWeight: ($("#txtGrossWeight").val() == "" ? 0 : $("#txtGrossWeight").val())
            , pChargeableWeight: ($("#txtChargeableWeight").val() == "" ? 0 : $("#txtChargeableWeight").val())
            , pQuantity: ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ($("#txtContainersQuantity").val() == "" ? 0 : $("#txtContainersQuantity").val()) : ($("#txtPackagesQuantity").val() == "" ? 0 : $("#txtPackagesQuantity").val()))
        }, pSaveandAddNew, "EditContainerOrPackageModal", function () { QuotationContainersAndPackages_LoadWithPagingWithWhereClause(); });
    //else
    //    swal(strSorry, strCheckEntries, "warning");
}
function QuotationContainersAndPackages_FillControls(pID) {

    ClearAll("#EditContainerOrPackageModal");

    $("#hContainerOrPackageID").val(pID);
    var tr = $("#tblQuotationContainersAndPackages tr[ID='" + pID + "']");
    //var pCurrencyID = $(tr).find("td.Currency").attr('val');
    //QuotationPackageCurrency_GetList(pCurrencyID);

    $("#lblContainersAndPackageshown").html(": "
        + ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')
        ? $(tr).find("td.Container").text()
        : $(tr).find("td.Package").text()));
    //Filling divContinersInfo
    $("#txtContainerType").val($(tr).find("td.Container").text());
    $("#txtContainerType").attr("ContainerTypeID", $(tr).find("td.Container").attr("val"));
    $("#txtContainersQuantity").val($(tr).find("td.Quantity").text());
    //Filling divPackagesInfo
    $("#txtPackageType").val($(tr).find("td.Package").text());
    $("#txtPackageType").attr("PackageTypeID", $(tr).find("td.Package").attr("val"));
    $("#txtLength").val($(tr).find("td.Length").text());
    $("#txtWidth").val($(tr).find("td.Width").text());
    $("#txtHeight").val($(tr).find("td.Height").text());
    $("#txtVolume").val($(tr).find("td.Volume").text());
    $("#txtVolumetricWeight").val($(tr).find("td.VolumetricWeight").text());
    $("#txtNetWeight").val($(tr).find("td.NetWeight").text());
    $("#txtGrossWeight").val($(tr).find("td.GrossWeight").text());
    $("#txtChargeableWeight").val($(tr).find("td.ChargeableWeight").text());
    $("#txtPackagesQuantity").val($(tr).find("td.Quantity").text());

    if ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked' || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked'))) {
        $("#divContainersInfo").removeClass("hide");
        $("#divPackagesInfo").addClass("hide");
    }
    if ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) {
        $("#divContainersInfo").addClass("hide");
        $("#divPackagesInfo").removeClass("hide");
    }
    $("#btnSaveContainerOrPackage").attr("onclick", "QuotationContainersAndPackages_Update(false);");
}
function QuotationContainersAndPackages_ClearAllControls(callback) {
    ClearAll("#EditContainerOrPackageModal");
    if (callback != null && callback != undefined)
        callback();
}
function CalculateVolume() {
    debugger;
    if ($("#txtLength").val() != "" && $("#txtWidth").val() != "" && $("#txtHeight").val() != "" && $("#txtPackagesQuantity").val() != "") {
        debugger;
        $("#txtVolume").val((($("#txtLength").val() * $("#txtWidth").val() * $("#txtHeight").val() * $("#txtPackagesQuantity").val()) / 1000000).toFixed(2));
        //i am sure in the next 2 conditions that they are LCL or LTL  //if Ocean then no volumetric weight
        if ($("#cbIsAir").prop("checked"))
            $("#txtVolumetricWeight").val(($("#txtVolume").val() * 1000000 / intChgWtDividorAirConstant).toFixed(2));
        if ($("#cbIsInland").prop("checked"))
            $("#txtVolumetricWeight").val(($("#txtVolume").val() * 1000000 / intChgWtDividorInlandConstant).toFixed(2));
    }
    else {
        debugger;
        $("#txtVolume").val(0);
        $("#txtVolumetricWeight").val(0);
    }
}
function QuotationContainersAndPackages_CalculateSummary() {
    debugger;
    var decTotalGrossWeight = 0;
    var decTotalVolume = 0;
    var decTotalVolumetricWeight = 0;
    var decTotalChargeableWeight = 0;
    var decTotalQuantity = 0; //used to fill both lblNumberOfPackages and lblQuantity

    if ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) {
        $("#divPackagesSummary").removeClass("hide");
        $(".GrossWeight").each(function () {
            var value = $(this).text();
            // add only if the value is number
            if (!isNaN(value) && value.length != 0) {
                decTotalGrossWeight += parseFloat(value);
            }
        });
        $(".Volume").each(function () {
            debugger;
            var value = $(this).text();
            // add only if the value is number
            if (!isNaN(value) && value.length != 0) {
                decTotalVolume += parseFloat(value);
            }
        });
        $(".VolumetricWeight").each(function () {
            var value = $(this).text();
            // add only if the value is number
            if (!isNaN(value) && value.length != 0) {
                decTotalVolumetricWeight += parseFloat(value);
            }
        });
        $(".Quantity").each(function () {
            var value = $(this).text();
            // add only if the value is number
            if (!isNaN(value) && value.length != 0) {
                decTotalQuantity += parseFloat(value);
            }
        });
        $("#lblTotalGrossWeight").html(": " + decTotalGrossWeight.toFixed(2).toString());
        $("#lblTotalVolume").html(": " + decTotalVolume.toFixed(2).toString());
        $("#lblTotalVolumetricWeight").html(": " + decTotalVolumetricWeight.toFixed(2).toString());
        $("#lblChargeableWeight").html(": " + (decTotalVolumetricWeight > decTotalGrossWeight ? decTotalVolumetricWeight.toFixed(2).toString() : decTotalGrossWeight.toFixed(2).toString()));
        $("#lblTotalNumberOfPackages").html(": " + decTotalQuantity.toString());
    }
    else { //FCL or FTL
        $("#divContainersSummary").removeClass("hide");
        $(".Quantity").each(function () {
            var value = $(this).text();
            // add only if the value is number
            if (!isNaN(value) && value.length != 0) {
                decTotalQuantity += parseFloat(value);
            }
        });
        $("#lblTotalNumberOfContainers").html(": " + decTotalQuantity.toString());
    }
}
function QuotationContainersAndPackages_Validate_Properties() {
    var isValid = true;
    if (!CheckDecimalPlacesAndNegativeSigns('txtLength') || !CheckDecimalPlacesAndNegativeSigns('txtWidth')
         || !CheckDecimalPlacesAndNegativeSigns('txtHeight') || !CheckDecimalPlacesAndNegativeSigns('txtGrossWeight')
         || !CheckDecimalPlacesAndNegativeSigns('txtNetWeight') || !CheckDecimalPlacesAndNegativeSigns('txtVolumetricWeight')
         ) {
        isValid = false;
        swal(strSorry, "Please, Check the numbers.", "warning");
    }
    //check for containers quantity incase of FCL or FTL
    if (($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')) && ($("#txtContainersQuantity").val().trim() == "" || $("#txtContainersQuantity").val().trim() < 1)) {
        isValid = false;
        swal(strSorry, "The Quantity must be greater than 0 !", "warning");
    }
    else //Package
        if ($("#txtPackagesQuantity").val().trim() == "" || $("#txtPackagesQuantity").val().trim() < 1) {
            isValid = false;
            swal(strSorry, "The Quantity must be greater than 0 !", "warning");
        }
    return isValid;
}
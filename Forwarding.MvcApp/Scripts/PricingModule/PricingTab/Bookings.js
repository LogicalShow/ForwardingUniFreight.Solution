
function Bookings_Initialize() {
    debugger;
    UnLoadOperationsSubMenu();
    strBindTableRowsFunctionName = "Bookings_BindTableRows";
    strLoadWithPagingFunctionName = "/api/Bookings/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    LoadView("/Pricing/Bookings", "div-content", function () {
        
        
        var pOrderBy = "ID DESC";
        var pPageNumber = 1;
        var pPageSize = 10;
        var pWhereClause = "WHERE 1=1";
        var pControllerParameters = {
            pPageNumber: pPageNumber
            , pPageSize: pPageSize
            , pWhereClause: pWhereClause
            , pOrderBy: pOrderBy
        };

        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                if (pData[2] == "") {
                    Bookings_BindTableRows(JSON.parse(pData[0]));
                } else {
                    swal("Sorry", "Error Loading Data...");
                    LoadViews('Pricing');
                }
                ApplyPermissions();
                LoadCombosData();
            });
    },
        function () { Booking_ClearAllControls();  },
        function () { Bookings_DeleteList(); });
}


function Bookings_BindTableRows(pRows) {
    debugger;
    ClearAllTableRows("tblBookings");
    $.each(pRows, function (i, item) {
        debugger;
        let att = "";
        if (item.OperationID > 0) {
            att = "style='background: #23bd23d4;'";
        } else {
            att = "ondblclick='Booking_EditByDblClick(" + item.ID + ");' ";
            att += (Date.prototype.compareDates(ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), GetDateWithFormatMDY(item.ValidatedTitlesDate)) < 0 ? "style='background: #ff0000b0'" : "");
        }
        AppendRowtoTable("tblBookings",
            ("<tr ID='" + item.ID + "' " + att + " >"
                + "<td class='ID'> <input name='Delete' type='checkbox' " + (item.OperationID > 0 ? "disabled='disabled'" : "")+" value='" + item.ID + "' /></td>"
                + "<td class='ContractHolder' val='" + item.ContractHolder +"'>" + item.ContractHolderName + "</td>"
                + "<td class='BookingNumber' style='min-width: 150px;'>" + item.BookingNumber + (item.OperationID > 0 ? `</br>[${item.OperationCode}]` : "") + "</td>"
                + "<td class='POL' val='" + item.POLID + "'>" + item.POLName + "</td>"
                + "<td class='POD' val='" + item.PODID + "'>" + item.PODName + "</td>"
                + "<td class='ShippingLine' val='" + item.ShippingLineID + "'>" + item.ShippingLineName + "</td>"
                + "<td class='Customer' val='" + item.CustomerID + "'>" + item.CustomerName + "</td>"
                + "<td class='SLDate' val='" + item.SLDate + "'>" + GetFullDateTime_DD_MM_YY_ForBooking(item.SLDate) + "</td>"
                + "<td class='ValidatedTitlesDate' val='" + item.ValidatedTitlesDate + "'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ValidatedTitlesDate)) + "</td>"
                //+ "<td class='IsInactive'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                + "</tr> "));
        debugger;
    });

    BindAllCheckboxonTable("tblBookings", "ID");
    CheckAllCheckbox("ID");
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function AddNewBooking() {
    debugger;
    let data = {
        Hazmat: CheckValueIsValidInput("#slHazmat") ? $("#slHazmat").val() : "0"
        , ContractHolderID: CheckValueIsValidInput("#slContractHolder") ? $("#slContractHolder").val() : 0
        , BookingNumber: CheckValueIsValidInput("#txtBookingNumber") ? $("#txtBookingNumber").val().trim().toUpperCase() : "0"
        , CustomerID: CheckValueIsValidInput("#slCustomer") ? $("#slCustomer").val() : 0
        , POLCountryID: CheckValueIsValidInput("#slPOLCountries") ? $("#slPOLCountries").val() : 0
        , POLID: CheckValueIsValidInput("#slPOL") ? $("#slPOL").val() : 0
        , PODCountryID: CheckValueIsValidInput("#slPODCountries") ? $("#slPODCountries").val() : 0
        , PODID: CheckValueIsValidInput("#slPOD") ? $("#slPOD").val() : 0
        , ContainerType1ID: CheckValueIsValidInput("#slContainerType1") ? $("#slContainerType1").val() : 0
        , NumberOfContainers1: CheckValueIsValidInput("#txtNumberOfContainers1") ? $("#txtNumberOfContainers1").val() : 0
        , ContainerType2ID: CheckValueIsValidInput("#slContainerType2") ? $("#slContainerType2").val() : 0
        , NumberOfContainers2: CheckValueIsValidInput("#txtNumberOfContainers2") ? $("#txtNumberOfContainers2").val() : 0
        , ShippingLineID: CheckValueIsValidInput("#slShippingLine") ? $("#slShippingLine").val() : 0
        , VesselID: CheckValueIsValidInput("#slVessel") ? $("#slVessel").val() : 0
        , VoyageNumber: CheckValueIsValidInput("#txtVoyageNumber") ? $("#txtVoyageNumber").val().trim().toUpperCase() : "0"
        , WarehouseID: CheckValueIsValidInput("#slWarehouse") ? $("#slWarehouse").val() : 0
        , SLDate: CheckValueIsValidInput("#txtSlDate") ? ConvertDateFormat($("#txtSlDate").val()) : "01/01/1900"
        , SLDateOfSubmission: CheckValueIsValidInput("#txtSlDateOfSubmission") ? ConvertDateFormat($("#txtSlDateOfSubmission").val()) : "01/01/1900"
        , ValidatedTitlesDate: CheckValueIsValidInput("#txtValidatedTitles") ? ConvertDateFormat($("#txtValidatedTitles").val()) : "01/01/1900"
        , DateOfSubmission: CheckValueIsValidInput("#txtDateOfSubmission") ? ConvertDateFormat($("#txtDateOfSubmission").val()) : "01/01/1900"
        , TermCutOffDate: CheckValueIsValidInput("#txtTermCutOff") ? ConvertDateFormat($("#txtTermCutOff").val()) : "01/01/1900"
        , ETDDate: CheckValueIsValidInput("#txtETDDate") ? ConvertDateFormat($("#txtETDDate").val()) : "01/01/1900"
        , BLCheckDate: CheckValueIsValidInput("#txtBlCheckDate") ? ConvertDateFormat($("#txtBlCheckDate").val()) : "01/01/1900"
        , Comments: CheckValueIsValidInput("#txtComments") ? $("#txtComments").val() : "0"
        , Comments2: CheckValueIsValidInput("#txtComments2") ? $("#txtComments2").val() : "0"
    };
    PostInsertUpdateFunction("form", "/api/Bookings/Insert", data, false, "BookingModal", function (pData) {
        if (pData[0] == false) {
            if (pData[1].includes("duplicate"))
                swal("Sorry", "This Booking Number Already Exists");
        } else {
            Booking_LoadingWithPaging();
        }
    });
}

function Booking_ClearAllControls(callback) {
    debugger;
    ClearAll("#BookingModal");
    $("#slPOLCountries").attr("onchange", "POL_GetList();");
    $("#slPODCountries").attr("onchange", "POD_GetList();");

    $("#slContractHolder").trigger("change");
    $("#slPOLCountries").trigger("change");
    $("#slPODCountries").trigger("change");
    $("#slShippingLine").trigger("change");
    $("#slVessel").trigger("change");
    $("#slCustomer").trigger("change");

    jQuery("#BookingModal").modal("show");
    $("#txtNumberOfContainers1").attr("disabled", "disabled");
    $("#txtNumberOfContainers2").attr("disabled", "disabled");
    

    $("#btnSaveBooking").attr("onclick", "AddNewBooking();");

    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}

function POL_GetList(pID, pCountryID, pDontCallFillOtherSidePorts, pCallback) {
    debugger;
    var pWhereClause = "";
    if (pCountryID != null) //this means editing
    {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = " + pCountryID;
    }
    else //when changing the Country or Transport Type
    {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = ";
        pWhereClause += ($('#slPOLCountries option:selected').val() == null || $('#slPOLCountries option:selected').val() == ""
            ? 0 : $('#slPOLCountries option:selected').val());
    }
    pWhereClause += " and IsOcean = 1 ";
    pWhereClause += " order by Name ";
    GetListWithCodeAndNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select POL", "slPOL", pWhereClause
        , function () {
            if (pCallback != null && pCallback != undefined)
                pCallback();
        });
}
function POD_GetList(pID, pCountryID, pDontCallFillOtherSidePorts, pCallback) {
    debugger;
    var pWhereClause = "";
    if (pCountryID != null)
    {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = " + pCountryID;
    }
    else 
    {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = ";
        pWhereClause += ($('#slPODCountries option:selected').val() == null || $('#slPODCountries option:selected').val() == ""
            ? 0 : $('#slPODCountries option:selected').val());
    }
    pWhereClause += " and IsOcean = 1 ";
    pWhereClause += " order by Name ";
    GetListWithCodeAndNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select POD", "slPOD", pWhereClause, function () {
        if (pCallback != null && pCallback != undefined)
            pCallback();
    });
}



function LoadCombosData() {
    debugger;
    GetListWithName(null, "/api/Countries/LoadAll", "Select Country", "slPOLCountries", function () {
        $("#slPODCountries").html($("#slPOLCountries").html());
        $("#slPODCountries").val(null);
        $("#slPOLCountries").css({ "width": "100%" }).select2();
        $("#slPODCountries").css({ "width": "100%" }).select2();
        $("#slPOL").css({ "width": "100%" }).select2();
        $("#slPOD").css({ "width": "100%" }).select2();
    });
    GetListWithNameAndWhereClause(null, "/api/ShippingLines/LoadAll", "Select Shipping Line", "slShippingLine", " WHERE 1=1 ORDER BY Name ", function () {
        $("#slShippingLine").css({ "width": "100%" }).select2();
    });

    CallGETFunctionWithParameters("/api/Agents/LoadAllForCombo"
        , { pWhereClauseForCombo: " ORDER BY Name" }
        , function (pData) {
            FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slContractHolder", pData[0], null);
            $("#slContractHolder").css({ "width": "100%" }).select2();
        }, null);

    Select2OnlineSearch("slCustomer", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
        var query = {
            pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND Name like N'%" + params.term + "%'",
            pOrderBy: "Name",
            pDummy: false
        }
        return query;
    }, function (data) {
        var d = JSON.parse(data[0]);
        return {

            results: $.map(d, function (item) {
                return {
                    text: item.Name,
                    id: item.ID,
                    value: item.ID
                };
            })
        };
    }, 3, 2000, true, {
        id: 0,
        text: "<--Select-->"
    });

    CallGETFunctionWithParameters("/api/ContainerTypes/LoadAll"
        , { pWhereClause: " WHERE 1=1" }
        , function (pData) {
            FillListFromObject(null, 1, "<--Select-->", "slContainerType1", pData[0], function () {
                $("#slContainerType2").html($("#slContainerType1").html());
            });
        }, null);

    CallGETFunctionWithParameters("/api/Vessels/LoadAll"
        , { pWhereClause: " WHERE 1=1" }
        , function (pData) {
            FillListFromObject(null, 2, "<--Select-->", "slVessel", pData[0], function () {
                $("#slVessel").css({ "width": "100%" }).select2();
            });
        }, null);

    CallGETFunctionWithParameters("/api/Warehouse/LoadWithWhereClause"
        , { pWhereClause: " WHERE 1=1" }
        , function (pData) {
            FillListFromObject(null, 2, "<--Select-->", "slWarehouse", pData[0], null);
        }, null);

    $("#txtSlDate").datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });

    $("div[tabindex='-1']").removeAttr('tabindex');
}

function ContainerTypeChanged(pNo) {
    let val = $("#slContainerType" + pNo).val();
    if (val == "" || val == null || val == undefined) {
        $("#txtNumberOfContainers" + pNo).val("");
        $("#txtNumberOfContainers" + pNo).attr("disabled", "disabled");
        $("#txtNumberOfContainers" + pNo).attr("data-required", "false");
    } else {
        $("#txtNumberOfContainers" + pNo).removeAttr("disabled");
        $("#txtNumberOfContainers" + pNo).attr("data-required","true");
    }
}

function Booking_EditByDblClick(pID) {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/Bookings/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned", {
        pPageNumber: 1,
        pPageSize: 1,
        pWhereClause: "WHERE ID=" + pID,
        pOrderBy: "ID"
    }, function (pData) {
        if (pData[2] == "" && pData[1] == 1) {
            Booking_FillControls(JSON.parse(pData[0])[0]);
        } else {
            swal("Sorry", "Error Loading Data...");
            LoadViews('Pricing');
        }
    });
}

function Booking_FillControls(pBooking) {
    debugger;
    ClearAll("#BookingModal");
    jQuery("#BookingModal").modal("show");
    $("#txtNumberOfContainers1").attr("disabled", "disabled");
    $("#txtNumberOfContainers2").attr("disabled", "disabled");

    $("#hBookingID").val(pBooking.ID);
    $("#slHazmat").val(pBooking.Hazmat);
    $("#slContractHolder").val(pBooking.ContractHolder).trigger("change");
    $("#txtBookingNumber").val(pBooking.BookingNumber);

    if ($('#slCustomer').find("option[value='" + pBooking.CustomerID + "']").length) {
        $('#slCustomer').val(pBooking.CustomerID).trigger('change');
    } else {
        let newOption = new Option(pBooking.CustomerName, pBooking.CustomerID, true, true);
        $('#slCustomer').append(newOption).trigger('change');
    }

    $("#slPOLCountries").attr("onchange","");
    $("#slPODCountries").attr("onchange", "");
    $("#slPOLCountries").val(pBooking.POLCountryID).trigger("change");
    $("#slPODCountries").val(pBooking.PODCountryID).trigger("change");
    POL_GetList(pBooking.POLID, pBooking.POLCountryID, null, function () {
        $("#slPOL").trigger("change");
        $("#slPOLCountries").attr("onchange", "POL_GetList();");
    });
    POD_GetList(pBooking.PODID, pBooking.PODCountryID, null, function () {
        $("#slPOD").trigger("change");
        $("#slPODCountries").attr("onchange", "POD_GetList();");
    });

    $("#slContainerType1").val(pBooking.ContainerType1).trigger("change");
    $("#txtNumberOfContainers1").val(pBooking.ContainerQuantity1);
    $("#slContainerType2").val(pBooking.ContainerType2 == 0 ? "" : pBooking.ContainerType2).trigger("change");
    $("#txtNumberOfContainers2").val(pBooking.ContainerQuantity2);

    $("#slShippingLine").val(pBooking.ShippingLineID).trigger("change");
    $("#slVessel").val(pBooking.VesselID).trigger("change");
    $("#txtVoyageNumber").val(pBooking.VoyageNumber);
    $("#slWarehouse").val(pBooking.WarehouseID);

    $("#txtSlDate").val(GetFullDateTime_DD_MM_YY_ForBooking(pBooking.SLDate));

    $("#txtSlDateOfSubmission").val(GetDateWithFormatMDY(pBooking.SLDateOfSubmission) == "1/1/1900" ? "" : ConvertDateFormat(GetDateWithFormatMDY(pBooking.SLDateOfSubmission)));
    $("#txtValidatedTitles").val(GetDateWithFormatMDY(pBooking.ValidatedTitlesDate) == "1/1/1900" ? "" : ConvertDateFormat(GetDateWithFormatMDY(pBooking.ValidatedTitlesDate)));
    $("#txtDateOfSubmission").val(GetDateWithFormatMDY(pBooking.DateOfSubmission) == "1/1/1900" ? "" : ConvertDateFormat(GetDateWithFormatMDY(pBooking.DateOfSubmission)));
    $("#txtTermCutOff").val(GetDateWithFormatMDY(pBooking.TermCutOffDate) == "1/1/1900" ? "" : ConvertDateFormat(GetDateWithFormatMDY(pBooking.TermCutOffDate)));
    $("#txtETDDate").val(GetDateWithFormatMDY(pBooking.ETDDate) == "1/1/1900" ? "" : ConvertDateFormat(GetDateWithFormatMDY(pBooking.ETDDate)));
    $("#txtBlCheckDate").val(GetDateWithFormatMDY(pBooking.BLCheckDate) == "1/1/1900" ? "" : ConvertDateFormat(GetDateWithFormatMDY(pBooking.BLCheckDate)));

    $("#txtComments").val(pBooking.Comments == "0" ? "" : pBooking.Comments);
    $("#txtComments2").val(pBooking.Comments2 == "0" ? "" : pBooking.Comments2);

    FadePageCover(false);
    $("#btnSaveBooking").attr("onclick", "EditBooking(" + pBooking.ID + ");");
}

function Booking_LoadingWithPaging() {
    debugger;
    var pOrderBy = "ID DESC";
    var pPageNumber = ($("#div-Pager li.active a").text() == 0 ? 1 : $("#div-Pager li.active a").text());
    var pPageSize = $('#select-page-size').val();
    var pWhereClause = "WHERE 1=1";
    var pControllerParameters = {
        pPageNumber: pPageNumber
        , pPageSize: pPageSize
        , pWhereClause: pWhereClause
        , pOrderBy: pOrderBy
    };

    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
        , function (pData) {
            if (pData[2] == "") {
                Bookings_BindTableRows(JSON.parse(pData[0]));
            } else {
                swal("Sorry", "Error Loading Data...");
                LoadViews('Pricing');
            }
        });
}

function EditBooking(pID) {
    debugger;
    let data = {
        ID: pID
        , Hazmat: CheckValueIsValidInput("#slHazmat") ? $("#slHazmat").val() : "0"
        , ContractHolderID: CheckValueIsValidInput("#slContractHolder") ? $("#slContractHolder").val() : 0
        , BookingNumber: CheckValueIsValidInput("#txtBookingNumber") ? $("#txtBookingNumber").val().trim().toUpperCase() : "0"
        , CustomerID: CheckValueIsValidInput("#slCustomer") ? $("#slCustomer").val() : 0
        , POLCountryID: CheckValueIsValidInput("#slPOLCountries") ? $("#slPOLCountries").val() : 0
        , POLID: CheckValueIsValidInput("#slPOL") ? $("#slPOL").val() : 0
        , PODCountryID: CheckValueIsValidInput("#slPODCountries") ? $("#slPODCountries").val() : 0
        , PODID: CheckValueIsValidInput("#slPOD") ? $("#slPOD").val() : 0
        , ContainerType1ID: CheckValueIsValidInput("#slContainerType1") ? $("#slContainerType1").val() : 0
        , NumberOfContainers1: CheckValueIsValidInput("#txtNumberOfContainers1") ? $("#txtNumberOfContainers1").val() : 0
        , ContainerType2ID: CheckValueIsValidInput("#slContainerType2") ? $("#slContainerType2").val() : 0
        , NumberOfContainers2: CheckValueIsValidInput("#txtNumberOfContainers2") ? $("#txtNumberOfContainers2").val() : 0
        , ShippingLineID: CheckValueIsValidInput("#slShippingLine") ? $("#slShippingLine").val() : 0
        , VesselID: CheckValueIsValidInput("#slVessel") ? $("#slVessel").val() : 0
        , VoyageNumber: CheckValueIsValidInput("#txtVoyageNumber") ? $("#txtVoyageNumber").val().trim().toUpperCase() : "0"
        , WarehouseID: CheckValueIsValidInput("#slWarehouse") ? $("#slWarehouse").val() : 0
        , SLDate: CheckValueIsValidInput("#txtSlDate") ? ConvertDateFormat($("#txtSlDate").val()) : "01/01/1900"
        , SLDateOfSubmission: CheckValueIsValidInput("#txtSlDateOfSubmission") ? ConvertDateFormat($("#txtSlDateOfSubmission").val()) : "01/01/1900"
        , ValidatedTitlesDate: CheckValueIsValidInput("#txtValidatedTitles") ? ConvertDateFormat($("#txtValidatedTitles").val()) : "01/01/1900"
        , DateOfSubmission: CheckValueIsValidInput("#txtDateOfSubmission") ? ConvertDateFormat($("#txtDateOfSubmission").val()) : "01/01/1900"
        , TermCutOffDate: CheckValueIsValidInput("#txtTermCutOff") ? ConvertDateFormat($("#txtTermCutOff").val()) : "01/01/1900"
        , ETDDate: CheckValueIsValidInput("#txtETDDate") ? ConvertDateFormat($("#txtETDDate").val()) : "01/01/1900"
        , BLCheckDate: CheckValueIsValidInput("#txtBlCheckDate") ? ConvertDateFormat($("#txtBlCheckDate").val()) : "01/01/1900"
        , Comments: CheckValueIsValidInput("#txtComments") ? $("#txtComments").val() : "0"
        , Comments2: CheckValueIsValidInput("#txtComments2") ? $("#txtComments2").val() : "0"
    };
    PostInsertUpdateFunction("form", "/api/Bookings/Update", data, false, "BookingModal", function (pData) {
        if (pData[0] == false) {
            if (pData[1].includes("duplicate"))
                swal("Sorry", "This Booking Number Already Exists");
        } else {
            Booking_LoadingWithPaging();
        }
    });
}

function Bookings_DeleteList() {
    debugger;
    if (GetAllSelectedIDsAsString('tblBookings') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            function () {
                CallGETFunctionWithParameters("/api/Bookings/Delete", { pBookingsIDs: GetAllSelectedIDsAsString('tblBookings') }
                    , function (data) {
                        Booking_LoadingWithPaging();
                    }
                    , function () { FadePageCover(false); });
            });
}

function Bookings_onFileSelected(event, pBtnName) {
    debugger;
    var selectedFile = event.target.files[0];
    if (selectedFile != undefined) { //to handle the case of not choosing a file
        var sFilename = selectedFile.name;
        // Create A File Reader HTML5
        var reader = new FileReader();
        var result = document.getElementById("hExtractedData");
        reader.onload = function (e) {
            var data = e.target.result;
            var cfb = XLS.CFB.read(data, {
                type: 'binary'
            });
            var wb = XLS.parse_xlscfb(cfb);
            // Loop Over Each Sheet
            wb.SheetNames.forEach(function (sheetName) {
                //// Obtain The Current Row As CSV
                var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);

                if (/*GetSheetConditions(oJS)*/true) {
                    Bookings_ImportFromExcelFile(oJS, pBtnName);
                } else {
                    swal("Sorry", "Please, revise data and version of the file.");
                    $("#" + pBtnName).val("");
                }
            });
        };
        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(selectedFile);
    }
}
function Bookings_ImportFromExcelFile(pDataRows, pBtnName) {
    debugger;
    //FadePageCover(true);
    //let isHazmatEmpty = false;
    //let HazmatEmptyRowNo = 0;

    let CommentsList = "";
    let HazmatList = "";
    let ContractHolderList = "";
    let Comments2List = "";
    let BookingNoList = "";
    //let Container1List = "";
    //let Container1NoList = "";
    //let Container2List = "";
    //let Container2NoList = "";
    let Container40List = "";
    let Container45List = "";
    let POLCodeList = "";
    let PODCodeList = "";
    let ShippingLineList = "";
    let VesselList = "";
    let VoyageNumberList = "";
    let WarehouseList = "";
    let CustomerList = "";
    let SLDateList = "";
    let SLTimeList = "";
    let SLDateOfSubmissionList = "";
    let ValidatedTitlesDateList = "";
    let DateOfSubmissionList = "";
    let TermCutOffDateList = "";
    let ETDDateList = "";
    let BlCheckDateList = "";


    let BookingNoDistinct = new Set();

    for (var i = 0; i < pDataRows.length; i++) {
        if (pDataRows[i].BookingNo == undefined || pDataRows[i].BookingNo.replace(/[\, ]/g, ' ').trim() == "") {
            swal(strSorry, " Booking Number in Row No. " + pDataRows[i].__rowNum__ + " is Empty ");
            FadePageCover(false);
            return;
        } else {
            BookingNoDistinct.add(pDataRows[i].BookingNo.trim().toLowerCase());
        }
    }
    if (BookingNoDistinct.size != pDataRows.length) {
        swal(strSorry, " Booking Number Duplication in the sheet");
        FadePageCover(false);
        return;
    }

    for (var i = 0; i < pDataRows.length; i++) {

        if (pDataRows[i].Hazmat == undefined || pDataRows[i].Hazmat.replace(/[\, ]/g, ' ').trim() == "") {
            swal(strSorry, " Hazmat in Row No. " + pDataRows[i].__rowNum__ + " is Empty ");
            FadePageCover(false);
            return;
        } else if (!["hybrid", "non", "haz"].includes(pDataRows[i].Hazmat.trim().toLowerCase())) {
            swal(strSorry, " Hazmat in Row No. " + pDataRows[i].__rowNum__ + " invalid value ");
            FadePageCover(false);
            return;
        } else if (pDataRows[i].ContractHolder == undefined || pDataRows[i].ContractHolder.replace(/[\, ]/g, ' ').trim() == "") {
            swal(strSorry, " Contract Holder in Row No. " + pDataRows[i].__rowNum__ + " is Empty ");
            FadePageCover(false);
            return;
        } else if (!hasOptionWithText("slContractHolder", pDataRows[i].ContractHolder.trim())) {
            swal(strSorry, " Contract Holder in Row No. " + pDataRows[i].__rowNum__ + " - No Matching In Available Options ");
            FadePageCover(false);
            return;
        } /*else if (pDataRows[i].Container1 == undefined || pDataRows[i].Container1.replace(/[\, ]/g, ' ').trim() == "") {
            swal(strSorry, " Container 1 in Row No. " + pDataRows[i].__rowNum__ + " is Empty ");
            FadePageCover(false);
            return;
        } else if (!hasOptionWithText("slContainerType1", pDataRows[i].Container1.trim())) {
            swal(strSorry, " Container 1 in Row No. " + pDataRows[i].__rowNum__ + " - No Matching In Available Options ");
            FadePageCover(false);
            return;
        } else if (pDataRows[i].Container1No == undefined || pDataRows[i].Container1No.replace(/[\, ]/g, ' ').trim() == "" || isNaN(pDataRows[i].Container1No)) {
            swal(strSorry, " Container 1 No in Row No. " + pDataRows[i].__rowNum__ + " is Empty/Invalid ");
            FadePageCover(false);
            return;
        } else if (pDataRows[i].Container2 != undefined) {
            if ((pDataRows[i].Container2No == undefined || isNaN(pDataRows[i].Container2No))) {
                swal(strSorry, " Container 2 No in Row No. " + pDataRows[i].__rowNum__ + " is Invalid ");
                FadePageCover(false);
                return;
            } else if (!hasOptionWithText("slContainerType2", pDataRows[i].Container2.trim())) {
                swal(strSorry, " Container 2 in Row No. " + pDataRows[i].__rowNum__ + " - No Matching In Available Options ");
                FadePageCover(false);
                return;
            }
        }*/ else if (pDataRows[i].POLCode == undefined || pDataRows[i].POLCode.replace(/[\, ]/g, ' ').trim() == "") {
            swal(strSorry, " POL in Row No. " + pDataRows[i].__rowNum__ + " is Empty ");
            FadePageCover(false);
            return;
        } else if (pDataRows[i].PODCode == undefined || pDataRows[i].PODCode.replace(/[\, ]/g, ' ').trim() == "") {
            swal(strSorry, " POD in Row No. " + pDataRows[i].__rowNum__ + " is Empty ");
            FadePageCover(false);
            return;
        } else if (pDataRows[i].ShippingLine == undefined || pDataRows[i].ShippingLine.replace(/[\, ]/g, ' ').trim() == "") {
            swal(strSorry, " Shipping Line in Row No. " + pDataRows[i].__rowNum__ + " is Empty ");
            FadePageCover(false);
            return;
        } else if (!hasOptionWithText("slShippingLine", pDataRows[i].ShippingLine.trim())) {
            swal(strSorry, " Shipping Line in Row No. " + pDataRows[i].__rowNum__ + " - No Matching In Available Options ");
            FadePageCover(false);
            return;
        } else if (pDataRows[i].Vessel == undefined || pDataRows[i].Vessel.replace(/[\, ]/g, ' ').trim() == "") {
            swal(strSorry, " Vessel in Row No. " + pDataRows[i].__rowNum__ + " is Empty ");
            FadePageCover(false);
            return;
        } else if (!hasOptionWithText("slVessel", pDataRows[i].Vessel.trim())) {
            swal(strSorry, " Vessel in Row No. " + pDataRows[i].__rowNum__ + " - No Matching In Available Options ");
            FadePageCover(false);
            return;
        } else if (pDataRows[i].Voyage == undefined || pDataRows[i].Voyage.replace(/[\, ]/g, ' ').trim() == "") {
            swal(strSorry, " Voyage in Row No. " + pDataRows[i].__rowNum__ + " is Empty ");
            FadePageCover(false);
            return;
        } else if (pDataRows[i].Warehouse == undefined || pDataRows[i].Warehouse.replace(/[\, ]/g, ' ').trim() == "") {
            swal(strSorry, " Warehouse in Row No. " + pDataRows[i].__rowNum__ + " is Empty ");
            FadePageCover(false);
            return;
        } else if (!hasOptionWithText("slWarehouse", pDataRows[i].Warehouse.trim())) {
            swal(strSorry, " Warehouse in Row No. " + pDataRows[i].__rowNum__ + " - No Matching In Available Options ");
            FadePageCover(false);
            return;
        } else if (pDataRows[i].Customer == undefined || pDataRows[i].Customer.replace(/[\, ]/g, ' ').trim() == "") {
            swal(strSorry, " Customer in Row No. " + pDataRows[i].__rowNum__ + " is Empty ");
            FadePageCover(false);
            return;
        } else if (pDataRows[i].SIDate == undefined || pDataRows[i].SIDate.replace(/[\, ]/g, ' ').trim() == "") {
            swal(strSorry, " SI Date in Row No. " + pDataRows[i].__rowNum__ + " is Empty ");
            FadePageCover(false);
            return;
        } else if (!isValidDateFormat(pDataRows[i].SIDate)) {
            swal(strSorry, " SI Date in Row No. " + pDataRows[i].__rowNum__ + " is Invalid ");
            FadePageCover(false);
            return;
        } else if (pDataRows[i].SITime == undefined || pDataRows[i].SITime.replace(/[\, ]/g, ' ').trim() == "") {
            swal(strSorry, " SI Time in Row No. " + pDataRows[i].__rowNum__ + " is Empty ");
            FadePageCover(false);
            return;
        } else if (!validateTime(pDataRows[i].SITime)) {
            swal(strSorry, " SI Time in Row No. " + pDataRows[i].__rowNum__ + " is Invalid ");
            FadePageCover(false);
            return;
        } else if (pDataRows[i].ValidatedTitles == undefined || pDataRows[i].ValidatedTitles.replace(/[\, ]/g, ' ').trim() == "") {
            swal(strSorry, " Validated Titles in Row No. " + pDataRows[i].__rowNum__ + " is Empty ");
            FadePageCover(false);
            return;
        } else if (!isValidDateFormat(pDataRows[i].ValidatedTitles)) {
            swal(strSorry, " Validated Titles in Row No. " + pDataRows[i].__rowNum__ + " is Invalid ");
            FadePageCover(false);
            return;
        } else if (pDataRows[i].SIDateOfSubmission != undefined) {
            if (!isValidDateFormat(pDataRows[i].SIDateOfSubmission)) {
                swal(strSorry, " SI Date Of Submission in Row No. " + pDataRows[i].__rowNum__ + " is Invalid ");
                FadePageCover(false);
                return;
            }
        } else if (pDataRows[i].DateOfSubmission != undefined) {
            if (!isValidDateFormat(pDataRows[i].DateOfSubmission)) {
                swal(strSorry, "Date Of Submission in Row No. " + pDataRows[i].__rowNum__ + " is Invalid ");
                FadePageCover(false);
                return;
            }
        } else if (pDataRows[i].TermCutOff != undefined) {
            if (!isValidDateFormat(pDataRows[i].TermCutOff)) {
                swal(strSorry, "Term CutOff in Row No. " + pDataRows[i].__rowNum__ + " is Invalid ");
                FadePageCover(false);
                return;
            }
        } else if (pDataRows[i].ETD != undefined) {
            if (!isValidDateFormat(pDataRows[i].ETD)) {
                swal(strSorry, "ETD in Row No. " + pDataRows[i].__rowNum__ + " is Invalid ");
                FadePageCover(false);
                return;
            }
        } else if (pDataRows[i].BLCheckDate != undefined) {
            if (!isValidDateFormat(pDataRows[i].BLCheckDate)) {
                swal(strSorry, "BL Check Date in Row No. " + pDataRows[i].__rowNum__ + " is Invalid ");
                FadePageCover(false);
                return;
            }
        }

        CommentsList += ((CommentsList == "" ? "" : ",") +
            (pDataRows[i].Comments == undefined || pDataRows[i].Comments.replace(/[\, ]/g, ' ') == "" ? 0 : pDataRows[i].Comments.replace(/[\,]/g, ' '))
        );
        Comments2List += ((Comments2List == "" ? "" : ",") +
            (pDataRows[i].Comments2 == undefined || pDataRows[i].Comments2.replace(/[\, ]/g, ' ') == "" ? 0 : pDataRows[i].Comments2.replace(/[\,]/g, ' '))
        );

        HazmatList += ((HazmatList == "" ? "" : ",") +
            (pDataRows[i].Hazmat == undefined || pDataRows[i].Hazmat.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Hazmat.replace(/[\, ]/g, ' ').trim().toLowerCase())
        );

        ContractHolderList += ((ContractHolderList == "" ? "" : ",") +
            (pDataRows[i].ContractHolder == undefined || pDataRows[i].ContractHolder.replace(/[\, ]/g, ' ').trim() == "" ? 0 : GetOptionValueFromSelect("slContractHolder",pDataRows[i].ContractHolder.replace(/[\, ]/g, ' ').trim()))
        );

        BookingNoList += ((BookingNoList == "" ? "" : ",") +
            (pDataRows[i].BookingNo == undefined || pDataRows[i].BookingNo.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].BookingNo.replace(/[\, ]/g, ' ').trim())
        );

        /*Container1List += ((Container1List == "" ? "" : ",") +
            (pDataRows[i].Container1 == undefined || pDataRows[i].Container1.replace(/[\, ]/g, ' ').trim() == "" ? 0 : GetOptionValueFromSelect("slContainerType1",pDataRows[i].Container1.replace(/[\, ]/g, ' ').trim()))
        );

        Container1NoList += ((Container1NoList == "" ? "" : ",") +
            (pDataRows[i].Container1No == undefined || pDataRows[i].Container1No.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Container1No.replace(/[\, ]/g, ' ').trim())
        );
        Container2List += ((Container2List == "" ? "" : ",") +
            (pDataRows[i].Container2 == undefined || pDataRows[i].Container2.replace(/[\, ]/g, ' ').trim() == "" ? 0 : GetOptionValueFromSelect("slContainerType2",pDataRows[i].Container2.replace(/[\, ]/g, ' ').trim()))
        );

        Container2NoList += ((Container2NoList == "" ? "" : ",") +
            (pDataRows[i].Container2No == undefined || pDataRows[i].Container2No.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Container2No.replace(/[\, ]/g, ' ').trim())
        );*/
        Container40List += ((Container40List == "" ? "" : ",") +
            (pDataRows[i]["40HC"] == undefined || pDataRows[i]["40HC"].replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i]["40HC"].replace(/[\, ]/g, ' ').trim())
        );

        Container45List += ((Container45List == "" ? "" : ",") +
            (pDataRows[i]["45HC"] == undefined || pDataRows[i]["45HC"].replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i]["45HC"].replace(/[\, ]/g, ' ').trim())
        );

        POLCodeList += ((POLCodeList == "" ? "" : ",") +
            (pDataRows[i].POLCode == undefined || pDataRows[i].POLCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].POLCode.replace(/[\, ]/g, ' ').trim())
        );

        PODCodeList += ((PODCodeList == "" ? "" : ",") +
            (pDataRows[i].PODCode == undefined || pDataRows[i].PODCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].PODCode.replace(/[\, ]/g, ' ').trim())
        );
        ShippingLineList += ((ShippingLineList == "" ? "" : ",") +
            (pDataRows[i].ShippingLine == undefined || pDataRows[i].ShippingLine.replace(/[\, ]/g, ' ').trim() == "" ? 0 : GetOptionValueFromSelect("slShippingLine",pDataRows[i].ShippingLine.replace(/[\, ]/g, ' ').trim()))
        );
        VesselList += ((VesselList == "" ? "" : ",") +
            (pDataRows[i].Vessel == undefined || pDataRows[i].Vessel.replace(/[\, ]/g, ' ').trim() == "" ? 0 : GetOptionValueFromSelect("slVessel",pDataRows[i].Vessel.replace(/[\, ]/g, ' ').trim()))
        );
        VoyageNumberList += ((VoyageNumberList == "" ? "" : ",") +
            (pDataRows[i].Voyage == undefined || pDataRows[i].Voyage.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Voyage.replace(/[\, ]/g, ' ').trim())
        );
        WarehouseList += ((WarehouseList == "" ? "" : ",") +
            (pDataRows[i].Warehouse == undefined || pDataRows[i].Warehouse.replace(/[\, ]/g, ' ').trim() == "" ? 0 : GetOptionValueFromSelect("slWarehouse",pDataRows[i].Warehouse.replace(/[\, ]/g, ' ').trim()))
        );

        CustomerList += ((CustomerList == "" ? "" : ",") +
            (pDataRows[i].Customer == undefined || pDataRows[i].Customer.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Customer.replace(/[\, ]/g, ' ').trim())
        );

        SLDateList += ((SLDateList == "" ? "" : ",") +
            (pDataRows[i].SIDate == undefined || pDataRows[i].SIDate.trim() == "" ? 0 : pDataRows[i].SIDate.trim())
        );
        SLTimeList += ((SLTimeList == "" ? "" : ",") +
            (pDataRows[i].SITime == undefined || pDataRows[i].SITime.trim() == "" ? 0 : pDataRows[i].SITime.trim())
        );

        SLDateOfSubmissionList += ((SLDateOfSubmissionList == "" ? "" : ",") +
            (pDataRows[i].SIDateOfSubmission == undefined || pDataRows[i].SIDateOfSubmission.trim() == "" ? 0 : pDataRows[i].SIDateOfSubmission.trim())
        );

        ValidatedTitlesDateList += ((ValidatedTitlesDateList == "" ? "" : ",") +
            (pDataRows[i].ValidatedTitles == undefined || pDataRows[i].ValidatedTitles.trim() == "" ? 0 : pDataRows[i].ValidatedTitles.trim())
        );

        DateOfSubmissionList += ((DateOfSubmissionList == "" ? "" : ",") +
            (pDataRows[i].DateOfSubmission == undefined || pDataRows[i].DateOfSubmission.trim() == "" ? 0 : pDataRows[i].DateOfSubmission.trim())
        );

        TermCutOffDateList += ((TermCutOffDateList == "" ? "" : ",") +
            (pDataRows[i].TermCutOff == undefined || pDataRows[i].TermCutOff.trim() == "" ? 0 : pDataRows[i].TermCutOff.trim())
        );

        ETDDateList += ((ETDDateList == "" ? "" : ",") +
            (pDataRows[i].ETD == undefined || pDataRows[i].ETD.trim() == "" ? 0 : pDataRows[i].ETD.trim())
        );

        BlCheckDateList += ((BlCheckDateList == "" ? "" : ",") +
            (pDataRows[i].BLCheckDate == undefined || pDataRows[i].BLCheckDate.trim() == "" ? 0 : pDataRows[i].BLCheckDate.trim())
        );
    }

    var pParametersWithValues = {
        HazmatList
        , ContractHolderList
        , BookingNoList
        , Container40List
        , Container45List
        , POLCodeList
        , PODCodeList
        , ShippingLineList
        , VesselList
        , VoyageNumberList
        , WarehouseList
        , CustomerList
        , SLDateList
        , SLTimeList
        , SLDateOfSubmissionList
        , ValidatedTitlesDateList
        , DateOfSubmissionList
        , TermCutOffDateList
        , ETDDateList
        , BlCheckDateList
        , CommentsList
        , Comments2List
    }

    CallPOSTFunctionWithParameters("/api/Bookings/InsertListFromExcel_Bookings", pParametersWithValues, function (pData) {
        let pReturnedMessage = pData[0];
        if (pReturnedMessage == "")
            swal("Success", "Saved Successfully.");
        else
            swal("Sorry", pReturnedMessage);
        Booking_LoadingWithPaging();
    }, null);


}
function hasOptionWithText(selectId, searchText) {
    const select = document.getElementById(selectId);

    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text.toLowerCase() == searchText.toLowerCase()) {
            return true;
        }
    }
    return false;
}
function GetOptionValueFromSelect(selectId, searchText) {
    const select = document.getElementById(selectId);

    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text.toLowerCase() == searchText.toLowerCase()) {
            return select.options[i].value;
        }
    }
    return 0;
}
function GetSheetConditions(oJS) {
    if (oJS.length > 0 && oJS[0].Hazmat != undefined && oJS[0].ContractHolder != undefined)
        return true
    else
        return false
}
function isValidDateTimeFormat(str) {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})\s([01]?\d|2[0-3]):([0-5]?\d)\s([APap][Mm])$/;
    return regex.test(str);
}
function isValidDateFormat(str) {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    return regex.test(str);
}

function GetFullDateTime_DD_MM_YY_ForBooking(pSenderDate) {
    debugger;
    var dtFormatedMDY = new Date(1 * pSenderDate.substring(6, pSenderDate.length - 2));
    var hours = dtFormatedMDY.getHours();
    var minutes = dtFormatedMDY.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    var Day = (dtFormatedMDY.getDate().toString().length == 1 ? ("0" + dtFormatedMDY.getDate()) : dtFormatedMDY.getDate());
    var Month = (dtFormatedMDY.getMonth().toString().length == 1 ? ("0" + (dtFormatedMDY.getMonth() + 1)) : (dtFormatedMDY.getMonth() + 1));

    return (Day + "/" + Month + "/" + dtFormatedMDY.getFullYear() + " " + strTime);
}
function DownloadSampleBooking() {
    window.open('/Content/Templates/Bookings.xls', '_blank');
}

function validateTime(input) {
    const timePattern = /^(0[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/;

    return timePattern.test(input);
}
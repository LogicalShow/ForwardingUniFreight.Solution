// City Country ---------------------------------------------------------------
// Bind LD_Workers Table Rows



// #region Setting

var LoadingAndDischargingHeaderTruckersDetails_obj =
{
    HeaderTruckerID: 0, VehicleNo: "0", CustodyNo: "0", BillNo: "0", LoadedQty: 0, Notes: "0"
};




function IntializePage() {


    IntializeHeaderAutoCompleteSearch();

    ConfigureAfterHeaderChangeEvent();

    IntializeOperationAutoCompleteSearch();
    ConfigureAfterOperationChangeEvent();

    IntializeData();

}


function ConfigureAfterOperationChangeEvent() {
    $("#slOperationID").off('change').on('change', function () {

        if ($("#slOperationID").val() == $("#slOperationID option:selected").text()) {
            swal('اختيار عملية خاطئء - Is Not Correct Selected Operation');
            window.CurrentOperationID = null;
            CLearOperationInfo();
        }
        else {
            console.log("operation : " + $("#slOperationID").val() + " Is Selected");
            window.CurrentOperationID = $("#slOperationID").val();

            GetOperationInfoByID($("#slOperationID").val(),

                function (Operation) {
                    FillOperationInfo(Operation);
                }

               );

        }

    }
    );

}
function GetOperationInfoByID(pOperationID, callback) {
    FadePageCover(true)
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/LD_Workers/GetOperationInfoByID",
        data: { pID: parseInt(pOperationID) },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            var data = JSON.parse(d);
            var Operation = data[0];
            debugger
            if (typeof callback !== "undefined" && callback != null)
                callback(Operation);

            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! This is print region !", "");
            FadePageCover(false);
        }
    });
}
function FillOperationInfo(Operation) {
    if (!(IsNull(Operation, null) == null)) {
        $('#txtOperationNo').val(Operation.Code);
        $('#txtClient').val(Operation.ClientName);
        $('#slMoveTypeID').val(Operation.MoveTypeID);
        $('#slVesselD').val(Operation.VesselID);

        $("#txtSerial").val(Operation.CodeSerial);

        $('#slVesselD').trigger('change');
        $('#slMoveTypeID').trigger('change');
    }

}
function IntializeOperationAutoCompleteSearch() {

    $("#slOperationID").css({ 'width': '100%' }).select2({
        minimumInputLength: 1,
        tags: [],
        ajax: {
            url: strServerURL + "/api/LD_Workers/GetOperationByCode",
            dataType: 'json',
            type: "GET",
            contentType: "application/json; charset=utf-8",
            quietMillis: 50,
            // data: { term: term },
            data: function (params) {
                var query = {
                    term: params.term
                    //,typeid: window.LD_TypeID
                }

                return query;
            },
            processResults: function (data) {

                var d = JSON.parse(data[0]);
                return {

                    results: $.map(d, function (item) {
                        return {
                            text: item.Code + " / " + IsNull(item.ClientName, "0"),
                            clientid: item.ClientID,
                            id: item.ID,
                            value: item.ID
                        };
                    })
                };
            }
        }
    });
}

function ConfigureAfterHeaderChangeEvent() {
    $("#slHeaderID").off('change').on('change', function () {

        if ($("#slHeaderID").val() == $("#slHeaderID option:selected").text()) {
            swal('اختيار عملية تعبئة و تفريغ خاطئء - Is Not Correct Selected Loading & Discharging operation');
            window.CurrentHeaderID = null;
            CLearHeaderInfo();
        }
        else {
            console.log("Loading & Discharging : " + $("#slHeaderID").val() + " Is Selected");
            window.CurrentHeaderID = $("#slHeaderID").val();

            GetHeaderInfoByID($("#slHeaderID").val(),

                function (Header) {
                    FillHeaderInfo(Header);
                }

            );



        }

    }
    );

}
function GetHeaderInfoByID(pHeaderID, callback) {
    FadePageCover(true)
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/LD_Workers/GetHeaderInfoByID",
        data: { pID: parseInt(pHeaderID) },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            var data = JSON.parse(d);
            var Operation = data[0];
            debugger
            if (typeof callback !== "undefined" && callback != null)
                callback(Operation);

            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! This is print region !", "");
            FadePageCover(false);
        }
    });
}

function FillHeaderInfo(Header) {
    if (!(IsNull(Header, null) == null)) {
        $('#txtOperationNo').val(Header.OperationCode);
        $('#txtVesselName').val(Header.VesselName);

        


        $('#txtClient').val(Header.CustomerName);
        $('#txtLoadingandDischarging').val(Header.Serial);

        
    }

}
function CLearHeaderInfo() {

    $('#txtOperationNo').val("");
    $('#txtClient').val("");
    $('#txtLoadingandDischarging').val("");
    $('#txtVesselName').val("");

}
function IntializeHeaderAutoCompleteSearch() {

    $("#slHeaderID").css({ 'width': '100%' }).select2({
        minimumInputLength: 1,
        tags: [],
        ajax: {
            url: strServerURL + "/api/LD_Workers/GetHeaderByOperationCode",
            dataType: 'json',
            type: "GET",
            contentType: "application/json; charset=utf-8",
            quietMillis: 50,
            // data: { term: term },
            data: function (params) {
                var query = {
                    term: params.term
                    //type: 'public'
                }

                return query;
            },
            processResults: function (data) {

                var d = JSON.parse(data[0]);
                return {

                    results: $.map(d, function (item) {
                        return {
                            text: item.OperationCode + " / " + item.Serial + " / " +  IsNull(item.VesselName, "0"),
                            id: item.ID,
                            value: item.ID
                        };
                    })
                };
            }
        }
    });
}






function IntializeData() {
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/LD_Workers/IntializeData",
        data: { pID: null },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[0], 'ID', 'Code,Name', " - ", '<--- المورد / حساب العمال --->', '#slSupplierID', '', 'Name');
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[1], 'ID', 'Code,Name', " - ", '<--- المركب --->', '#slVesselD', '', 'Name');
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[2], 'ID', 'Code,Name', " - ", '<--- نوع الخدمة --->', '#slMoveTypeID', '', 'Name');
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[3], 'ID', 'Code,Name', " - ", '<--- البضاعه --->', '#slCommodityID', '', 'Name');

            $('#slVesselD').css({ 'width': '100%' }).select2();
            $('#slMoveTypeID').css({ 'width': '100%' }).select2();
            $('#slCommodityID').css({ 'width': '100%' }).select2();
            $('#slSupplierID').css({ 'width': '100%' }).select2();

            $("div[tabindex='-1']").removeAttr('tabindex');

            LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/LD_Workers/LoadWithWhereClause", " Where 1 = 1 " + "", 1, 10,

                function (pTabelRows) {

                    LD_Workers_BindTableRows(pTabelRows);

                });


            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! This is print region !", "");
            FadePageCover(false);
        }
    });
}




function LD_Workers_BindTableRows(pLD_Workers) {
    debugger;
    console.log(pLD_Workers);
    $("#hl-menu-FA").parent().addClass("active");
    ClearAllTableRows("tblLD_Workers");
    $.each(pLD_Workers, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblLD_Workers",
            ("<tr ID='" + item.ID + "' ondblclick='LD_Workers_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Serial' val='" + item.Serial + "'>" + item.Serial + "</td>"
                + "<td class='OperationCodeSerial' val='" + item.OperationCodeSerial + "'>" + item.OperationCodeSerial + "</td>"
                + "<td class='HeaderID hide' val='" + item.HeaderID + "'>" + item.HeaderSerial + "</td>"
                + "<td class='SupplierID' val='" + item.SupplierID + "'>" + item.SupplierName + "</td>"
                + "<td class='WorkersTypeID' val='" + item.WorkersTypeID + "'>" + item.WorkersTypeName + "</td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td class='OperationID hide' val='" + item.OperationID + "'>" + item.OperationID + "</td>"
                + "<td class='OperationCode hide' val='" + item.OperationCode + "'>" + item.OperationCode + "</td>"
                + "<td class='VesselD hide' val='" + item.VesselD + "'>" + item.VesselD + "</td>"
                + "<td class='OpenDate hide' val='" + GetDateFromServer(item.OpenDate) + "'>" + GetDateFromServer(item.OpenDate) + "</td>"
                + "<td class='FromDate hide' val='" + GetDateFromServer(item.FromDate) + "'>" + GetDateFromServer(item.FromDate) + "</td>"
                + "<td class='ToDate hide' val='" + GetDateFromServer(item.ToDate) + "'>" + GetDateFromServer(item.ToDate) + "</td>"
                + "<td class='ExpectedTotalQty hide' val='" + item.ExpectedTotalQty + "'>" + item.ExpectedTotalQty + "</td>"
                + "<td class='BerthNo hide' val='" + item.BerthNo + "'>" + item.BerthNo + "</td>"
                + "<td class='CommodityID hide' val='" + item.CommodityID + "'>" + item.CommodityID + "</td>"
                + "<td class='MoveTypeID hide' val='" + item.MoveTypeID + "'>" + item.MoveTypeID + "</td>"
                + "<td class='CustomerName hide' val='" + item.CustomerName + "'>" + item.CustomerName + "</td>"
                + "<td> <button tag=" + item.ID + " type='button' onclick='PrintHeaderFullDetails(" + item.ID + ",`LD_Workers`);' class='btn btn-sm btn-lightblue'><i class='fa fa-print'>&nbsp;" + "طباعة الملخص" + "&nbsp;</i></button></td>"
                + "<td> <button tag=" + item.ID + " type='button' onclick='PrintHeaderFullDetails(" + item.ID + ",`LD_WorkersDetails`);' class='btn btn-sm btn-lightblue'><i class='fa fa-print'>&nbsp;" + "طباعة التفاصيل" + "&nbsp;</i></button></td>"
                + "<td class='hLD_Workers'><a href='#LD_WorkersModal' data-toggle='modal' onclick='LD_Workers_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));

        //LD_LoadingAndDischargingFullDetailsByTruckerID

    });
    //   ApplyPermissions();
    BindAllCheckboxonTable("tblLD_Workers", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblLD_Workers>tbody>tr", $("#txt-Search").val());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $(".swapChildrenClass:not(.reversed)").reverseChildren();

    }
}
function LD_Workers_EditByDblClick(pID) {
    jQuery("#LD_WorkersModal").modal("show");
    LD_Workers_FillControls(pID);
}
// Loading with data
function LD_Workers_LoadingWithPaging() {
    debugger;
    //  LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/LD_Workers/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { LD_Workers_BindTableRows(pTabelRows); LD_Workers_ClearAllControls(); });
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/LD_Workers/LoadWithWhereClause", " Where 1=1 ", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { LD_Workers_BindTableRows(pTabelRows); });

   //LoadWithPagingWithWhereClause(pDivPagerName, pSelectPageSizeName, pSpnFirstPageRowName, pSpnLastPageRowName, pSpnTotalCountName, pDivTextTotalModal, pServiceFunctionName, pWhereClause, pPageNumber, pPageSize, callback, pFadePageCover) {


    HighlightText("#tblLD_Workers>tbody>tr", $("#txt-Search").val().trim());
}

//var IsOldName = "0";
var Isvalidated = true;

function LD_Workers_Save(pSaveandAddNew) {
    Isvalidated = true;
    //if (IsNull(window.CurrentHeaderID, "0") == "0") {
    //    swal(" Please Select Loading & Discharging Operation -  اختر عملية الشحن و التفرغ المربوطة");
    //    Isvalidated = false;
    //    return false;
    //}
     if (IsNull($('#slSupplierID').val(), "0") == "0") {
        swal(" Please Select Supplier - اختر اسم الحساب/المورد");
        Isvalidated = false;
        return false;
    }
     if (IsNull($('#slWorkersTypeID').val(), "0") == "0") {
        swal(" Please Select Workers Type - ادخل النوع");
        Isvalidated = false;
        return false;
    }
     if (Isvalidated) {
         debugger;



         $.ajax({
             type: "GET",
             url: "/api/LD_Workers/InsertItems",
             data:
             {
                 pSerial: IsNull($('#txtSerial').val(), "0"),
                 pSupplierID: IsNull($('#slSupplierID').val(), "0"),
                 pWorkersTypeID: IsNull($('#slWorkersTypeID').val(), "0"),
                 pHeaderID: IsNull(window.CurrentHeaderID, "0"),
                 pNotes: IsNull($('#txtNotes').val(), "0"),
                 pID: IsNull($('#hID').val(), "0"),

                 pOperationID: IsNull(window.CurrentOperationID, "0"),
                 pBerthNo: IsNull($('#txtBerthNo').val(), "0"),
                 pCommodityID: IsNull($('#slCommodityID').val(), "0"),
                 pMoveTypeID: IsNull($('#slMoveTypeID').val(), "0"),
                 pOpenDate: ConvertDateFormat(IsNull($('#txtOpenDate').val(), "0")),
                 pFromDate: ConvertDateFormat(IsNull($('#txtFromDate').val(), "0")),
                 pToDate: ConvertDateFormat(IsNull($('#txtToDate').val(), "0")),
                 pVesselD: IsNull($('#slVesselD').val(), "0"),
                 pExpectedTotalQty: IsNull($('#txtExpectedTotalQty').val(), "0"),

             },
             contentType: "application/json; charset=utf-8",
             dataType: "json",
             success: function (pData) {
                 debugger;
                 if (pData[0] != 0) {

                     $("#hID").val(pData[0]);
                     SaveLoadingAndDischargingHeaderWorkersDetailsFromExcel();

                     //if (ListofWorkerObject != null && ListofWorkerObject.length > 0) {
                     //    $("#hID").val(pData[0]);
                     //    SaveLoadingAndDischargingHeaderWorkersDetailsFromExcel(ListofWorkerObject);
                     //}
                     //else {

                     //    SetConfigurationAfterSave(pData[0]);


                     //}

                 }
                 else {
                     FadePageCover(false);
                     swal(data[1]);
                 }

             }
         });

     }
    }


function SetConfigurationAfterSave(ID) {

    //swal("Sorry", "You Must Delete Payment First");
    FadePageCover(false);

    swal("Success", " data saved successfully.");
    LD_Workers_LoadingWithPaging();
    //------------------------------------- ----------- -  - - - - -- - - - - -
    setTimeout(function () {
        //----------------------------------------------------------------------- For New
        //ArrDeletedTruckers = [];
        //$("#hID").val("0");
        //ClearAll("#LD_WorkersModal", null);
        //$('#tblTruckers > tbody').html('');
        //IntializeData();
        //ClearAllTableRows('tblTruckers');
        //LD_Workers_LoadingWithPaging();
        //----------------------------------------------------------------------- For Complete Same Operation
        $("#hID").val(ID );
        //LoadingandDischargingTruckers_BindTableRows();
        LoadingandDischargingWorkers_BindTableRows();
    }, 300);
}



function LD_Workers_Delete(pID) {
    DeleteListFunction("/api/LD_Workers/DeleteByID", { "pID": pID, "type": "1" }, function () { LD_Workers_LoadingWithPaging(); });
}

function LD_Workers_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblLD_Workers') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            //callback function in case of success
            function () {
                DeleteListFunction("/api/LD_Workers/Delete", { "pLD_WorkersIDs": GetAllSelectedIDsAsString('tblLD_Workers'), "type": "1" }, function () { LD_Workers_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/LD_Workers/Delete", { "pLD_WorkersIDs": GetAllSelectedIDsAsString('tblLD_Workers') }, function () { LD_Workers_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data



function LD_Workers_FillControls(pID) {
    $('#tblTruckers > tbody').html('');
    debugger;
    ClearAll("#LD_WorkersModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

    $("#txtSerial").val($(tr).find("td.Serial").attr('val'));
    $("#slSupplierID").val($(tr).find("td.SupplierID").attr('val'));
    $("#slWorkersTypeID").val($(tr).find("td.WorkersTypeID").attr('val'));
    $("#slSupplierID").trigger('change');

    $("#txtNotes").val($(tr).find("td.Notes").attr('val'));
    window.CurrentHeaderID = $(tr).find("td.HeaderID").attr('val');

    window.CurrentOperationID = $(tr).find("td.OperationID").attr('val');
    $('#slOperationID').append('<option value="' + window.CurrentOperationID + '" data-select2-id="' + $(tr).find("td.OperationCodeSerial").attr('val') + '" data-select2-tag="true">' + $(tr).find("td.OperationCode").attr('val') + '</option>');
    $("#slOperationID").val(window.CurrentOperationID);
    $('#txtOperationNo').val($(tr).find("td.OperationCode").attr('val'));
    $('#txtClient').val($(tr).find("td.CustomerName").attr('val'));
    //$("#slOperationID").trigger('change');
    //GetOperationInfoByID(window.CurrentOperationID, function (operation) {
    //    FillOperationInfo(operation);
    //});

    $("#txtBerthNo").val($(tr).find("td.BerthNo").attr('val'));
    $("#slCommodityID").val($(tr).find("td.CommodityID").attr('val'));
    $("#slCommodityID").trigger('change');
    $("#slMoveTypeID").val($(tr).find("td.MoveTypeID").attr('val'));
    $("#slMoveTypeID").trigger('change');
    $("#txtOpenDate").val($(tr).find("td.OpenDate").attr('val'));
    $("#txtFromDate").val($(tr).find("td.FromDate").attr('val'));
    $("#txtToDate").val($(tr).find("td.ToDate").attr('val'));
    $("#txtExpectedTotalQty").val($(tr).find("td.ExpectedTotalQty").attr('val'));
    $("#slVesselD").val($(tr).find("td.VesselD").attr('val'));
    $("#slVesselD").trigger('change');
    //GetHeaderInfoByID(window.CurrentHeaderID, function (header) {
    //    FillHeaderInfo(header);
    //});

   // LoadingandDischargingTruckers_BindTableRows();
    LoadingandDischargingWorkers_BindTableRows();
    $("#btnSave").attr("onclick", "LD_Workers_Save(false);");
    $("#btnSaveandNew").attr("onclick", "LD_Workers_Save(true);");
}

function LD_Workers_ClearAllControls()
{
    debugger;
    ClearAll("#LD_WorkersModal", null);

    window.CurrentHeaderID = null;
    window.CurrentOperationID = null;
    $('#tblWorkers > tbody').html('');
    $("#txtSerial").val("");
    $("#slSupplierID").val("0");
    $("#slSupplierID").trigger('change');
    $("#slWorkersTypeID").trigger('change');
    $("#slWorkersTypeID").val("10");
    $("#txtNotes").val("");




    $("#slCommodityID").val('0');
    $("#slCommodityID").trigger('change');
    $("#slMoveTypeID").val('0');
    $("#slMoveTypeID").trigger('change');
  

    $("#slVesselD").val('0');
    $("#slVesselD").trigger('change');


   
    $("#btnSave").attr("onclick", "LD_Workers_Save(false);");
    $("#btnSaveandNew").attr("onclick", "LD_Workers_Save(true);");
    $("#btnSave").attr("onclick", "LD_Workers_Save(false);");
    $("#btnSaveandNew").attr("onclick", "LD_Workers_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
    $("#hID").val("0");
}



//#region Workers
var WorkerRowsCounter = 0;
var ArrDeletedWorkers = [];


//var AddedObject = {
//    HeaderWorkerID: 0,
//    Date: ConvertDateFormat(IsNull((jsondata[i][columns[0]]).toString(), "0")),
//    PeriodID: PeriodID,
//    Count: IsNull((jsondata[i][columns[2]]).toString(), "0"),
//    Amount: IsNull((jsondata[i][columns[3]]).toString(), "0")
//};


function LD_Workers_AddWorkers(FromExcelObject) {
    AppendRowtoTable("tblWorkers",
        ("<tr ID='" + 0 + "'>"
            + "<td> <button tag=" + 0 + " id='btn-DeleteDetails' type='button' onclick='DeleteWorkers(this," + ListofWorkerObject.length + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + '<td val="' + FromExcelObject.Date + '" class="">' + ConvertDateFormat( FromExcelObject.Date )+ '</td>'
            + '<td val="' + FromExcelObject.PeriodID + '" class="">' + (FromExcelObject.PeriodID == "10" ? "نهاري" : "ليلي") + '</td>'
            + '<td val="' + FromExcelObject.Count + '" class="">' + FromExcelObject.Count + '</td>'
            + '<td val="' + FromExcelObject.Amount + '" class="">' + FromExcelObject.Amount + '</td>'
            + '<td val="' + FromExcelObject.Amount + '" class="">' + parseFloat(FromExcelObject.Amount) * parseFloat( FromExcelObject.Count) + '</td>'
            + "</tr>"));

    FillHTMLtblInputs("#tblWorkers>tbody tr");
    WorkerRowsCounter = (WorkerRowsCounter + 1);
}

function LoadingandDischargingWorkers_BindTableRows() {
    debugger
    ClearAllTableRows("tblWorkers");
    FadePageCover(true);


    ListofWorkerObject = [];



    $.ajax({
        type: "GET",
        url: strServerURL + "/api/LD_Workers/LoadLoadingAndDischargingHeaderWorkers",
        data: {
            pHeaderID: $('#hID').val()
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            FadePageCover(false)
            var items = JSON.parse(d[0]);
            FadePageCover(false);
            $.each(items, function (i, item) {
                //debugger;



                AppendRowtoTable("tblWorkers",
                    ("<tr ID='" + 0 + "'>"
                        + "<td> <button tag=" + 0 + " id='btn-DeleteDetails' type='button' onclick='DeleteWorkers(this," + (ListofWorkerObject.length + 1) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                        + '<td val="' + GetDateFromServer(item.Date )+ '" class="">' + GetDateFromServer(item.Date) + '</td>'
                        + '<td val="' + item.PeriodID + '" class="PeriodID">' + (item.PeriodID == "10" ? "نهاري" : "ليلي") + '</td>'
                        + '<td val="' + item.Count + '" class="Count">' + item.Count + '</td>'
                        + '<td val="' + item.Amount + '" class="Amount">' + item.Amount + '</td>'
                        + '<td val="' + parseFloat(item.Amount) * parseFloat(item.Count) + '" class="Total">' + parseFloat(item.Amount) * parseFloat(item.Count) + '</td>'
                        + "</tr>"));


                var AddedObject = {
                    Serial: ListofWorkerObject.length + 1,
                    HeaderWorkerID: item.HeaderID,
                    Date: ConvertDateFormat( GetDateFromServer(item.Date) ),
                    PeriodID: item.PeriodID,
                    Count: item.Count,
                    Amount: item.Amount
                };
                ListofWorkerObject.push(AddedObject);




                WorkerRowsCounter = item.ID + 1;
                debugger

            });
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });






}

var ListofWorkerObject = new Array();
function FillWorkersParametersFromExcel(jsondata, pHeaderID) {/*Function used to convert the JSON array to Html Table*/
    debugger;

    ListofWorkerObject = [];
    $('#tblWorkers body').html('');

    var columns = GetHeadersColumnsFromExcel(jsondata); /*Gets all the column headings of Excel*/
    for (var i = 0; i < jsondata.length; i++) {

        var PeriodName = IsNull((jsondata[i][columns[1]]).toString(), "0");
        var PeriodID = "0";

        if (PeriodName == "نهاري" || PeriodName == "نهار" || PeriodName == "نهارى")
            PeriodID = "10";
        else if (PeriodName == "نهاري" || PeriodName == "نهار" || PeriodName == "نهارى")
            PeriodID = "20";


        var AddedObject = {
            Serial:ListofWorkerObject.length+1,
            HeaderWorkerID: 0,
            Date: ConvertDateFormat(IsNull((jsondata[i][columns[0]]).toString(), "0")),
            PeriodID: PeriodID,
            Count: IsNull((jsondata[i][columns[2]]).toString(), "0"),
            Amount: IsNull((jsondata[i][columns[3]]).toString(), "0")
        };

        ListofWorkerObject.push(AddedObject);


        LD_Workers_AddWorkers(AddedObject);

    }

    if (jsondata == null || jsondata.length == 0) {
        return ListofObject;
    }
}


function DeleteWorkers(This,Serial) {
    debugger;
    if ($(This).attr('tag') == "0" || $(This).attr('tag') == "" || $(This).attr('tag') == null) {
      
        $(This).closest('tr').remove();
        ListofWorkerObject = ListofWorkerObject.filter(function (obj) { return obj.Serial != Serial; });
    }
    else {
        swal({
            title: "Are you sure?",
            text: "The selected  will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            //callback function in case of success
            function () {
                ArrDeletedWorkers.push($(This).attr('tag'));
                $(This).closest('tr').remove();
            });

    }

}

function SetArrayOfWorkers() {
    // var cobjItem = null;
    debugger;
    var arrayOfItems = new Array();
    $("#tblWorkers tbody tr").each(function (i, tr) {
        debugger;

        if ($('#hID').val() == "")
            $('#hID').val("0");


        var objItem = new Object();
        objItem.ID = $(tr).attr('ID');
        objItem.LoadingAndDischargingHeaderID = IsNull($('#hID').val(), "0");
        objItem.EquipmentID = IsNull($(tr).find('td.EquipmentID').find("select").val(), "0");
        objItem.Notes = "0";

        arrayOfItems.push(objItem);
    });


   // console.log(arrayOfItems);


    return arrayOfItems;
}

function SaveLoadingAndDischargingHeaderWorkersDetailsFromExcel() {
    for (var i = 0; i < ListofWorkerObject.length; i++)
    {
        ListofWorkerObject[i]["HeaderWorkerID"] = $("#hID").val();
    }

        debugger
        $.ajax({
            type: "POST",
            url: "/api/LD_Workers/InsertLoadingAndDischargingHeaderWorkersDetailsFromExcel",
            dataType: 'json',
            data: { "Items": JSON.stringify(ListofWorkerObject), "HeaderWorkerID":$("#hID").val() },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",/*"application/json; charset=utf-8"*/

            success: function (pData) {
                if (pData[0] != 0) {
                    //swal("Sorry", "You Must Delete Payment First");
                    FadePageCover(false);

                    swal("Success", " Excel is saved -  تم حفظ بيانات الاكسل ");
                }
                else {
                    FadePageCover(false);
                    swal(pData[1]);
                }
                SetConfigurationAfterSave($("#hID").val());
            }
        });
    

}
//#endregion Workers

//#region Excel


function LD_WorkersManage_ClearAllControls() {

}


function ImportExcel_LD_Workers(HashUplaodFileID, pHeaderID, Type) {
    debugger
    // $(HashTableID).html("")
    var regex = /^([a-zA-Z0-9\s_\\.\-:]\\(\\))+(.xlsx|.xls)$/;
    /*Checks whether the file is a valid excel file*/
    if ($(HashUplaodFileID).val().toLowerCase().indexOf(".xlsx") > 0 || $(HashUplaodFileID).val().toLowerCase().indexOf(".xls") > 0) {
        var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/
        if ($(HashUplaodFileID).val().toLowerCase().indexOf(".xlsx") > 0) {
            xlsxflag = true;
        }
        /*Checks whether the browser supports HTML5*/
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                /*Converts the excel data in to object*/
                if (xlsxflag) {

                    var binary = "";
                    var bytes = new Uint8Array(data);
                    var length = bytes.byteLength;
                    for (var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    // call 'xlsx' to read the file
                    var workbook = XLSX.read(binary, { type: 'binary', cellDates: true, cellStyles: true });

                }
                else {
                    var workbook = XLS.read(data, { type: 'binary' });
                }
                /*Gets all the sheetnames of excel in to a variable*/
                var sheet_name_list = workbook.SheetNames;

                var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/
                sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/
                    /*Convert the cell value to Json*/
                    if (xlsxflag) {
                        var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                    }
                    else {
                        var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);
                    }
                    if (exceljson.length > 0 && cnt == 0) {
                        //  console.log("excel data : " + exceljson);
                        FillWorkersParametersFromExcel(exceljson, pHeaderID);

                        cnt++;
                    }
                });
                //  $(HashTableID).show();
            }
            if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/
                reader.readAsArrayBuffer($(HashUplaodFileID)[0].files[0]);
            }
            else {
                reader.readAsBinaryString($(HashUplaodFileID)[0].files[0]);
            }
        }
        else {
            alert("Sorry! Your browser does not support HTML5!");
        }
    }
    else {
        alert("Please upload a valid Excel file!");
    }
}


function GetHeadersColumnsFromExcel(jsondata) {/*Function used to get all column names from JSON and bind the html table header*/
    debugger;
    var columnSet = [];
    var headerTr$ = $('<tr/>');
    for (var i = 0; i < jsondata.length; i++) {
        var rowHash = jsondata[i];
        for (var key in rowHash) {
            if (rowHash.hasOwnProperty(key)) {
                if ($.inArray(key, columnSet) == -1) {/*Adding each unique column names to a variable array*/
                    columnSet.push(key);
                    headerTr$.append($('<th/>').html(key));
                }
            }
        }
    }
    //  $(tableid).append(headerTr$);
    return columnSet;
}
//#region Excel


//#region Printing


function PrintHeaderFullDetails(ID,ReportName)
{
    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("HeaderID");
    arr_Values.push(ID);
    //  arr_Values.push(GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbDepartments"));




    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: ReportName
        , pReportName: ReportName
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;

}


function PrintHeaderFullDetailsGroupByTruckers(ID) {
    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("HeaderID");
    arr_Values.push(ID);
    //  arr_Values.push(GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbDepartments"));




    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "LD_LoadingAndDischargingFullDetailsGroupByTruckers"
        , pReportName: "LD_LoadingAndDischargingFullDetailsGroupByTruckers"
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;

}



function PrintHeaderFullDetailsByTruckerID(ID , TruckerID) {
    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("HeaderID");
    arr_Keys.push("TruckerID");
    arr_Values.push(ID);
    arr_Values.push(TruckerID);

    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "LD_LoadingAndDischargingFullDetailsByTruckerID"
        , pReportName: "LD_LoadingAndDischargingFullDetailsByTruckerID"
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;

}

//#endregion Printing
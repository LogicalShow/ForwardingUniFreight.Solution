// City Country ---------------------------------------------------------------
// Bind LoadingandDischargingData Table Rows



// #region Setting

var LoadingAndDischargingHeaderTruckersDetails_obj =
{
    HeaderTruckerID: 0, VehicleNo: "0", CustodyNo: "0", BillNo: "0", LoadedQty: 0, Notes: "0"
};




function IntializePage(pTypeID) {

    // Global Variable
    window.LD_TypeID = pTypeID;


    
    if (pTypeID == "10") {
        $('.PageHeaderTitle').text("النقل - Transport");
        $('.IsLoading').addClass('hide');
    }

    else {
        $('.PageHeaderTitle').text("التحميل و التفريغ - Loading & Discharging");
        $('.IsLoading').removeClass('hide');
    }



    $('#txtExpectedTotalQty').inputmask('decimal', { digits: 5 });

    IntializeOperationAutoCompleteSearch();

    ConfigureAfterOperationChangeEvent();

    IntializeData();

    //if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
    //    $(".swapChildrenClass:not(.reversed)").reverseChildren();
    //}

   
}


function ConfigureAfterOperationChangeEvent()
{
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

function IntializeOperationAutoCompleteSearch() {

    $("#slOperationID").css({ 'width': '100%' }).select2({
        minimumInputLength: 1,
        tags: [],
        ajax: {
            url: strServerURL + "/api/LoadingandDischargingData/GetOperationByCode",
            dataType: 'json',
            type: "GET",
            contentType: "application/json; charset=utf-8",
            quietMillis: 50,
            // data: { term: term },
            data: function (params) {
                var query = {
                    term: params.term ,
                    typeid: window.LD_TypeID
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


function IntializeData() {
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/LoadingandDischargingData/IntializeData",
        data: { pID: null },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[0], 'ID', 'Code,Name', " - ", '<--- مندوب الشحن --->', '#hidden_slTruckers', '', 'Name');
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[1], 'ID', 'Code,Name', " - ", '<--- المركب --->', '#slVesselD', '', 'Name');
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[2], 'ID', 'Code,Name', " - ", '<--- نوع الخدمة --->', '#slMoveTypeID', '', 'Name');
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[3], 'ID', 'Code,Name', " - ", '<--- البضاعه --->', '#slCommodityID', '', 'Name');
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[4], 'ID', 'Code,Name', " - ", '<--- اختر المدينة --->', '#slFromCityID', '', 'Name');
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[4], 'ID', 'Code,Name', " - ", '<--- اختر الجهة --->', '#hidden_slCities', '', 'Name');
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[5], 'ID', 'Code,Name', " - ", '<--- اختر المعدة / الونش --->', '#hidden_slEquipments', '', 'Name');
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[6], 'ID', 'Code,Name', " - ", '<--- اختر الجهة --->', '#hidden_slStores', '', 'Name');

            $('#slVesselD').css({ 'width': '100%' }).select2();
            $('#slMoveTypeID').css({ 'width': '100%' }).select2();
            $('#slCommodityID').css({ 'width': '100%' }).select2();
            $('#slFromCityID').css({ 'width': '100%' }).select2();

            $("div[tabindex='-1']").removeAttr('tabindex');



            LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/LoadingandDischargingData/LoadWithWhereClause", " Where IsNull( TypeID , 10 ) = " + window.LD_TypeID + "", 1, 10,

                function (pTabelRows) {

                    LoadingandDischargingData_BindTableRows(pTabelRows);
                    FadePageCover(false);
                });

            $('#txtFromDate').val(getTodaysDateInddMMyyyyFormat());
            $('#txtStartDate').val(getTodaysDateInddMMyyyyFormat());
            $('#txtCloseDate').val(getTodaysDateInddMMyyyyFormat());
           
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! This is print region !", "");
            FadePageCover(false);
        }
    });
}



function GetOperationInfoByID(pOperationID, callback) {
    FadePageCover(true)
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/LoadingandDischargingData/GetOperationInfoByID",
        data: { pID: parseInt( pOperationID ) },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            var data = JSON.parse(d);
            var Operation = data[0];
            debugger
            if (typeof callback !== "undefined" &&  callback != null)
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
function CLearOperationInfo() {

    $('#txtOperationNo').val("");
    $('#txtClient').val("");
    $('#slMoveTypeID').val("0");

    $('#slVesselD').val("0");


    $('#slMoveTypeID').trigger('change');
    $('#slVesselD').trigger('change');
}



function LoadingandDischargingData_BindTableRows(pLoadingandDischargingData) {
    debugger;
    $("#hl-menu-FA").parent().addClass("active");
    ClearAllTableRows("tblLoadingandDischargingData");
    $.each(pLoadingandDischargingData, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblLoadingandDischargingData",
            ("<tr ID='" + item.ID + "' ondblclick='LoadingandDischargingData_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Serial' val='" + item.Serial + "'>" + item.Serial + "</td>"
                + "<td class='OperationID' val='" + item.OperationID + "'>" + item.OperationCode + "</td>"
                + "<td class='FromCityID' val='" + item.FromCityID + "'>" + item.FromCityName + "</td>"
                + "<td class='BerthNo' val='" + item.BerthNo + "'>" + item.BerthNo + "</td>"
                + "<td class='CommodityID' val='" + item.CommodityID + "'>" + item.CommodityName + "</td>"
                + "<td class='MoveTypeID' val='" + item.MoveTypeID + "'>" + item.ServiceTypeName + "</td>"
                 + "<td class='FromDate hide' val='" + GetDateFromServer(item.FromDate) + "'>" + GetDateFromServer(item.FromDate) + "</td>"
                  + "<td class='StartDate hide' val='" + GetDateFromServer(item.StartDate) + "'>" + GetDateFromServer(item.StartDate) + "</td>"
                + "<td class='CloseDate' val='" + GetDateFromServer(item.CloseDate) + "'>" + GetDateFromServer(item.CloseDate) + "</td>"
                + "<td class='VesselD' val='" + item.VesselD + "'>" + item.VesselName + "</td>"
                + "<td class='ExpectedTotalQty hide' val='" + item.ExpectedTotalQty + "'>" + item.ExpectedTotalQty + "</td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td> <button tag=" + item.ID + " type='button' onclick='PrintHeaderFullDetails(" + item.ID + ");' class='btn btn-sm btn-lightblue'><i class='fa fa-print'>&nbsp;" + "طباعه التفاصيل" + "&nbsp;</i></button></td>"
                + "<td> <button tag=" + item.ID + " type='button' onclick='PrintHeaderFullDetailsGroupByTruckers(" + item.ID + ");' class='btn btn-sm btn-lightblue'><i class='fa fa-print'>&nbsp;" + "طباعه الاجمالي" + "&nbsp;</i></button></td>"
                + (window.LD_TypeID == "10" ? "<td></td>" : "<td> <button tag=" + item.ID + " type='button' onclick='PrintHeaderSummary(" + item.ID + ");' class='btn btn-sm btn-lightblue'><i class='fa fa-print'>&nbsp;" + "طباعه ملخص التفريغ" + "&nbsp;</i></button></td>")
                + (window.LD_TypeID == "10" ? "<td></td>" : "<td> <button tag=" + item.ID + " type='button' onclick='PrintLoadingAndDischargingCranes(" + item.ID + ");' class='btn btn-sm btn-lightblue'><i class='fa fa-print'>&nbsp;" + "بيان تشغيل أوناش" + "&nbsp;</i></button></td>")

                + "<td class='hLoadingandDischargingData'><a href='#LoadingandDischargingDataModal' data-toggle='modal' onclick='LoadingandDischargingData_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        
    });
    //   ApplyPermissions();
    BindAllCheckboxonTable("tblLoadingandDischargingData", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblLoadingandDischargingData>tbody>tr", $("#txt-Search").val());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $(".swapChildrenClass:not(.reversed)").reverseChildren();

    }
}
function LoadingandDischargingData_EditByDblClick(pID) {
    jQuery("#LoadingandDischargingDataModal").modal("show");
    LoadingandDischargingData_FillControls(pID);
}
// Loading with data
function LoadingandDischargingData_LoadingWithPaging() {
    debugger;
    //  LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/LoadingandDischargingData/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { LoadingandDischargingData_BindTableRows(pTabelRows); LoadingandDischargingData_ClearAllControls(); });
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/LoadingandDischargingData/LoadWithWhereClause", " Where IsNull( TypeID , 10 ) = " + window.LD_TypeID + "", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { LoadingandDischargingData_BindTableRows(pTabelRows); });

   //LoadWithPagingWithWhereClause(pDivPagerName, pSelectPageSizeName, pSpnFirstPageRowName, pSpnLastPageRowName, pSpnTotalCountName, pDivTextTotalModal, pServiceFunctionName, pWhereClause, pPageNumber, pPageSize, callback, pFadePageCover) {


    HighlightText("#tblLoadingandDischargingData>tbody>tr", $("#txt-Search").val().trim());
}

//var IsOldName = "0";
var Isvalidated = true;

function LoadingandDischargingData_Save(pSaveandAddNew) {
    Isvalidated = true;
    if (IsNull($('#txtCloseDate').val(), "0") == "0") {
        swal(" Please Select Close Date");
        Isvalidated = false;
        return false;
    }
    else if (IsNull(window.CurrentOperationID, "0") == "0") {
        swal(" Please Select Operation -  اختر العملية");
        Isvalidated = false;
        return false;
    }
    else if (IsNull($('#slVesselD').val(), "0") == "0") {
        swal(" Please Select Vessel - اختر المركب");
        Isvalidated = false;
        return false;
    }
    else if (IsNull($('#txtBerthNo').val(), "0") == "0") {
        swal(" Please Select BerthNo - ادخل الرصيف");
        Isvalidated = false;
        return false;
    }
    else if (IsNull($('#txtExpectedTotalQty').val(), "0") == "0") {
        swal(" Please Insert Expected Qty - ادخل الحمولة المتوقعة");
        Isvalidated = false;
        return false;
    }
    else if (IsNull($('#slCommodityID').val(), "0") == "0") {
        swal(" Please Select Commodity - ادخل البضاعه");
        Isvalidated = false;
        return false;
    }
    else if (IsNull($('#slMoveTypeID').val(), "0") == "0") {
        swal(" Please Select Service Type - ادخل نوع الخدمة");
        Isvalidated = false;
        return false;
    }
    else {
        $('#tblTruckers>tbody>tr').each(function (i, tr) {


            if (IsNull($(tr).find('td.TruckerID select').val(), "0") == "0") {
                swal("اختر مندوب الشحن - Please Select Trucker");
                Isvalidated = false;
                return false;
            }
            else if (IsNull($(tr).find('td.TruckingTypeID select').val(), "0") == "10" && IsNull($(tr).find('td.DestinationCityID select').val(), "0") == "0") {
                swal("اختر الجهة - Please Select Destination");
                Isvalidated = false;
                return false;
            }
            else if (IsNull($(tr).find('td.TruckingTypeID select').val(), "0") == "20" && IsNull($(tr).find('td.StoreID select').val(), "0") == "0") {
                swal("اختر الجهة - Please Select Destination");
                Isvalidated = false;
                return false;
            }
            else if (i == $('#tblTruckers>tbody>tr').length - 1) {

                if (Isvalidated) {
                    debugger;



                    $.ajax({
                        type: "GET",
                        url: "/api/LoadingandDischargingData/InsertItems",
                        data:
                            {
                                
                            pSerial: IsNull($('#txtSerial').val(), "0"),
                            pOperationID: IsNull(window.CurrentOperationID, "0"),
                            pCustomerID: "0",
                            pFromCityID: IsNull($('#slFromCityID').val(), "0"),
                            pBerthNo: IsNull($('#txtBerthNo').val(), "0"),
                            pCommodityID: IsNull($('#slCommodityID').val(), "0"),
                            pMoveTypeID: IsNull($('#slMoveTypeID').val(), "0"),
                            pStartDate: ConvertDateFormat(IsNull($('#txtStartDate').val(), "0")),
                            pCloseDate: ConvertDateFormat(IsNull($('#txtCloseDate').val(), "0")),
                            pVesselD: IsNull($('#slVesselD').val(), "0"),
                            pNotes: IsNull($('#txtNotes').val(), "0"),
                            pToCityID: "0",
                            pCode: "0",
                            pTypeID: IsNull( window.LD_TypeID , 10 ),
                            pParentID:"0",
                            pFromDate:  IsNull($('#txtFromDate').val(), "0") == "0" ? ConvertDateFormat(IsNull($('#txtCloseDate').val(), "0")) : ConvertDateFormat(IsNull($('#txtFromDate').val(), "0"))   ,
                            pExpectedTotalQty: IsNull($('#txtExpectedTotalQty').val(), "0"),
                            pDefaultUnitID : 1 ,
                            pID: IsNull($('#hID').val(), "0"),
                            pItems: JSON.stringify(SetArrayOfTruckers()) 

                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (pData) {
                            if (pData[0] != 0) {


                                if (ListofCraneObject != null && ListofCraneObject.length > 0) {
                                    $("#hID").val(pData[0]);
                                    SaveLoadingAndDischargingHeaderCranesDetailsFromExcel(ListofCraneObject);
                                }
                                else
                                {

                                    SetConfigurationAfterSave(pData[0]);


                                }
                                
                            }
                            else {
                                FadePageCover(false);
                                swal(data[1]);
                            }

                        }
                    });

                }

            }






        });
    }



}

function SetConfigurationAfterSave(ID) {

    //swal("Sorry", "You Must Delete Payment First");
    FadePageCover(false);

    swal("Success", " data saved successfully.");
    LoadingandDischargingData_LoadingWithPaging();
    //------------------------------------- ----------- -  - - - - -- - - - - -
    setTimeout(function () {
        //----------------------------------------------------------------------- For New
        //ArrDeletedTruckers = [];
        //$("#hID").val("0");
        //ClearAll("#LoadingandDischargingDataModal", null);
        //$('#tblTruckers > tbody').html('');
        //IntializeData();
        //ClearAllTableRows('tblTruckers');
        //LoadingandDischargingData_LoadingWithPaging();
        //----------------------------------------------------------------------- For Complete Same Operation
        $("#hID").val(ID );
        LoadingandDischargingTruckers_BindTableRows();
        LoadingandDischargingCranes_BindTableRows();
    }, 300);
}



function LoadingandDischargingData_Delete(pID) {
    DeleteListFunction("/api/LoadingandDischargingData/DeleteByID", { "pID": pID, "type": "1" }, function () { LoadingandDischargingData_LoadingWithPaging(); });
}

function LoadingandDischargingData_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblLoadingandDischargingData') != "")
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
                DeleteListFunction("/api/LoadingandDischargingData/Delete", { "pLoadingandDischargingDataIDs": GetAllSelectedIDsAsString('tblLoadingandDischargingData'), "type": "1" }, function () { LoadingandDischargingData_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/LoadingandDischargingData/Delete", { "pLoadingandDischargingDataIDs": GetAllSelectedIDsAsString('tblLoadingandDischargingData') }, function () { LoadingandDischargingData_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data



function LoadingandDischargingData_FillControls(pID) {
    $('#tblTruckers > tbody').html('');
    debugger;
    ClearAll("#LoadingandDischargingDataModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

    $("#txtSerial").val($(tr).find("td.Serial").attr('val'));
    $("#slFromCityID").val($(tr).find("td.FromCityID").attr('val'));
    $("#slFromCityID").trigger('change');
    $("#txtBerthNo").val($(tr).find("td.BerthNo").attr('val'));
   // $("#txtExpectedTotalQty").val($(tr).find("td.BerthNo").attr('val'));
    $("#slCommodityID").val($(tr).find("td.CommodityID").attr('val'));
    $("#slCommodityID").trigger('change');
    $("#slMoveTypeID").val($(tr).find("td.MoveTypeID").attr('val'));
    $("#slMoveTypeID").trigger('change');
    $("#txtStartDate").val($(tr).find("td.StartDate").attr('val'));
    $("#txtCloseDate").val($(tr).find("td.CloseDate").attr('val'));
    $("#txtFromDate").val(IsNull($(tr).find("td.FromDate").attr('val'), $(tr).find("td.CloseDate").attr('val')));
    $("#txtExpectedTotalQty").val($(tr).find("td.ExpectedTotalQty").attr('val'));
    $("#slVesselD").val($(tr).find("td.VesselD").attr('val'));
    $("#slVesselD").trigger('change');
    $("#txtNotes").val($(tr).find("td.Notes").attr('val'));
    window.CurrentOperationID = $(tr).find("td.OperationID").attr('val');

    GetOperationInfoByID(window.CurrentOperationID, function (operation) {
        FillOperationInfo(operation);
    });

    LoadingandDischargingTruckers_BindTableRows();
    LoadingandDischargingCranes_BindTableRows();
    $("#btnSave").attr("onclick", "LoadingandDischargingData_Save(false);");
    $("#btnSaveandNew").attr("onclick", "LoadingandDischargingData_Save(true);");
}

function LoadingandDischargingData_ClearAllControls()
{
    debugger;
    $("#slOperationID").val('').trigger('change');
    $("#slOperationID").text('');
    ClearAll("#LoadingandDischargingDataModal", null);
    $('#tblTruckers > tbody').html('');
    $("#txtSerial").val("");
    $("#txtExpectedTotalQty").val("");
    $("#slFromCityID").val("0");
    $("#slFromCityID").trigger('change');
    $("#txtBerthNo").val("");
    $("#slCommodityID").val("0");
    $("#slCommodityID").trigger('change');
    $("#slMoveTypeID").val("0");
    $("#slMoveTypeID").trigger('change');
    $('#txtStartDate').val(getTodaysDateInddMMyyyyFormat());
    $('#txtCloseDate').val(getTodaysDateInddMMyyyyFormat());
    $('#txtFromDate').val(getTodaysDateInddMMyyyyFormat());
   // LoadingandDischargingData_ClearAllControls
    $("#slVesselD").val("0");
    $("#slVesselD").trigger('change');
    $("#txtNotes").val("");
    window.CurrentOperationID = null;
    LoadingandDischargingTruckers_BindTableRows();
    LoadingandDischargingCranes_BindTableRows();
    $("#btnSave").attr("onclick", "LoadingandDischargingData_Save(false);");
    $("#btnSaveandNew").attr("onclick", "LoadingandDischargingData_Save(true);");
    $("#btnSave").attr("onclick", "LoadingandDischargingData_Save(false);");
    $("#btnSaveandNew").attr("onclick", "LoadingandDischargingData_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
    $("#hID").val("0");
}

//#region Truckers
var TruckerRowsCounter = 0;
var ArrDeletedTruckers = [];
function LoadingandDischargingData_AddTruckers() {
    AppendRowtoTable("tblTruckers",
        ("<tr ID='" + 0 + "'>"
            + "<td> <button tag=" + 0 + " id='btn-DeleteDetails' type='button' onclick='DeleteTruckers(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + '<td class="TruckerID"><select class="input-sm form-control selecttrucker" tag="0" id="slTrucker_' + (TruckerRowsCounter) + '">' + $("#hidden_slTruckers").html() + '</select></td>'
            + '<td class="PackageTypeID"><select class="input-sm form-control selectpackagetype" tag="0" id="slPackageType_' + (TruckerRowsCounter) + '"><option value="10">صب</option><option value="20">B.B معبأ</option><option value="30">معبأ اجوله</option></select></td>'
            + '<td class="TruckingTypeID"><select class="input-sm form-control selectTruckingTypeID" tag="0" id="slTruckingTypeID_' + (TruckerRowsCounter) + '" onchange="TruckingType_Changed(' + TruckerRowsCounter + ');"><option value="10">صرف مباشر</option><option value="20">تخزين</option></select></td>'
            + '<td class="DestinationCityID" id="DestinationCityID_' + (TruckerRowsCounter) + '"><select class="input-sm form-control selectDestinationCityID" tag="0" id="slDestinationCityID_' + (TruckerRowsCounter) + '">' + $("#hidden_slCities").html() + '</select></td>'
            + '<td class="StoreID hide" id="StoreID_' + (TruckerRowsCounter) + '"><select class="input-sm selectitem form-control selectStoreID" tag="0" id="slStoreID_' + (TruckerRowsCounter) + '">' + $("#hidden_slStores").html() + '</select></td>'
                    +   '   <td>   <div class="flag note note--warning">'
                    +  '  <div class="flag__image note__icon">'
                    +    '    <i class="fa fa-bell"></i>'
                    + '  </div>'
                    + '  <div class="flag__body note__text AssetsNotificationsBody">'
                    + '     يجب عمل حفظ لادخال ملف الاكسل '
                    + '   </div>'
                    + '   <a href="#" class="note__close hide">'
                    + '       <i class="fa fa-times"></i>'
                    + '   </a>'
            + ' </div> <td> '



            + '<td></td>'
            + '<td></td>'
            + "</tr>"));

    $("#slTrucker_" + (TruckerRowsCounter)).css({ 'width': '100%' }).select2();
    $("#slDestinationCityID_" + (TruckerRowsCounter)).addClass('IsAutoSelect');
    $("#slStoreID_" + (TruckerRowsCounter)).addClass('IsAutoSelect');
    $("div[tabindex='-1']").removeAttr('tabindex');

    TruckerRowsCounter = (TruckerRowsCounter + 1);


}
function TruckingType_Changed(index)
{
    var type = $('#slTruckingTypeID_' + index).val();
    if(type == 10)
    {
        $('#DestinationCityID_' + index).removeClass('hide');
        $('#StoreID_' + index).addClass('hide');
        $('#slStoreID_' + index).val('').change();
    }
    else if(type == 20)
    {
        $('#DestinationCityID_' + index).addClass('hide');
        $('#StoreID_' + index).removeClass('hide');
        $('#slDestinationCityID_' + index).val('').change();
    }
}
function LoadingandDischargingTruckers_BindTableRows() {
    debugger
    ClearAllTableRows("tblTruckers");
    FadePageCover(true)

    $.ajax({
        type: "GET",
        url: strServerURL + "/api/LoadingandDischargingData/LoadLoadingAndDischargingHeaderTruckers",
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
                AppendRowtoTable("tblTruckers", 
                  (  "<tr ID='" + (typeof item.ID == "undefined" ? "0" : item.ID) + "'>"
                      + "<td> <button tag=" + item.ID + " id='btn-DeleteDetails" + (typeof item.ID == "undefined" ? "0" : item.ID) +"' type='button' onclick='DeleteTruckers(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                      + '<td class="TruckerID"><select class="input-sm selectitem form-control selecttrucker" tag="' + item.TruckerID+'" id="slTrucker_' + (TruckerRowsCounter) + '">' + $("#hidden_slTruckers").html() + '</select></td>'
                      + '<td class="PackageTypeID"><select class="input-sm selectitem form-control selectpackagetype" tag="' + IsNull(item.PackageTypeID, 10) + '" id="slPackageType_' + (TruckerRowsCounter) + '"><option value="10">صب</option><option value="20">B.B معبأ</option><option value="30">معبأ اجوله</option></select></td>'
                      + '<td class="TruckingTypeID"><select class="input-sm selectitem form-control selectTruckingTypeID" tag="' + IsNull(item.TruckingTypeID, 10) + '" id="slTruckingTypeID_' + (TruckerRowsCounter) + '" onchange="TruckingType_Changed(' + TruckerRowsCounter + ');"><option value="10">صرف مباشر</option><option value="20">تخزين</option></select></td>'
                      + '<td class="DestinationCityID ' + (item.TruckingTypeID == 10 ? "" : "hide") + '"><select class="input-sm selectitem form-control selectDestinationCityID" tag="' + item.DestinationCityID + '" id="slDestinationCityID_' + (TruckerRowsCounter) + '">' + $("#hidden_slCities").html() + '</select></td>'
                      + '<td class="StoreID ' + (item.TruckingTypeID == 20 ? "":"hide") + '"><select class="input-sm selectitem form-control selectStoreID" tag="' + item.StoreID + '" id="slStoreID_' + (TruckerRowsCounter) + '">' + $("#hidden_slStores").html() + '</select></td>'
                      + '<td><div class="col-sm-12 swapChildrenClass" style="display: inline-flex;"> '
                      + '             <input type="file" class="input-sm form-control" name="ImportExcel" title="Select File" id="excelfile' + (item.TruckingTypeID == 20 ? (typeof item.TransID == "undefined" ? "0" : item.TransID) : (typeof item.ID == "undefined" ? "0" : item.ID)) + '" style="width: 60%;" accept=".xls,.xlsx" />'
                      + '                          <a id="btnImportExcel' + (typeof item.ID == "undefined" ? "0" : item.ID) + '" class="btn btn-primary btn-sm" onclick="ImportExcel_LoadingandDischargingData(\'#excelfile' + (item.TruckingTypeID==20?(typeof item.TransID == "undefined" ? "0" : item.TransID):(typeof item.ID == "undefined" ? "0" : item.ID))  + '\' , ' + (item.TruckingTypeID==20?(typeof item.TransID == "undefined" ? "0" : item.TransID):(typeof item.ID == "undefined" ? "0" : item.ID))  +' , `'+(item.TruckingTypeID == 20 ? 'Storage':'Truckers')+'`);">'
                      + '                                <span class=fa fa-table"></span>Save-حفظ'
                      + '              </a>'
                      + '          </div></td>'
                      + (item.CountOfDetails == 0 ? '<td>0.00</td>' : '<td>' + '<h3>' + item.TotalCustody + '</h3>' + '</td>')
                      + (item.CountOfDetails < 0 ? '<td>0.00</td>' : '<td>' + '<h3>' + item.TotalLoadedQty + '</h3>' + '</td>')
                      + '<td><button type="button" class="btn btn-danger" onclick="DeleteLDTruckerDetails('+item.ID+')"><i class="fa fa-times"></i></button></td>'
                      + (item.TotalLoadedQty == 0 ? '<td></td>' : '<td>' + '<a href="#" onclick="' + (item.TruckingTypeID == 20 ? 'PrintHeaderFullDetailsByTransID( ' + item.StorageID + ', ' + item.TransID + ');' : 'PrintHeaderFullDetailsByTruckerID( ' + $('#hID').val() + ', ' + item.TruckerID + ');') + '" class="btn btn-xs btn-rounded btn-lightblue float-right"> <i class="fa fa-folder-open" style="padding-left: 5px;"></i> <span style="padding-right: 5px;">عرض البيانات</span></a>' + '</td>')
                        + "</tr>"));
                TruckerRowsCounter = item.ID + 1;
                debugger
                if (i == items.length - 1) {
                    // var a = $('#tblTruckers > tbody > tr').length

                    FillHTMLtblInputs("#tblTruckers>tbody tr");
                    //SetDatepickerFormat();
                    // CalculateDistructions();
                    $("select.selectitem").each(function (i, sl) {
                        if ($(sl).hasClass('IsAutoSelect') == false) {
                            $(sl).css({ 'width': '100%' }).select2();
                            $(sl).addClass('IsAutoSelect');
                            // $(sl).trigger("change");
                            $("div[tabindex='-1']").removeAttr('tabindex');
                        }

                    });

                }

            });
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });






}

var ListofObject = new Array();
function FillTruckersParametersFromExcel(jsondata , pHeaderID)
{/*Function used to convert the JSON array to Html Table*/
    debugger;

    ListofObject = [];


    var columns = GetHeadersColumnsFromExcel(jsondata); /*Gets all the column headings of Excel*/
    for (var i = 0; i < jsondata.length; i++) {

        ListofObject.push({
            HeaderTruckerID: pHeaderID,
            VehicleNo: IsNull( (jsondata[i][columns[0]]).toString() , "0" ),
            CustodyNo: parseFloat( IsNull((jsondata[i][columns[1]]).toString(), "0.00")),
            BillNo: IsNull((jsondata[i][columns[2]]).toString(), "0"),
            LoadedQty: parseFloat(IsNull((jsondata[i][columns[3]]).toString(), "0.00")),
            Date: ConvertDateFormat( IsNull((jsondata[i][columns[4]]).toString(), "0")),
            Notes: IsNull((jsondata[i][columns[5]]).toString(), "0")
            //PackageTypeID: "0"
        });


       // console.log(" Date : " + ConvertDateFormat(IsNull((jsondata[i][columns[4]]).toString(), "0")));



        if (i == jsondata.length - 1) {
            SaveLoadingAndDischargingHeaderTruckersDetailsFromExcel( ListofObject );
        }

    }

    if (jsondata == null || jsondata.length == 0) {
        return ListofObject;
    }
}


function DeleteTruckers(This) {

    if ($(This).attr('tag') == "0" || $(This).attr('tag') == "" || $(This).attr('tag') == null) {
        $(This).closest('tr').remove();

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
                ArrDeletedTruckers.push($(This).attr('tag'));
                $(This).closest('tr').remove();
            });

    }

}
function DeleteLDTruckerDetails(pHeaderTruckerID)
{
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
                 CallGETFunctionWithParameters("/api/LoadingandDischargingData/DeleteLDTruckerDetails", { 'pHeaderTruckerID': pHeaderTruckerID }
                 , function (pData) {
                     LoadingandDischargingTruckers_BindTableRows();
                 }
                 , null);
             });

}
function SetArrayOfTruckers() {
    // var cobjItem = null;
    debugger;
    var arrayOfItems = new Array();
    $("#tblTruckers tbody tr").each(function (i, tr) {
        debugger;

        if ($('#hID').val() == "")
            $('#hID').val("0");


        var objItem = new Object();

        objItem.ID = $(tr).attr('ID');
        objItem.HeaderID = IsNull($('#hID').val(), "0");
        objItem.TruckerID = IsNull($(tr).find('td.TruckerID').find("select").val(), "0");
        objItem.DestinationCityID = IsNull($(tr).find('td.DestinationCityID').find("select").val(), "0");
        objItem.StoreID = IsNull($(tr).find('td.StoreID').find("select").val(), "0");
        objItem.PackageTypeID = IsNull($(tr).find('td.PackageTypeID').find("select").val(), "0");
        objItem.TruckingTypeID = IsNull($(tr).find('td.TruckingTypeID').find("select").val(), "0");
        
        objItem.Notes = "0";

        arrayOfItems.push(objItem);
    });


    console.log(arrayOfItems);


    return arrayOfItems;
}

function SaveLoadingAndDischargingHeaderTruckersDetailsFromExcel(arrOfItems) {

    debugger
    $.ajax({
        type: "POST",
        url: "/api/LoadingandDischargingData/InsertLoadingAndDischargingHeaderTruckersDetailsFromExcel",
        dataType: 'json',
        data: { "": JSON.stringify(arrOfItems) },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",/*"application/json; charset=utf-8"*/

        success: function (pData) {
            if (pData[0] != 0) {
                //swal("Sorry", "You Must Delete Payment First");
                FadePageCover(false);

                swal("Success", " Excel is saved -  تم حفظ بيانات الاكسل ");

                LoadingandDischargingTruckers_BindTableRows();
                //LoadingandDischargingData_LoadingWithPaging();
                //------------------------------------- ----------- -  - - - - -- - - - - -
                setTimeout(function () {
                }, 300);



            }
            else {
                FadePageCover(false);
                swal(pData[1]);
            }

        }
    });




}
//#endregion Truckers

//#region Storage

function FillTransParametersFromExcel(jsondata, pHeaderID) {/*Function used to convert the JSON array to Html Table*/
    debugger;

    ListofObject = [];


    var columns = GetHeadersColumnsFromExcel(jsondata); /*Gets all the column headings of Excel*/
    for (var i = 0; i < jsondata.length; i++) {

        ListofObject.push({
            TransID: pHeaderID,
            Qty: parseFloat(IsNull((jsondata[i][columns[0]]).toString(), "0.00")),
            TransDate: ConvertDateFormat(IsNull((jsondata[i][columns[1]]).toString(), "0")),
            Notes: IsNull((jsondata[i][columns[2]]).toString(), "0")
        });

        if (i == jsondata.length - 1) {
            SaveTransDetailsFromExcel(ListofObject);
        }

    }

    if (jsondata == null || jsondata.length == 0) {
        return ListofObject;
    }
}

function SaveTransDetailsFromExcel(arrOfItems) {

    debugger
    $.ajax({
        type: "POST",
        url: "/api/LD_Storage/InsertStorageTransactionsFromExcel",
        dataType: 'json',
        data: { "": JSON.stringify(arrOfItems) },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",/*"application/json; charset=utf-8"*/

        success: function (pData) {
            if (pData[0] != 0) {
                //swal("Sorry", "You Must Delete Payment First");
                FadePageCover(false);

                swal("Success", " Excel is saved -  تم حفظ بيانات الاكسل ");

                LoadingandDischargingTruckers_BindTableRows();

                setTimeout(function () {
                }, 300);
            }
            else {
                FadePageCover(false);
                swal(pData[1]);
            }
        }
    });
}
//#endregion Storage

//#region Truckers
var CraneRowsCounter = 0;
var ArrDeletedCranes = [];
function LoadingandDischargingData_AddCranes(FromExcelObject) {
    AppendRowtoTable("tblCranes",
        ("<tr ID='" + 0 + "'>"
            + "<td> <button tag=" + 0 + " id='btn-DeleteDetails' type='button' onclick='DeleteCranes(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + '<td class="EquipmentID"><select disabled class="input-sm form-control selectCrane" tag="' + FromExcelObject.EquipmentID +'" id="slEquipmentID_' + (CraneRowsCounter) + '">' + $("#hidden_slEquipments").html() + '</select></td>'
            + '<td val="' + FromExcelObject.FromDate.split(' ')[1] + '">' + FromExcelObject.FromDate.split(' ')[1]  + '</td>'
            + '<td val="' + FromExcelObject.FromDate.split(' ')[0]) + '">' + ConvertDateFormat(FromExcelObject.FromDate.split(' ')[0]) + '</td>'
            + '<td val="' + FromExcelObject.ToDate.split(' ')[1] + '">' + FromExcelObject.ToDate.split(' ')[1]  + '</td>'
            + '<td val="' + FromExcelObject.ToDate.split(' ')[0] + '">' + ConvertDateFormat(FromExcelObject.ToDate.split(' ')[0]) + '</td>'
            + '<td val="' + FromExcelObject.Notes +'" class="hide">' + FromExcelObject.Notes + '</td>'
            + "</tr>");

    $("#slEquipmentID_" + (CraneRowsCounter)).css({ 'width': '100%' }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');
    FillHTMLtblInputs("#tblCranes>tbody tr");
    //SetDatepickerFormat();
    // CalculateDistructions();
    $("select.selectCrane").each(function (i, sl) {
        if ($(sl).hasClass('IsAutoSelect') == false) {
            $(sl).css({ 'width': '100%' }).select2();
            $(sl).addClass('IsAutoSelect');
            // $(sl).trigger("change");
            $("div[tabindex='-1']").removeAttr('tabindex');
        }

    });
    CraneRowsCounter = (CraneRowsCounter + 1);
}

function LoadingandDischargingCranes_BindTableRows() {
    debugger
    ClearAllTableRows("tblCranes");
    FadePageCover(true);


    ListofCraneObject = [];



    $.ajax({
        type: "GET",
        url: strServerURL + "/api/LoadingandDischargingData/LoadLoadingAndDischargingHeaderCranes",
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
                AppendRowtoTable("tblCranes",
                    ("<tr ID='" + (typeof item.ID == "undefined" ? "0" : item.ID) + "'>"
                        + "<td> <button tag=" + item.ID + " id='btn-DeleteDetails" + (typeof item.ID == "undefined" ? "0" : item.ID) + "' type='button' onclick='DeleteCranes(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                        + '<td class="EquipmentID"><select disabled class="input-sm form-control selectCrane" tag="' + item.EquipmentID + '" id="slEquipmentID_' + (CraneRowsCounter) + '">' + $("#hidden_slEquipments").html() + '</select></td>'

                        + '<td val="' + item.FromTime + '">' + item.FromTime + '</td>'
                        + '<td val="' + ConvertDateFormat(item.FromDate) + '">' + GetDateFromServer( item.FromDate ) + '</td>'
                        + '<td val="' + item.ToTime + '">' +  item.ToTime + '</td>'
                        + '<td val="' + item.ToDate + '">' + GetDateFromServer( item.ToDate )+ '</td>'
                        + '<td val="' + item.Notes + '" class="hide">' + item.Notes + '</td>'
                        + "</tr>"));


                var AddedObject = {
                    LoadingAndDischargingHeaderID: item.LoadingAndDischargingHeaderID,
                    EquipmentID: item.EquipmentID,
                    FromDate: ConvertDateFormat(GetDateFromServer(item.FromDate)) + ' ' +  item.FromTime ,
                    ToDate: ConvertDateFormat(GetDateFromServer(item.ToDate)) + ' ' + item.ToTime ,
                    Notes: "0"
                };

                ListofCraneObject.push(AddedObject);




                CraneRowsCounter = item.ID + 1;
                debugger
                if (i == items.length - 1) {
                    // var a = $('#tblTruckers > tbody > tr').length

                    FillHTMLtblInputs("#tblCranes>tbody tr");
                    //SetDatepickerFormat();
                    // CalculateDistructions();
                    $("select.selectCrane").each(function (i, sl) {
                        if ($(sl).hasClass('IsAutoSelect') == false) {
                            $(sl).css({ 'width': '100%' }).select2();
                            $(sl).addClass('IsAutoSelect');
                            // $(sl).trigger("change");
                            $("div[tabindex='-1']").removeAttr('tabindex');
                        }

                    });

                }

            });
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });






}

var ListofCraneObject = new Array();
function FillCranesParametersFromExcel(jsondata, pHeaderID) {/*Function used to convert the JSON array to Html Table*/
    debugger;

    ListofCraneObject = [];
    $('#tblCranes body').html('');

    var columns = GetHeadersColumnsFromExcel(jsondata); /*Gets all the column headings of Excel*/
    for (var i = 0; i < jsondata.length; i++) {

        var _EquipmentID = $('#hidden_slEquipments option[name="' + IsNull((jsondata[i][columns[0]]).toString(), "0") + '"]').attr("value");


        if (IsNull(_EquipmentID, "0") != "0") {



            var FromDate = ""; // moment(jsondata[i][columns[1]).format('MM/DD/YYYY');
            var ToDate = "";// moment(jsondata[i][columns[1]).format('MM/DD/YYYY');

            if (moment(jsondata[i][columns[1]]).format() === 'Invalid date')
            {
                FromDate = ConvertDateFormat(IsNull((jsondata[i][columns[1]]).toString(), "0"));
            }
            else
            {
                FromDate = moment(jsondata[i][columns[1]]).add(1, 'days').format('MM/DD/YYYY');
            }


            if (moment(jsondata[i][columns[3]]).format() === 'Invalid date')
            {
                ToDate = ConvertDateFormat(IsNull((jsondata[i][columns[3]]).toString(), "0"))
            }
            else
            {
                ToDate = moment(jsondata[i][columns[3]]).add(1, 'days').format('MM/DD/YYYY');
            }


            var AddedObject = {
                LoadingAndDischargingHeaderID: 0,
                EquipmentID: _EquipmentID,
                FromDate: FromDate + ' ' + IsNull((jsondata[i][columns[2]]).toString(), "0").split(' ')[4],
                ToDate:   ToDate + ' ' + IsNull((jsondata[i][columns[4]]).toString(), "0").split(' ')[4],
                Notes: "0"
            };

            ListofCraneObject.push(AddedObject);


            LoadingandDischargingData_AddCranes(AddedObject);

        }
        else
        {
            ListofCraneObject = [];
            $('#tblCranes body').html('');

            swal('sorry - معذرة', IsNull((jsondata[i][columns[0]]).toString(), "0") + " غير موجود بالسيستم " + "\r\n" + "Is Not Found In The System" , "warning" )

        }



        if (i == jsondata.length - 1) {
            SaveLoadingAndDischargingHeaderCranesDetailsFromExcel(ListofCraneObject);
        }

    }

    if (jsondata == null || jsondata.length == 0) {
        return ListofObject;
    }
}


function DeleteCranes(This) {

    if ($(This).attr('tag') == "0" || $(This).attr('tag') == "" || $(This).attr('tag') == null) {
        $(This).closest('tr').remove();

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
                ArrDeletedCranes.push($(This).attr('tag'));
                $(This).closest('tr').remove();
            });

    }

}

function SetArrayOfCranes() {
    // var cobjItem = null;
    debugger;
    var arrayOfItems = new Array();
    $("#tblCranes tbody tr").each(function (i, tr) {
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

function SaveLoadingAndDischargingHeaderCranesDetailsFromExcel(arrOfItems) {
    setAllArrayObObjects(arrOfItems, "LoadingAndDischargingHeaderID", $("#hID").val(), function () {

        debugger
        $.ajax({
            type: "POST",
            url: "/api/LoadingandDischargingData/InsertLoadingAndDischargingHeaderCranesDetailsFromExcel",
            dataType: 'json',
            data: { "": JSON.stringify(arrOfItems) },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",/*"application/json; charset=utf-8"*/

            success: function (pData) {
                if (pData[0] != 0) {
                    //swal("Sorry", "You Must Delete Payment First");
                    FadePageCover(false);

                    swal("Success", " Excel is saved -  تم حفظ بيانات الاكسل ");

                    SetConfigurationAfterSave($("#hID").val());



                }
                else {
                    FadePageCover(false);
                    swal(pData[1]);
                }

            }
        });
    });

}
//#endregion Truckers

//#region Excel


function LoadingandDischargingDataManage_ClearAllControls() {

}


function ImportExcel_LoadingandDischargingData(HashUplaodFileID, pHeaderID, Type) {
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
                        if (Type == 'Truckers') {
                            FillTruckersParametersFromExcel(exceljson, pHeaderID);
                        }
                        else if(Type == 'Storage')
                        {
                            FillTransParametersFromExcel(exceljson, pHeaderID);
                        }
                        else
                        {
                            FillCranesParametersFromExcel(exceljson, pHeaderID);
                        }

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


function PrintHeaderFullDetails(ID)
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
        , pTitle: (window.LD_TypeID == "10" ? "LD_TransportDetails" : "LD_LoadingAndDischargingFullDetails")
        , pReportName: (window.LD_TypeID == "10" ? "LD_TransportDetails" : "LD_LoadingAndDischargingFullDetails")
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
        , pTitle: (window.LD_TypeID == "10" ? "LD_TransportDetailsGroupByTruckers" : "LD_LoadingAndDischargingFullDetailsGroupByTruckers")
        , pReportName: (window.LD_TypeID == "10" ? "LD_TransportDetailsGroupByTruckers" : "LD_LoadingAndDischargingFullDetailsGroupByTruckers")
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
        , pTitle: (window.LD_TypeID == "10" ? "LD_TransportDetailsByTruckerID" : "LD_LoadingAndDischargingFullDetailsByTruckerID") 
        , pReportName: (window.LD_TypeID == "10" ? "LD_TransportDetailsByTruckerID" : "LD_LoadingAndDischargingFullDetailsByTruckerID") 
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;

}
function PrintHeaderFullDetailsByTransID(ID, TransID) {
    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("WhereClause");
    arr_Values.push(" where StorageID = " + ID + " and TransID = " + TransID + "");


    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "LD_StorageTransDetails"
        , pReportName: "LD_StorageTransDetails"
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;

}

function PrintHeaderSummary(ID) {
    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("HeaderID");
    arr_Values.push(ID);

    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: (window.LD_TypeID == "10" ? "LD_LoadingAndDischargingSummary" : "LD_LoadingAndDischargingSummary")
        , pReportName: (window.LD_TypeID == "10" ? "LD_LoadingAndDischargingSummary" : "LD_LoadingAndDischargingSummary")
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;

}

function PrintLoadingAndDischargingCranes(ID) {
    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("HeaderID");

    arr_Values.push(ID);


    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: (window.LD_TypeID == "10" ? "LD_LoadingAndDischargingCranes" : "LD_LoadingAndDischargingCranes")
        , pReportName: (window.LD_TypeID == "10" ? "LD_LoadingAndDischargingCranes" : "LD_LoadingAndDischargingCranes")
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;

}



//#endregion Printing
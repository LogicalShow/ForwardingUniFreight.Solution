var maxVehicleTrackingDetailsIDInTable = 0; //used for when adding new row then make td control names unique
function VehicleTracking_Initialize() {
    debugger;
    var TodaysDate = new Date();
    var CurrentYear = TodaysDate.getUTCFullYear();
    var CurrentMonth = (TodaysDate.getMonth() + 1).toString().padStart(2, 0);
    $("#hl-menu-ContainerTrackingGroup").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "VehicleTracking_BindTableRows";
    strLoadWithPagingFunctionName = "/api/OperationVehicle/VehicleAction_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    var pWhereClause = "WHERE 1=1";
    var pOrderBy = "CodeSerial DESC, Line";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClauseForVehicleAction: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/ContainerTrackingGroup/ContainerTrackingTab/VehicleTracking", "div-content", function () {
            //LoadView("/MasterData/ModalSelectCharges", "div-content", function () { $("#slPayableBillTo").parent().addClass("hide"); $("#btn-SetDefaultNote").parent().addClass("hide"); }, null, null, true);//sherif: calling a partial view with only modal called from different places
            LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                , function (pData) {
                    var _VehicleAction = JSON.parse(pData[0]);
                    var _Warehouse = pData[2];
                    var _Trucker = pData[3];
                    var _NoAccessVehicleAction = pData[4];
                    GetListYears(CurrentYear, null, "slYearCutoff", null, null, parseInt(CurrentYear));
                    $("#slMonthCutoff").val(CurrentMonth);
                    VehicleTracking_BindTableRows(_VehicleAction);
                    FillListFromObject(null, 9, "<--Select-->", "slWarehouse_Temp", _Warehouse, function () { $("#slWarehouse").html($("#slWarehouse_Temp").html()); });
                    FillListFromObject(null, 2, "<--Select-->", "slTrucker", _Trucker, null);
                    FillListFromObject(null, 2, "<--Select-->", "slVehicleAction", _NoAccessVehicleAction, null);
                    //var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
                });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { VehicleTracking_ClearAllControls(); },
        function () { VehicleTracking_DeleteList(); });
}
function VehicleTracking_BindTableRows(pVehicleTracking) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblVehicleTracking");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pVehicleTracking, function (i, item) {
        AppendRowtoTable("tblVehicleTracking",
        ("<tr ID='" + item.ID + "' " + (1 == 2 ? "ondblclick='VehicleTracking_InitializeModal(" + item.VehicleActionID + "," + item.ID + ");'>" : ">")
            + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='NoAccessVehicleTrackingID hide'>" + item.VehicleTrackingID + "</td>"
            + "<td class='Line'>" + (item.Line == 0 ? "" : item.Line) + "</td>"
            + "<td class='VehicleActionID hide'>" + (item.VehicleActionID == 0 ? "" : item.VehicleActionID) + "</td>"
            + "<td class='VehicleActionName'>" + (item.VehicleActionName == 0 ? "" : item.VehicleActionName) + "</td>"
            + "<td class='Date'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ActionDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ActionDate)) : "") + "</td>"
            + "<td class='ChassisNumber'>" + (item.ChassisNumber == 0 ? "" : item.ChassisNumber) + "</td>"
            + "<td class='Notes'>" + (item.InspectionNotes == 0 ? "" : item.InspectionNotes) + "</td>"
            + "<td class='EngineNumber'>" + (item.EngineNumber == 0 ? "" : item.EngineNumber) + "</td>"
            + "<td class='DispatchNumber'>" + (item.DispatchNumber == 0 ? "" : item.DispatchNumber) + "</td>"
            + "<td class='PurchaseItemCode hide'>" + (item.PurchaseItemCode == 0 ? "" : item.PurchaseItemCode) + "</td>"
            + "<td class='PurchaseItemName'>" + (item.PurchaseItemName == 0 ? "" : item.PurchaseItemName) + "</td>"
            + "<td class='PaintType'>" + (item.PaintType == 0 ? "" : item.PaintType) + "</td>"
            + "<td class='FromWarehouseID hide'>" + (item.FromWarehouseID == 0 ? "" : item.FromWarehouseID) + "</td>"
            + "<td class='FromWarehouseCode'>" + (item.FromWarehouseCode == 0 ? "" : item.FromWarehouseCode) + "</td>"
            + "<td class='ToWarehouseID hide'>" + (item.ToWarehouseID == 0 ? "" : item.ToWarehouseID) + "</td>"
            + "<td class='ToWarehouseCode'>" + (item.ToWarehouseCode == 0 ? "" : item.ToWarehouseCode) + "</td>"
            + "<td class='CodeSerial'>" + (item.CodeSerial == 0 ? "" : item.CodeSerial) + "</td>"
            //+ "<td class='Name'>" + item.VehicleActionName + "</td>"
            //+ "<td class='TrackingDone'> <input id='cbIsDone" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.Done == true ? "true' checked='checked'" : "'") + " /></td>"
            //+ "<td class='hide'><a href='#VehicleTrackingModal' data-toggle='modal' onclick='VehicleTracking_InitializeModal(" + item.VehicleActionID + "," + item.ID + ");' " + editControlsText + "</a></td>"
            + "<td class='hide'>"
                //+ "<a href='#' data-toggle='modal' onclick='VehicleTracking_GetAvailableUsers(" + item.ID + ");' " + alarmControlsText + "</a>"
                //+ "<a href='#' data-toggle='modal' onclick='VehicleTracking_SendEmail(" + item.ID + ");' " + emailControlsText + "</a>"
            + "</td>"
        + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblVehicleTracking", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblVehicleTracking>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function VehicleTracking_LoadingWithPaging() {
    debugger;
    var pWhereClause = VehicleTracking_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "CodeSerial DESC, Line";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClauseForVehicleAction: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { VehicleTracking_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblVehicleTracking>tbody>tr", $("#txt-Search").val().trim());
}
function VehicleTracking_GetWhereClause() {
    debugger;
    var _WhereClause = "WHERE 1=1";
    if ($("#txt-Search").val().trim() != "") {
        _WhereClause += "AND (" + " \n";
        _WhereClause += "   LTRIM(RTRIM(STR(CodeSerial)))=N'" + $("#txt-Search").val().trim().toUpperCase() + "'" + " \n";
        _WhereClause += "   OR ChassisNumber=N'" + $("#txt-Search").val().trim().toUpperCase() + "'" + " \n";
        _WhereClause += "   OR EngineNumber=N'" + $("#txt-Search").val().trim().toUpperCase() + "'" + " \n";
        _WhereClause += "   OR DispatchNumber=N'" + $("#txt-Search").val().trim().toUpperCase() + "'" + " \n";
        _WhereClause += ")" + " \n";
    }
    return _WhereClause;
}
function VehicleTracking_InitializeModal(pVehicleActionID, pVehicleTrackingID) {
    debugger;
    //$("#divSerialsBtns").removeClass("hide");
    //$("#hReceiveDetailsID").val(pVehicleTrackingID);
    ClearAll("#VehicleTrackingModal");
    if (pVehicleActionID == constVehicleActionReceive) {
        $("#cbIsByDispatch").prop("checked", false);
        $("#cbIsByChassis").prop("checked", true);
        $("#slTrucker").parent().removeClass("hide");
        $("#slWarehouse").parent().removeClass("hide");
        $("#divSearchOption").removeClass("hide");
    }
    if (pVehicleActionID == constVehicleActionPickup) {
        $("#cbIsByDispatch").prop("checked", false);
        $("#cbIsByChassis").prop("checked", true);
        $("#slWarehouse").parent().addClass("hide");
        $("#slTrucker").parent().addClass("hide");
        $("#divSearchOption").removeClass("hide");
    }
    if (pVehicleActionID == constVehicleActionReturn) {
        $("#cbIsByDispatch").prop("checked", false);
        $("#cbIsByChassis").prop("checked", true);
        $("#slWarehouse").parent().removeClass("hide");
        $("#slTrucker").parent().removeClass("hide");
        $("#divSearchOption").addClass("hide");
    }
    if (pVehicleActionID == constVehicleActionSendToWarehouse) {
        $("#cbIsByDispatch").prop("checked", true);
        $("#divSearchOption").removeClass("hide");
        $("#slWarehouse").parent().removeClass("hide");
        $("#slTrucker").parent().addClass("hide");
    }
    $("#slVehicleAction").val(pVehicleActionID == 0 ? "" : pVehicleActionID);
    $("#txtVehicleTrackingDetailsChassisNumber_Search").val("");
    maxVehicleTrackingDetailsIDInTable = 0;
    var tr = $("#tblVehicleTrackingDetails tr[ID='" + pVehicleTrackingID + "']");
    //$("#lblVehicleTrackingDetailsShown").html(": " + $(tr).find("td.PurchaseItemCode").text());
    //$("#txtVehicleTrackingDetailsQuantity").val($(tr).find("td.Quantity").text());
    $("#tblVehicleTrackingDetails tbody").html("");
    FadePageCover(true);
    var pWhereClause = "WHERE 1=0";
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClauseForVehicleAction: pWhereClause, pOrderBy: pOrderBy }

    CallGETFunctionWithParameters("/api/OperationVehicle/VehicleAction_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
        , pControllerParameters
        , function (pData) {
            var pVehicleTrackingDetails = JSON.parse(pData[0]);
            VehicleTrackingDetails_BindTableRows(pVehicleTrackingDetails);
            FadePageCover(false);
        }
        , null);
}
function VehicleTracking_DeleteList() {
    debugger;
    var pVehicleActionIDsToDelete = GetAllSelectedIDsAsString('tblVehicleTracking');
    if (pVehicleActionIDsToDelete != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
        //callback function in case of confirm
        function () {
            FadePageCover(true);
            var pParametersWithValues = {
                pVehicleActionIDsToDelete: pVehicleActionIDsToDelete
            };
            CallGETFunctionWithParameters("/api/OperationVehicle/VehicleAction_Delete"
                , pParametersWithValues
                , function (pData) {
                    var _MessageReturned = pData[0];
                    if (_MessageReturned == "")
                        swal("Success", "Deleted successfully.");
                    else
                        swal("Sorry", _MessageReturned);
                    VehicleTracking_LoadingWithPaging();
                }
                , null);
        });
}
function VehicleTracking_Print() {
    debugger;
    if ($("#txtVehicleActionCodeSerial").val().trim() == "")
        swal("Sorry", "Select Doc No.");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pIsLoadArrayOfObjects: false
            , pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pPageNumber: 1
            , pPageSize: 999999
            , pWhereClauseForVehicleAction: "WHERE CodeSerial=N'" + $("#txtVehicleActionCodeSerial").val().trim().toUpperCase() + "'"
            , pOrderBy: "ID"
        };
        CallGETFunctionWithParameters("/api/OperationVehicle/VehicleAction_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
            , pParametersWithValues
            , function (pData) {
                var _VehicleTracking = JSON.parse(pData[0]);
                if (_VehicleTracking.length > 0) {
                    var _TodaysDate = getTodaysDateInddMMyyyyFormat();
                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>' + 'VehicleTracking' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';

                    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                    ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3><b>' + ' محضر فحص و إضافة ' + '</b></h3></div>';

                    ReportHTML += '             <div class="col-xs-12"><b>Doc. </b>' + (_VehicleTracking[0].CodeSerial == 0 ? '' : _VehicleTracking[0].CodeSerial) + '</div>';
                    ReportHTML += '             <div class="col-xs-12 m-l text-right">' + _TodaysDate + '<b>' + '  التاريخ  ' + '</b></div>';
                    ReportHTML += '             <div class="col-xs-12 m-l text-right">' + '<b>' + ' : شركة النقل  ' + '</b></div>';
                    ReportHTML += '             <div class="col-xs-12 m-l text-right">' + '<b>' + ' :  المستورد  ' + '</b></div>';

                    ReportHTML += '                         <table id="tblDeliveryOrder" style="font-size:90%;" class="table table-striped b-t b-light text-sm  table-bordered">';  //table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>' + ' ضمان  ' + '</th>';
                    ReportHTML += '                                     <th>' + ' كتالوج  ' + '</th>';
                    ReportHTML += '                                     <th>' + ' مفتاح  ' + '</th>';
                    ReportHTML += '                                     <th>' + ' مفك  ' + '</th>';
                    ReportHTML += '                                     <th>' + ' ولاعة  ' + '</th>';
                    ReportHTML += '                                     <th>' + ' إطار  ' + '</th>';
                    ReportHTML += '                                     <th>' + ' كوريك  ' + '</th>';
                    ReportHTML += '                                     <th>' + ' أخري  ' + '</th>';
                    ReportHTML += '                                     <th>' + ' كاسيت  ' + '</th>';
                    ReportHTML += '                                     <th>' + ' أوتوماتيك  ' + '</th>';
                    ReportHTML += '                                     <th>' + ' باور  ' + '</th>';
                    ReportHTML += '                                     <th>' + ' سنتر  ' + '</th>';
                    ReportHTML += '                                     <th>' + ' مرايا  ' + '</th>';
                    ReportHTML += '                                     <th>' + ' زجاج  ' + '</th>';
                    ReportHTML += '                                     <th>' + ' تكييف  ' + '</th>';
                    ReportHTML += '                                     <th>' + ' عداد  ' + '</th>';
                    ReportHTML += '                                     <th>' + ' اللون  ' + '</th>';
                    ReportHTML += '                                     <th>' + ' المحرك  ' + '</th>';
                    ReportHTML += '                                     <th>' + ' الوصف  ' + '</th>';
                    ReportHTML += '                                     <th>' + ' شاسيه  ' + '</th>';
                    ReportHTML += '                                     <th>' + ' م ' + '</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    for (var i = 0; i < _VehicleTracking.length; i++) {
                        ReportHTML += '                                     <tr class="" style="">';
                        ReportHTML += '                                         <td>' + '✓' + '</td>';
                        ReportHTML += '                                         <td>' + '✓' + '</td>';
                        ReportHTML += '                                         <td>' + '✓' + '</td>';
                        ReportHTML += '                                         <td>' + '✓' + '</td>';
                        ReportHTML += '                                         <td>' + '✓' + '</td>';
                        ReportHTML += '                                         <td>' + '✓' + '</td>';
                        ReportHTML += '                                         <td>' + '✓' + '</td>';
                        ReportHTML += '                                         <td>' + '✓' + '</td>';
                        ReportHTML += '                                         <td>' + '✓' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '✓' + '</td>';
                        ReportHTML += '                                         <td>' + '✓' + '</td>';
                        ReportHTML += '                                         <td>' + '✓' + '</td>';
                        ReportHTML += '                                         <td>' + '✓' + '</td>';
                        ReportHTML += '                                         <td>' + '✓' + '</td>';
                        ReportHTML += '                                         <td>' + '✓' + '</td>';
                        ReportHTML += '                                         <td>' + _VehicleTracking[i].PaintType + '</td>';
                        ReportHTML += '                                         <td>' + _VehicleTracking[i].PurchaseItemCode + '</td>';
                        ReportHTML += '                                         <td>' + _VehicleTracking[i].EngineNumber + '</td>';
                        ReportHTML += '                                         <td>' + _VehicleTracking[i].ChassisNumber + '</td>';
                        ReportHTML += '                                         <td>' + (i+1) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';

                    ReportHTML += '                     <div class="col-xs-12 text-right"><u><b>' + ' :   ملاحظات الفحص الخارجي  ' + '</b></u></div> <br>';

                    ReportHTML += '                         <table id="tblDeliveryOrder" style="font-size:90%;" class="table table-striped b-t b-light text-sm  table-bordered">';  //table-hover
                    //ReportHTML += '                             <thead>';
                    //ReportHTML += '                                 <tr>';
                    //ReportHTML += '                                     <th>' + ' البيان بعد التعديل ' + '</th>';
                    //ReportHTML += '                                     <th>' + ' البيان الحالى ' + '</th>';
                    //ReportHTML += '                                     <th>' + ' نوع البيان ' + '</th>';
                    //ReportHTML += '                                 </tr>';
                    //ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    for (var i = 0; i < _VehicleTracking.length; i++) {
                        ReportHTML += '                                     <tr>';
                        ReportHTML += '                                         <td>' + (_VehicleTracking[i].InspectionNotes == 0 ? "" : _VehicleTracking[i].InspectionNotes) + '</td>';
                        ReportHTML += '                                         <td style="width:15%;">' + _VehicleTracking[i].ChassisNumber + '</td>';
                        ReportHTML += '                                         <td style="width:5%;">' + (i + 1) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';

                    ReportHTML += '                 <div class="" style="clear:both;">';
                    ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + ' :  أمين المخزن  ' + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + '' + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + '  :  مسئول التسليم   ' + '</b></div>';
                    ReportHTML += '                 </div>'
                    ReportHTML += '                 <div class="" style="clear:both;">';
                    ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + ' :  الاسم  ' + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + '' + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + '  :   الاسم   ' + '</b></div>';
                    ReportHTML += '                 </div>'

                    ReportHTML += '         </body>';

                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    //ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
                    //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
                    //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
                    //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ShowFooter input[type=checkbox]").prop("checked"))
                    //    ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    ReportHTML += '     </footer>';

                    ReportHTML += '</html>';

                    var mywindow = window.open('', '_blank');
                    mywindow.document.write(ReportHTML);
                    mywindow.document.close();
                }
                else
                    swal("Sorry", "Doc is not found.");
                FadePageCover(false);
            }
            , null);
    }
}
/****************************VehicleTrackingDetails*****************************/
function VehicleTrackingDetails_BindTableRows(pVehicleTrackingDetails) {
    debugger;

}
function VehicleTrackingDetails_AddVehicle() {
    debugger;
    var _ReturnedMessage = "";
    var pSearchKey = $("#txtVehicleTrackingDetailsChassisNumber_Search").val().trim().toUpperCase();
    if (pSearchKey != "") {
        FadePageCover(true);
        if ($("#cbIsByChassis").prop("checked")) //because incase by Disptach i didn't get the chassis yet
            _ReturnedMessage = CheckExistenceInTableTd("tblVehicleTrackingDetails", "ChassisNumber", pSearchKey);
        if (_ReturnedMessage == "") {
            var _FunctionName = "";
            var pWhereClause = "";
            if ($("#slVehicleAction").val() == constVehicleActionInspection) {
                _FunctionName = "/api/OperationVehicle/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
                pWhereClause += "WHERE ChassisNumber=N'" + pSearchKey + "'";
            }
            else if ($("#slVehicleAction").val() == constVehicleActionSendToWarehouse) {
                _FunctionName = "/api/OperationVehicle/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
                pWhereClause += $("#cbIsByChassis").prop("checked")
                                ? ("WHERE ChassisNumber=N'" + pSearchKey + "'")
                                : ("WHERE DispatchNumber=N'" + pSearchKey + "'");
            }
            else if ($("#slVehicleAction").val() == constVehicleActionPickup) {
                _FunctionName = "/api/TransferProducts/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
                pWhereClause += $("#cbIsByChassis").prop("checked")
                                ? ("WHERE ChassisNumber=N'" + pSearchKey + "'")
                                : ("WHERE DispatchNumber=N'" + pSearchKey + "'");
                pWhereClause += "AND (Quantity>FinalizedPickedQuantity OR ID=181849)";
            }
            else if ($("#slVehicleAction").val() == constVehicleActionReceive) {
                _FunctionName = "/api/OperationVehicle/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
                pWhereClause += $("#cbIsByChassis").prop("checked")
                                ? ("WHERE ChassisNumber=N'" + pSearchKey + "'")
                                : ("WHERE DispatchNumber=N'" + pSearchKey + "'");
                pWhereClause += "AND ID NOT IN (SELECT OperationVehicleID FROM vwWH_ReceiveDetails WHERE OperationVehicleID IS NOT NULL AND Quantity>FinalizedPickedQuantity)" + " \n";
            }
            else if ($("#slVehicleAction").val() == constVehicleActionReturn) {
                _FunctionName = "/api/OperationVehicle/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
                pWhereClause += $("#cbIsByChassis").prop("checked")
                                ? ("WHERE ChassisNumber=N'" + pSearchKey + "'")
                                : ("WHERE DispatchNumber=N'" + pSearchKey + "'");
                pWhereClause += "AND ID IN (SELECT OperationVehicleID FROM vwWH_ReceiveDetails WHERE OperationVehicleID IS NOT NULL AND Quantity<=FinalizedPickedQuantity" + " \n";
                pWhereClause += "               AND ID=(SELECT MAX(ID) FROM vwWH_ReceiveDetails WHERE ChassisNumber=N'" + pSearchKey + "')" + "\n";
                pWhereClause += "           )" + "\n";
            }
            var pParametersWithValues = {
                pIsLoadArrayOfObjects: false
                , pLanguage: $("[id$='hf_ChangeLanguage']").val()
                , pPageNumber: 1
                , pPageSize: 999999
                , pWhereClause: pWhereClause
                , pOrderBy: "ID DESC"
            };
            CallGETFunctionWithParameters(_FunctionName
                , pParametersWithValues
                , function (pData) {
                    var _OperationVehicle = JSON.parse(pData[0]); //get the first row
                    if (_OperationVehicle.length > 0) {
                        for (var i = 0; i < _OperationVehicle.length; i++) {
                            if (CheckDifferenceInTableTd("tblVehicleTrackingDetails", "CustomerID", _OperationVehicle[i].CustomerID) == ""
                                && CheckDifferenceInTableTd("tblVehicleTrackingDetails", "CustomerName", _OperationVehicle[i].CustomerName) == ""
                                && CheckExistenceInTableTd("tblVehicleTrackingDetails", "ChassisNumber", _OperationVehicle[i].ChassisNumber) == "")
                                VehicleTrackingDetails_NewRow(_OperationVehicle[i]);
                            else {
                                swal("Sorry", "Please, ensure that chassis numbers are unique and vehicles are for the same customer.");
                                FadePageCover(false);
                                return 0;
                            }
                        }
                    }
                    else
                        swal("Sorry", "Please, revise item.");
                    FadePageCover(false);
                }
                , null);
        }
        else {
            FadePageCover(false);
            swal("Sorry", _ReturnedMessage);
        }
    }
}
function VehicleTrackingDetails_NewRow(pRowData) {
    debugger;
    var tr = "";
    ++maxVehicleTrackingDetailsIDInTable;
    //if ($("#slVehicleAction").val() == constVehicleActionPickup)
    //    maxVehicleTrackingDetailsIDInTable = pRowData.ID;
    tr += "<tr ID='" + maxVehicleTrackingDetailsIDInTable + "'>";
    tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxVehicleTrackingDetailsIDInTable + "' checked='checked' /></td>";
    tr += "     <td class='ID'> <input type='checkbox' value='" + maxVehicleTrackingDetailsIDInTable + "' /></td>";
    if ($("#slVehicleAction").val() == constVehicleActionPickup)
        tr += "     <td class='OperationVehicleID hide'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtVehicleTrackingDetailsOperationVehicleID" + maxVehicleTrackingDetailsIDInTable + "' autocomplete='off' class='form-control controlStyle text-center hide' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='VehicleTrackingDetails_SetIsRowChanged(id);' data-required='false' value='" + pRowData.OperationVehicleID + "' />" + pRowData.OperationVehicleID + "</td>";
    else
        tr += "     <td class='OperationVehicleID hide'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtVehicleTrackingDetailsOperationVehicleID" + maxVehicleTrackingDetailsIDInTable + "' autocomplete='off' class='form-control controlStyle text-center hide' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='VehicleTrackingDetails_SetIsRowChanged(id);' data-required='false' value='" + pRowData.ID + "' />" + pRowData.ID + "</td>";
    tr += "     <td class='Line'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtVehicleTrackingDetailsLine" + maxVehicleTrackingDetailsIDInTable + "' autocomplete='off' class='form-control controlStyle text-center hide' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='VehicleTrackingDetails_SetIsRowChanged(id);' data-required='false' value='" + maxVehicleTrackingDetailsIDInTable + "' />" + maxVehicleTrackingDetailsIDInTable + "</td>";
    tr += "     <td class='ChassisNumber'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtVehicleTrackingDetailsChassisNumber" + maxVehicleTrackingDetailsIDInTable + "' autocomplete='off' class='form-control controlStyle text-center hide' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='VehicleTrackingDetails_SetIsRowChanged(id);' data-required='false' value='" + pRowData.ChassisNumber + "' />" + pRowData.ChassisNumber + "</td>";
    tr += "     <td class='InspectionNotes'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtVehicleTrackingDetailsInspectionNotes" + maxVehicleTrackingDetailsIDInTable + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='VehicleTrackingDetails_SetIsRowChanged(id);' data-required='false' value='" + "' />" + "</td>";
    tr += "     <td class='EngineNumber'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtVehicleTrackingDetailsEngineNumber" + maxVehicleTrackingDetailsIDInTable + "' autocomplete='off' class='form-control controlStyle text-center hide' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='VehicleTrackingDetails_SetIsRowChanged(id);' data-required='false' value='" + pRowData.EngineNumber + "' />" + pRowData.EngineNumber + "</td>";
    tr += "     <td class='PurchaseItemCode'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtVehicleTrackingDetailsPurchaseItemCode" + maxVehicleTrackingDetailsIDInTable + "' autocomplete='off' class='form-control controlStyle text-center hide' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='VehicleTrackingDetails_SetIsRowChanged(id);' data-required='false' value='" + pRowData.PurchaseItemCode + "' />" + pRowData.PurchaseItemCode + "</td>";
    tr += "     <td class='PurchaseItemName'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtVehicleTrackingDetailsPurchaseItemName" + maxVehicleTrackingDetailsIDInTable + "' autocomplete='off' class='form-control controlStyle text-center hide' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='VehicleTrackingDetails_SetIsRowChanged(id);' data-required='false' value='" + pRowData.PurchaseItemName + "' />" + pRowData.PurchaseItemName + "</td>";
    tr += "     <td class='PaintType'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtVehicleTrackingDetailsPaintType" + maxVehicleTrackingDetailsIDInTable + "' autocomplete='off' class='form-control controlStyle text-center hide' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='VehicleTrackingDetails_SetIsRowChanged(id);' data-required='false' value='" + pRowData.PaintType + "' />" + pRowData.PaintType + "</td>";
    tr += "     <td class='CustomerID hide'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtVehicleTrackingDetailsCustomerID" + maxVehicleTrackingDetailsIDInTable + "' autocomplete='off' class='form-control controlStyle text-center hide' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='VehicleTrackingDetails_SetIsRowChanged(id);' data-required='false' value='" + pRowData.CustomerID + "' />" + pRowData.CustomerID + "</td>";
    tr += "     <td class='CustomerName'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtVehicleTrackingDetailsCustomerName" + maxVehicleTrackingDetailsIDInTable + "' autocomplete='off' class='form-control controlStyle text-center hide' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='VehicleTrackingDetails_SetIsRowChanged(id);' data-required='false' value='" + pRowData.CustomerName + "' />" + pRowData.CustomerName + "</td>";
    tr += "     <td class='FromWarehouseID' val=''><select id='slVehicleTrackingDetailsFromWarehouse" + maxVehicleTrackingDetailsIDInTable + "' style='width:150px;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='VehicleTrackingDetails_SetIsRowChanged(id);' data-required='false'></select></td>";
    tr += "     <td class='ToWarehouseID' val=''><select id='slVehicleTrackingDetailsToWarehouse" + maxVehicleTrackingDetailsIDInTable + "' style='width:150px;' class='controlStyle classToWarehouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='VehicleTrackingDetails_SetIsRowChanged(id);' data-required='false'></select></td>";
    tr += "     <td class='CodeSerial'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtVehicleTrackingDetailsCodeSerial" + maxVehicleTrackingDetailsIDInTable + "' autocomplete='off' class='form-control controlStyle text-center hide' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='VehicleTrackingDetails_SetIsRowChanged(id);' data-required='false' value='" + '' + "' />" + '' + "</td>";

    //tr += '     <td class="ValidFrom"><input id="txtValidFrom' + maxVehicleTrackingDetailsIDInTable + '" style="width:85px;height:100%;" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange="VehicleTrackingDetails_SetIsRowChanged(id);" style="background-color:white; cursor:text;" class="input-sm datepicker-input form-control" data-date-format="dd/mm/yyyy" placeholder="Select Date" value="' + FormattedTodaysDate + '" /></td>';
    tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + maxVehicleTrackingDetailsIDInTable + "' checked='checked' type='checkbox' value='" + maxVehicleTrackingDetailsIDInTable + "' /></td>";
    if ($("#slVehicleAction").val() == constVehicleActionPickup) {
        tr += "     <td class='ReceiveDetailsID hide'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtVehicleTrackingDetailsReceiveDetailsID" + maxVehicleTrackingDetailsIDInTable + "' autocomplete='off' class='form-control controlStyle text-center hide' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='VehicleTrackingDetails_SetIsRowChanged(id);' data-required='false' value='" + pRowData.ID + "' />" + pRowData.ID + "</td>";
    }
    //tr += "     <td class=''>"
    //                    + "<a href='#'  onclick='VehicleTrackingDetails_CopyRow(" + maxVehicleTrackingDetailsIDInTable + ");' " + copyControlsText + "</a>"
    //              + "</td>";
    tr += "</tr>";
    //if ($("#tblVehicleTrackingDetails tbody tr").length > 0)
    //    $(tr).insertBefore('#tblVehicleTrackingDetails > tbody > tr:first');
    //else
    $("#tblVehicleTrackingDetails tbody").append(tr);
    /***********************EOF Filling row controls******************************/
    $("#slVehicleTrackingDetailsFromWarehouse" + maxVehicleTrackingDetailsIDInTable).html($("#slWarehouse_Temp").html());
    $("#slVehicleTrackingDetailsFromWarehouse" + maxVehicleTrackingDetailsIDInTable).val(pRowData.LastToWarehouseID == 0 ? "" : pRowData.LastToWarehouseID);
    $("#slVehicleTrackingDetailsToWarehouse" + maxVehicleTrackingDetailsIDInTable).html($("#slWarehouse_Temp").html());
    $("#slVehicleTrackingDetailsToWarehouse" + maxVehicleTrackingDetailsIDInTable).val($("#slWarehouse").val());
    SetDatepickerFormat();
    $("#txtVehicleTrackingDetailsChassisNumber_Search").val("");
    $("#txtVehicleTrackingDetailsChassisNumber_Search").focus();
    /***********************EOF Filling row controls******************************/
}
function VehicleTrackingDetails_Save() {
    debugger;
    var pSelectedIDsToSave = GetAllSelectedIDsAsStringWithNameAttr("SelectedIDsToUpdate");
    if (pSelectedIDsToSave == "")
        swal("Sorry", "No records changed.");
    else if ($("#slVehicleAction").val() == "")
        swal("Sorry", "Please, select action.");
    else if (($("#slVehicleAction").val() == constVehicleActionReceive)
            && ($("#slWarehouse").val() == "" || $("#slTrucker").val() == ""))
        swal("Sorry", "Please, select warehouse and trucker.");
    else if (($("#slVehicleAction").val() == constVehicleActionReturn)
            && ($("#slWarehouse").val() == ""))
        swal("Sorry", "Please, select warehouse.");
    else {
        FadePageCover(true);
        var pIsInsertList = "";
        var pOperationVehicleIDList = "";
        var pActionDateList = "0"; //Datetime.Now is used in controller
        var pInspectionNotesList = "";
        var pFromWarehouseIDList = "";
        var pToWarehouseIDList = "";
        var pLineList = "";
        var pCodeSerialList = "";
        var pIsCancelledList = "";
        var pReceiveDetailsIDList = "";

        var NumberOfSelectRows = pSelectedIDsToSave.split(',').length;
        for (var i = 0; i < NumberOfSelectRows; i++) {
            var currentRowID = pSelectedIDsToSave.split(",")[i];
            pIsInsertList += ((pIsInsertList == "") ? "" : ",") + ($("#IsInsert" + currentRowID).prop("checked") ? "1" : "0");
            pOperationVehicleIDList += ((pOperationVehicleIDList == "") ? "" : ",") + ($("#txtVehicleTrackingDetailsOperationVehicleID" + currentRowID).val().trim() == "" ? "0" : $("#txtVehicleTrackingDetailsOperationVehicleID" + currentRowID).val().trim().toUpperCase());
            pActionDateList += ((pActionDateList == "") ? "0" : ",0");
            pInspectionNotesList += ((pInspectionNotesList == "") ? "" : ",") + ($("#txtVehicleTrackingDetailsInspectionNotes" + currentRowID).val().trim() == "" ? "0" : $("#txtVehicleTrackingDetailsInspectionNotes" + currentRowID).val().trim().toUpperCase());
            pFromWarehouseIDList += ((pFromWarehouseIDList == "") ? "" : ",") + ($("#slVehicleTrackingDetailsFromWarehouse" + currentRowID).val().trim() == "" ? "0" : $("#slVehicleTrackingDetailsFromWarehouse" + currentRowID).val().trim().toUpperCase());
            pToWarehouseIDList += ((pToWarehouseIDList == "") ? "" : ",") + ($("#slVehicleTrackingDetailsToWarehouse" + currentRowID).val().trim() == "" ? "0" : $("#slVehicleTrackingDetailsToWarehouse" + currentRowID).val().trim().toUpperCase());
            pLineList += ((pLineList == "") ? "" : ",") + ($("#txtVehicleTrackingDetailsLine" + currentRowID).val().trim() == "" ? "0" : $("#txtVehicleTrackingDetailsLine" + currentRowID).val().trim().toUpperCase());
            pCodeSerialList += ((pCodeSerialList == "") ? "" : ",") + ($("#txtVehicleTrackingDetailsCodeSerial" + currentRowID).val().trim() == "" ? "0" : $("#txtVehicleTrackingDetailsCodeSerial" + currentRowID).val().trim().toUpperCase());
            pIsCancelledList += ((pIsCancelledList == "") ? "0" : ",0");
            if ($("#slVehicleAction").val() == constVehicleActionPickup)
                pReceiveDetailsIDList += ((pReceiveDetailsIDList == "") ? "" : ",") + ($("#txtVehicleTrackingDetailsReceiveDetailsID" + currentRowID).val().trim() == "" ? "0" : $("#txtVehicleTrackingDetailsReceiveDetailsID" + currentRowID).val().trim().toUpperCase());
        }

        var pParametersWithValues = {
            pIsInsertList: pIsInsertList
            , pOperationVehicleIDList: pOperationVehicleIDList
            , pActionDateList: pActionDateList
            , pInspectionNotesList: pInspectionNotesList
            , pFromWarehouseIDList: pFromWarehouseIDList
            , pToWarehouseIDList: pToWarehouseIDList
            , pLineList: pLineList
            , pCodeSerialList: pCodeSerialList
            , pIsCancelledList: pIsCancelledList
            , pTruckerID: $("#slTrucker").val() == 0 ? "" : $("#slTrucker").val()
            , pWarehouseID: $("#slWarehouse").val() == 0 ? "" : $("#slWarehouse").val()
            , pVehicleActionID: $("#slVehicleAction").val() == 0 ? "" : $("#slVehicleAction").val()
            , pReceiveDetailsIDList: pReceiveDetailsIDList == "" ? 0 : pReceiveDetailsIDList
        };
        CallPOSTFunctionWithParameters("/api/OperationVehicle/VehicleActionDetails_Save"
            , pParametersWithValues
            , function (pData) {
                var _MessageReturned = pData[0];
                if (_MessageReturned == "") {
                    jQuery("#VehicleTrackingModal").modal("hide");
                    VehicleTracking_LoadingWithPaging();
                    swal("Success", "Saved successfully.");
                }
                else {
                    swal("Sorry", _MessageReturned);
                    FadePageCover(false);
                }
            }
            , null);
    }
}
function VehicleTrackingDetails_SearchOptionChanged() {
    debugger;
    $("#tblVehicleTrackingDetails tbody").html("");
}
function VehicleActionDetails_slWarehouseChanged() {
    debugger;
    $(".classToWarehouse").val($("#slWarehouse").val());
}
function VehicleActionDetails_SetIsRowChanged(pControlID) {
    debugger;
    var ChangedRowID = $("#" + pControlID).parent().parent().attr("ID");
    $("#SelectedIDsToUpdate" + ChangedRowID).prop("checked", true);
}
/**********************************VehicleCutOff*********************************/
function VehicleCutOff_FillModal() {
    debugger;
    if ($("#slCustomerCutoff option").length < 2) {
        FadePageCover(true);
        var pParametersWithValues={
            pCustomerWhereClause: "WHERE 1=1"
            , pCustomerOrderBy: "Name"
            , pPaymentTermWhereClause: "WHERE 1=1"
            , pPaymentTermOrderBy: "Name"
            , pTransactionTypeWhereClause: "WHERE 1=1 " //+ (pDefaults.UnEditableCompanyName == "GBL" ? "AND Name IN (N'Storg.WH.Int.S-Log', N'Storg.wh.s-log')" : "")
            , pTransactionTypeOrderBy: "Name"
            , pTaxTypeWhereClause: "WHERE IsDiscount=0" //+ " AND CurrentPercentage=14" 
            , pTaxTypeOrderBy: "Name"
        };
        CallGETFunctionWithParameters("/api/OperationVehicle/FillCutoffModal", pParametersWithValues
            , function (pData) {
                var pCustomer = pData[0];
                var pPaymentTerm = pData[1];
                var pTransactionType = pData[2];
                var pTaxType = pData[3];
                //FillListFromObject(null, 2, "<--Select-->", "slCustomerCutoff", pData[0], null);
                //FillListFromObject(null, 2, "<--Select-->", "slPaymentTermCutoff", pData[1], null);
                //FillListFromObject(null, 2, "<--Select-->", "slTransactionTypeCutoff", pData[2], null);
                //Fill_SelectInputAfterLoadData_WithMultiAttr(data, ID_Name, Item_Name, Title, SelectInput_ID, Selected_ID, AttrItemNames)
                Fill_SelectInputAfterLoadData_WithMultiAttr(pCustomer, 'ID', 'Name', '<--Select-->', '#slCustomerCutoff', '', '');
                Fill_SelectInputAfterLoadData_WithMultiAttr(pPaymentTerm, 'ID', 'Name', '<--Select-->', '#slPaymentTermCutoff', '', '');
                Fill_SelectInputAfterLoadData_WithMultiAttr(pTransactionType, 'ID', 'Name', '<--Select-->', '#slTransactionTypeCutoff', '', '');
                Fill_SelectInputAfterLoadData_WithMultiAttr(pTaxType, 'ID', 'Name', '<--Select-->', '#slTaxTypeCutoff', '', 'CurrentPercentage,IsDiscount');
                FadePageCover(false);
            }
            , null);
    }
    $("#txtVehicleCutOffDate").val(getTodaysDateInddMMyyyyFormat());
    jQuery("#VehicleCuttoffModal").modal("show");
}
function VehicleCutOff_GenerateInvoice() {
    debugger;
    if (Date.prototype.compareDates(ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), ConvertDateFormat(("20/" + $("#slMonthCutoff").val() + "/" + $("#slYearCutoff").val()))) > 0)
        swal("Sorry", "Date must be today or before.");
    else if ($("#slCustomerCutoff").val() == 0)
        swal("Sorry", "Please, select customer.");
    else if ($("#slPaymentTermCutoff").val() == 0)
        swal("Sorry", "Please, select payment term.");
    else if ($("#slTransactionTypeCutoff").val() == 0 && pDefaults.UnEditableCompanyName == "GBL")
        swal("Sorry", "Please, select transaction type.");
    else if ($("#slTaxTypeCutoff").val() == 0)
        swal("Sorry", "Please, select tax type.");
    else
        swal({
            title: "Are you sure?",
            text: "Invoices will be generated.",
            type: "",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Generate.",
            closeOnConfirm: false
        },
            //callback function in case of confirm delete
            function () {
                FadePageCover(true);
                var pParametersWithValues = {
                    pVehicleCutOffDate: ("20/" + $("#slMonthCutoff").val() + "/" + $("#slYearCutoff").val())
                    , pCutoffCustomerID: $("#slCustomerCutoff").val()
                    , pTransactionTypeID: $("#slTransactionTypeCutoff").val()
                    , pPaymentTermID: $("#slPaymentTermCutoff").val()
                    , pTaxTypeID: $("#slTaxTypeCutoff").val()
                    , pTaxPercentage: $("#slTaxTypeCutoff").val() == 0 ? 0 : $("#slTaxTypeCutoff option:selected").attr("CurrentPercentage")
                    , pChassisNumber: $("#txtChassisNumberCutoff").val().trim() == "" ? 0 : $("#txtChassisNumberCutoff").val().trim()
                };
                CallGETFunctionWithParameters("/api/OperationVehicle/VehicleCutOff_GenerateInvoice", pParametersWithValues
                    , function (pData) {
                        var _ReturnedMessage = pData[0];
                        var _Invoices = JSON.parse(pData[2]);
                        var _InvoiceNumbers = pData[4];
                        if (_ReturnedMessage == "" && _Invoices.length > 0) {
                            swal("Success", "Generated invoices: \n" + _InvoiceNumbers);
                            $("#lblInvoiceNumbers").text(_InvoiceNumbers);
                            //alert("Generated invoices: \n" + _InvoiceNumbers);
                            //VehicleCutOff_PrintInvoices(pData, "Print"); //to be printed from InvoiceApproval
                        }
                        else if (_ReturnedMessage == "" && _Invoices.length == 0)
                            swal("N/A", "No applicable invoices.");
                        else {
                            swal("Sorry", _ReturnedMessage);
                        }
                        FadePageCover(false);
                    }
                    , null);
            });
}
function VehicleCutOff_PreviewInvoice() {
    debugger;
    if (Date.prototype.compareDates(ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), ConvertDateFormat(("20/" + $("#slMonthCutoff").val() + "/" + $("#slYearCutoff").val()))) > 0)
        swal("Sorry", "Date must be today or before.");
    else
        if ($("#slCustomerCutoff").val() == 0)
        swal("Sorry", "Please, select customer.");
    else if ($("#slPaymentTermCutoff").val() == 0)
        swal("Sorry", "Please, select payment term.");
    else if ($("#slTransactionTypeCutoff").val() == 0 && pDefaults.UnEditableCompanyName == "GBL")
        swal("Sorry", "Please, select transaction type.");
    else if ($("#slTaxTypeCutoff").val() == 0)
        swal("Sorry", "Please, select tax type.");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pVehicleCutOffDate_PreviewInvoice: ("20/" + $("#slMonthCutoff").val() + "/" + $("#slYearCutoff").val())
            , pCutoffCustomerID: $("#slCustomerCutoff").val()
            , pTransactionTypeID: $("#slTransactionTypeCutoff").val()
            , pPaymentTermID: $("#slPaymentTermCutoff").val()
            , pTaxTypeID: $("#slTaxTypeCutoff").val()
            , pTaxPercentage: $("#slTaxTypeCutoff").val() == 0 ? 0 : $("#slTaxTypeCutoff option:selected").attr("CurrentPercentage")
            , pChassisNumber: $("#txtChassisNumberCutoff").val().trim() == "" ? 0 : $("#txtChassisNumberCutoff").val().trim()
        };
        CallGETFunctionWithParameters("/api/OperationVehicle/VehicleCutOff_PreviewInvoice", pParametersWithValues
            , function (pData) {
                var _ReturnedMessage = pData[0];
                var _Invoices = JSON.parse(pData[2]);
                if (_ReturnedMessage == "" && _Invoices.length > 0) {
                    //swal("Success", "Done successfully.");
                    VehicleCutOff_PreviewItemsInExcel(pData, "Preview");
                }
                else if (_ReturnedMessage == "" && _Invoices.length == 0)
                    swal("N/A", "No applicable invoices.");
                else {
                    swal("Sorry", _ReturnedMessage);
                }
                FadePageCover(false);
            }
            , null);
    }
}
function VehicleCutOff_PrintInvoices(pData, pOption) {
    debugger;
    var _Operations = JSON.parse(pData[1]);
    var _Invoices = JSON.parse(pData[2]);
    var _Receivables = JSON.parse(pData[3]);
    if (_Invoices.length > 0) {

        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';

        for (var x = 0; x < _Invoices.length; x++) {
            var _CurrentOperation = _Operations.filter(f=>f.ID == _Invoices[x].OperationID);
            var _CurrentInvoiceItems = _Receivables.filter(f=>f.InvoiceID == _Invoices[x].ID);
            ReportHTML += '         <body style="background-color:white;">';

            ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';

            //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ')' + '</h3></div>';
            //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + _Invoices[x].InvoiceTypeName + ' No. ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '</h3></div>';
            ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + _Invoices[x].InvoiceTypeName + ' No. ' + _Invoices[x].InvoiceNumber + "/" + ConvertDateFormat(GetDateWithFormatMDY(_Invoices[x].InvoiceDate)).split('/')[2] + '</h3></div>';
            //if (!($("#hDefaultUnEditableCompanyName").val() == "MEL" && _Invoices[x].InvoiceTypeName == "SW")) //Dont print for Safena
            //    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + _Invoices[x].InvoiceTypeName + ' No. ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '</h3></div>';
            //else { //i.e. ($("#hDefaultUnEditableCompanyName").val() == "SAF" && pInvoiceTypeCode == "DRAFT") {
            //    ReportHTML += '             <div style="position:absolute;left:50px;top:170px;">';
            //    ReportHTML += '             <img src="/Content/Images/DraftWaterMark.jpg" alt="logo" width=612px; height=200px;></div>';
            //}
            //ReportHTML += '             <div style="clear:both;"><br></div>';
            //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';

            ReportHTML += '         <div class="col-xs-12 m-t">';

            ReportHTML += '             <div class="col-xs-8">';
            ReportHTML += '                 <b>Bill to: </b>' + _Invoices[x].PartnerName;
            //ReportHTML += '                 <br><b>Address: </b>' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
            //ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
            //ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
            //ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
            ReportHTML += '                 <br><b>Address: </b>' + (_CurrentOperation[0].ClientAddress == 0 ? "" : _CurrentOperation[0].ClientAddress.replace(/\n/g, "<br/>"));
            ReportHTML += '             </div>';

            ReportHTML += '             <div class="col-xs-4">';
            ReportHTML += '                 <b>Billing Date: </b>' + ConvertDateFormat(GetDateWithFormatMDY(_Invoices[x].InvoiceDate)) + '<br>';
            ReportHTML += '                 <b>Billing Due Date: </b>' + ConvertDateFormat(GetDateWithFormatMDY(_Invoices[x].DueDate)) + '<br>';
            //ReportHTML += '                 <b>Sailing Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(_CurrentOperation[0].ExpectedDeparture)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(_CurrentOperation[0].ExpectedDeparture))) + '<br>';
            ReportHTML += '                 <b>Cut-Off Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(_Invoices[x].CutOffDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(_Invoices[x].CutOffDate)));
            ReportHTML += '             </div>';
            //if (pInvoiceTypeCode == "DRAFT") {
            //    ReportHTML += '             <div style="position:absolute;left:50px;top:250px;">';
            //    ReportHTML += '             <img src="/Content/Images/DraftWaterMark.jpg" alt="logo" width=612px; height=200px;></div>';
            //}

            ReportHTML += '                 <div class="col-xs-12 clear"><hr style="border:solid #000 1px;" /></div>';

            ReportHTML += '         <div class="col-xs-6"><b>Operation: </b>' + (_CurrentOperation[0].Code == 0 ? "" : _CurrentOperation[0].Code) + '</div>';
            if ($("#cbPrintMBL").prop("checked"))
                ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + _CurrentOperation[0].MasterBL + '</div>';
            if ($("#cbPrintHBL").prop("checked")) {
                if (pHouseBLs != "0")//Master Operation so show all houses on it
                    ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + _CurrentOperation[0].HouseBLs + '</div>';
                else if (pHouseNumber != "0")
                    ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (_CurrentOperation[0].HouseNumber == 0 ? "N/A" : _CurrentOperation[0].HouseNumber) + '</div>';
            }
            //if (_CurrentOperation[0].CertificateNumber != "N/A")
            //    ReportHTML += '         <div class="col-xs-6"><b>Certificate Number: </b>' + (_CurrentOperation[0].CertificateNumber == 0 ? "" : _CurrentOperation[0].CertificateNumber) + '</div>';
            //ReportHTML += '         <div class="col-xs-6"><b>POL: </b>' + (_CurrentOperation[0].POLName == 0 ? "" : _CurrentOperation[0].POLName) + '</div>';
            //ReportHTML += '         <div class="col-xs-6"><b>POD: </b>' + (_CurrentOperation[0].PODName == 0 ? "" : _CurrentOperation[0].PODName) + '</div>';
            //if (pInvoiceItem.length > 0 && pDefaults.UnEditableCompanyName == "GBL")
            //    if (pInvoiceItem[0].TruckingOrderID != 0) {
            //        ReportHTML += '         <div class="col-xs-6"><b>Loading Zone: </b>' + (pInvoiceItem[0].LoadingZoneName == 0 ? "N/A" : pInvoiceItem[0].LoadingZoneName) + '</div>';
            //        ReportHTML += '         <div class="col-xs-6"><b>First Curing Zone: </b>' + (pInvoiceItem[0].FirstCuringAreaName == 0 ? "" : pInvoiceItem[0].FirstCuringAreaName) + '</div>';
            //        ReportHTML += '         <div class="col-xs-6"><b>Second Curing Zone: </b>' + (pInvoiceItem[0].SecondCuringAreaName == 0 ? "" : pInvoiceItem[0].SecondCuringAreaName) + '</div>';
            //        ReportHTML += '         <div class="col-xs-6"><b>Third Curing Zone: </b>' + (pInvoiceItem[0].ThirdCuringAreaName == 0 ? "" : pInvoiceItem[0].ThirdCuringAreaName) + '</div>';
            //    }
            if (pDefaults.UnEditableCompanyName == "GBL") {
                ReportHTML += '         <div class="col-xs-6"><b>Business Unit: </b>' + (_CurrentOperation[0].BusinessUnit == 0 ? "N/A" : _CurrentOperation[0].BusinessUnit) + '</div>';
            }
            //ReportHTML += '         <div class="col-xs-6"><b>Line: </b>' + (_CurrentOperation[0].LineName == 0 ? "" : _CurrentOperation[0].LineName) + '</div>';
            //if (_CurrentOperation[0].TransportType == OceanTransportType) {
            //    //ReportHTML += '         <div class="col-xs-6"><b>Container No.s: </b>' + (_CurrentOperation[0].ContainerNumbers == 0 ? "" : _CurrentOperation[0].ContainerNumbers) + '</div>';
            //    ReportHTML += '         <div class="col-xs-6"><b>No Of Containers: </b>' + (_CurrentOperation[0].ContainerTypes == 0 ? "" : _CurrentOperation[0].ContainerTypes) + '</div>';
            //    ReportHTML += '         <div class="col-xs-6"><b>Vessel-Voy: </b>' + (_CurrentOperation[0].VesselName == 0 ? "" : _CurrentOperation[0].VesselName) + (_CurrentOperation[0].VoyageOrTruckNumber == 0 ? "" : (" - " + _CurrentOperation[0].VoyageOrTruckNumber)) + '</div>';
            //}
            //if (pInvoiceTypeCode == "SOA" && $("#hDefaultUnEditableCompanyName").val() == "SAF") {
            //    ReportHTML += '         <br><div class="col-xs-12 clear">To be paid to IACC Logistics</div>';
            //    ReportHTML += '         <br><div class="col-xs-12 clear">Claim for settlement of Official Receipts, Storage, Demurrage & Detention paid on behalf of your respectful company.</div>';
            //}

            ReportHTML += '                     <div class="col-xs-12 clear">';
            ReportHTML += '                         <table id="tblReportInvoice"' + _Invoices[0].ID + ' class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
            ReportHTML += '                             <thead>';
            ReportHTML += '                                 <tr>';
            ReportHTML += '                                     <th>Item</th>';
            ReportHTML += '                                     <th>Description</th>';
            ReportHTML += '                                     <th>Qty/Days</th>';
            ReportHTML += '                                     <th>Unit Price</th>';
            ReportHTML += '                                     <th>VAT</th>';
            ReportHTML += '                                     <th>WHT</th>';
            ReportHTML += '                                     <th>Total</th>';
            ReportHTML += '                                     <th>Notes</th>';
            ReportHTML += '                                 </tr>';
            ReportHTML += '                             </thead>';
            ReportHTML += '                             <tbody>';
            var _TotalTaxOnItems = 0;
            var _TotalDiscountOnItems = 0;
            $.each(_CurrentInvoiceItems, function (i, item) {
                _TotalTaxOnItems += item.TaxAmount;
                _TotalDiscountOnItems += item.DiscountAmount;
                ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                ReportHTML += '                                         <td>' + (i + 1) + '</td>';
                ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                ReportHTML += '                                         <td>' + item.SalePrice.toFixed(2) + '</td>';
                ReportHTML += '                                         <td>' + item.TaxAmount.toFixed(2) + '</td>';
                ReportHTML += '                                         <td>' + item.DiscountAmount.toFixed(2) + '</td>';
                ReportHTML += '                                         <td>' + item.SaleAmount.toFixed(2) + '</td>';
                ReportHTML += '                                         <td>' + (item.Notes == "0" ? "" : item.Notes) + '</td>';
                ReportHTML += '                                     </tr>';
            });
            if (_Invoices[x].FixedDiscount > 0) {
                ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                ReportHTML += '                                         <td>' + '' + '</td>';
                ReportHTML += '                                         <td style="text-align:left;">' + 'Special Discount' + '</td>';
                ReportHTML += '                                         <td>' + '' + '</td>';
                ReportHTML += '                                         <td colspan=4>' + '-' + _Invoices[x].FixedDiscount.toFixed(2) + '</td>';
                //ReportHTML += '                                         <td>' + _TotalTaxOnItems + '</td>';
                //ReportHTML += '                                         <td>' + '' + '</td>';
                ReportHTML += '                                     </tr>';
            }
            //ReportHTML += '                                         <tr>';
            //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
            //ReportHTML += '                                             <td><b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></td>';
            //ReportHTML += '                                             <td>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</td>';
            //ReportHTML += '                                         </tr>';
            //$("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")

            //ReportHTML += '                                         <tr>';
            //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
            //ReportHTML += '                                             <td><b>Total Amount : ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
            //ReportHTML += '                                         </tr>';
            ReportHTML += '                             </tbody>';
            ReportHTML += '                         </table>';
            ReportHTML += '                     </div>'

            //if ($("#cbLargeInvoice").prop("checked")) {
            //    ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
            //    ReportHTML += '         <div class="break"></div>';
            //}
            //else
            //    ReportHTML += '                         <div class="row"></div>';
            ReportHTML += '                         <div class="col-xs-8 m-t">';
            //if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
            //    ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
            //    ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
            //    ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
            //    ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
            //    ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
            //    ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
            //}
            //else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
            //    ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
            //    ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
            //}
            //else
            //    ReportHTML += '                             <br>';
            ReportHTML += '                         </div>';
            ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
            if (_TotalTaxOnItems != 0 || _TotalDiscountOnItems != 0) {
                ReportHTML += '                             <b>Subtotal: </b>' + _Invoices[x].CurrencyCode + ' ' + parseFloat(_Invoices[x].AmountWithoutVAT).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                //ReportHTML += '                             <b>VAT: </b>' + (_TotalTaxOnItems - _TotalDiscountOnItems).toFixed(2) + '</br>';
                if (_TotalTaxOnItems != 0)
                    ReportHTML += '                             <b>VAT: </b>' + (_TotalTaxOnItems).toFixed(2) + '</br>';
                if (_TotalDiscountOnItems != 0)
                    ReportHTML += '                             <b>WHT: </b>' + (_TotalDiscountOnItems).toFixed(2) + '</br>';
            }
            ReportHTML += '                             <b>Total: </b>' + _Invoices[x].CurrencyCode + ' <b>' + parseFloat(_Invoices[x].Amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></br>';
            ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(_Invoices[x].Amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + ' ' + _Invoices[x].CurrencyCode + '</br>';
            //if ($("#cbPrintUSDTotal").prop("checked") && $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text().trim() == "EGP")
            //    ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toFixed(2) + '</b></br>';
            ReportHTML += '                         </div>';

            //ReportHTML += '                     </div>'; //of table-responsive
            //ReportHTML += '                 </section>';
            //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
            ReportHTML += '             </div>';
            ReportHTML += '         </body>';

            ////ReportHTML += '                 <div class="col-xs-12 m-t m-l" style="clear:both;"><b>Invoice considered paid if a stamped receipt issued</b></div>';
            //ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
            //ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
            //ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
            //ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
            //ReportHTML += '                 </div>'
            //ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
            //ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
            //ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
            //ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
            //ReportHTML += '                 </div>'
            if ($("#cbPrintStamp").prop("checked") && pInvoiceTypeCode != "DRAFT")
                ReportHTML += '         <div class="text-left m-l-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';
            if (_Invoices[x].InvoiceTypeName != "DN" && pDefaults.UnEditableCompanyName != "GBL")
                ReportHTML += '                     <div class="col-xs-12 m-t-lg text-center"><b>' + '   لا يعتد بالفاتورة إلا بعد استلام إيصال السداد   ' + '</b></div>';
            ReportHTML += '         <div class="break"></div>';
        } //for (var x = 0; x < _Invoices.length; x++) {
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

        //ReportHTML += '         <div class="row text-right m-r m-t">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
        //ReportHTML += '         <div class="row text-right m-r">' + '  يوقف صرف شيكات مصر للتأمين لحين تسوية التعويضات  ' + '</div>';
        //ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
        //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
        //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
        //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
        if ($("#cbPrintFooterInvoice").prop("checked"))
            ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter' + (_Invoices[x].InvoiceTypeName == "DN" ? "-Debit" : "") + '.jpg" alt="footer"/></div>';
        else
            ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
        ReportHTML += '     </footer>';
        ReportHTML += '</html>';
        if (pOption == "Print" || pOption == undefined || pOption == null) {
            var mywindow = window.open('', '_blank');
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        else if (pOption == "Preview") {
            $("#hExportedDiv").html(ReportHTML);

            //$("#hExportedTable").html(ReportHTML);

            var $table = $("#hExportedDiv");
            $table.table2excel({
                exclude: ".noExl",
                name: "sheet",
                filename: $("#slCustomerCutoff option:selected").text() + " " + ("20/" + $("#slMonthCutoff").val() + "/" + $("#slYearCutoff").val()) + ".xls", // do include extension
                preserveColors: false // set to true if you want background colors and font colors preserved
            });
        }
        //else if (pOption == "Email") {
        //    if (pClientHeader.Email != "0" && pClientHeader.Email != "")
        //        SendPDFEmail_General("Invoice", pClientHeader.Email, ReportHTML, "Invoice", null);
        //    else {
        //        swal("Sorry", "Please, check receiver email.");
        //        FadePageCover(false);
        //    }
        //}
    }
}
function VehicleCutOff_PreviewItemsInExcel(pData, pOption) {
    debugger;
    var _Operations = JSON.parse(pData[1]);
    var _Invoices = JSON.parse(pData[2]);
    var _Receivables = JSON.parse(pData[3]);
    if (_Invoices.length > 0) {

        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';

        for (var x = 0; x < _Invoices.length; x++) {
            var _CurrentOperation = _Operations.filter(f=>f.ID == _Invoices[x].OperationID);
            var _CurrentInvoiceItems = _Receivables.filter(f=>f.InvoiceID == _Invoices[x].ID);
            ReportHTML += '         <body style="background-color:white;">';

            ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
            ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + _Invoices[x].InvoiceTypeName + ' No. ' + _Invoices[x].InvoiceNumber + "/" + ConvertDateFormat(GetDateWithFormatMDY(_Invoices[x].InvoiceDate)).split('/')[2] + '</h3></div>';

            ReportHTML += '         <div class="col-xs-12 m-t">';

            ReportHTML += '             <div class="col-xs-8">';
            ReportHTML += '                 <b>Bill to: </b>' + _Invoices[x].PartnerName;
            //ReportHTML += '                 <br><b>Address: </b>' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
            //ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
            //ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
            //ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
            ReportHTML += '                 <br><b>Address: </b>' + (_CurrentOperation[0].ClientAddress == 0 ? "" : _CurrentOperation[0].ClientAddress.replace(/\n/g, "<br/>"));
            ReportHTML += '             </div>';

            ReportHTML += '             <div class="col-xs-4">';
            ReportHTML += '                 <b>Billing Date: </b>' + ConvertDateFormat(GetDateWithFormatMDY(_Invoices[x].InvoiceDate)) + '<br>';
            ReportHTML += '                 <b>Billing Due Date: </b>' + ConvertDateFormat(GetDateWithFormatMDY(_Invoices[x].DueDate)) + '<br>';
            //ReportHTML += '                 <b>Sailing Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(_CurrentOperation[0].ExpectedDeparture)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(_CurrentOperation[0].ExpectedDeparture))) + '<br>';
            ReportHTML += '                 <b>Cut-Off Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(_Invoices[x].CutOffDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(_Invoices[x].CutOffDate)));
            ReportHTML += '             </div>';
            //if (pInvoiceTypeCode == "DRAFT") {
            //    ReportHTML += '             <div style="position:absolute;left:50px;top:250px;">';
            //    ReportHTML += '             <img src="/Content/Images/DraftWaterMark.jpg" alt="logo" width=612px; height=200px;></div>';
            //}

            ReportHTML += '                 <div class="col-xs-12 clear"><hr style="border:solid #000 1px;" /></div>';

            ReportHTML += '         <div class="col-xs-6"><b>Operation: </b>' + (_CurrentOperation[0].Code == 0 ? "" : _CurrentOperation[0].Code) + '</div>';
            if ($("#cbPrintMBL").prop("checked"))
                ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + _CurrentOperation[0].MasterBL + '</div>';
            if ($("#cbPrintHBL").prop("checked")) {
                if (pHouseBLs != "0")//Master Operation so show all houses on it
                    ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + _CurrentOperation[0].HouseBLs + '</div>';
                else if (pHouseNumber != "0")
                    ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (_CurrentOperation[0].HouseNumber == 0 ? "N/A" : _CurrentOperation[0].HouseNumber) + '</div>';
            }
            if (pDefaults.UnEditableCompanyName == "GBL") {
                ReportHTML += '         <div class="col-xs-6"><b>Business Unit: </b>' + (_CurrentOperation[0].BusinessUnit == 0 ? "N/A" : _CurrentOperation[0].BusinessUnit) + '</div>';
            }

            ReportHTML += '                     <div class="col-xs-12 clear">';
            ReportHTML += '                         <table id="tblReportInvoice"' + _Invoices[x].ID + ' class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
            //ReportHTML += '                             <thead>';
            //ReportHTML += '                                 <tr>';
            //ReportHTML += '                                     <th><b>Operation</b></th>';
            //ReportHTML += '                                     <th><b>Chassis</b></th>';
            //ReportHTML += '                                     <th><b>Days</b></th>';
            //ReportHTML += '                                     <th><b>Notes</b></th>';
            //ReportHTML += '                                 </tr>';
            //ReportHTML += '                             </thead>';
            ReportHTML += '                             <tbody>';
            var _TotalTaxOnItems = 0;
            var _TotalDiscountOnItems = 0;
            $.each(_CurrentInvoiceItems, function (i, item) {
                _TotalTaxOnItems += item.TaxAmount;
                _TotalDiscountOnItems += item.DiscountAmount;
                ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                ReportHTML += '                                         <td>' + item.OperationCode + '</td>';
                ReportHTML += '                                         <td>' + item.ChassisNumber + '</td>';
                ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                ReportHTML += '                                         <td>' + item.Notes.split(": ")[1] + '</td>';
                ReportHTML += '                                         <td>' + item.Notes.split(" ")[2].split(" ")[0] + '</td>';
                ReportHTML += '                                         <td>' + item.Notes.split(" ")[4] + '</td>';
                ReportHTML += '                                     </tr>';
            });
            if (_Invoices[x].FixedDiscount > 0) {
                ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                ReportHTML += '                                         <td>' + '' + '</td>';
                ReportHTML += '                                         <td style="text-align:left;">' + 'Special Discount' + '</td>';
                ReportHTML += '                                         <td>' + '' + '</td>';
                ReportHTML += '                                         <td colspan=4>' + '-' + _Invoices[x].FixedDiscount.toFixed(2) + '</td>';
                //ReportHTML += '                                         <td>' + _TotalTaxOnItems + '</td>';
                //ReportHTML += '                                         <td>' + '' + '</td>';
                ReportHTML += '                                     </tr>';
            }
            //ReportHTML += '                                         <tr>';
            //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
            //ReportHTML += '                                             <td><b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></td>';
            //ReportHTML += '                                             <td>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</td>';
            //ReportHTML += '                                         </tr>';
            //$("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")

            //ReportHTML += '                                         <tr>';
            //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
            //ReportHTML += '                                             <td><b>Total Amount : ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
            //ReportHTML += '                                         </tr>';
            ReportHTML += '                             </tbody>';
            ReportHTML += '                         </table>';
            ReportHTML += '                     </div>'

            //if ($("#cbLargeInvoice").prop("checked")) {
            //    ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
            //    ReportHTML += '         <div class="break"></div>';
            //}
            //else
            //    ReportHTML += '                         <div class="row"></div>';
            ReportHTML += '                         <div class="col-xs-8 m-t">';
            //if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
            //    ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
            //    ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
            //    ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
            //    ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
            //    ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
            //    ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
            //}
            //else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
            //    ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
            //    ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
            //}
            //else
            //    ReportHTML += '                             <br>';
            ReportHTML += '                         </div>';
            ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
            if (_TotalTaxOnItems != 0 || _TotalDiscountOnItems != 0) {
                ReportHTML += '                             <b>Subtotal: </b>' + _Invoices[x].CurrencyCode + ' ' + parseFloat(_Invoices[x].AmountWithoutVAT).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                //ReportHTML += '                             <b>VAT: </b>' + (_TotalTaxOnItems - _TotalDiscountOnItems).toFixed(2) + '</br>';
                if (_TotalTaxOnItems != 0)
                    ReportHTML += '                             <b>VAT: </b>' + (_TotalTaxOnItems).toFixed(2) + '</br>';
                if (_TotalDiscountOnItems != 0)
                    ReportHTML += '                             <b>WHT: </b>' + (_TotalDiscountOnItems).toFixed(2) + '</br>';
            }
            ReportHTML += '                             <b>Total: </b>' + _Invoices[x].CurrencyCode + ' <b>' + parseFloat(_Invoices[x].Amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></br>';
            ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(_Invoices[x].Amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + ' ' + _Invoices[x].CurrencyCode + '</br>';
            //if ($("#cbPrintUSDTotal").prop("checked") && $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text().trim() == "EGP")
            //    ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toFixed(2) + '</b></br>';
            ReportHTML += '                         </div>';

            //ReportHTML += '                     </div>'; //of table-responsive
            //ReportHTML += '                 </section>';
            //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
            ReportHTML += '             </div>';
            ReportHTML += '         </body>';

            ////ReportHTML += '                 <div class="col-xs-12 m-t m-l" style="clear:both;"><b>Invoice considered paid if a stamped receipt issued</b></div>';
            //ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
            //ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
            //ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
            //ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
            //ReportHTML += '                 </div>'
            //ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
            //ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
            //ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
            //ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
            //ReportHTML += '                 </div>'
            if ($("#cbPrintStamp").prop("checked") && pInvoiceTypeCode != "DRAFT")
                ReportHTML += '         <div class="text-left m-l-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';
            if (_Invoices[x].InvoiceTypeName != "DN" && pDefaults.UnEditableCompanyName != "GBL")
                ReportHTML += '                     <div class="col-xs-12 m-t-lg text-center"><b>' + '   لا يعتد بالفاتورة إلا بعد استلام إيصال السداد   ' + '</b></div>';
            ReportHTML += '         <div class="break"></div>';
        } //for (var x = 0; x < _Invoices.length; x++) {
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

        //ReportHTML += '         <div class="row text-right m-r m-t">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
        //ReportHTML += '         <div class="row text-right m-r">' + '  يوقف صرف شيكات مصر للتأمين لحين تسوية التعويضات  ' + '</div>';
        //ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
        //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
        //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
        //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
        if ($("#cbPrintFooterInvoice").prop("checked"))
            ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter' + (_Invoices[x].InvoiceTypeName == "DN" ? "-Debit" : "") + '.jpg" alt="footer"/></div>';
        else
            ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
        ReportHTML += '     </footer>';
        ReportHTML += '</html>';
        if (pOption == "Print" || pOption == undefined || pOption == null) {
            var mywindow = window.open('', '_blank');
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        else if (pOption == "Preview") {
            $("#hExportedDiv").html(ReportHTML);

            //$("#hExportedTable").html(ReportHTML);

            var $table = $("#hExportedDiv");
            $table.table2excel({
                exclude: ".noExl",
                name: "sheet",
                filename: $("#slCustomerCutoff option:selected").text() + " " + ("20/" + $("#slMonthCutoff").val() + "/" + $("#slYearCutoff").val()) + ".xls", // do include extension
                preserveColors: false // set to true if you want background colors and font colors preserved
            });
        }
        //else if (pOption == "Email") {
        //    if (pClientHeader.Email != "0" && pClientHeader.Email != "")
        //        SendPDFEmail_General("Invoice", pClientHeader.Email, ReportHTML, "Invoice", null);
        //    else {
        //        swal("Sorry", "Please, check receiver email.");
        //        FadePageCover(false);
        //    }
        //}
    }
}
function VehicleCutOff_UndoAging() {
    debugger;
    if (1 == 2)
        swal("Sorry", "Please, check.");
    else {
        swal({
            title: "Are you sure?",
            text: "Aging which are not added to invoices will be cancelled.",
            type: "",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Apply",
            closeOnConfirm: false
        },
        //callback function in case of confirm delete
        function () {
            FadePageCover(true);
            var pParametersWithValues = {
                pCutoffDateToUndoAging: ("20/" + $("#slMonthCutoff").val() + "/" + $("#slYearCutoff").val())
            };
            CallGETFunctionWithParameters("/api/OperationVehicle/VehicleCutOff_UndoAging", pParametersWithValues
                , function (pData) {
                    var _ReturnedMessage = pData[0];
                    if (_ReturnedMessage == "")
                        swal("Success", "Undoing finished.");
                    else
                        swal("Sorry", _ReturnedMessage);
                    FadePageCover(false);
                }
                , null);
        }); //ConfirmationMessage
    }
}
function VehicleCutOff_ReadAging() {
    debugger;
    if (1 == 2)
        swal("Sorry", "Please, check.");
    else {
        swal({
            title: "Are you sure?",
            text: "Data will be retrieved from oracle.",
            type: "",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Apply",
            closeOnConfirm: false
        },
        //callback function in case of confirm delete
        function () {
            FadePageCover(true);
            var pParametersWithValues = {
                pCutoffDateToReadAging: ("20/" + $("#slMonthCutoff").val() + "/" + $("#slYearCutoff").val())
            };
            CallGETFunctionWithParameters("/api/OperationVehicle/VehicleCutOff_ReadAging", pParametersWithValues
                , function (pData) {
                    var _ReturnedMessage = pData[0];
                    if (_ReturnedMessage == "")
                        swal("Success", "Reading aging finished.");
                    else
                        swal("Sorry", _ReturnedMessage);
                    FadePageCover(false);
                }
                , null);
        }); //ConfirmationMessage
    }
}
function VehicleCutOff_POReceipt() {
    debugger;
    if (1 == 2)
        swal("Sorry", "Please, check.");
    else {
        swal({
            title: "Are you sure?",
            text: "PO Receipt will be read.",
            type: "",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Apply",
            closeOnConfirm: false
        },
        //callback function in case of confirm delete
        function () {
            FadePageCover(true);
            var pParametersWithValues = {
                pCutoffDateToPOReceipt: ("20/" + $("#slMonthCutoff").val() + "/" + $("#slYearCutoff").val())
            };
            CallGETFunctionWithParameters("/api/OperationVehicle/VehicleCutOff_POReceipt", pParametersWithValues
                , function (pData) {
                    var _ReturnedMessage = pData[0];
                    if (_ReturnedMessage == "")
                        swal("Success", "PO Receipt finished.");
                    else
                        swal("Sorry", _ReturnedMessage);
                    FadePageCover(false);
                }
                , null);
        }); //ConfirmationMessage
    }
}

function PDI_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "PDI_BindTableRows";
    strLoadWithPagingFunctionName = "/api/OperationVehicle/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = "WHERE 1=1 AND ID IN (SELECT OperationVehicleID FROM WH_ReceiveDetails WHERE OperationVehicleID IS NOT NULL)";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/Transactions/PDI", "div-content", function () {
        if (pDefaults.UnEditableCompanyName == "GBL")
            $(".classShowForGBL").removeClass("hide");
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                var pWarehouse = pData[2];
                var pPurchaseItem = pData[3];
                var pCustomer = pData[4];
                var pOperation = pData[5];
                var pPurchaseItem_All = pData[6];
                //FillListFromObject(null, 2, "<--Select-->", "slWarehouseSearch", pWarehouse, null);
                FillListFromObject(null, 2, null, "slWarehouse", pWarehouse, null);
                FillListFromObject(null, 9, "<--Select-->", "slPickupDetailsPurchaseItem", pPurchaseItem_All, null);
                FillListFromObject(null, 2, "<--Select-->", "slCustomer", pCustomer, function () { $("#slCustomerForClearWithItems").html($("#slCustomer").html()); });

                FillListFromObject(null, 1, "<--Select-->"/*pStrFirstRow*/, "slOperation", pOperation, null);
                $("#slBillTo").html($("#hReadySlCustomers").html());
                $("#slEndUser").html($("#hReadySlCustomers").html());
                PDI_BindTableRows(JSON.parse(pData[0]));
            });
        //if (pDefaults.UnEditableCompanyName == "IST")
        //    $(".classShowForIST").removeClass("hide");
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { PDI_ClearAllControls(); },
        function () { PDI_DeleteList(); });
}
function PDI_BindTableRows(pPDI) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblPDI");
    var editControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    $.each(pPDI, function (i, item) {
        AppendRowtoTable("tblPDI",
        //("<tr ID='" + item.ID + "' ondblclick='PickupDetails_FillControls(" + item.ID + ");' class='" + (item.IsFinalized ? "" : "") + "'>"
        ("<tr ID='" + item.ID + "' ondblclick='PDI_LoadPickupPDIModal(" + item.ID + ");' class='" + (item.IsFinalized ? "" : "") + "'>"
            + "<td class='ID hide'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
            + "<td class='CustomerID hide'>" + (item.CustomerID == 0 ? "" : item.CustomerID) + "</td>"
            + "<td class='CustomerName'>" + item.CustomerName + "</td>"
            + "<td class='ChassisNumber'>" + (item.ChassisNumber == 0 ? "" : item.ChassisNumber) + "</td>"
            + "<td class='EngineNumber'>" + (item.EngineNumber == 0 ? "" : item.EngineNumber) + "</td>"
            + "<td class='OCNCode'>" + (item.OCNCode == 0 ? "" : item.OCNCode) + "</td>"
            + "<td class='Model'>" + (item.Model == 0 ? "" : item.Model) + "</td>"
            + "<td class='PurchaseItemID hide'>" + (item.PurchaseItemID == 0 ? "" : item.PurchaseItemID) + "</td>"
            + "<td class='PurchaseItemCode'>" + (item.PurchaseItemCode == 0 ? "" : item.PurchaseItemCode) + "</td>"
            + "<td class='PurchaseItemName'>" + (item.PurchaseItemName == 0 ? "" : item.PurchaseItemName) + "</td>"
            + "<td class='Quantity hide'>" + item.Quantity + "</td>"
            + "<td class='PackageTypeID hide'>" + (item.PackageTypeID == 0 ? "" : item.PackageTypeID) + "</td>"
            + "<td class='PackageTypeName hide'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>"
            + "<td class='OperationCode'>" + (item.OperationCode == 0 ? "" : item.OperationCode) + "</td>"
            //+ "<td class='ReceiveDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + "</td>"

            + "<td class=''><a href='#' data-toggle='modal' onclick='PDI_Print(" + item.ID + ");' " + editControlsText + "</a></td>"
            + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPDI", "ID");
    CheckAllCheckbox("ID");
    /////HighlightText("#tblPDI>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PDI_LoadingWithPaging() {
    debugger;
    var pWhereClause = PDI_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { PDI_BindTableRows(JSON.parse(pData[0])); });
    //HighlightText("#tblPDI>tbody>tr", $("#txt-Search").val().trim());
}
function PDI_GetWhereClause() {
    debugger;
    var _WhereClause = "WHERE 1=1 AND ID IN (SELECT OperationVehicleID FROM WH_ReceiveDetails WHERE OperationVehicleID IS NOT NULL)" + " \n";
    if ($("#txt-Search").val().trim() != "") {
        _WhereClause += "AND (" + "\n";
        _WhereClause += "       ChassisNumber=N'" + $("#txt-Search").val().trim().toUpperCase() + "'" + "\n";
        _WhereClause += "       OR EngineNumber=N'" + $("#txt-Search").val().trim().toUpperCase() + "'" + "\n";
        _WhereClause += "    )";
    }
    return _WhereClause;
}
function PDI_LoadPickupPDIModal(pOperationVehicleID) {
    debugger;
    FadePageCover(true);
    ClearAll("#PickupModal");

    var tr = $("#tblPDI tr[ID='" + pOperationVehicleID + "']");
    $("#lblShown").html(": " + $(tr).find("td.ChassisNumber").text());

    $("#tblPickupDetails tbody tr").html("");
    $("#hOperationVehicleID").val(pOperationVehicleID);
    $("#txPickupDetailsPurchaseItemQuantity").val(1);
    var pWhereClause = "WHERE OperationVehicleID=" + pOperationVehicleID;
    var pPageSize = 999999; //$('#select-page-size').val();
    var pPageNumber = 1; //($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    CallGETFunctionWithParameters("/api/PDI/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
        , pControllerParameters
        , function (pData) {
            var _PDIDetails = JSON.parse(pData[0]);
            PDIDetails_BindTableRows(_PDIDetails);
            $("#btn-NewAdd").attr("onclick", "Pickup_ClearAllControls(" + pOperationVehicleID + ");");
            jQuery("#PickupModal").modal("show");
            FadePageCover(false);
        }
        , null);
}
function PDI_Print(pOperationVehicleID) {
    debugger;
    FadePageCover(true);
    var pWhereClause = "WHERE OperationVehicleID=" + pOperationVehicleID;
    var pPageSize = 999999; //$('#select-page-size').val();
    var pPageNumber = 1; //($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    CallGETFunctionWithParameters("/api/PDI/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
        , pControllerParameters
        , function (pData) {
            var _PDIRows = JSON.parse(pData[0]);
            if (_PDIRows.length == 0)
                swal("Sorry", "No PDI done for this vehicle.");
            else {
                var _TodaysDate = getTodaysDateInddMMyyyyFormat();
                var ReportHTML = '';
                //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>' + 'PDI' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                ReportHTML += '         <body style="background-color:white;">';

                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3><b>' + ' PDI ' + '</b></h3></div>';

                //ReportHTML += '             <div class="col-xs-12"><b>Doc. </b>' + (_PDIRows[0].CodeSerial == 0 ? '' : _PDIRows[0].CodeSerial) + '</div>';
                //ReportHTML += '             <div class="col-xs-12 m-l text-right">' + _TodaysDate + '<b>' + '  التاريخ  ' + '</b></div>';
                ReportHTML += '             <div class="col-xs-12">' + '<b>Chassis Number : </b>' + _PDIRows[0].ChassisNumber + '</div>';
                ReportHTML += '             <div class="col-xs-12">' + '<b>Motor Number : </b>' + _PDIRows[0].EngineNumber + '</div>';
                ReportHTML += '             <div class="col-xs-12">' + '<b>OCN Code : </b>' + _PDIRows[0].OCNCode + '</div>';

                ReportHTML += '                         <table id="tblPDIPrint" style="font-size:90%;" class="table table-striped b-t b-light text-sm  table-bordered">';  //table-hover
                ReportHTML += '                             <thead>';
                ReportHTML += '                                 <tr>';
                ReportHTML += '                                     <th style="width:5%;">' + 'Serial' + '</th>';
                ReportHTML += '                                     <th>' + 'PDI Code' + '</th>';
                ReportHTML += '                                     <th>' + 'Item Code' + '</th>';
                ReportHTML += '                                     <th>' + 'Item Name' + '</th>';
                ReportHTML += '                                     <th>' + 'Quantity' + '</th>';
                ReportHTML += '                                     <th>' + 'Date' + '</th>';
                ReportHTML += '                                 </tr>';
                ReportHTML += '                             </thead>';
                ReportHTML += '                             <tbody>';
                for (var i = 0; i < _PDIRows.length; i++) {
                    ReportHTML += '                                 <tr class="" style="">';
                    ReportHTML += '                                     <td>' + (i + 1) + '</td>';
                    ReportHTML += '                                     <td>' + _PDIRows[i].Code + '</td>';
                    ReportHTML += '                                     <td>' + _PDIRows[i].PurchaseItemCode + '</td>';
                    ReportHTML += '                                     <td>' + _PDIRows[i].PurchaseItemName + '</td>';
                    ReportHTML += '                                     <td>' + _PDIRows[i].Quantity + '</td>';
                    ReportHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(_PDIRows[i].ActionDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(_PDIRows[i].ActionDate))) + '</td>';
                    ReportHTML += '                                 </tr>';
                }
                ReportHTML += '                             </tbody>';
                ReportHTML += '                         </table>';

                //ReportHTML += '                 <div class="" style="clear:both;">';
                //ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + ' :  أمين المخزن  ' + '</b></div>';
                //ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + '' + '</b></div>';
                //ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + '  :  مسئول التسليم   ' + '</b></div>';
                //ReportHTML += '                 </div>'
                //ReportHTML += '                 <div class="" style="clear:both;">';
                //ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + ' :  الاسم  ' + '</b></div>';
                //ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + '' + '</b></div>';
                //ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + '  :   الاسم   ' + '</b></div>';
                //ReportHTML += '                 </div>'

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
            FadePageCover(false);
        }
        , null);
}
function PDIDetails_BindTableRows(pPDI) {
    debugger;
    if (pPDI.length == 0)
        $("#slWarehouse").removeAttr("disabled");
    else
        $("#slWarehouse").attr("disabled", "disabled");
    ClearAllTableRows("tblPickupDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pPDI, function (i, item) {
        AppendRowtoTable("tblPickupDetails",
        ("<tr ID='" + item.ID + "' " + (1 == 1 ? ("ondblclick='PickupDetails_FillControls(" + item.ID + ");'") : "") + ">"
            + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
            + "<td class='ReceiveDetailsID hide'>" + item.ReceiveDetailsID + "</td>"
            //+ "<td class='BarCode'>" + (item.BarCode == 0 ? "" : item.BarCode) + "</td>"
            + "<td class='PurchaseItemID hide'>" + (item.PurchaseItemID == 0 ? "" : item.PurchaseItemID) + "</td>"
            + "<td class='PDICode'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
            + "<td class='PurchaseItemCode'>" + (item.PurchaseItemCode == 0 ? "" : item.PurchaseItemCode) + "</td>"
            + "<td class='PurchaseItemName'>" + (item.PurchaseItemName == 0 ? "" : item.PurchaseItemName) + "</td>"
            //+ "<td class='ReceiveDetailsID hide'>" + (item.ReceiveDetailsID == 0 ? "" : item.ReceiveDetailsID) + "</td>"
            //+ "<td class='ReceiveCode'>" + (item.ReceiveCode == 0 ? "" : item.ReceiveCode) + "</td>"
            //+ "<td class='LocationID hide'>" + (item.LocationID == 0 ? "" : item.LocationID) + "</td>"
            //+ "<td class='LocationCode'>" + (item.LocationCode == 0 ? "" : item.LocationCode) + "</td>"
            + "<td class='PickedQuantity'>" + item.Quantity + "</td>"
            + "<td class='ActionDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ActionDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ActionDate))) + "</td>"
            + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
            //+ "<td class='PackageTypeID hide'>" + (item.PackageTypeID == 0 ? "" : item.PackageTypeID) + "</td>"
            //+ "<td class='PackageTypeName'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>"
            + "<td class='hide'><a href='#PickupDetailsModal' data-toggle='modal' onclick='PickupDetails_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
        + "</tr>"));
    });
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblPickupDetails", "ID", "cb-CheckAll-PickupDetails");
    CheckAllCheckbox("HeaderDeletePickupDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function PDIDetails_Save() {
    debugger;
    if ($("#txPickupDetailsPurchaseItemQuantity").val() == 0 || $("#slPickupDetailsPurchaseItem").val() == "")
        swal("Sorry", "Please, select item and quantity");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pID: 0 //$("#hPDIID").val() == "" ? 0 : $("#hPDIID").val()
            , pOperationVehicleID: $("#hOperationVehicleID").val()
            , pPurchaseItemID: $("#slPickupDetailsPurchaseItem").val() == 0 ? "" : $("#slPickupDetailsPurchaseItem").val()
            , pQuantity: $("#txPickupDetailsPurchaseItemQuantity").val() == "" ? 0 : $("#txPickupDetailsPurchaseItemQuantity").val()
            , pActionDate: "01/01/1900"
            , pNotes: "0"
        };
        CallGETFunctionWithParameters("/api/PDI/Save", pParametersWithValues
            , function (pData) {
                var _ReturnedMessage = pData[0];
                var _PDI = JSON.parse(pData[1]);
                if (_ReturnedMessage == "") {
                    $("#txPickupDetailsPurchaseItemQuantity").val(1);
                    $("#slPickupDetailsPurchaseItem").val("");
                    PDIDetails_BindTableRows(_PDI);
                }
                else {
                    swal("Sorry", _ReturnedMessage);
                }
                FadePageCover(false);
            }
            , null);
    }
}
function PDIDetails_DeleteList() {
    debugger;
    var pPDIIDsToDelete = GetAllSelectedIDsAsString('tblPickupDetails');
    if (pPDIIDsToDelete != "")
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
            CallGETFunctionWithParameters("/api/PDI/DeleteList"
                , { pPDIIDsToDelete: pPDIIDsToDelete, pOperationVehicleID: $("#hOperationVehicleID").val() }
                , function (pData) {
                    var _ReturnedMessage = pData[0];
                    var _PDI = JSON.parse(pData[1]);
                    if (_ReturnedMessage == "") {
                        PDIDetails_BindTableRows(_PDI);
                    }
                    else {
                        swal("Sorry", _ReturnedMessage);
                    }
                    FadePageCover(false);
                });
        });
}
var check = 0;
function PaymentRequest_BindTableRows(pPaymentRequest) {
    check = 1;
    debugger;
    ClearAllTableRows("tblPaymentRequest");

    

    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
    var CopyControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i                     style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Copy" + "</span>";
    $.each(pPaymentRequest, function (i, item) {



        AppendRowtoTable("tblPaymentRequest",
        ("<tr ID='" + item.ID + "' ondblclick='PaymentRequest_FillAllControls(" + item.ID + ");'>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Code'>" + item.Code + "</td>"
             //+ "<td class='IsCheck hide'>" + item.IsCheck + "</td>"
            + "<td class='CustodyID hide'>" + item.CustodyID + "</td>"
            + "<td class='CustodyName'>" + item.CustodyName + "</td>"
             + "<td class='PartnerName'>" + item.PartnerName + "</td>"
             + "<td class='PartenerID hide'>" + item.PartenerID + "</td>"
             + "<td class='PartenerTypeID hide'>" + item.PartenerTypeID + "</td>"
            //+ "<td class='Operations'>" + item.Operations + "</td>"
            //+ "<td class='RequestDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.RequestDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.RequestDate))) + "</td>"
            //+ "<td class='TotalEstmatedCost'>" + item.TotalEstmatedCost + "</td>"
            + "<td class='TotalActualCost'>" + item.TotalActualCost + "</td>"
            //+ "<td class='CurrencyID hide'>" + item.CurrencyID + "</td>"
            //+ "<td class='CurrencyCode'>" + item.CurrencyCode + "</td>"
            + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
            //+ "<td class='IsApprovedRequest'> <input type='checkbox' id='cbIsApprovedRequest" + item.ID + "' disabled='disabled' " + (_IsCustodySettlement == 1 ? (item.IsApprovedSettlement ? " checked='checked' " : "") : (item.IsApprovedRequest ? " checked='checked' " : "")) + " /></td>"
            + "<td class=''>"
            + "<a href='#' data-toggle='modal' onclick='PaymentRequest_Print(" + item.ID + ");' " + printControlsText + "</a></td>"
               + "<td class='" + ((_IsCustodySettlement == 1) ? 'hide' : '') + "'>"
            + "<a href='#' data-toggle='modal' onclick='PaymentRequest_Copy(" + item.ID + ");' " + CopyControlsText + " </a></td>"
            + "</tr>"));
    });
    ApplyPermissions();
    if ($("#hf_CanDelete").val() == 1) {
        $("#btn-Approve").removeClass("hide");
    }
    else {
        $("#btn-Approve").addClass("hide");
    }
    if (_IsCustodySettlement == 1) {
        $('#btn-NewAdd').addClass('hide');
        $('#btn-Delete').addClass('hide');
    }
    BindAllCheckboxonTable("tblPaymentRequest", "ID");
    CheckAllCheckbox("ID");
    //HighlightText("#tblPaymentRequest>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });

    $("#slFilterPartenerType").html($("#slPartenerType").html());
    $("#slFilterPartener").html($("#slPartener").html());
}
function PaymentRequest_LoadingWithPaging() {
    debugger;
    var pWhereClause = PaymentRequest_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "r.ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { PaymentRequest_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblPaymentRequest>tbody>tr", $("#txt-Search").val().trim());
}
function PaymentRequest_GetWhereClause() {
    var pWhereClause = " WHERE CreatorUserID_Request = " + $("#hLoggedUserID").val() + " AND isnull(IsApprovedSettlement,0) = 1 AND VoucherID is not null and  isnull(PartenerID,0)<>0";
    //if ((_IsCustodySettlement == 1))
    //    pWhereClause = " WHERE CreatorUserID_Request = " + $("#hLoggedUserID").val() + " AND isnull(IsApprovedSettlement,0) = 1 AND VoucherID is not null and  isnull(PartenerID,0)<>0";
    if ($("#txtFilterCodeSerial").val().trim() != "")
        pWhereClause += " AND (Code=N'" + $("#txtFilterCodeSerial").val().trim().toUpperCase() + "')" + "\n";
    if ($("#slFilterPartenerType").val() != "")
        pWhereClause += " AND PartenerTypeID = "+ $("#slFilterPartenerType").val();
    if ($("#slFilterPartener").val() != "" && $("#slFilterPartener").val() != null)
        pWhereClause += " AND PartenerID = "+ $("#slFilterPartener").val();
    
    if (isValidDate($("#txtFilterFromRequestDate").val().trim(), 1)) {
        if ($("#txtFilterFromRequestDate").val() != null && $("#txtFilterFromRequestDate").val() != "")
            pWhereClause += " AND (RequestDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromRequestDate").val()) + " 00:00:00.000')" + "\n";
    }
    if (isValidDate($("#txtFilterToRequestDate").val().trim(), 1)) {
        if ($("#txtFilterToRequestDate").val() != null && $("#txtFilterToRequestDate").val() != "")
            pWhereClause += " AND (RequestDate <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToRequestDate").val()) + " 23:59:59.999')" + "\n";
    }
    return pWhereClause;
}
function PaymentRequest_ClearAllControls() {
    debugger;
    PaymentRequest_EnableDisableEditing(1);
    $("#tblSettelmentSupplierDrivers tbody").html("");
    ClearAll("#PaymentRequestModal");

    $("#slCurrency").val(pDefaults.CurrencyID);
    $("#txtRequestDate").val(getTodaysDateInddMMyyyyFormat());
    $("#txtExchangeRate").val(1);

    $(".classDisableForPosted").removeAttr("disabled");
    $(".classDisableForDetails").removeAttr("disabled");

    $("#btnSave").attr("onclick", "AlarmUsers_SavePaymentRequest(false);");
    $("#btnSaveAndAddNew").attr("onclick", "AlarmUsers_SavePaymentRequest(true);");
    $("#cb-CheckAll").prop('checked', false);

    //LoadAllChargeType()
}
function PaymentRequest_FillAllControls(pID) {
    debugger;
    $("#tblSettelmentSupplierDrivers tbody").html("");
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/SettelmentSupplierDrivers/LoadDetails", { pHeaderID: pID, pIsCustodySettlement: _IsCustodySettlement }
        , function (pData) {
            jQuery("#PaymentRequestModal").modal("show");
            var pInvoiceDetails = JSON.parse(pData[0]);
            if (_IsCustodySettlement == 1) {
                PaymentRequest_ClearAllControls();
                CustodySettlementDetails_BindTableRows(pInvoiceDetails);
            }
            //if (pInvoiceDetails.length > 0) {
            //    $(".classDisableForDetails").attr("disabled", "disabled");
            //}
            //else {
            //    $(".classDisableForDetails").removeAttr("disabled");
            //}
            //if (pHeader.IsPosted) {
            //    $(".classDisableForPosted").attr("disabled", "disabled");
            //}
            //else {
            //    $(".classDisableForPosted").removeAttr("disabled");
            //}
            var d = new Date();
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();
            $('#txtSettlementDate').val(output);


            var tr = $("#tblPaymentRequest tr[ID='" + pID + "']");

            $("#hID").val(pID);
            $("#lblShown").html(": " + tr.find("td.Code").text() == "" ? "0" : tr.find("td.Code").text());
            $("#txtCode").val(tr.find("td.Code").text() == "" ? "0" : tr.find("td.Code").text());
            $("#txtPartener").val(tr.find("td.PartnerName").text() == "" ? "0" : tr.find("td.PartnerName").text());
            $("#txtPartenerID").val(tr.find("td.PartenerID").text() == "" ? "0" : tr.find("td.PartenerID").text());
            $("#txtPartenerTypeID").val(tr.find("td.PartenerTypeID").text() == "" ? "0" : tr.find("td.PartenerTypeID").text());
            $("#slCustody").val(tr.find("td.CustodyID").text() == "" ? "0" : tr.find("td.CustodyID").text());
            $("#txtRequestDate").val(tr.find("td.RequestDate").text() == "" ? "0" : tr.find("td.RequestDate").text());
            $("#slCurrency").val(tr.find("td.CurrencyID").text() == "" ? "0" : tr.find("td.CurrencyID").text());
            $("#txtAmount").val(tr.find("td.TotalEstmatedCost").text() == "" ? "0" : tr.find("td.TotalEstmatedCost").text());
            $("#txtTotalActualCost").val(tr.find("td.TotalActualCost").text() == "" ? "0" : tr.find("td.TotalActualCost").text());
            $("#txtSettlementAmount").val(parseFloat($("#txtTotalActualCost").val()) - parseFloat($("#txtAmount").val()))
            $("#txtNotes").val(tr.find("td.Notes").text() == "" ? "0" : tr.find("td.Notes").text());
           
            GetSuppliers_Charges(pID);

            if (!$("#cbIsApprovedRequest" + pID).prop("checked") && $("#hf_CanEdit").val() == "1")
                PaymentRequest_EnableDisableEditing(1);
            else
                PaymentRequest_EnableDisableEditing(0);

            if (tr.find("td.IsCheck").text() == "true") {
                $('#cbIsCheck').prop("checked", true);
                $('#cbIsCash').prop("checked", false);
            }
            else {
                $('#cbIsCheck').prop("checked", false);
                $('#cbIsCash').prop("checked", true);
            }

            if (_IsCustodySettlement == 0) {
                $(".DisableWithCustody").removeAttr("disabled");
                PaymentRequestDetails_BindTableRows(pInvoiceDetails);
            }
            else {
                $(".DisableWithCustody").attr("disabled", "disabled");
                //$("#btnSave").removeAttr("disabled");
                //$("#btn-AddPaymentRequestDetails").removeAttr("disabled");
                //$("#btn-DeletePaymentRequestDetails").removeAttr("disabled");
            }

            FadePageCover(false);
        }
        , null);
}

function PaymentRequest_Save() {
    debugger;
    var pModalName = "CheckboxesListModal_SavePaymentRequest";
    var pCheckboxNameAttr = "cbAddedItemID_SavePaymentRequest";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pSelectedItemsIDs == "")
        swal("Sorry", "You have to select at least one receptionist.");
    else {
        if (ValidateForm("form", "PaymentRequestModal")) {
            FadePageCover(true);

            var pIDList = "";
            var pChargeTypeList = "";
            var pOperationList = "";
            var pHouseIDList = "";
            var pCertificateNumberIDList = "";
            var pTruckingOrderIDList = "";
            var pPartenerTypeIDList = "";
            var pPartenerIDList = "";
            var pPartenerID = "";
            var pPartenerTypeID = "";


            var pSupplierList = "";
            var pEstmatedCostList = "";
            var pActualCostList = "";
            var pDescriptionList = "";
            var pActualDescriptionList = "";
            var pFilterChargeTypesList = "";
            var pIsSettlementOnlyList = "";
            var pDetailsIDList = GetAllIDsAsStringWithNameAttr("tblSettelmentSupplierDrivers", "Delete");
            var pRowIDs = GetAllSelectedChargeTypes("tblSettelmentSupplierDrivers");
            var pDetailsID = '';
            debugger;
            $("#tblSettelmentSupplierDrivers tbody tr").each(function () {
                pDetailsID += ((pDetailsID == "") ? "" : ",") + ($(this).attr('ID'));
            });

            if (pDetailsIDList != "") {
                var NumberOfDetailsRows = pDetailsIDList.split(',').length;
                for (var i = 0; i < NumberOfDetailsRows; i++) {
                    var currentRowID = pDetailsID.split(",")[i];

                    pIDList += ((pIDList == "") ? "" : ",") + pDetailsIDList.split(",")[i];
                    pChargeTypeList += ((pChargeTypeList == "") ? "" : ",") + ($("#slChargeType" + currentRowID).val().trim() == "" ? "0" : $("#slChargeType" + currentRowID).val());
                    pOperationList += ((pOperationList == "") ? "" : ",") + ($("#slOperation" + currentRowID).val() == "" ? "0" : $("#slOperation" + currentRowID).val() == null ? "0" : $("#slOperation" + currentRowID).val());
                    pTruckingOrderIDList += ((pTruckingOrderIDList == "") ? "" : ",") + ($("#slTruckingOrder" + currentRowID).val() == "" || $("#slTruckingOrder" + currentRowID).val() == null ? "0" : $("#slTruckingOrder" + currentRowID).val());
                    pActualCostList += ((pActualCostList == "") ? "" : ",") + ($("#txtActualCost" + currentRowID).val().trim() == "" ? "0" : $("#txtActualCost" + currentRowID).val());
                    pDescriptionList += ((pDescriptionList == "") ? "" : ",") + ($("#txtDescription" + currentRowID).val().trim() == "" ? "0" : $("#txtDescription" + currentRowID).val().replace(/,/g, "_").trim());
                    pFilterChargeTypesList += ((pFilterChargeTypesList == "") ? "" : ",") + ($("#cbFlagChargeType" + currentRowID).prop('checked') == "" ? "false" : $("#cbFlagChargeType" + currentRowID).prop('checked'));
                }
                var pParametersWithValues = {
                    pPaymentRequestDetailsID: $("#hID").val() == "" ? 0 : $("#hID").val()
                    , pPartenerID: $("#txtPartenerID").val() == "" ? 0 : $("#txtPartenerID").val()
                    , pPartenerTypeID: $("#txtPartenerTypeID").val() == "" ? 0 : $("#txtPartenerTypeID").val()
                    //, pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim()
                    //, pCustodyID: $("#slCustody").val()
                    //, pRequestDate: ConvertDateFormat($("#txtRequestDate").val())
                    //, pCurrencyID: $("#slCurrency").val()
                    //, pIsCheck: $("#cbIsCash").prop("checked") ? 0 : 1
                    //, pNotes: $("#txtNotes").val().trim() == "" ? 0 : $("#txtNotes").val().trim().toUpperCase()
                    //, pTotalEstmatedCost: $("#txtAmount").val().trim() == "" ? 0 : $("#txtAmount").val()
                    //, pTotalActualCost: (_IsCustodySettlement == 1 ? ($("#txtTotalActualCost").val().trim() == "" ? 0 : $("#txtTotalActualCost").val()) : 0)
                    //, pTotalDiff: (_IsCustodySettlement == 1 ? (($("#txtTotalActualCost").val().trim() == "" ? 0 : $("#txtTotalActualCost").val()) - ($("#txtAmount").val().trim() == "" ? 0 : $("#txtAmount").val())) : 0)
                    , pIDList: pIDList
                    , pChargeTypeList: pChargeTypeList
                    , pOperationList: pOperationList
                    , pSupplierList: pSupplierList
                    , pEstmatedCostList: pEstmatedCostList
                    , pDescriptionList: pDescriptionList
                    , pFilterChargeTypesList: pFilterChargeTypesList
                    , pActualCostList: (_IsCustodySettlement == 1 ? pActualCostList : "0")
                    , pIsCustodySettlement: _IsCustodySettlement
                    , pActualDescriptionList: (_IsCustodySettlement == 1 ? pActualDescriptionList : "0")
                    //, pSettlementDate: ConvertDateFormat($('#txtSettlementDate').val())
                    , pIsSettlementOnlyList: (_IsCustodySettlement == 1 ? pIsSettlementOnlyList : "0")
                    , pSelectedItemsIDs: pSelectedItemsIDs
                    , pHouseIDList: pHouseIDList
                    , pCertificateNumberIDList: pCertificateNumberIDList
                    , pTruckingOrderIDList: pTruckingOrderIDList
                    , pPartenerTypeIDList: (_IsCustodySettlement == 1 ? pPartenerTypeIDList : "0")
                    , pPartenerIDList: (_IsCustodySettlement == 1 ? pPartenerIDList : "0")


                };
                CallPOSTFunctionWithParameters("/api/SettelmentSupplierDrivers/Save", pParametersWithValues
                    , function (pData) {
                        var _ReturnedMessage = pData[0];
                        if (_ReturnedMessage == "") {
                            PaymentRequest_LoadingWithPaging();
                            jQuery("#PaymentRequestModal").modal("hide");
                            swal("Success", "Saved successfully.");
                            //Approve_Notify();
                            FadePageCover(false);
                            jQuery('#CheckboxesListModal_SavePaymentRequest').modal('hide')
                            PaymentRequest_LoadingWithPaging();
                            LoadDefaults("/api/Defaults/LoadAll", " WHERE 1=1 ");
                        }
                        else {
                            swal("Sorry", _ReturnedMessage);
                            FadePageCover(false);
                        }
                    }
                               , null);
            }
            else {
                swal("Sorry", "Please, Add at least one Charge Type.(برجاء ادخال التفاصيل)");
                FadePageCover(false);
            }


        }
    }
}
function PaymentRequest_Print(pID) {
    debugger;
    if (pID == 0)
        pID = $("#hID").val();
    if (pID == "") //this means new without saving
        swal("Sorry", "Please, Add at least one invoice item.");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/SettelmentSupplierDrivers/LoadHeaderWithDetails"
            , { pHeaderID: pID, pIsCustodySettlement: 0 }
            , function (pData) {
                var pHeader = JSON.parse(pData[4])[0];
                var pDetails = JSON.parse(pData[2]);
                var mywindow = window.open('', '_blank');
                var ReportHTML = '';
                //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>' + 'Invoice' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '         <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>' + 'Payment Request - طلب صرف ' + pHeader.Code + '</h3></div> </br>';
                ReportHTML += '             <div class="col-xs-6"><b>Cur - العملة : </b>' + pHeader.CurrencyCode + '</div>';
                ReportHTML += '             <div class="col-xs-6"><b>Request Date - تاريخ الطلب : ' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pHeader.RequestDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(pHeader.RequestDate)) : "") + '</b></div>';
                ReportHTML += '             <div class="col-xs-6"><b>Custody - الموظف : </b>' + (pHeader.CustodyName == 0 ? "" : pHeader.CustodyName.replace(/\n/g, "<br/>")) + '</div>';
                if (pHeader.IsCheck)
                    ReportHTML += '             <div class="col-xs-6"><b>Cash - كاش  </b></div>';
                else
                    ReportHTML += '             <div class="col-xs-6"><b>Cheque - شيك  </b></div>';

                //ReportHTML += '             <div class="col-xs-4"><b>RMA No. : </b>' + (pHeader.RMANumber == 0 ? "" : pHeader.RMANumber) + '</div>';
                ReportHTML += '                         <table id="tblDetails" class="table table-striped b-t b-light text-sm table-bordered">'; //table-hover
                ReportHTML += '                             <thead>';
                ReportHTML += '                                 <tr>';
                ReportHTML += '                                     <th style="width:35%;">اسم البند</th>';
                ReportHTML += '                                     <th style="width:35%;">رقم العملية</th>';
                ReportHTML += '                                     <th style="width:10%;">اسم المورد</th>';
                ReportHTML += '                                     <th style="width:10%;">التكلفة المتوقعة</th>';
                if (_IsCustodySettlement == 1)
                    ReportHTML += '                                     <th style="width:10%;">التكلفة الفعلية</th>';
                ReportHTML += '                                     <th style="width:10%;">الملاحظات</th>';
                ReportHTML += '                                 </tr>';
                ReportHTML += '                             </thead>';
                ReportHTML += '                             <tbody>';
                debugger;
                $.each(pDetails, function (i, item) {
                    ReportHTML += '                                     <tr class="" style="font-size:95%;">';
                    ReportHTML += '                                         <td>' + (item.ChargeTypeName == 0 ? '' : item.ChargeTypeName) + '</td>';
                    ReportHTML += '                                         <td>' + (item.OperationCode == 0 ? '' : item.OperationCode) + '</td>';
                    ReportHTML += '                                         <td>' + (item.SupplierName == 0 ? '' : item.SupplierName) + '</td>';
                    ReportHTML += '                                         <td>' + (item.EstmatedCost.toFixed(2) == 0 ? '' : item.EstmatedCost.toFixed(2)) + '</td>';
                    if (_IsCustodySettlement == 1)
                        ReportHTML += '                                         <td>' + (item.ActualCost.toFixed(2) == 0 ? '' : item.ActualCost.toFixed(2)) + '</td>';
                    ReportHTML += '                                         <td>' + (item.Description == 0 ? '' : item.Description) + '</td>';
                    //ReportHTML += '                                         <td class="Quantity">' + item.Quantity + '</td>';

                    ReportHTML += '                                     </tr>';
                });
                ReportHTML += '                             </tbody>';
                ReportHTML += '                         </table>';

                //ReportHTML += '                         <div class="col-xs-7"><b>Received By : &nbsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';

                if (_IsCustodySettlement == 1)
                    ReportHTML += '                         <div class="col-xs-12"><b>Actual Total : </b>' + pHeader.TotalActualCost + '</div>';
                else
                    ReportHTML += '                         <div class="col-xs-12"><b>Estimated Total : </b>' + pHeader.TotalEstmatedCost + '</div>';
                //ReportHTML += '                         <div class="col-xs-7"><b>ID No. : &emsp;&emsp;&emsp;&nbsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';
                //ReportHTML += '                         <div class="col-xs-7"><b>Mobile : &emsp;&emsp;&emsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';
                //ReportHTML += '                         <div class="col-xs-5"><b>Date : &emsp;&emsp;&emsp;&emsp;</b>' + getTodaysDateInddMMyyyyFormat() + '</div>';

                //ReportHTML += '                         <div class="col-xs-12 text-center m-t"><b>' + '  The equipment was received in good condition and there were no scratches.   ' + '</b></div>';
                //ReportHTML += '                         <div class="col-xs-12 text-center"><b>' + '  تم إستلام الأجهزة فى حالة سليمة ولا يوجد أى خدوش   ' + '</b></div>';
                //ReportHTML += '                         <div class="col-xs-12 text-center"><b>' + '  رجاء الختم بخاتم الشركه بما يفيد الاستلام  ' + '</b></div>';
                //ReportHTML += '                         <div class="col-xs-12 text-center"><b>' + '  Please seal the company with the receipt.	 ' + '</b></div>';
                ReportHTML += '         </body>';
                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                ReportHTML += '     </footer>';
                ReportHTML += '</html>';
                mywindow.document.write(ReportHTML);
                mywindow.document.close();

                FadePageCover(false);
            }
            , null);
    }
}

function PaymentRequest_Copy(pID) {
    debugger;
    $("#tblSettelmentSupplierDrivers tbody").html("");
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/SettelmentSupplierDrivers/LoadDetails", { pHeaderID: pID, pIsCustodySettlement: _IsCustodySettlement }
        , function (pData) {
            jQuery("#PaymentRequestModal").modal("show");
            var pInvoiceDetails = JSON.parse(pData[0]);
            //if (_IsCustodySettlement == 1) {
            //    PaymentRequest_ClearAllControls();
            //    CustodySettlementDetails_BindTableRows(pInvoiceDetails);
            //}
            var d = new Date();
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();
            $('#txtSettlementDate').val(output);


            var tr = $("#tblPaymentRequest tr[ID='" + pID + "']");

            //$("#hID").val(pID);
            $("#hID").val(0);
            $("#lblShown").html(": " + tr.find("td.Code").text() == "" ? "0" : tr.find("td.Code").text());
            //$("#txtCode").val(tr.find("td.Code").text() == "" ? "0" : tr.find("td.Code").text());
            $("#txtCode").val("")
            $("#slCustody").val(tr.find("td.CustodyID").text() == "" ? "0" : tr.find("td.CustodyID").text());
            $("#txtRequestDate").val(tr.find("td.RequestDate").text() == "" ? "0" : tr.find("td.RequestDate").text());
            $("#slCurrency").val(tr.find("td.CurrencyID").text() == "" ? "0" : tr.find("td.CurrencyID").text());
            $("#txtAmount").val(tr.find("td.TotalEstmatedCost").text() == "" ? "0" : tr.find("td.TotalEstmatedCost").text());
            $("#txtTotalActualCost").val(tr.find("td.TotalActualCost").text() == "" ? "0" : tr.find("td.TotalActualCost").text());
            $("#txtSettlementAmount").val(parseFloat($("#txtTotalActualCost").val()) - parseFloat($("#txtAmount").val()))
            $("#txtNotes").val(tr.find("td.Notes").text() == "" ? "0" : tr.find("td.Notes").text());


            if (!$("#cbIsApprovedRequest" + pID).prop("checked") && $("#hf_CanEdit").val() == "1")
                PaymentRequest_EnableDisableEditing(1);
            else
                PaymentRequest_EnableDisableEditing(0);

            if (tr.find("td.IsCheck").text() == "true") {
                $('#cbIsCheck').prop("checked", true);
                $('#cbIsCash').prop("checked", false);
            }
            else {
                $('#cbIsCheck').prop("checked", false);
                $('#cbIsCash').prop("checked", true);
            }

            $("#btn-AddPaymentRequestDetails").removeAttr("disabled");
            $("#btn-DeletePaymentRequestDetails").removeAttr("disabled");
            $("#btnSave").removeAttr("disabled");

            if (_IsCustodySettlement == 0) {
                $(".DisableWithCustody").removeAttr("disabled");
                PaymentRequestDetails_BindTableRows_ForCopy(pInvoiceDetails);
            }
            else {
                $(".DisableWithCustody").attr("disabled", "disabled");
                $("#btnSave").removeAttr("disabled");
                $("#btn-AddPaymentRequestDetails").removeAttr("disabled");
                $("#btn-DeletePaymentRequestDetails").removeAttr("disabled");
            }

            FadePageCover(false);
        }
        , null);
}

function PaymentRequest_DeleteList(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPaymentRequest') != "")
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


            CallGETFunctionWithParameters("/api/SettelmentSupplierDrivers/Delete"
                , { "pDeletedPaymentRequestIDs": GetAllSelectedIDsAsString('tblPaymentRequest') }
                , function (pData) {
                    if (JSON.parse(pData[0])) {
                        PaymentRequest_LoadingWithPaging();
                    }
                    else {
                        showDeleteFailMessage = true
                        strDeleteFailMessage = pData[1];
                        PaymentRequest_LoadingWithPaging();
                    }
                });
        });
}
function _PaymentRequest_ApproveList(callback) {
    //Confirmation message to delete
    debugger;
    if (GetAllSelectedIDsAsString('tblPaymentRequest') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be Approved !",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Approve!",
            closeOnConfirm: true
        },
        //callback function in case of confirm delete
        function () {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/SettelmentSupplierDrivers/Approve"
                , { "pDeletedPaymentRequestIDs": GetAllSelectedIDsAsString('tblPaymentRequest') }
                , function (pData) {
                    if (pData == "") {
                        swal("Success", "approved successfully.");
                        PaymentRequest_LoadingWithPaging();
                    }
                    else {
                        showDeleteFailMessage = true
                        strDeleteFailMessage = pData;
                        PaymentRequest_LoadingWithPaging();
                    }

                });
        });
}
function PaymentRequest_EnableDisableEditing(pOption) { //pOption 1:Enable 2:Disable
    if (pOption == 1) {
        $("#btnSave").removeAttr("disabled");
        $("#btn-AddPaymentRequestDetails").removeAttr("disabled");
        $("#btn-DeletePaymentRequestDetails").removeAttr("disabled");
    }
    else {
        $("#btnSave").attr("disabled", "disabled");
        $("#btn-AddPaymentRequestDetails").attr("disabled", "disabled");
        $("#btn-DeletePaymentRequestDetails").attr("disabled", "disabled");
    }
}
var maxDetailsIDInTable = 0;
function Details_NewRow() {
    debugger;
    check = 0;
    ++maxDetailsIDInTable;
    // var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-btn-AddPaymentRequestDetails' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'></span>";
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);

    var tr = "";
    if (_IsCustodySettlement == 1) {
        tr += "<tr ID='" + maxDetailsIDInTable + "' isdeleted='0' tag='item'   counter='" + (maxDetailsIDInTable) + "' value='" + 0 + "'>"
        tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxDetailsIDInTable + "' checked='checked' /></td>";
        tr += "     <td class='DetailsID' style='width:2%;'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + 0 + "' /></td>";
        tr += "     <td class='Operation' disabled style='width:10%;' val=''><select id='slOperation" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + "); Details_HouseAndCertificateChangedByOperation(" + maxDetailsIDInTable + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";
        //tr += "     <td class='HouseNumber' disabled style='width:7%;' val=''><select id='slHouse" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 1 + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";
        //tr += "     <td class='CertificateNumber' disabled style='width:7%;' val=''><select id='slCertificateNumber" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slCertificateNumber' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 2 + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";
        tr += "     <td class='TruckingOrder' disabled style='width:7%;' val=''><select id='slTruckingOrder" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 3 + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";



        tr += "     <td class='FlagChargeType' disabled style='width:5%;' val=''><input id='cbFlagChargeType" + maxDetailsIDInTable + "'  name='FlagChargeType'  onchange='GetChargeTypesToOperation(" + maxDetailsIDInTable + ");' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>"
        tr += "     <td class='ChargeType' disabled style='width:15%;' val=''><select id='slChargeType" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='GetInitialValue(" + maxDetailsIDInTable + ");' data-required='true'>" + "<option value=0></option>" + "</select></td>";
       // tr += "     <td class='Supplier' disabled style='width:20%;' val=''><select id='slSupplier" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + "<option value=0>Select Supplier</option>" + "</select></td>";
        //tr += "     <td class='EstmatedCost'  style='width:9%;'><input type='text' disabled style='width:100%;font-size:90%;'  id='txtEstmatedCost" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='true' value='0' /> </td>";
        tr += "     <td class='ActualCost' style='width:9%;'><input type='text'   style='width:100%;font-size:90%;'  id='txtActualCost" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='true' value='' /> </td>"

        //tr += "     <td class='PartenerType' disabled style='width:7%;' val=''><select id='slPartenerType" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slPartenerType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='Details_FillSlPartenerByPartenerType(" + maxDetailsIDInTable + ");'  data-required='true'>" + "<option value=0></option>" + "</select></td>";
        //tr += "     <td class='Partener' style='width:10%;' val=''><select id='slPartener" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slPartener' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + "<option value=0>Select Supplier</option>" + "</select></td>";

        tr += "     <td class='Description hide' style='width:20%;'><input type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtDescription" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtDescription" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtDescription" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
        tr += "     <td class='ActualDescription' style='width:20%;'><input type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtActualDescription" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtActualDescription" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtActualDescription" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
        //tr += "      <td class='Documented' style='width:1%;'><input id='cbDocumented" + maxDetailsIDInTable + "' name='Documented'  class='cbIsDocumented' type='checkbox' value='' ></td>";
        tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate'  id='SelectedIDsToUpdate" + maxDetailsIDInTable + "' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";
        tr += "     <td class='hide'>"
          + "</td>";
        tr += "</tr>";
    }
    else {
        tr += "<tr ID='" + maxDetailsIDInTable + "' isdeleted='0' tag='item'   counter='" + (maxDetailsIDInTable) + "' value='" + 0 + "'>"
        tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxDetailsIDInTable + "' checked='checked' /></td>";
        tr += "     <td class='DetailsID' style='width:2%;'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + 0 + "' /></td>";
        tr += "     <td class='Operation' style='width:10%;' val=''><select id='slOperation" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'   onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_HouseAndCertificateChangedByOperation(" + maxDetailsIDInTable + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";


        tr += "     <td class='HouseNumber' style='width:7%;' val=''><select id='slHouse" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 1 + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";
        tr += "     <td class='CertificateNumber' style='width:7%;' val=''><select id='slCertificateNumber" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slCertificateNumber' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 2 + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";
        tr += "     <td class='TruckingOrder' style='width:7%;' val=''><select id='slTruckingOrder" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 3 + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";

        tr += "     <td class='FlagChargeType' style='width:5%;' val=''><input id='cbFlagChargeType" + maxDetailsIDInTable + "'  name='FlagChargeType'  onchange='GetChargeTypesToOperation(" + maxDetailsIDInTable + ");' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>"
        tr += "     <td class='ChargeType' style='width:15%;' val=''><select id='slChargeType" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + maxDetailsIDInTable + ");'  data-required='true'>" + "<option value=0></option>" + "</select></td>";
        tr += "     <td class='Supplier' style='width:20%;' val=''><select id='slSupplier" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + "<option value=0></option>" + "</select></td>";
        tr += "     <td class='EstmatedCost' style='width:9%;'><input type='text' style='width:100%;font-size:90%;'  id='txtEstmatedCost" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='false' value='0' /> </td>";
        tr += "     <td class='Description' style='width:20%;'><input type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtDescription" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtDescription" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtDescription" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
        //tr += "      <td class='Documented' style='width:1%;'><input id='cbDocumented" + maxDetailsIDInTable + "' name='Documented'  class='cbIsDocumented' type='checkbox' value='' ></td>";
        tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate'  id='SelectedIDsToUpdate" + maxDetailsIDInTable + "' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";
        tr += "     <td class='hide'>"
          + "</td>";
        tr += "</tr>";
    }


    $("#tblSettelmentSupplierDrivers tbody").prepend(tr);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $("#tblSettelmentSupplierDrivers tbody tr[ID=" + maxDetailsIDInTable + "]").reverseChildren();
    /***************************Filling row controls******************************/

    $("#slOperation" + maxDetailsIDInTable).html($("#slOperation").html());
    $("#slHouse" + maxDetailsIDInTable).html($("#slHouse").html());
    $("#slCertificateNumber" + maxDetailsIDInTable).html($("#slCertificateNumber").html());
    $("#slTruckingOrder" + maxDetailsIDInTable).html($("#slTruckingOrder").html());
    $("#slPartenerType" + maxDetailsIDInTable).html($("#slPartenerType").html());
    $("#slPartener" + maxDetailsIDInTable).html($("#slPartener").html());




    $("#slChargeType" + maxDetailsIDInTable).html($("#slChargeType").html());
    $("#slSupplier" + maxDetailsIDInTable).html($("#slSupplier").html());

    BindAllCheckboxonTable("tblSettelmentSupplierDrivers", "DetailsID", "cb-CheckAll-PaymentRequestDetails");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    /***********************EOF Filling row controls******************************/

    //Start Auto Filter
    // Start Auto Filter
    $("#slHouse" + maxDetailsIDInTable).css({ "width": "100%" }).select2();
    $("#slCertificateNumber" + maxDetailsIDInTable).css({ "width": "100%" }).select2();
    $("#slTruckingOrder" + maxDetailsIDInTable).css({ "width": "100%" }).select2();




    //$("#slHouse" + maxDetailsIDInTable).trigger("change");
    //$("#slCertificateNumber" + maxDetailsIDInTable).trigger("change");
    //$("#slTruckingOrder" + maxDetailsIDInTable).trigger("change");



    //End Auto Filter
    //  }

    // $("#slHouse" + maxDetailsIDInTable).html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");
    // $("#slHouse" + maxDetailsIDInTable).html($("#slHouse" + (maxDetailsIDInTable - 1)).html());
    // $("#slHouse" + maxDetailsIDInTable).val($("#slHouse" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slHouse" + (maxDetailsIDInTable - 1)).val());
    // //$("#slHouse" + maxDetailsIDInTable).trigger("change");

    // $("#slCertificateNumber" + maxDetailsIDInTable).html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");
    // $("#slCertificateNumber" + maxDetailsIDInTable).html($("#slCertificateNumber" + (maxDetailsIDInTable - 1)).html());
    // $("#slCertificateNumber" + maxDetailsIDInTable).val($("#slCertificateNumber" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slCertificateNumber" + (maxDetailsIDInTable - 1)).val());
    //// $("#slCertificateNumber" + maxDetailsIDInTable).trigger("change");

    // $("#slTruckingOrder" + maxDetailsIDInTable).html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");
    // $("#slTruckingOrder" + maxDetailsIDInTable).html($("#slTruckingOrder" + (maxDetailsIDInTable - 1)).html());
    // $("#slTruckingOrder" + maxDetailsIDInTable).val($("#slTruckingOrder" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slTruckingOrder" + (maxDetailsIDInTable - 1)).val());
    //$("#slTruckingOrder" + maxDetailsIDInTable).trigger("change");
    //////////////

}

/*************************************Details*******************************************/
function PaymentRequestDetails_BindTableRows(pInvoiceDetails) {
    debugger;
    ClearAllTableRows("tblSettelmentSupplierDrivers");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pInvoiceDetails, function (i, item) {
        AppendRowtoTable("tblSettelmentSupplierDrivers",
        ("<tr ID='" + item.ID + "' " + ">"
            + "<td class='DetailsID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + item.ID + "' checked='checked' /></td>"
            + "<td class='Operation' style='width:15%;' val=''><select  tag='" + (item.OperationID == 0 ? "" : item.OperationID) + "' id='slOperation" + item.ID + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + item.ID + ");Details_HouseAndCertificateChangedByOperation(" + item.ID + ");' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slOperation').html() + "</select></td>"
            + "<td class='HouseNumber' style='width:10%;' val=''><select  tag='" + (item.HouseID == 0 ? "" : item.HouseID) + "' id='slHouse" + item.ID + "' style='width:100%;' class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slHouse').html() + "</select></td>"
            + "<td class='CertificateNumber' style='width:10%;' val=''><select  tag='" + (item.CertificateNumberID == 0 ? "" : item.CertificateNumberID) + "' id='slCertificateNumber" + item.ID + "' style='width:100%;' class='controlStyle slCertificateNumber' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slCertificateNumber').html() + "</select></td>"
            + "<td class='TruckingOrder' style='width:10%;' val=''><select  tag='" + (item.TruckingOrderID == 0 ? "" : item.TruckingOrderID) + "' id='slTruckingOrder" + item.ID + "' style='width:100%;' class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slTruckingOrder').html() + "</select></td>"



            + "<td class='FlagChargeType' style='width:5%;' val=''><input id='cbFlagChargeType" + item.ID + "' " + (item.FilterChargeTypes ? "checked" : "") + "  name='FlagChargeType' onchange='GetChargeTypesToOperation(" + item.ID + ");' type='checkbox' value='" + item.FilterChargeTypes + "' /></td>"
            + "<td class='ChargeType' style='width:20%;' val=''><select tag='" + (item.ChargeTypeID == 0 ? "" : item.ChargeTypeID) + "' id='slChargeType" + item.ID + "' style='width:100%;' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + item.ID + ");'  data-required='false'>" + $('#slChargeType').html() + "</select></td>"
            + "<td class='Supplier' style='width:20%;' val=''><select  tag='" + (item.SupplierID == 0 ? "" : item.SupplierID) + "' id='slSupplier" + item.ID + "' style='width:100%;' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slSupplier').html() + "</select></td>"
            + "<td class='EstmatedCost' style='width:9%;'><input type='text' tag='" + (item.EstmatedCost) + "' style='width:100%;font-size:90%;'  id='txtEstmatedCost" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='true' value='" + item.EstmatedCost + "' /> </td>"
            + "<td class='Description' style='width:20%;'><input type='text' tag='" + (item.Description) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtDescription" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.Description + "' /> </td>"
        + "</tr>"));

        if (i == pInvoiceDetails.length - 1) {
            debugger;
            FillHTMLtblInputs("#tblSettelmentSupplierDrivers > tbody");
        }
    }

    );
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblSettelmentSupplierDrivers", "ID", "cb-CheckAll-PaymentRequestDetails");
    CheckAllCheckbox("HeaderDeletePaymentRequestDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function PaymentRequestDetails_BindTableRows_ForCopy(pInvoiceDetails) {
    ClearAllTableRows("tblSettelmentSupplierDrivers");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pInvoiceDetails, function (i, item) {
        AppendRowtoTable("tblSettelmentSupplierDrivers",
        ("<tr ID='" + i + "' " + ">"
            + "<td class='DetailsID'> <input name='Delete' type='checkbox' value='0' /></td>"
            + "<td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + i + "' checked='checked' /></td>"
            + "<td class='Operation' style='width:15%;' val=''><select  tag='" + (item.OperationID == 0 ? "" : item.OperationID) + "' id='slOperation" + i + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + i + ");Details_HouseAndCertificateChangedByOperation(" + i + ");' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='true'>" + $('#slOperation').html() + "</select></td>"
            + "<td class='HouseNumber' style='width:10%;' val=''><select  tag='" + (item.HouseID == 0 ? "" : item.HouseID) + "' id='slHouse" + i + "' style='width:100%;' class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + i + ");' onkeypress='DisableBackspaceKey(id);' onchange='Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 1 + "); ' data-required='true'>" + $('#slHouse').html() + "</select></td>"
            + "<td class='CertificateNumber' style='width:10%;' val=''><select  tag='" + (item.CertificateNumberID == 0 ? "" : item.CertificateNumberID) + "' id='slCertificateNumber" + item.ID + "' style='width:100%;' class='controlStyle slCertificateNumber' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + item.ID + ");' onkeypress='DisableBackspaceKey(id);' onchange='Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 2 + "); ' data-required='true'>" + $('#slCertificateNumber').html() + "</select></td>"
            + "<td class='TruckingOrder' style='width:10%;' val=''><select  tag='" + (item.TruckingOrderID == 0 ? "" : item.TruckingOrderID) + "' id='slTruckingOrder" + item.ID + "' style='width:100%;' class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + item.ID + ");' onkeypress='DisableBackspaceKey(id);' onchange='Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 3 + "); ' data-required='true'>" + $('#slTruckingOrder').html() + "</select></td>"

            + "<td class='FlagChargeType' style='width:5%;' val=''><input id='cbFlagChargeType" + i + "' " + (item.FilterChargeTypes ? "checked" : "") + "  name='FlagChargeType' onchange='GetChargeTypesToOperation(" + i + ");' type='checkbox' value='" + item.FilterChargeTypes + "' /></td>"
            + "<td class='ChargeType' style='width:20%;' val=''><select tag='" + (item.ChargeTypeID == 0 ? "" : item.ChargeTypeID) + "' id='slChargeType" + i + "' style='width:100%;' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + i + ");'  data-required='false'>" + $('#slChargeType').html() + "</select></td>"
            + "<td class='Supplier' style='width:20%;' val=''><select  tag='" + (item.SupplierID == 0 ? "" : item.SupplierID) + "' id='slSupplier" + i + "' style='width:100%;' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slSupplier').html() + "</select></td>"
            + "<td class='EstmatedCost' style='width:9%;'><input type='text' tag='" + (item.EstmatedCost) + "' style='width:100%;font-size:90%;'  id='txtEstmatedCost" + i + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='true' value='" + item.EstmatedCost + "' /> </td>"
            + "<td class='Description' style='width:20%;'><input type='text' tag='" + (item.Description) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtDescription" + i + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.Description + "' /> </td>"
        + "</tr>"));

        if (i == pInvoiceDetails.length - 1) {
            debugger;
            FillHTMLtblInputs("#tblSettelmentSupplierDrivers > tbody");
        }
    }

    );
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblSettelmentSupplierDrivers", "ID", "cb-CheckAll-PaymentRequestDetails");
    CheckAllCheckbox("HeaderDeletePaymentRequestDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}

function CustodySettlementDetails_BindTableRows(pInvoiceDetails) {
    $('#tblSettelmentSupplierDrivers').html("")
    //var CT_TH = '<thead><tr><th id="HeaderDeletePaymentRequestDetailsID" style="width:5%;"><input id="cb-CheckAll-PaymentRequestDetails" type="checkbox"></th>' +
    // '<th>OperationNo - رقم العملية</th><th> البوليصة</th><th> رقم الشهادة</th> <th> امر النقل</th><th> اختيار بنود العملية</th><th>ChargeType - البند</th><th>Supplier - المورد</th><th> Estimated Cost- التكلفة المتوقعة</th><th> Actual Cost- التكلفة الفعلية</th><th>PartenerType</th><th>Partener</th>' +
    // '<th>Description - الملاحظات</th><th class="rounded-right hide"></th></tr></thead> <tbody></tbody>';

    var CT_TH = '<thead><tr><th id="HeaderDeletePaymentRequestDetailsID" style="width:5%;"><input id="cb-CheckAll-PaymentRequestDetails" type="checkbox"></th>' +
     '<th>رقم العملية</th> <th> امر النقل</th><th> اختيار بنود العملية</th><th>البند</th> <th> التكلفة الفعلية</th>' +
     '<th>الملاحظات</th><th class="rounded-right hide"></th></tr></thead> <tbody></tbody>';
    $('#tblSettelmentSupplierDrivers').html(CT_TH);
    ClearAllTableRows("tblSettelmentSupplierDrivers");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pInvoiceDetails, function (i, item) {
        AppendRowtoTable("tblSettelmentSupplierDrivers",
        ("<tr ID='" + item.ID + "' " + ">"
            + "<td class='DetailsID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + item.ID + "' checked='checked' /></td>"
            + "<td class='Operation' style='width:10%;' val=''><select disabled  tag='" + (item.OperationID) + "' id='slOperation" + item.ID + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'   onchange='GetSuppliers_Charges(" + item.ID + ");Details_HouseAndCertificateChangedByOperation(" + item.ID + ");'  data-required='false'>" + $('#slOperation').html() + "</select></td>"
            //+ "<td class='HouseNumber' style='width:10%;' val=''><select disabled  tag='" + (item.HouseID) + "' id='slHouse" + item.ID + "' style='width:100%;' class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'   onchange='GetSuppliers_Charges(" + item.ID + ");'  data-required='false'>" + $('#slHouse').html() + "</select></td>"
            //+ "<td class='CertificateNumber' style='width:10%;' val=''><select disabled  tag='" + (item.CertificateNumberID) + "' id='slCertificateNumber" + item.ID + "' style='width:100%;' class='controlStyle slCertificateNumber' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'   onchange='GetSuppliers_Charges(" + item.ID + ");'  data-required='false'>" + $('#slCertificateNumber').html() + "</select></td>"
            + "<td class='TruckingOrder' style='width:10%;' val=''><select disabled tag='" + (item.TruckingOrderID == 0 ? "" : item.TruckingOrderID) + "' id='slTruckingOrder" + item.ID + "' style='width:100%;' class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + item.ID + ");' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slTruckingOrder').html() + "</select></td>"

            + "<td class='FlagChargeType' style='width:5%;' val=''><input disabled id='cbFlagChargeType" + item.ID + "' " + (item.FilterChargeTypes ? "checked" : "") + "  name='FlagChargeType' onchange='GetChargeTypesToOperation(" + item.ID + ");' type='checkbox' value='" + item.FilterChargeTypes + "' /></td>"
            + "<td class='ChargeType' style='width:10%;' val=''><select disabled tag='" + (item.ChargeTypeID) + "' id='slChargeType" + item.ID + "' style='width:100%;' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + item.ID + ");'  data-required='false'>" + $('#slChargeType').html() + "</select></td>"
            //+ "<td class='Supplier' style='width:10%;' val=''><select disabled  tag='" + (item.SupplierID == 0 ? "" : item.SupplierID) + "' id='slSupplier" + item.ID + "' style='width:100%;' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slSupplier').html() + "</select></td>"
            //+ "<td class='EstmatedCost' style='width:9%;'><input type='text' disabled tag='" + (item.EstmatedCost) + "' style='width:100%;font-size:90%;'  id='txtEstmatedCost" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='true' value='" + item.EstmatedCost + "' /> </td>"
            + "<td class='ActualCost' style='width:9%;'><input type='text' tag='" + (item.ActualCost == 0 ? "" : item.ActualCost) + "' style='width:100%;font-size:90%;'  id='txtActualCost" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='true' value='" + (item.ActualCost == 0 ? "" : item.ActualCost) + "' /> </td>"
            //+ "<td class='PartenerType' style='width:10%;' val=''><select  tag='" + (item.PartenerTypeID == 0 ? "" : item.PartenerTypeID) + "' id='slPartenerType" + item.ID + "' style='width:100%;' class='controlStyle slPartenerType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='Details_FillSlPartenerByPartenerType(" + item.ID + ");' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slPartenerType').html() + "</select></td>"
            //+ "<td class='Partener' style='width:10%;' val=''><select  tag='" + (item.PartenerID == 0 ? "" : item.PartenerID) + "' id='slPartener" + item.ID + "' style='width:100%;' class='controlStyle slPartener' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slPartener').html() + "</select></td>"
            + "<td class='Description ' style='width:20%;'><input type='text' tag='" + (item.Description) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtDescription" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.Description + "' /> </td>"
            + "<td class='ActualDescription hide' style='width:20%;'><input type='text' tag='" + (item.ActualDescription) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtActualDescription" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.ActualDescription + "' /> </td>"
            + "<td class='IsSettlementOnly hide' style='width:20%;'><input type='text' tag='" + (item.IsSettlementOnly) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtIsSettlementOnly" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + item.IsSettlementOnly + "' /> </td>"

        + "</tr>"));

        if (i == pInvoiceDetails.length - 1) {
            debugger;
            FillHTMLtblInputs("#tblSettelmentSupplierDrivers > tbody");
        }
    }

    );
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblSettelmentSupplierDrivers", "ID", "cb-CheckAll-PaymentRequestDetails");
    CheckAllCheckbox("HeaderDeletePaymentRequestDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}

function PaymentRequestDetails_DeleteList() {
    debugger;
    var pDeletedPaymentRequestDetailsIDs = '';
    var pDeletedIDs = GetAllSelectedIDsAsString('tblSettelmentSupplierDrivers');
    $("#tblSettelmentSupplierDrivers tbody tr").each(function () {
        if ($(this).find('input[name="' + "Delete" + '"]:checked').length > 0)
            pDeletedPaymentRequestDetailsIDs += ((pDeletedPaymentRequestDetailsIDs == "") ? "" : ",") + ($(this).attr('ID'));
    });
    // var pDeletedPaymentRequestDetailsIDs = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblSettelmentSupplierDrivers", "Delete");
    if (pDeletedPaymentRequestDetailsIDs != "")
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
            //if (ValidateForm("form", "PaymentRequestModal")) {
            FadePageCover(true);
            var pParametersWithValues = {
                pDeletedPaymentRequestDetailsIDs: pDeletedIDs
                //Header
                , pPaymentRequestID: $("#hID").val() == "" ? 0 : $("#hID").val()
            };
            CallGETFunctionWithParameters("/api/SettelmentSupplierDrivers/Details_Delete", pParametersWithValues
                , function (pData) {
                    if (pData[0]) {
                        PaymentRequest_LoadingWithPaging();
                        for (var i = 0; i < pDeletedPaymentRequestDetailsIDs.split(",").length; i++) {
                            $("#tblSettelmentSupplierDrivers tbody tr[Counter=" + pDeletedPaymentRequestDetailsIDs.split(",")[i] + "]").remove();
                            $("#tblSettelmentSupplierDrivers tbody tr[ID=" + pDeletedPaymentRequestDetailsIDs.split(",")[i] + "]").remove();
                        }
                        PaymentRequestDetails_CalculateAmount();
                    }
                    else
                        swal("Sorry", "Connection failed, please try again.");
                    FadePageCover(false);
                }
                , null);
            //}
        });//of swal
}
function PaymentRequestDetails_CalculateAmount() {
    debugger;
    var pSum = 0;
    if (_IsCustodySettlement == 0) {
        $("#tblSettelmentSupplierDrivers>tbody>tr").each(function (i, tr) {
            if ($(tr).find('td.EstmatedCost input[type="text"]').val() != 'undefined'
                && $(tr).find('td.EstmatedCost input[type="text"]').val() != undefined
                && $(tr).find('td.EstmatedCost input[type="text"]').val() != '') {
                var Value = $(tr).find('td.EstmatedCost input[type="text"]').val();
                pSum += parseFloat(Value);

            }
        });
        $("#txtAmount").val(pSum.toFixed(2));
    }
    else {
        $("#tblSettelmentSupplierDrivers>tbody>tr").each(function (i, tr) {
            if ($(tr).find('td.ActualCost input[type="text"]').val() != 'undefined'
                && $(tr).find('td.ActualCost input[type="text"]').val() != undefined
                && $(tr).find('td.ActualCost input[type="text"]').val() != '') {
                var Value = $(tr).find('td.ActualCost input[type="text"]').val();
                pSum += parseFloat(Value);

            }
        });
        $("#txtTotalActualCost").val(pSum.toFixed(2));
        $("#txtSettlementAmount").val(parseFloat($("#txtTotalActualCost").val()) - parseFloat($("#txtAmount").val()));
    }


}
function LoadAllChargeType() {
    debugger;
    // var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-btn-AddPaymentRequestDetails' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'></span>";
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);

    $("#slChargeType > option").each(function () {
        if (this.value != 0) {
            ++maxDetailsIDInTable;

            var tr = "";
            tr += "<tr ID='" + maxDetailsIDInTable + "' isdeleted='0' tag='item'   counter='" + (maxDetailsIDInTable) + "' value='" + 0 + "'>"
            tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxDetailsIDInTable + "' checked='checked' /></td>";
            tr += "     <td class='DetailsID' style='width:2%;'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + 0 + "' /></td>";
            tr += "     <td class='Operation' style='width:10%;' val=''><select id='slOperation" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_HouseAndCertificateChangedByOperation(" + maxDetailsIDInTable + ");'  data-required='true'>" + "<option value=0></option>" + "</select></td>";
            tr += "     <td class='HouseNumber' style='width:7%;' val=''><select id='slHouse" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");'  data-required='true'>" + "<option value=0></option>" + "</select></td>";
            tr += "     <td class='CertificateNumber' style='width:7%;' val=''><select id='slCertificateNumber" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slCertificateNumber' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");'  data-required='true'>" + "<option value=0></option>" + "</select></td>";
            tr += "     <td class='TruckingOrder' style='width:7%;' val=''><select id='slTruckingOrder" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");'  data-required='true'>" + "<option value=0></option>" + "</select></td>";



            tr += "     <td class='FlagChargeType' style='width:5%;' val=''><input id='cbFlagChargeType" + maxDetailsIDInTable + "' name='FlagChargeType' onchange='GetChargeTypesToOperation(" + maxDetailsIDInTable + ");'  type='checkbox' value='" + maxDetailsIDInTable + "' /></td>"
            tr += "     <td class='ChargeType' style='width:15%;' val=''><select tag='" + (this.value) + "' id='slChargeType" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + maxDetailsIDInTable + ");'  data-required='true'>" + "<option value=0></option>" + "</select></td>";
            tr += "     <td class='Supplier' style='width:20%;' val=''><select id='slSupplier" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + "<option value=0></option>" + "</select></td>";
            tr += "     <td class='EstmatedCost' style='width:9%;'><input type='text' style='width:100%;font-size:90%;'  id='txtEstmatedCost" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='true' value='' /> </td>";
            tr += "     <td class='Description' style='width:20%;'><input type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtDescription" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtDescription" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtDescription" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
            //tr += "      <td class='Documented' style='width:1%;'><input id='cbDocumented" + maxDetailsIDInTable + "' name='Documented'  class='cbIsDocumented' type='checkbox' value='' ></td>";
            tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate'  id='SelectedIDsToUpdate" + maxDetailsIDInTable + "' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";
            tr += "     <td class='hide'>"
              + "</td>";
            tr += "</tr>";

            $("#tblSettelmentSupplierDrivers tbody").prepend(tr);
            if ($("[id$='hf_ChangeLanguage']").val() == "ar")
                $("#tblSettelmentSupplierDrivers tbody tr[ID=" + maxDetailsIDInTable + "]").reverseChildren();
            /***************************Filling row controls******************************/

            $("#slOperation" + maxDetailsIDInTable).html($("#slOperation").html());
            $("#slHouse" + maxDetailsIDInTable).html($("#slHouse").html());
            $("#slCertificateNumber" + maxDetailsIDInTable).html($("#slCertificateNumber").html());
            $("#slTruckingOrder" + maxDetailsIDInTable).html($("#slTruckingOrder").html());



            $("#slChargeType" + maxDetailsIDInTable).html($("#slChargeType").html());
            $("#slSupplier" + maxDetailsIDInTable).html($("#slSupplier").html());

            $("#slChargeType" + maxDetailsIDInTable).val(this.value);
        }
    });
    BindAllCheckboxonTable("tblSettelmentSupplierDrivers", "DetailsID", "cb-CheckAll-PaymentRequestDetails");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeletePaymentRequestDetailsID");
}

function GetChargeTypesToOperation(ID) {
    debugger;
    if ($('#cbFlagChargeType' + ID).prop('checked') && $('#slOperation' + ID).val() != "") {
        var OperationId = $('#slOperation' + ID).val();
        var pParametersWithValues = {
            pOperationId: $('#slOperation' + ID).val()
           , pFlagChargeType: $('#cbFlagChargeType' + ID).prop('checked')
        };
        CallGETFunctionWithParameters("/api/SettelmentSupplierDrivers/GetChargeTypes", pParametersWithValues
            , function (pData) {
                var dd = pData[0];
                FillListFromObject(null, 10, "<--Select-->", ("slChargeType" + ID), pData[0], null);
                GetAllSelectedChargeTypes('tblSettelmentSupplierDrivers')

                //$('#tblSettelmentSupplierDrivers td').find('input[name="Delete"]:not(:checked)').each(function () {
                //    $(this).closest('tr').remove();
                //});


                FadePageCover(false);
            }
            , null);
    }
    else {
        $('#slChargeType' + ID).html($('#slChargeType').html());
    }



}

function GetSuppliers_Charges(ID) {
    debugger;
    var pWhereClause = " WHERE OperationID = " + $('#slOperation' + ID + '').val() + " AND PartnerID IS NOT NULL  ORDER BY PartnerTypeName ";
    var pSlName = "slSupplier" + ID;
    var pStrFirstRow = "Select Supplier";
    //var pStrFnName = "/api/OperationPartners/LoadAll";
    var pID = "0";
    if ($('#slOperation' + ID + '').val() != "")
        $.ajax({
            type: "GET",
            url: "/api/OperationPartners/LoadAll",
            data: { pWhereClause: pWhereClause },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                ClearAllOptions(pSlName);
                var option = "";
                if (pStrFirstRow != null)
                    option += '<option value="" PartnerTypeID="0" PartnerID="0" PaymentTermID="0" ClientEmailNotContact="0" Email="0">' + pStrFirstRow + '</option>';
                // Bind Data
                $.each(JSON.parse(data[0]), function (i, item) {
                    if (pID != null && pID != undefined) //in case of editing
                        if (pID == item.ID){
                            option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + ' PaymentTermID = ' + item.PaymentTermID + ' selected >' + item.Code + ": " + item.Name + '</option>';
                           
                        }
                           
                        else
                            option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + ' PaymentTermID = ' + item.PaymentTermID + '>' + item.Code + ": " + item.Name + '</option>';
                    else
                        option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + '     PaymentTermID = ' + item.PaymentTermID + '>' + item.Code + ": " + item.Name + '</option>';
                });

                $("#" + pSlName).append(option);
                $('#slSupplier' + ID).val($('#slSupplier' + ID).attr('tag'));
                

                //if (callback != null && callback != undefined)
                //    callback();
            },
            error: function (jqXHR, exception) {
                swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! GetListWithName in mainapp.master.js", "");
                FadePageCover(false);
            }

        });

}

function GetInitialValue(ID) {
    debugger;
    if ($('#cbFlagChargeType' + ID).prop('checked') && parseInt($('#slOperation' + ID + '').val()) > 0) {
        var ChargeTypeId = $('#slChargeType' + ID).val();
        var pParametersWithValues = {
            pOperationId: $('#slOperation' + ID).val()
            , pChargeTypeId: $('#slChargeType' + ID).val()
            //, pFlagChargeType: $('#cbFlagChargeType' + ID).prop('checked')
        };
        CallGETFunctionWithParameters("/api/SettelmentSupplierDrivers/GetInitialValue", pParametersWithValues
            , function (pData) {
                debugger;
                var PayablesList = JSON.parse(pData[0]);
                if (PayablesList.length > 0)
                    if ($('#txtEstmatedCost' + ID).val() > 0)
                    { }
                    else
                        $('#txtEstmatedCost' + ID).val(PayablesList[0].InitialSalePrice);
                FadePageCover(false);
            }
            , null);
    }

}

function GetListOperationPartnersWithPartnerTypeIDAndPartnerIDAttrAndWhereClause(pID, pStrFnName, pStrFirstRow, pSlName, pWhereClause, callback) {
    var pWhereClause = " WHERE OperationID = 31567 AND PartnerID IS NOT NULL  ORDER BY PartnerTypeName ";
    var pSlName = "slPayableSupplier";
    var pStrFirstRow = "Select Supplier";
    pStrFnName = "/api/OperationPartners/LoadAll";
    pID = "0";
    $.ajax({
        type: "GET",
        url: "/api/OperationPartners/LoadAll",
        data: { pWhereClause: pWhereClause },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            ClearAllOptions(pSlName);
            var option = "";
            if (pStrFirstRow != null)
                option += '<option value="" PartnerTypeID="0" PartnerID="0" PaymentTermID="0" ClientEmailNotContact="0" Email="0">' + pStrFirstRow + '</option>';
            // Bind Data
            $.each(JSON.parse(data[0]), function (i, item) {
                if (pID != null && pID != undefined) //in case of editing
                    if (pID == item.ID)
                        option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + ' PaymentTermID = ' + item.PaymentTermID + ' selected >' + item.Code + ": " + item.Name + '</option>';
                    else
                        option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + ' PaymentTermID = ' + item.PaymentTermID + '>' + item.Code + ": " + item.Name + '</option>';
                else
                    option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + '     PaymentTermID = ' + item.PaymentTermID + '>' + item.Code + ": " + item.Name + '</option>';
            });

            $("#" + pSlName).append(option);

            if (callback != null && callback != undefined)
                callback();
        },
        error: function (jqXHR, exception) {
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! GetListWithName in mainapp.master.js", "");
            FadePageCover(false);
        }
    });
}

function GetAllSelectedChargeTypes(TableID) {
    var listOfIDs = new Array();
    $('#' + TableID + ' td').find('input[name="Delete"]:checked').each(function () {
        listOfIDs.push($(this).closest('tr').attr('id'));
    });
    return listOfIDs;
}

function Approve_Notify(pID) {
    debugger;
    $("#lblShownItems").html(" Receptionists");
    $("#divCheckboxesList").html("");
    jQuery("#CheckboxesListModal").modal("show");
    var pStrFnName = "/api/Users/LoadAll";
    var pDivName = "divCheckboxesList";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pWhereClause = " WHERE IsInactive=0 ";
    pWhereClause += " ORDER BY Name ";

    debugger;
    FadePageCover(true);
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            FadePageCover(false);
        });
}
function AlarmUsers_PaymentRequest() {
    debugger;
    //FadePageCover(true);
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pSelectedItemsIDs == "")
        swal("Sorry", "You have to select at least one receptionist.");
    else {
        debugger;
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/SettelmentSupplierDrivers/Approve"
            , { "pDeletedPaymentRequestIDs": GetAllSelectedIDsAsString('tblPaymentRequest'), "PReceiverUsers": pSelectedItemsIDs, "pIsCustodySettlement": _IsCustodySettlement }
            , function (pData) {
                if (pData == "") {
                    swal("Success", "approved successfully.");
                    FadePageCover(false);
                    jQuery('#CheckboxesListModal').modal('hide')
                    PaymentRequest_LoadingWithPaging();
                    LoadDefaults("/api/Defaults/LoadAll", " WHERE 1=1 ");
                }
                else {
                    FadePageCover(false);
                    jQuery('#CheckboxesListModal').modal('hide')
                    showDeleteFailMessage = true;
                    strDeleteFailMessage = pData;
                    PaymentRequest_LoadingWithPaging();
                }

            });
    }

}
function AlarmUsers_SavePaymentRequest() {
    debugger;
    //FadePageCover(true);
    $("#lblShownItems_SavePaymentRequest").html(" Receptionists");
    $("#divCheckboxesList_SavePaymentRequest").html("");
    jQuery("#CheckboxesListModal_SavePaymentRequest").modal("show");
    var pStrFnName = "/api/Users/LoadAll";
    var pDivName = "divCheckboxesList_SavePaymentRequest";
    var pCheckboxNameAttr = "cbAddedItemID_SavePaymentRequest";
    var pWhereClause = " WHERE IsInactive=0 ";
    pWhereClause += " ORDER BY Name ";

    debugger;
    FadePageCover(true);
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            FadePageCover(false);
        });

}

function PaymentRequest_ApproveList(callback) {
    //Confirmation message to delete
    debugger;
    if (_IsCustodySettlement == 1) {
        if (GetAllSelectedIDsAsString('tblPaymentRequest') != "")
            swal({
                title: "Are you sure?",
                text: "The selected records will be Approved !",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Approve!",
                closeOnConfirm: true
            },
            //callback function in case of confirm delete
            function () {
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/SettelmentSupplierDrivers/Approve"
                    , { "pDeletedPaymentRequestIDs": GetAllSelectedIDsAsString('tblPaymentRequest'), "PReceiverUsers": "0", "pIsCustodySettlement": _IsCustodySettlement }
                    , function (pData) {
                        if (pData == "") {
                            swal("Success", "approved successfully.");
                            FadePageCover(false);
                            jQuery('#CheckboxesListModal').modal('hide')
                            PaymentRequest_LoadingWithPaging();
                            LoadDefaults("/api/Defaults/LoadAll", " WHERE 1=1 ");
                        }
                        else {
                            FadePageCover(false);
                            jQuery('#CheckboxesListModal').modal('hide')
                            showDeleteFailMessage = true;
                            strDeleteFailMessage = pData;
                            PaymentRequest_LoadingWithPaging();
                        }

                    });

            });
    }
    else {
        //if ($("#tblPaymentRequest tr[ID=4]").find("td.IsApprovedRequest").find('#cbIsApprovedRequest4').prop('checked'))
        //{ }
        //else
        if (GetAllSelectedIDsAsString('tblPaymentRequest') != "")
            swal({
                title: "Are you sure?",
                text: "The selected records will be Approved !",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Approve!",
                closeOnConfirm: true
            },
            //callback function in case of confirm delete
            function () {
                Approve_Notify();

            });
    }

}
function Pricing_SendLocalEmail(pID) {
    debugger;
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pSelectedItemsIDs == "")
        swal("Sorry", "You have to select at least one receptionist.");
    else { //send
        FadePageCover(true);
        var pParametersWithValues = {
            pUserIDs: pSelectedItemsIDs
            , pSubject: "Sent From Pricing"
            , pBody: "Body from pricing"
            , pQuotationRouteID: 0
            , pPricingID: pID
            , pRequestOrReply: (glbCallingControl == "PricingRequest" ? constRequest : constReply)
            , pOperationID: 0
            , pIsAlarm: true
            , pParentID: 0
            , pEmailSource: 0
            , pIsSendNormalEmail: false
            //LoadWithPaging parameters
            , pWhereClauseForLoadWithPaging: ("WHERE 1=1")
            , pPageSize: 1 //$("#select-page-size").val()
            //pPageNumber is 1 coz its insert so it will be on the top
            , pPageNumber: 1 //$("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text() 
            , pOrderBy: "ID DESC"
            , pSenderUserID: pLoggedUser.ID
        };
        CallGETFunctionWithParameters("/api/LocalEmails/SendEmail", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    jQuery("#CheckboxesListModal").modal("hide");
                    swal("Success", "Sent successfully.");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}
var HouseCurrentID = 0;
var CertificateCurrentID = 0;
var TruckingOrderCurrentID = 0;


function Details_HouseAndCertificateChangedByOperation(pRowID) {
    debugger;
    if (0 == 0) {
        //$("#slHouse" + pRowID).val(0);
        //$("#slCertificateNumber" + pRowID).val(0);
        //$("#slTruckingOrder" + pRowID).val(0);



        Details_FillSlHouseAndCertificate("slHouse" + pRowID, pRowID, 1);
        Details_FillSlHouseAndCertificate("slCertificateNumber" + pRowID, pRowID, 2);
        Details_FillSlHouseAndCertificate("slTruckingOrder" + pRowID, pRowID, 3);


    }


}

function Details_FillSlHouseAndCertificate(pSlName, operationID, pType) {
    debugger;
    FadePageCover(true);

    CallGETFunctionWithParameters("/api/SettelmentSupplierDrivers/FillCombo"
        , {
            PoperationID: $('#slOperation' + operationID + '').val() == "" ? 0 : $('#slOperation' + operationID + '').val() == null ? 0 : $('#slOperation' + operationID + '').val()
            , ptype: pType
            , pOrderBy: "ID"
        }
        , function (pData) {
            //FillListFromObject(null, 2, "<--Select-->", pSlName, pData[0], null);
            FillListFromObject_ERP(null, 2/*pCodeOrName*/, TranslateString("SelectFromMenu"), pSlName, pData[0], null);
            //   if (pDefaults.UnEditableCompanyName != "FAI") {
            //Start Auto Filter
            $("#" + pSlName).css({ "width": "100%" }).select2();
            $("div[tabindex='-1']").removeAttr('tabindex');
            $("#" + pSlName).val($("#" + pSlName).attr('tag') == undefined ? "0" : $("#" + pSlName).attr('tag') == "" ? "0" : $("#" + pSlName).attr('tag'));
            $("#" + pSlName).trigger("change");

            //  Esnd Auto Filter
            //    }
            FadePageCover(false);
        }
        , null);
}



function Details_ChangedByHouseAndCertificateAndTrucingOrder(pRowID, pType) {
    debugger;
    if (check == 0 && $('#slOperation' + pRowID + '').val() == "") {
        FadePageCover(true);

        if (pType == 1) {
            CallGETFunctionWithParameters("/api/SettelmentSupplierDrivers/GetOperationID"
                , {
                    TransID: $('#slHouse' + pRowID + '').val()
                    , ptype: pType
                }
                , function (pData) {
                    if (pData[0] > 0) {
                        debugger;
                        $('#slOperation' + pRowID + '').val(JSON.parse(pData[0]));
                        Details_HouseAndCertificateChangedByOperation(pRowID);


                        //  $("#slHouse" + pRowID).val(0);
                        // $("#slTruckingOrder" + pRowID).val(0);
                    }

                    FadePageCover(false);
                }
                , null);


        }
        else if (pType == 2) {
            CallGETFunctionWithParameters("/api/SettelmentSupplierDrivers/GetOperationID"
                , {
                    TransID: $('#slCertificateNumber' + pRowID + '').val()
                    , ptype: pType
                }
                , function (pData) {
                    if (pData[0] > 0) {
                        debugger;
                        $('#slOperation' + pRowID + '').val(JSON.parse(pData[0]));
                        Details_HouseAndCertificateChangedByOperation(pRowID);
                        //$("#slHouse" + pRowID).val(HouseCurrentID);
                        //$("#slCertificateNumber" + pRowID).val(CertificateCurrentID);
                        //$("#slTruckingOrder" + pRowID).val(TruckingOrderCurrentID);

                    }
                    FadePageCover(false);
                }
                , null);
        }
        else if (pType == 3) {
            CallGETFunctionWithParameters("/api/SettelmentSupplierDrivers/GetOperationID"
                , {
                    TransID: $('#slTruckingOrder' + pRowID + '').val()
                    , ptype: pType
                }
                , function (pData) {
                    if (pData[0] > 0) {
                        debugger;
                        $('#slOperation' + pRowID + '').val(JSON.parse(pData[0]));
                        Details_HouseAndCertificateChangedByOperation(pRowID);


                    }

                    FadePageCover(false);
                }
                , null);
        }
        else {
            FadePageCover(false);
        }


    }
}
function Details_FillSlPartenerByPartenerType(pRowID) {
    debugger;
    if ($('#slPartenerType' + pRowID + '').val() != null && $('#slPartenerType' + pRowID + '').val() != "") {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/InvoicesReports/FillPartners", {
            pPartnerTypeID: $('#slPartenerType' + pRowID + '').val(),
            pWhereClause: ""
        }
            , function (pData) {
                FillListFromObject(null, 2/*pCodeOrName*/, "<--All-->", "slPartener" + pRowID, pData[0], null);
                $('#slPartener' + pRowID).val($('#slPartener' + pRowID).attr('tag'));

                FadePageCover(false);
            }
            , null);
    }




    //// var pWhereClause = " WHERE OperationID = " + $('#slOperation' + ID + '').val() + " AND PartnerID IS NOT NULL  ORDER BY PartnerTypeName ";
    // var pSlName = "slSupplier" + ID;
    // var pStrFirstRow = "Select Partener";
    // //var pStrFnName = "/api/OperationPartners/LoadAll";
    // var pID = "0";
    // if ($('#slPartenerType' + ID + '').val() != null && $('#slPartenerType' + ID + '').val() != "")
    //     $.ajax({
    //         type: "GET",
    //         url: "/api/InvoicesReports/FillPartners",
    //         data: { pPartnerTypeID: $('#slPartenerType' + ID + '').val() },
    //         contentType: "application/json; charset=utf-8",
    //         dataType: "json",
    //         success: function (data) {

    //             ClearAllOptions(pSlName);
    //             var option = "";
    //             if (pStrFirstRow != null)
    //                 option += '<option value="">' + pStrFirstRow + '</option>';

    //             // Bind Data
    //             $.each(JSON.parse(data[0]), function (i, item) {
    //                 if (pID != null && pID != undefined) //in case of editing
    //                     if (pID == item.ID)
    //                         option += '<option value="' + item.ID + '" selected >' + item.Name + '</option>';
    //                     else
    //                         option += '<option value="' + item.ID + '" selected >' + item.Name + '</option>';
    //                 else
    //                     option += '<option value="' + item.ID + '" selected >' + item.Name + '</option>';
    //             });

    //             $("#" + pSlName).append(option);
    //             $('#slPartener' + ID).val($('#slPartener' + ID).attr('tag'));

    //             //if (callback != null && callback != undefined)
    //             //    callback();
    //         },
    //         error: function (jqXHR, exception) {
    //             swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! GetListWithName in mainapp.master.js", "");
    //             FadePageCover(false);
    //         }

    //     });
}


function Filter_FillSlPartenerByPartenerType() {
    debugger;
    if ($('#slFilterPartenerType').val() != null && $('#slFilterPartenerType').val() != "") {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/InvoicesReports/FillPartners", {
            pPartnerTypeID: $('#slFilterPartenerType').val(),
            pWhereClause: ""
        }
            , function (pData) {
                FillListFromObject(null, 2/*pCodeOrName*/, "<--All-->", "slFilterPartener", pData[0], null);
                $('#slFilterPartener').val($('#slFilterPartener').attr('tag'));
                FadePageCover(false);
            }
            , null);
    }

}


function CopyCustody() {
    debugger;
    if ($('#slCustody').val() != "" && $('#slCustody').val() != "0") {

        var ID = 0;
        var CustodyID = 0;
        $('#tblSettelmentSupplierDrivers > tbody > tr').each(function (i, tr) {
            ID = $(tr).attr('ID');
            CustodyID = $("#slSupplier" + ID + " option[partnerid='" + $('#slCustody').val() + "']").val();
            $("#slSupplier" + ID).val(CustodyID);

        });
    }
}
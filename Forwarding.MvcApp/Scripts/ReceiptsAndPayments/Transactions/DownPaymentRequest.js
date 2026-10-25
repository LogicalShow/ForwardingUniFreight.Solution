// City Country ---------------------------------------------------------------
// Bind BudgetsFiscal Table Rows
var maxDetailsIDInTable = 0; //used to for when adding new row then make td control names unique

function DownPaymentRequest_Initialize() {
    debugger;
    
    LoadView("/ReceiptsAndPayments/Transactions/DownPaymentRequest", "div-content", function () {

        strBindTableRowsFunctionName = "DownPaymentRequest_BindTableRows";
        strLoadWithPagingFunctionName = "/api/DownPaymentRequest/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

        var pWhereClause = DownPaymentRequest_GetWhereClause();
        var pOrderBy = " ID DESC";
        var pPageNumber = 1;
        var pPageSize = 10;
        var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }


        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                DownPaymentRequest_BindTableRows(JSON.parse(pData[0]));
                $("#slCurrency").html($("#hReadySlCurrencies").html());
                var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
                $("#txtRequestDate").val(pFormattedTodaysDate);
                //$("#slClient").html("<option value=''><--All--></option>");
                //ApplySelectListSearch();
            });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
        , function () { DownPaymentRequest_ClearAllControls(); }
        , function () { DownPaymentRequest_DeleteList(); });
}
function DownPaymentRequest_LoadingWithPaging() {
    debugger;


    strBindTableRowsFunctionName = "DownPaymentRequest_BindTableRows";
    strLoadWithPagingFunctionName = "/api/DownPaymentRequest/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = DownPaymentRequest_GetWhereClause();
    var pOrderBy = " ID DESC";
    var pPageNumber = $("#div-Pager li.active a").text();
    var pPageSize = $('#select-page-size').val().trim()
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }

    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count"
        , "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
        , function (pData) {
            DownPaymentRequest_BindTableRows(JSON.parse(pData[0]));
        });
    HighlightText("#tblDownPaymentRequest>tbody>tr", $("#txt-Search").val().trim());
}
function DownPaymentRequest_GetWhereClause() {
    debugger;
    var searchValue = $('#txt-Search').val();
    var pWhereClause = "WHERE 1=1";

    if (searchValue !== '') {
        // Escape single quotes to prevent SQL injection
        var safeSearchValue = searchValue.replace(/'/g, "''");

        // Assuming Code is numeric. If it's a string, wrap it in quotes.
        if (!isNaN(safeSearchValue)) {
            pWhereClause += " AND (Customers LIKE '%" + safeSearchValue + "%' OR Code = " + safeSearchValue + ")";
        } else {
            pWhereClause += " AND Customers LIKE '%" + safeSearchValue + "%'";
        }
    }

    return pWhereClause;
}

function Details_NewRow() {
    debugger;

    ++maxDetailsIDInTable;
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);

    var tr = "";

        tr += "<tr ID='" + maxDetailsIDInTable + "' isdeleted='0' tag='item'   counter='" + (maxDetailsIDInTable) + "' value='" + 0 + "'>"
        tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxDetailsIDInTable + "' checked='checked' /></td>";
        tr += "     <td class='DetailsID' ><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + 0 + "' /></td>";

        tr += "     <td class='SearchOperationCode' style='display:flex;gap:4px;'>      <input type='text' id='SearchOperationCode" + maxDetailsIDInTable + "' style='padding:3px' onkeypress='DisableEnterKey(id);'>     <i class='fa fa-search' style='background-color:lightblue;border-radius:50%;padding:6px;cursor:pointer;' onclick='LoadRequiredOperations(" + maxDetailsIDInTable + ")'></i></td>"
        tr += "     <td class='IsFleet' val=''><input id='cbIsFleet" + maxDetailsIDInTable + "'  name='IsFleet'  onchange='LoadRequiredOperations(" + maxDetailsIDInTable + ");' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>"
        tr += "     <td class='Operation' val=''><select id='slOperation" + maxDetailsIDInTable + "' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'   onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_HouseAndCertificateChangedByOperation(" + maxDetailsIDInTable + "); GetChargeTypesToOperation(" + maxDetailsIDInTable + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";

        tr += "     <td class='Supplier'  val=''><select id='slSupplier" + maxDetailsIDInTable + "' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='GetIssuedToBySupplier(" + maxDetailsIDInTable + "); ' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='Amount' ><input type='text'   id='txtAmount" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);CalcTotal();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='false' value='0' /> </td>";

        tr += "     <td class='Description' ><input type='text'  id='txtDescription" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtDescription" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtDescription" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
        tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate'  id='SelectedIDsToUpdate" + maxDetailsIDInTable + "' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";
        tr += "     <td class='hide'>"  + "</td>";
        tr += "</tr>";



    $("#tblDownPaymentRequestDetails tbody").prepend(tr);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $("#tblDownPaymentRequestDetails tbody tr[ID=" + maxDetailsIDInTable + "]").reverseChildren();
    /***************************Filling row controls******************************/

    $("#slOperation" + maxDetailsIDInTable).html($("#slOperation").html());


    BindAllCheckboxonTable("tblDownPaymentRequestDetails", "DetailsID", "cb-CheckAll-DownPaymentRequestDetails");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    /***********************EOF Filling row controls******************************/

    $("#slOperation" + maxDetailsIDInTable).css({ "width": "100%" }).select2();
    $("#slOperation" + maxDetailsIDInTable).css({ "width": "100%" });





    ////Get OperationCode From Header
    //if ($('#txtOperationCode').val() != '') {
    //    $('#SearchOperationCode' + maxDetailsIDInTable).val($('#txtOperationCode').val());
    //    LoadRequiredOperations(maxDetailsIDInTable);
    //}



}

function LoadRequiredOperations(DetailID,pOperationID,pCustomerID) {
    debugger;

    if (pOperationID == undefined)
        pOperationID = 0;
    if (pCustomerID == undefined)
        pCustomerID = 0;

    let SearchOperationCode = $("#SearchOperationCode" + DetailID).val();
    let pIsFleet = $("#cbIsFleet" + DetailID).prop('checked')
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/DownPaymentRequest/GetRequiredOperations", 
        { pSearchOperationCode: SearchOperationCode, pIsFleet: pIsFleet, pOperationID: pOperationID},
        function (pData) {
            debugger;
            if (JSON.parse(pData).length > 0) {

                let FirstMatchingOperationID = JSON.parse(pData)[0].ID
                Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pData[0], "ID", "Code,VesselName,ActualArrivalString", ' --> ', "<--Select-->", "#slOperation" + DetailID, FirstMatchingOperationID, "", function () { });
                GetSuppliers_Charges(DetailID, pCustomerID, pIsFleet);
            }
            else
                swal('', 'No Operations Found');

            FadePageCover(false);
        }, null);
}
function GetSuppliers_Charges(ID, supplierID, pIsFleet) {
    debugger;
    var pWhereClause = " WHERE OperationID = " + $('#slOperation' + ID + '').val() ;
    var pSlName = "slSupplier" + ID;
    var pStrFirstRow = "Select Customer";
    //var pStrFnName = "/api/OperationPartners/LoadAll";
    var pID = IsMESCOCompany ? supplierID : "0";
    if ($('#slOperation' + ID + '').val() != "0")
        $.ajax({
            type: "GET",
            url: "/api/DownPaymentRequest/LoadOperationCustomers",
            data: { pIsFleet: pIsFleet, pWhereClause: pWhereClause },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                ClearAllOptions(pSlName);
                var option = "";
                if (pStrFirstRow != null)
                    option += '<option value=""  PartnerID="0" >' + pStrFirstRow + '</option>';
                // Bind Data


                $.each(JSON.parse(data[0]), function (i, item) {
                    if (pID != null && pID == item.ID)
                        option += `<option value="${item.ID}" PartnerID="${item.PartnerID}" selected>: ${item.Name}</option>`;
                    else
                        option += `<option value="${item.ID}" PartnerID="${item.PartnerID}"> ${item.Name}</option>`;
                });

                $("#" + pSlName).append(option);
                //  $('#slSupplier' + ID).val($('#slSupplier' + ID).attr('tag'));


                if ($('#slCustody').val() != "" && $('#slCustody').val() != "0" && !IsMESCOCompany) {

                    var ID = 0;
                    var CustodyID = 0;
                    $('#tblDownPaymentRequestDetails > tbody > tr').each(function (i, tr) {
                        ID = $(tr).attr('ID');
                        CustodyID = $("#slSupplier" + ID + " option[partnerid='" + $('#slCustody').val() + "']").val();
                        if (CustodyID != undefined && CustodyID != "undefined") {
                            $("#slSupplier" + ID).val(CustodyID);
                        }

                    });
                }

                //if (callback != null && callback != undefined)
                //    callback();
            },
            error: function (jqXHR, exception) {
                swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! GetListWithName in mainapp.master.js", "");
                FadePageCover(false);
            }

        });

}
function Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(data, ID_Name, Items_Name, SplitByChar, Title, SelectInput_ID, Selected_ID, AttrItemNames, pCallback) {
    debugger;
    var selectAttrs = "";
    var selectItems = "";
    var option = "";
    if (Title != null)
        option += '<option value=0>' + Title + '</option>';
    $.each(JSON.parse(data), function (i, item) {
        // console.log(item[ID_Name]);
        selectAttrs = "";
        $(AttrItemNames.split(",")).each(function (attrindex, attr) {
            // element == this
            if (item[attr] != undefined)
                selectAttrs += ' ' + attr + ' = "' + item[attr] + '" ';
            if (attrindex == AttrItemNames.split(",").length - 1) {
                selectItems = "";
                $(Items_Name.split(",")).each(function (attrindex1, attr1) {
                    // element == this                    
                    if (attrindex1 == Items_Name.split(",").length - 1) {
                        selectItems += (" " + item[attr1] + " ")
                        if (item[ID_Name] == Selected_ID) {
                            option += '<option' + selectAttrs + ' value="' + item[ID_Name] + '" selected> ' + selectItems + '</option>';
                        }
                        else {
                            option += '<option' + selectAttrs + ' value="' + item[ID_Name] + '"> ' + selectItems + '</option>';
                        }
                    }
                    else {
                        selectItems += (" " + item[attr1] + " " + SplitByChar);
                    }
                });
            }
        });
    });

    $(SelectInput_ID).html("");
    $(SelectInput_ID).append(option);
    if (pCallback != null && pCallback != undefined)
        pCallback();
}
function DownPaymentRequest_BindTableRows(pDownPaymentRequest) {
    debugger;

    ClearAllTableRows("tblDownPaymentRequest");
    $.each(pDownPaymentRequest, function (i, item) {
        debugger;
        editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";


        AppendRowtoTable("tblDownPaymentRequest",
            ("<tr ID='" + item.ID + "' ondblclick='DownPaymentRequest_EditByDblClick(" + item.ID + ");' " + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                + "<td class='RequestDate' >" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.RequestDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.RequestDate))) + "</td>"
                + "<td class='Notes' >" + item.Notes + "</td>"
                + "<td class='Currency' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                + "<td class='ForwOperations'>" + item.ForwOperations + "</td>"
                + "<td class='FleetOperations'>" + item.FleetOperations + "</td>"
                + "<td class='Customers'>" + item.Customers + "</td>"
                + "<td class='Total'>" + item.Total + "</td>"
                + "<td class='IsApproved hide'>" + item.IsApproved + "</td>"
                + "<td class='hDownPaymentRequest'><a href='#DownPaymentRequestModal' data-toggle='modal' onclick='DownPaymentRequest_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblDownPaymentRequest", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblDownPaymentRequest>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function CalcTotal() {
    debugger;
    var total = 0;

    // Select all input elements with IDs that start with "txtAmount"
    $("input[id^='txtAmount']").each(function () {
        var val = parseFloat($(this).val());
        if (!isNaN(val)) {
            total += val;
        }
    });


    $("#txtTotal").val(total.toFixed(2)); // if you want to show in UI

    return total;
}


function DownPaymentRequest_EditByDblClick(pID,pMonthID) {
    jQuery("#DownPaymentRequestModal").modal("show");
    DownPaymentRequest_FillControls(pID);
}

function DownPayment_Save() {
    debugger;
    if (ValidateForm("form", "PaymentRequestModal")) {
        FadePageCover(true);

        var pIDList = "";
        var pOperationList = "";
        var pPartenerIDList = "";

        var pDescriptionList = "";
        var pAmountList = "";
        var pIsFleetList = "";

        var pDetailsIDList = GetAllIDsAsStringWithNameAttr("tblDownPaymentRequestDetails", "Delete");
        var pDetailsID = '';


        debugger;


        $("#tblDownPaymentRequestDetails tbody tr").each(function () {
            pDetailsID += ((pDetailsID == "") ? "" : ",") + ($(this).attr('ID'));


            if ($("#slOperation" + $(this).attr('ID')).val() != "" && $("#slOperation" + $(this).attr('ID')).val() != "0"
                && $("#slOperation" + $(this).attr('ID')).val() != null)
                IsOperationNotEmpty = true;


        });


        if (pDetailsIDList != "") {
            var NumberOfDetailsRows = pDetailsIDList.split(',').length;

            for (var i = 0; i < NumberOfDetailsRows; i++) {
                var currentRowID = pDetailsID.split(",")[i];

                if ($("#slSupplier" + currentRowID + " option:selected").attr("partnerid") == "" ||
                    $("#slSupplier" + currentRowID + " option:selected").attr("partnerid") == null ||
                    $("#slSupplier" + currentRowID + " option:selected").attr("partnerid") == "0") {
                    swal("Sorry", "Please Choose Client in Row " + (i + 1));
                    FadePageCover(false);
                    return;
                }

                if ($("#txtAmount" + currentRowID).val()  == "" ||
                    $("#txtAmount" + currentRowID).val()  == null ||
                    $("#txtAmount" + currentRowID).val() == "0") {
                    swal("Sorry", "Please Enter Amount in Row " + (i + 1));
                    FadePageCover(false);
                    return;
                }

                if (!CheckValueIsValidInput("#slOperation" + currentRowID)) {
                    swal("Sorry", "Please Choose Operation in Row " + (i + 1));
                    FadePageCover(false);
                    return;
                }

                pIDList += ((pIDList == "") ? "" : ",") + pDetailsIDList.split(",")[i];

                pOperationList += ((pOperationList == "") ? "" : ",") + ($("#slOperation" + currentRowID).val() == "0" ? "0" : $("#slOperation" + currentRowID).val() == null ? "0" : $("#slOperation" + currentRowID).val());
                pPartenerIDList += ((pPartenerIDList == "") ? "" : ",") + $("#slSupplier" + currentRowID + " option:selected").attr("partnerid")

                pAmountList += ((pAmountList == "") ? "" : ",") + ($("#txtAmount" + currentRowID).val().trim() == "" ? "0" : $("#txtAmount" + currentRowID).val());
                pDescriptionList += ((pDescriptionList == "") ? "" : ",") + ($("#txtDescription" + currentRowID).val().trim() == "" ? "0" : $("#txtDescription" + currentRowID).val().replace(/,/g, "_").trim());
                pIsFleetList += ((pIsFleetList == "") ? "" : ",") + ($("#cbIsFleet" + currentRowID).prop('checked') == "" ? "false" : $("#cbIsFleet" + currentRowID).prop('checked'));

            }
            var pParametersWithValues = {
                pDownPaymentRequestID: $("#hID").val() == "" ? 0 : $("#hID").val()
                , pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim()
                , pRequestDate: ConvertDateFormat($("#txtRequestDate").val())
                , pCurrencyID: $("#slCurrency").val()
                , pNotes: $("#txtNotes").val().trim() == "" ? 0 : $("#txtNotes").val().trim().toUpperCase()
                , pIDList: pIDList
                , pOperationList: pOperationList
                , pPartenerIDList: pPartenerIDList
                , pIsFleetList: pIsFleetList
                , pDescriptionList: pDescriptionList
                , pAmountList: pAmountList

            };
            CallPOSTFunctionWithParameters("/api/DownPaymentRequest/Save", pParametersWithValues
                , function (pData) {
                    var _ReturnedMessage = pData[0];
                    if (_ReturnedMessage == "") {
                        DownPaymentRequest_LoadingWithPaging();
                        jQuery("#DownPaymentRequestModal").modal("hide");
                        swal("Success", "Saved successfully.");
                        FadePageCover(false);
                    }
                    else {
                        swal("Sorry", _ReturnedMessage);
                        FadePageCover(false);
                    }
                }
                , null);
        }

    }
}


function DownPaymentRequestDetails_DeleteList() {
    debugger;
    $('#tblDownPaymentRequestDetails tbody tr').each(function () {
        var $row = $(this);
        var $checkbox = $row.find('input[name="Delete"]');

        if ($checkbox.is(':checked')) {
            $row.remove(); // delete the row
        }
    });

    // Optionally re-calculate total after deleting
    CalcTotal();
}
function DownPaymentRequest_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblDownPaymentRequest') != "")
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
                CallGETFunctionWithParameters("/api/DownPaymentRequest/Delete"
                    , { "pDeletedDownPaymentRequestIDs": GetAllSelectedIDsAsString('tblDownPaymentRequest') }
                    , function (pData) {
                        if (JSON.parse(pData[0])) {
                            DownPaymentRequest_LoadingWithPaging();
                        }
                        else {
                            showDeleteFailMessage = true
                            strDeleteFailMessage = pData[1];
                            DownPaymentRequest_LoadingWithPaging();
                        }
                    });
            });
    //DeleteListFunction("/api/BudgetsFiscal/Delete", { "pBudgetsFiscalIDs": GetAllSelectedIDsAsString('tblBudgetsFiscal') }, function () { BudgetsFiscal_LoadingWithPaging(); });
}

function DownPaymentRequest_FillControls(pID) {
    debugger;
    ClearAll("#DownPaymentRequestModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");
  
    $("#slCurrency").val($(tr).find("td.Currency").attr('val'));
    $("#txtRequestDate").val($(tr).find("td.RequestDate").text());
    $("#txtTotal").val($(tr).find("td.Total").text());
    $("#txtNotes").val($(tr).find("td.Notes").text());
    $("#txtCode").val($(tr).find("td.Code").text());

    $("#tblDownPaymentRequestDetails tbody").html("");
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/DownPaymentRequest/LoadDetails", { pHeaderID: pID}
        , function (pData) {
            jQuery("#PaymentRequestModal").modal("show");
            PaymentRequestDetails_BindTableRows(JSON.parse(pData[0]))

            FadePageCover(false);
        }
        , null);
}

function DownPaymentRequest_ClearAllControls() {
    debugger;
    ClearAll("#DownPaymentRequestModal", null);
    $("#tblDownPaymentRequestDetails tbody").html("");

    $("#cb-CheckAll").prop('checked', false);
    $("#hID").val("0");

    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    $("#txtRequestDate").val(pFormattedTodaysDate);

}



function PaymentRequestDetails_BindTableRows(pInvoiceDetails) {
    debugger;
    check = 1;

    ClearAllTableRows("tblDownPaymentRequestDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var rowsRendered = 0;

    $.each(pInvoiceDetails, function (i, item) {
        AppendRowtoTable("tblDownPaymentRequestDetails",
            ("<tr ID='" + item.ID + "' " + ">"
                + "<td class='DetailsID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + item.ID + "' checked='checked' /></td>"

                + "<td class='SearchOperationCode' style='display:flex;gap:4px;'>      <input type='text' id='SearchOperationCode" + item.ID + "' style='padding:3px' onkeypress='DisableEnterKey(id);'>     <i class='fa fa-search' title='Search' style='background-color:lightblue;border-radius:50%;padding:6px;cursor:pointer' onclick='LoadRequiredOperations(" + item.ID + ",0,0)'></i><i class='fa fa-refresh' title='Refresh' style='background-color:#8dcb8d;border-radius:50%;padding:6px;cursor:pointer;margin:0 2px;' onclick='' '></i></td>"
                + "<td class='IsFleet'  val=''><input id='cbIsFleet" + item.ID + "' " + (item.IsFleet ? "checked" : "") + "  name='IsFleet' onchange='LoadRequiredOperations(" + item.ID + ",0,0"  + ");' type='checkbox' value='" + item.IsFleet + "' /></td>"
                + "<td class='Operation' val=''><select  tag='" + (item.OperationID == 0 ? "" : item.OperationID) + "' id='slOperation" + item.ID + "' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);'   onkeypress='DisableBackspaceKey(id);' data-required='false'><option value='" + item.OperationID + "' selected>" + item.OperationCode + "</option></select></td>"

                + "<td class='Supplier'  val=''><select  tag='" + (item.SupplierID == 0 ? "" : item.SupplierID) + "' id='slSupplier" + item.ID + "'  class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='' data-required='false'><option value='" + item.CustomerID + "' PartnerID='" + item.PartenerID + "' selected>" + item.SupplierName + "</option></select></td>"

                + "<td class='Amount'><input type='text' " + " tag='" + (item.Amount) + "'   id='txtAmount" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);CalcTotal();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='true' value='" + item.Amount + "' /> </td>"

                + "<td class='Description' ><input type='text' tag='" + (item.Description) + "'  id='txtDescription" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.Description + "' /> </td>"
                +" <td class='hide'>" + "</td>"
                + "</tr>"));
        rowsRendered++;
        $("#slOperation" + item.ID).css({ "width": "100%" }).select2();
        $("#slOperation" + item.ID).css({ "width": "100%" });
        $("#slSupplier" + item.ID).css({ "width": "100%" });

        LoadRequiredOperations(item.ID, item.OperationID, item.CustomerID);


        if (rowsRendered - 1 == pInvoiceDetails.length - 1 /*i == pInvoiceDetails.length - 1*/) {
            debugger;
            FillHTMLtblInputs("#tblDownPaymentRequestDetails > tbody");

            //if ($("#hf_CanDelete").val() == 1) {
            //    $("#btn-Approve").removeClass("hide");
            //    if (pDefaults.UnEditableCompanyName != "MES")
            //        $("#btn-UnApprove").removeClass("hide");
            //}
            //else {
            //    $("#btn-Approve").addClass("hide");
            //    $("#btn-UnApprove").addClass("hide");
            //}


            ////ApplyPermissions();
            //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
            BindAllCheckboxonTable("tblDownPaymentRequestDetails", "DetailsID", "cb-CheckAll-DownPaymentRequestDetails");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
            CheckAllCheckbox("HeaderDeleteDownPaymentRequestDetailsID");
            if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
                swal(strSorry, strDeleteFailMessage, "warning");
                showDeleteFailMessage = false;
            }
        }
    }

    );

}

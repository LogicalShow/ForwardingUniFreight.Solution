

var IsActivityOption = $('#hReadySlOptions option[value="201"]').attr("OptionValue") === "true";
var maxDetailsIDInTable = 0; //used to for when adding new row then make td control names unique

$(document).ready(function () {
    // Your code here
    var pWhereClause = " WHERE Deleted=0 ";
    var pOrderBy = "ID DESC";
    strLoadWithPagingFunctionName = "/api/JournalVouchers/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pControllerParameters = {
        pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: 0, pPageSize: 0,
        pWhereClause: pWhereClause, pOrderBy: pOrderBy
    }

    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count"
        , "div-Text-Total"
        , strLoadWithPagingFunctionName, pWhereClause, pOrderBy, 0, 0, pControllerParameters
        , function (pData) {
            debugger;
            var pActivities = pData[9];

            FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slActivity", pActivities, null);

            if (IsActivityOption)
              $('.IsActivityOption').removeClass('hide');
        });

    $(document).on('keyup', 'input.select2-search__field', function (e) {
        debugger;

        if (currentID != this.parentElement.nextElementSibling.children[0].id) {
            currentID = this.parentElement.nextElementSibling.children[0].id;
            SearchText = "";
        }


        if (lastInputTimeStamp != e.originalEvent.timeStamp) {
            if (e.keyCode == 8 || e.charCode == 8)  // backspace pressed
            {
                SearchText = SearchText.slice(0, -1)
            }
            else if (e.key.length == 1) {
                SearchText += e.key;
                //setTimeout(function () {
                //    // to prevent repeated inputs
                //}, 50);
            }
        }
        lastInputTimeStamp = e.originalEvent.timeStamp



    });



});


function JournalVouchers_BindTableRows(pJournalVouchers) {
    debugger; 
    var UploadText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Upload") + "</span>";
    var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>";
    var reverseControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-retweet' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Reverse") + "</span>";

    $("#hl-menu-Accounting").parent().addClass("active");
    ClearAllTableRows("tblJournalVouchers");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    //+ "<td class='ID'> <input " + (item.Posted || item.IsSysJv ? " disabled='disabled' " : " name='Delete'") + " Selectedjv='Selectedjv' type='checkbox' value='" + item.ID + "' /></td>"
    $.each(pJournalVouchers, function (i, item) {
        AppendRowtoTable("tblJournalVouchers",
            ("<tr ID='" + item.ID + "' ondblclick='JournalVouchers_FillControls(" + item.ID + ");'>"
                    + "<td class='ID'> <input " + (item.Posted || item.IsSysJv ? " NoDelete='1' " : "NoDelete='0'") + " name='Delete'"
                    + " Selectedjv='Selectedjv' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='JVNo'>" + (item.JVNo == 0 ? "" : item.JVNo) + "</td>"
                    + "<td class='JVDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + "</td>"
                    + "<td class='TotalCredit'>" + item.TotalCredit + "</td>"
                    + "<td class='Journal_ID hide'>" + item.Journal_ID + "</td>"
                    + "<td class='JournalTypeName'>" + (item.JournalTypeName == 0 ? "" : item.JournalTypeName) + "</td>"
                    + "<td class='JVType_ID hide'>" + item.JVType_ID + "</td>"
                    + "<td class='JVTypeName'>" + (item.JVTypeName == 0 ? "" : item.JVTypeName) + "</td>"
                    + "<td class='ReceiptNo'>" + (item.ReceiptNo == 0 ? "" : item.ReceiptNo) + "</td>"
                    + "<td class='Username hide'>" + (item.Username == 0 ? "" : item.Username) + "</td>"
                    + "<td class='RemarksHeader'>" + (item.RemarksHeader == 0 ? "" : item.RemarksHeader) + "</td>"

                    + "<td class='Deleted hide'> <input id=cbDeleted" + item.ID + " type='checkbox' disabled='disabled' " + (item.Deleted ? " checked='checked' " : "") + " /></td>"
                    + "<td class='Posted'> <input id=cbPosted" + item.ID + " type='checkbox' disabled='disabled' " + (item.Posted ? " checked='checked' " : "") + " /></td>"
                    + "<td class='IsSysJv hide'> <input id=cbIsSysJv" + item.ID + " type='checkbox' disabled='disabled' " + (item.IsSysJv ? " checked='checked' " : "") + " /></td>"
                    + "<td class='JournalVoucherCopy " + ($("#hf_CanAdd").val() == 1 ? "" : " hide ") + "'><a data-toggle='modal' onclick='JournalVouchers_Copy(" + item.ID + ");' " + copyControlsText + "</a></td>"
                    + "<td class='Upload'><a href='#tabUploadFiles' data-toggle='modal' onclick='UploadFiles(" + item.ID + ");' " + UploadText + "</a></td>"
                    + "<td class='JournalVoucherReverse " + ($("#hf_CanAdd").val() == 1 ? "" : " hide ") + "'><a data-toggle='modal' onclick='JournalVouchers_Reverse(" + item.ID + ");' " + reverseControlsText + "</a></td>"
                    + "<td class='hide'><a href='#JournalVouchersModal' data-toggle='modal' onclick='JournalVouchers_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    if ($("#hf_CanAdd").val() == 1) $(".JournalVoucherCopy").removeClass("hide"); else $(".JournalVoucherCopy").addClass("hide");
    BindAllCheckboxonTable("tblJournalVouchers", "ID", "cb-CheckAll");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("ID");
    //HighlightText("#tblJournalVouchers>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
        strDeleteFailMessage = "This command is not completed because of dependencies existance."
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function JournalVouchers_LoadingWithPaging() {
    debugger;
    var pWhereClause = JournalVouchers_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { JournalVouchers_BindTableRows(JSON.parse(pData[0])); });
    //HighlightText("#tblJournalVouchers>tbody>tr", $("#txt-Search").val().trim());
}
function JournalVouchers_GetWhereClause() {
    var pWhereClause = "WHERE Deleted=0 " + "\n"
    pWhereClause += " AND JVDate >= '" + GetDateWithFormatyyyyMMdd($("#txtSearchFrom").val()) + "' AND JVDate<='" + GetDateWithFormatyyyyMMdd($("#txtSearchTo").val()) + " 23:59:59'";
    if ($("#txtSearchJVNo").val().trim() != "")
        pWhereClause += " AND JVNo LIKE N'%" + $("#txtSearchJVNo").val().trim() + "%'" + "\n";
    if ($("#txtSearchJVNoFixed").val().trim() != "")
        pWhereClause += " AND JVNo = N'" + $("#txtSearchJVNoFixed").val().trim() + "'" + "\n";
    if ($("#slSearchJVType").val() != 0)
        pWhereClause += " AND JVType_ID = " + $("#slSearchJVType").val() + "\n";
    if ($("#slSearchJournalType").val() != 0)
        pWhereClause += " AND Journal_ID = " + $("#slSearchJournalType").val() + "\n";
    if ($("#txtSearchReceiptNo").val().trim() != "")
        pWhereClause += " AND ReceiptNo LIKE N'%" + $("#txtSearchReceiptNo").val().trim() + "%'" + "\n";
    if ($("#txtSearchValue").val().trim() != "")
        pWhereClause += " AND TotalCredit = " + $("#txtSearchValue").val().trim() + "\n";
    if ($("#txtSearchRemarksHeader").val().trim() != "")
        pWhereClause += " AND RemarksHeader LIKE N'%" + $("#txtSearchRemarksHeader").val().trim() + "%'" + "\n";
    if ($("#slSearchStatus").val() == 10)
        pWhereClause += " AND Posted = 1" + "\n";
    if ($("#slSearchStatus").val() == 20)
        pWhereClause += " AND Posted = 0" + "\n";
    return pWhereClause;
}
function JournalVouchers_ClearAllControls(callback) {
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    JournalVouchers_EnableDisableEditing(1); //Enable
    ClearAll("#JournalVouchersModal");
    $("#txtUsername").val($("#hLoggedUserNameNotLogin").val());
    $("#tblDetails tbody").html("");
    $("#txtJVDate").val(pFormattedTodaysDate);
    $("#lblDebitTotal").html("<span> : </span><span>" + 0 + "</span>");
    $("#lblCreditTotal").html("<span> : </span><span>" + 0 + "</span>");
    $("#lblDebitCreditDifference").html("<span> : </span><span>" + 0 + "</span>");
    //$("#btnSave").attr("onclick", "JournalVouchers_Save(false);");
    //$("#btnSaveandNew").attr("onclick", "JournalVouchers_Save(true);");
    $("#slJob").val("0");

    $("#cb-CheckAll").prop('checked', false);
    jQuery("#JournalVouchersModal").modal("show");

    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblDebitTotal").reverseChildren();
        $("#lblCreditTotal").reverseChildren();
        $("#lblDebitCreditDifference").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function JournalVouchers_FillControls(pID) {
    debugger;
    const allowedUsers_UNF = ["AHMED SAID", "NOOR", "HOSSAM", "MOAMEN", "MABBAS", "KAREEM", "ESRAA"];

    ClearAll("#JournalVouchersModal");
    //if (!$("#cbPosted" + pID).prop("checked") /*&& !$("#cbIsSysJv" + pID).prop("checked")*/ && $("#hf_CanEdit").val() == "1")
    if (!$("#cbPosted" + pID).prop("checked") /*&& !$("#cbIsSysJv" + pID).prop("checked")*/ && $("#hf_CanEdit").val() == "1"
        || (pDefaults.UnEditableCompanyName == "EGL" && pLoggedUser.Username == "ALAA")
        || (pDefaults.UnEditableCompanyName == "EGL" && pLoggedUser.Username == "TAREK EL FAHAM")
        || (pDefaults.UnEditableCompanyName == "DSE" && pLoggedUser.ID == 91/*Mohamed Adel*/)
        || (pDefaults.UnEditableCompanyName == "NIL" && pLoggedUser.ID == 107/*MOHAMED ZAKARIA*/)
        || (pDefaults.UnEditableCompanyName == "NIL" && pLoggedUser.ID == 98/*SAYED MOUSTAFA*/)
        //|| (pDefaults.UnEditableCompanyName == "HOR" && pLoggedUser.ID == 101/*E.ELSHAZLY*/)
        || (pDefaults.UnEditableCompanyName == "VER" && pLoggedUser.ID == 100/*FINANCIAL*/)
        || (pDefaults.UnEditableCompanyName == "DGL" && pLoggedUser.ID == 76/*IHAB ELAZAB*/)
        || (pDefaults.UnEditableCompanyName == "DGL" && pLoggedUser.ID == 95/*GEHAD MANDOUR*/)
        || (pDefaults.UnEditableCompanyName == "DGL" && pLoggedUser.ID == 102/*MARIAN BERZI*/)
        || (pDefaults.UnEditableCompanyName == "DGL" && pLoggedUser.ID == 84/*REHAB SAMY*/)
        || (pDefaults.UnEditableCompanyName == "ELI" && pLoggedUser.ID == 91/*AHMED ELAZAB*/)
        || (pDefaults.UnEditableCompanyName == "TEU" && pLoggedUser.ID == 101/*ELHOSSINY ALI*/)
        || (pDefaults.UnEditableCompanyName == "SAF" && pLoggedUser.ID == 78)/*AYMAN*/
        || (pDefaults.UnEditableCompanyName == "NEW" && pLoggedUser.ID == 94)/*SAMY FARID*/

        //|| (pDefaults.UnEditableCompanyName == "ELC"/*WeFreight*/ && pLoggedUser.Name == "MAHMOUD GHARIB") //WeFreight
        || (pDefaults.UnEditableCompanyName == "ELC"/*WeFreight*/ && pLoggedUser.Username == "AHMED") //WeFreight

        || (pDefaults.UnEditableCompanyName == "CHM" && pLoggedUser.Username == "ACCOUNT3") //WeFreight
        || (pDefaults.UnEditableCompanyName == "LSC" && pLoggedUser.Username == "AMR")
        || (pDefaults.UnEditableCompanyName == "CSC" && pLoggedUser.Username == "AMR")

        || (pDefaults.UnEditableCompanyName == "CFR" && pLoggedUser.Username == "ACC") //CairoFreight

          || (pDefaults.UnEditableCompanyName == "CHM" && pLoggedUser.ID == 76)//ACCOUNT3
          || (pDefaults.UnEditableCompanyName == "CHM" && pLoggedUser.ID == 77)//ACCOUNT4
          || (pDefaults.UnEditableCompanyName == "CHM" && pLoggedUser.ID == 78)//A.ACCOUNT
          || (pDefaults.UnEditableCompanyName == "CHM" && pLoggedUser.ID == 84)//ACCOUNT2

          || (pDefaults.UnEditableCompanyName == "OCE" && pLoggedUser.ID ==75 )//A.ACCOUNT
          || (pDefaults.UnEditableCompanyName == "OCE" && pLoggedUser.ID ==77 )//ACCOUNT2
          || (pDefaults.UnEditableCompanyName == "OCE" && pLoggedUser.ID == 78)//ACCOUNT3
          || (pDefaults.UnEditableCompanyName == "OCE" && pLoggedUser.ID == 79)//ACCOUNT4

          || (pDefaults.UnEditableCompanyName == "ILS" && pLoggedUser.Username == "KHALID MOHAMED")//KHALID MOHAMED
          || (pDefaults.UnEditableCompanyName == "ILSEG" && pLoggedUser.Username == "KHALID MOHAMED")//KHALID MOHAMED

          || (pDefaults.UnEditableCompanyName == "FEL" && pLoggedUser.Username == "ADMIN")
          || (pDefaults.UnEditableCompanyName == "FEL" && pLoggedUser.Username == "AYMAN FAWZI")//AYMAN FAWZI
          || (pDefaults.UnEditableCompanyName == "CHM" && pLoggedUser.Username == "MOHAMED ALAA")//AYMAN FAWZI
        || (pDefaults.UnEditableCompanyName == "OCE" && pLoggedUser.Username == "MOHAMED ALAA")//AYMAN FAWZI

        || (pDefaults.UnEditableCompanyName == "MFB" && pLoggedUser.ID == 80)//ABD ELRAHMAN
        || (pDefaults.UnEditableCompanyName == "MFB" && pLoggedUser.ID == 82)//Amr


        || (pDefaults.UnEditableCompanyName == "CHM" && pLoggedUser.Username == "ADMIN")
        || (pDefaults.UnEditableCompanyName == "OCE" && pLoggedUser.Username == "ADMIN")
        || (pDefaults.UnEditableCompanyName == "ARK" && pLoggedUser.Username == "ADMIN")

        || (pDefaults.UnEditableCompanyName == "3NL" && pLoggedUser.Username == "SAMAR")
        || (pDefaults.UnEditableCompanyName == "3NL" && pLoggedUser.Username == "MINA SAMY")

        || (pDefaults.UnEditableCompanyName == "MR" && pLoggedUser.Username == "FINANCE")
        
        || (pDefaults.UnEditableCompanyName == "AGR" && pLoggedUser.Username == "AGRO GREEN")
        || (pDefaults.UnEditableCompanyName == "UNF" && allowedUsers_UNF.includes(pLoggedUser.Username))
        || (pDefaults.UnEditableCompanyName == "QUO" && pLoggedUser.Username == "AHMED GALAL")
        || (pDefaults.UnEditableCompanyName == "EXP" && pLoggedUser.Username == "MOHAMED ZAKARIA")
        

        )
        JournalVouchers_EnableDisableEditing(1); //Enable
    else
        JournalVouchers_EnableDisableEditing(2); //Disable

    $("#tblDetails tbody").html("");
    FadePageCover(true);
    var tr = $("#tblJournalVouchers tr[ID='" + pID + "']");
    $("#hID").val(pID);

    $("#lblShown").html("<span> : </span><span> " + $(tr).find("td.JVNo").text() + "</span>");
    $("#txtJVNo").val($(tr).find("td.JVNo").text());
    $("#txtJVDate").val($(tr).find("td.JVDate").text());
    $("#slJVType").val($(tr).find("td.JVType_ID").text());
    $("#slJournalType").val($(tr).find("td.Journal_ID").text());
    $("#txtReceiptNo").val($(tr).find("td.ReceiptNo").text());
    $("#txtUsername").val($(tr).find("td.Username").text());
    $("#txtRemarksHeader").val($(tr).find("td.RemarksHeader").text());
    $("#lblDebitTotal").html("<span> : </span><span>" + $(tr).find("td.TotalCredit").text() + "</span>");
    $("#lblCreditTotal").html("<span> : </span><span>" + $(tr).find("td.TotalCredit").text() + "</span>");
    $("#lblDebitCreditDifference").html("<span> : </span><span>" + 0 + "</span>");
    $("#cbIsPosted").prop("checked", $("#cbPosted" + pID).prop("checked"));
    $("#cbIsDocumented").prop("checked", $("#cbDocumented" + pID).prop("checked"));
    //$("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));

    //$("#btnSave").attr("onclick", "Currencies_Update(false);");
    //$("#btnSaveandNew").attr("onclick", "Currencies_Update(true);");

    jQuery("#JournalVouchersModal").modal("show");
    CallGETFunctionWithParameters("/api/JournalVouchers/GetJournalVouchersDetails"
        , {
            pPageNumber: 1
            , pPageSize: 9999
            , pWhereClauseJournalVoucherDetails: "WHERE JV_ID=" + pID
            , pOrderBy: "Account_Name"
            , pWhereClauseCurrencyDetails:
                ("WHERE '" + GetDateWithFormatyyyyMMdd($(tr).find("td.JVDate").text()) + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                + " AND '" + GetDateWithFormatyyyyMMdd($(tr).find("td.JVDate").text()) + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                + " ORDER BY CODE"
          )
        }
        , function (pData) {
            Details_BindTableRows(JSON.parse(pData[0]));
            FadePageCover(false);
        }
        , null);

    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $("#lblDebitTotal").reverseChildren();
        $("#lblCreditTotal").reverseChildren();
        $("#lblDebitCreditDifference").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function JournalVouchers_Copy(pIDToCopy) {
    debugger;

    swal({
        title: "Are you sure?",
        //text: "The approval status for the selected row(s) will be changed and take effect into the partner balance. \n N.B. Also, please be informed that if the Partner is a custody in a payable then selecting a custody will have no effect on that payable.",
        text: "JV Will Be Copied",
        type: "",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Apply",
        closeOnConfirm: true
    },
//callback function in case of confirm delete
function () {
    FadePageCover(true);
    var pParametersWithValues = {
        pIDToCopy: pIDToCopy
        //LoadWithPaging Parameters
        , pIsLoadArrayOfObjects: false
        , pLanguage: $("[id$='hf_ChangeLanguage']").val()
        , pWhereClause: JournalVouchers_GetWhereClause()
        , pPageSize: $('#select-page-size').val()
        , pPageNumber: 1 //($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text())
        , pOrderBy: "ID DESC"
    }
    CallGETFunctionWithParameters("/api/JournalVouchers/Copy"
        , pParametersWithValues
        , function (pData) {
            if (pData[0] == "") {
                JournalVouchers_BindTableRows(JSON.parse(pData[1]));
                swal("Success", "Saved successfully.");
                FadePageCover(false);
            }
            else
                swal("Sorry", pData[0]);
        }
        , null);

}
    );

}
function JournalVouchers_EnableDisableEditing(pOption) { //pOption 1:Enable 2:Disable
    if (pOption == 1) {
        $("#btnSave").removeAttr("disabled");
        $("#btnSaveandNew").removeAttr("disabled");
        $("#btn-AddDetails").removeAttr("disabled");
        $("#btn-DeleteDetails").removeAttr("disabled");
    }
    else {
        $("#btnSave").attr("disabled", "disabled");
        $("#btnSaveandNew").attr("disabled", "disabled");
        $("#btn-AddDetails").attr("disabled", "disabled");
        $("#btn-DeleteDetails").attr("disabled", "disabled");
    }
}
function JournalVouchers_GetCode() {
    debugger;
    if ($("#hID").val() == 0 || $("#hID").val() == "") { //i.e. insert
        if ($("#slJournalType").val() == 0)
            $("#txtJVNo").val("");
        else {
            var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/JournalVouchers/GetCode"
                , {
                    //pDate: ConvertDateFormat(pFormattedTodaysDate)
                    pDate: ConvertDateFormat($("#txtJVDate").val())
                    , pJournalTypeID: $("#slJournalType").val()
                }
                , function (pData) {
                    $("#txtJVNo").val(pData[0]);
                    FadePageCover(false);
                }
                , null);
        }
    }
}

function JournalVouchers_Save() {
    debugger;
    FadePageCover(true);


    var _Suceess = true;

    $($('#tblDetails > tbody > tr')).each(function (i, tr) {
        debugger;

        var AccountID = $(tr).find('td.Account_ID').find('.selectAccountID').val();
        var SubAccountID = $(tr).find('td.SubAccount_ID').find('.selectSubAccountID').val();

        var SubAccountCount = $(tr).find('td.SubAccount_ID').find('.selectSubAccountID').find('option').length;

        if (pDefaults.UnEditableCompanyName == "NEW") {
            var Branch_ID = $(tr).find('td.Branch_ID').find('.selectBranchID').val();
            if (Branch_ID.trim() == "0") {
                swal('Excuse me', 'Fill  Items Branch', 'warning');
                _Suceess = false;
                $('td.Branch_ID ').addClass('validation-error');
                return false;
            } else {
                $('td.Branch_ID ').removeClass('validation-error');
            }

            var CostCenterID = $(tr).find('td.CostCenter_ID').find('.selectcostcenterID').val();
            var CostCenterType = $('#hReadySlOptions option[value="12"]').attr("OptionValue");
            if (CostCenterID.trim() == "0" && CostCenterType == "true") {
                swal('Excuse me', 'Fill  Items Cost Center', 'warning');
                _Suceess = false;
                $('td.CostCenter_ID ').addClass('validation-error');
                return false;
            } else {
                $('td.CostCenter_ID ').removeClass('validation-error');
            }
        }
        
        if ((AccountID.trim() == "" || AccountID.trim() == "0" || AccountID == null)) {
            swal('Excuse me', 'Fill All Account', 'warning');
            _Suceess = false;
            return false;
        }
        if ((SubAccountID.trim() == "" || SubAccountID.trim() == "0" || SubAccountID == null) && SubAccountCount > 1) {
            swal('Excuse me', 'Fill  SubAccount', 'warning');
            _Suceess = false;
            return false;
        }

        
        if (pDefaults.UnEditableCompanyName == "MKH" || pDefaults.UnEditableCompanyName == "TRM") {
            var Branch_ID = $(tr).find('td.Branch_ID').find('.selectBranchID').val();
            if (Branch_ID.trim() == "0") {
                swal('Excuse me', 'Fill  Items Branch', 'warning');
                _Suceess = false;
                $('td.Branch_ID ').addClass('validation-error');
                return false;
            } else {
                $('td.Branch_ID ').removeClass('validation-error');
            }

            var CostCenter = $(tr).find('td.CostCenter_ID').find('.selectcostcenterID').val();
           
            var pChar = $(tr).find('td.Account_ID').find('option:selected').text().split(':')[1].trim().slice(0, 1);
            if ((pChar == '3' || pChar == '4') && (CostCenter.trim() == "" || CostCenter.trim() == "0" || CostCenter == null)) {
                swal('Excuse me', 'Fill  CostCenter', 'warning');
                _Suceess = false;
                return false;
            }
            if ((pChar == '1' || pChar == '2') && (CostCenter.trim() != "" && CostCenter.trim() != "0" && CostCenter != null)) {
                swal('Excuse me', 'Cost center shouldn’t be included in any balance sheet accounts', 'warning');
                _Suceess = false;
                return false;
            }
        }
        if (pDefaults.UnEditableCompanyName == "AKS") {
            var CostCenter = $(tr).find('td.CostCenter_ID').find('.selectcostcenterID').val();

            var pChar = $(tr).find('td.Account_ID').find('option:selected').text().split(':')[1].trim().slice(0, 1);
            if ((pChar == '3' || pChar == '4') && (CostCenter.trim() == "" || CostCenter.trim() == "0" || CostCenter == null)) {
                swal('Excuse me', 'Fill  CostCenter', 'warning');
                _Suceess = false;
                return false;
            }
            //if ((pChar == '1' || pChar == '2') && (CostCenter.trim() != "" && CostCenter.trim() != "0" && CostCenter != null)) {
            //    swal('Excuse me', 'Cost center shouldn’t be included in any balance sheet accounts', 'warning');
            //    _Suceess = false;
            //    return false;
            //}
        }
    });



    if (ValidateForm("form", "JournalVouchersModal") && _Suceess) {
        if (parseFloat($("#lblDebitCreditDifference").text().replace(":", "")) != 0) {
            FadePageCover(false);
            swal("Sorry", "The J.V. is not balanced.");
        }
        else if (parseFloat($("#lblDebitTotal").text().replace(":", "")) == 0 && parseFloat($("#lblCreditTotal").text().replace(":", "")) == 0) {
            FadePageCover(false);
            swal("Sorry", "Please, enter the details.");
        }
        else {
            var pAccount_IDList = "";
            var pSubAccount_IDList = "";
            var pCostCenter_IDList = "";
            var pOperation_IDList = "";
            var pBranch_IDList = "";
            var pDebitList = "";
            var pCreditList = "";
            var pCurrency_IDList = "";
            var pExchangeRateList = "";
            var pLocalDebitList = "";
            var pLocalCreditList = "";
            var pDescriptionList = "";
            var pIsDocumentedList = "";
            var pActivity_IDList = "";

            var pAccountIDList = "";
            var pSubAccountIDList = "";
            var pChargeTypeIDList = "";
            var pIsPayableList = "";
            /*****************************Collecting Details Data*************************************/
            var pDetailsIDList = GetAllIDsAsStringWithNameAttr("tblDetails", "Delete");
            if (pDetailsIDList != "") {
                var NumberOfDetailsRows = pDetailsIDList.split(',').length;
                for (var i = 0; i < NumberOfDetailsRows; i++) {
                    var currentRowID = pDetailsIDList.split(",")[i];

                    //pAccount_IDList += ((pAccount_IDList == "") ? "" : ",") + ($("#slAccount" + currentRowID).val() == "" ? "NULL" : $("#slAccount" + currentRowID).val());
                    pAccount_IDList += ((pAccount_IDList == "") ? "" : ",") + $("#slAccount" + currentRowID).val();
                    pSubAccount_IDList += ((pSubAccount_IDList == "") ? "" : ",") + $("#slSubAccount" + currentRowID).val();
                    pActivity_IDList += ((pActivity_IDList == "") ? "" : ",") + $("#slActivity" + currentRowID).val();
                    pCostCenter_IDList += ((pCostCenter_IDList == "") ? "" : ",") + $("#slCostCenter" + currentRowID).val();
                    pOperation_IDList += ((pOperation_IDList == "") ? "" : ",") + $("#slOperation" + currentRowID).val();
                    pBranch_IDList += ((pBranch_IDList == "") ? "" : ",") + $("#slBranch" + currentRowID).val();
                    pDebitList += ((pDebitList == "") ? "" : ",") + ($("#txtDebit" + currentRowID).val().trim() == "" ? "0" : $("#txtDebit" + currentRowID).val().trim());
                    pCreditList += ((pCreditList == "") ? "" : ",") + ($("#txtCredit" + currentRowID).val().trim() == "" ? "0" : $("#txtCredit" + currentRowID).val().trim());
                    pCurrency_IDList += ((pCurrency_IDList == "") ? "" : ",") + $("#slCurrency" + currentRowID).val();
                    pExchangeRateList += ((pExchangeRateList == "") ? "" : ",") + ($("#txtExchangeRate" + currentRowID).val().trim() == "" ? "0" : $("#txtExchangeRate" + currentRowID).val().trim());
                    pLocalDebitList += ((pLocalDebitList == "") ? "" : ",") + ($("#txtLocalDebit" + currentRowID).val().trim() == "" ? "0" : $("#txtLocalDebit" + currentRowID).val().trim());
                    pLocalCreditList += ((pLocalCreditList == "") ? "" : ",") + ($("#txtLocalCredit" + currentRowID).val().trim() == "" ? "0" : $("#txtLocalCredit" + currentRowID).val().trim());
                    pDescriptionList += ((pDescriptionList == "") ? "" : ",") + ($("#txtDescription" + currentRowID).val().trim() == "" ? "0" : $("#txtDescription" + currentRowID).val().replace(/,/g, "_").trim().toUpperCase());
                    pIsDocumentedList += ((pIsDocumentedList == "") ? "" : ",") + $("#cbIsDocumented" + currentRowID).prop("checked");
                }

                $($('#tblDetails > tbody > tr')).each(function (i, tr) {
                    debugger;

                    pAccountIDList += ((pAccountIDList == "") ? "" : ",") + ($(tr).find('td.AccountID').text() == "" ? "0" : $(tr).find('td.AccountID').text());
                    pSubAccountIDList += ((pSubAccountIDList == "") ? "" : ",") + ($(tr).find('td.SubAccountID').text() == "" ? "0" : $(tr).find('td.SubAccountID').text());
                    pChargeTypeIDList += ((pChargeTypeIDList == "") ? "" : ",") + ($(tr).find('td.ChargeTypeID').text() == "" ? "0" : $(tr).find('td.ChargeTypeID').text());
                    pIsPayableList += ((pIsPayableList == "") ? "" : ",") + ($(tr).find('td.IsPayable').text() == "" ? false : $(tr).find('td.IsPayable').text());
                    
                });
            }


            var pParametersWithValues = {
                //HeaderData
                pID: ($("#hID").val() == "" ? 0 : $("#hID").val())
                , pJVNo: $("#txtJVNo").val().trim().toUpperCase()
                , pJVDate: ConvertDateFormat($("#txtJVDate").val()) //$("#txtJVDate").val()
                , pTotalDebit: parseFloat($("#lblDebitTotal").text().replace(":", ""))
                , pTotalCredit: parseFloat($("#lblCreditTotal").text().replace(":", ""))
                , pJournal_ID: $("#slJournalType").val()
                , pJVType_ID: $("#slJVType").val()
                , pReceiptNo: ($("#txtReceiptNo").val().trim() == "" ? "0" : $("#txtReceiptNo").val().trim().toUpperCase())
                , pRemarksHeader: ($("#txtRemarksHeader").val() == "" ? "0" : $("#txtRemarksHeader").val().trim().toUpperCase())
                , pDeleted: false
                , pPosted: $("#cbIsPosted").prop("checked")
                , pJobID: $("#hDefaultUnEditableCompanyName").val() == "AKS" ? ($("#slJob").val() == "" || $("#slJob").val() == "0" || $("#slJob").val() == null || $("#slJob").val() == undefined ? 0 : $("#slJob").val()) : 0

                //Details
                , pDetailsIDList: pDetailsIDList
                , pAccount_IDList: pAccount_IDList
                , pSubAccount_IDList: pSubAccount_IDList
                , pActivity_IDList: pActivity_IDList
                , pCostCenter_IDList: pCostCenter_IDList
                , pOperation_IDList: pOperation_IDList
                , pBranch_IDList: pBranch_IDList
                , pDebitList: pDebitList
                , pCreditList: pCreditList
                , pCurrency_IDList: pCurrency_IDList
                , pExchangeRateList: pExchangeRateList
                , pLocalDebitList: pLocalDebitList
                , pLocalCreditList: pLocalCreditList
                , pDescriptionList: pDescriptionList
                , pIsDocumentedList: pIsDocumentedList
                , pAccountIDList: pAccountIDList
                , pSubAccountIDList: pSubAccountIDList
                , pChargeTypeIDList : pChargeTypeIDList
                , pIsPayableList: pIsPayableList
                
            };
            CallPOSTFunctionWithParameters("/api/JournalVouchers/Save"
                , pParametersWithValues
                , function (pData) {
                    var pMessageReturned = pData[0];
                    if (pMessageReturned != "") {
                        swal("Sorry", pMessageReturned);
                        FadePageCover(false);
                    }
                    else {
                        jQuery("#JournalVouchersModal").modal("hide");
                        JournalVouchers_LoadingWithPaging();
                        swal("Success", "Saved successfully.");
                        //FadePageCover(false); //will be fired in LoadWithPaging
                    }
                }
                , null);
        }
    }
    else
        FadePageCover(false);
}
function JournalVouchers_DeleteList(pTrans_Type) {
    debugger;

    var pSelectedIDs = GetAllSelectedIDsAsString('tblJournalVouchers', 'Delete');

    var PostedJVs = new Array();
    $('#tblJournalVouchers' + ' td').find('input[type="checkbox"]:checked').each(function () {
        if ($(this).attr('NoDelete') == 1)
        {
            var tr = $("#tblJournalVouchers tr[ID='" + $(this).attr('value') + "']");
            PostedJVs += $(tr).find("td.JVNo").text() + ",";//+(i==(difference.length-1))?"": ",";
        }
          
    });
    if (PostedJVs.length > 0)
        swal("Sorry", "These JVs is posted " + PostedJVs + " and can't be deleted");
    else {

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
        function () {
   

                FadePageCover(true);
                CallGETFunctionWithParameters("/api/JournalVouchers/Delete"
                , { pDeletedIDs: pSelectedIDs, pTrans_Type: pTrans_Type, pCheckFiscalClosed: true }
                , function (pData) {
                    if (!pData[0]) {
                        showDeleteFailMessage = true;
                        strDeleteFailMessage = "One or more JVs are not deleted because fiscal year is closed or date is frozen.";
                    }


                    //var difference = [];
                    //var listOfIDs = "";
                    //$('#tblJournalVouchers td').find('input[Selectedjv="Selectedjv"]:checked').each(function () {
                    //    listOfIDs += ((listOfIDs == "") ? "" : ",") + ($(this).attr('value'));
                    //});
                    //jQuery.grep(listOfIDs.split(','), function (el) {
                    //    if (jQuery.inArray(el, (GetAllSelectedIDsAsString('tblJournalVouchers', 'NoDelete').split(','))) == -1) difference.push(el);
                    //});

                    //var PostedJVs = "";
                    //var i = 0;
                    //for (i = 0; i < difference.length; i++) {
                    //    var tr = $("#tblJournalVouchers tr[ID='" + difference[i] + "']");
                    //    PostedJVs += $(tr).find("td.JVNo").text() + ",";//+(i==(difference.length-1))?"": ",";
                    //}

               JournalVouchers_LoadingWithPaging();
    }
    , null);
       

        });

        }


}
function JournalVouchers_JVDateChanged(pCallback) {
    debugger;
    if (pCallback != null && pCallback != undefined)
        pCallback();
}
function JournalVoucher_Print() {
    debugger;
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat() + ' ' + getTime();
    var pID = $("#hID").val();

    var pParametersWithValues = {
        pJournalVoucherIDForPrinting: pID
    };
    FadePageCover(true);
    //CallGETFunctionWithParameters(pFunctionName, pParametersWithValues, callback, callback1)
    CallGETFunctionWithParameters("/api/JournalVouchers/GetJournalVoucherDataForPrinting", pParametersWithValues
        , function (pData) {
            if (pData[0]) {


                var pJVHeader = JSON.parse(pData[1]); // its 1 row
                var pJVItems = JSON.parse(pData[2]);

                var result = [];
                var Currency;
                // fill currency codes --------------
                $.each(pJVItems, function (i, item) {
                    Currency = item.Code;
                    if ($.inArray(Currency, result) == -1)
                        result.push(Currency);
                });

                var ReportHTMLCurrenyTotal = "";
                ReportHTMLCurrenyTotal += '     <br>';
                ReportHTMLCurrenyTotal += '     <body>';

                ReportHTMLCurrenyTotal += '         <table id="tblPrintJVCurrencyTotal" style="max-width:300px;" class="table table-striped b-t b-light text-sm table-bordered m-t-lg">';
                ReportHTMLCurrenyTotal += '             <thead>';
                ReportHTMLCurrenyTotal += '                 <tr>';
                ReportHTMLCurrenyTotal += '                     <th class="text-center">' + TranslateString("Cur") + '</th>';
                ReportHTMLCurrenyTotal += '                     <th class="text-center">' + TranslateString("Debit") + '</th>';
                ReportHTMLCurrenyTotal += '                     <th class="text-center">' + TranslateString("Credit") + '</th>';
                ReportHTMLCurrenyTotal += '                 </tr>';
                ReportHTMLCurrenyTotal += '             </thead>';
                ReportHTMLCurrenyTotal += '             <tbody>';

                for (var j = 0; j < result.length ; j++) {
                    var TotalDebit = 0;
                    var TotalCredit = 0;
                    $.each(pJVItems, function (i, item) {
                        if ( result[j] == item.Code) {
                            var Debit =  item.Debit;
                            var Credit = item.Credit;
                            TotalDebit += parseFloat(Debit);  // .replace(/\b0+/g, "")
                            TotalCredit += parseFloat(Credit);  // .replace(/\b0+/g, "")
                        }
                    });
                           
                ReportHTMLCurrenyTotal += '                 <tr style="font-size:95%;">';
                ReportHTMLCurrenyTotal += '                     <td class="text-center">' + result[j] + '</td>';
                ReportHTMLCurrenyTotal += '                     <td class="text-center">' + TotalDebit.toFixed(2) + '</td>';
                ReportHTMLCurrenyTotal += '                     <td class="text-center">' + TotalCredit.toFixed(2) + '</td>';
                ReportHTMLCurrenyTotal += '                 </tr>';

            }
            ReportHTMLCurrenyTotal += '             </tbody>';
            ReportHTMLCurrenyTotal += '         </table>';
            ReportHTMLCurrenyTotal += '     </body>';

                var ReportHTML = '';
                if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                    ReportHTML += '<html>';
                }
                else {
                    ReportHTML += '<html dir="rtl">';
                }
                ReportHTML += '     <head><title>' + TranslateString("PrintJV") + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                if (pDefaults.UnEditableCompanyName == 'ELC' || pDefaults.UnEditableCompanyName == 'KDI')
                {
                    ReportHTML += '     <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="header"/></div>';
                    ReportHTML += '     <div class="row text-center"><br></div>';
                }
                else
                ReportHTML += '     <div class="row text-center"><br><br><br><br><br><br><br></div>';

                ReportHTML += '     <div class="col-xs-12 text-center text-ul m-t-n"><h3> ' + TranslateString("JournalVouchers") + '</h3></div> '; //addClass "text-ul" to underline
                ReportHTML += '     <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pJVHeader.JVNo + '</h3></div> '; //addClass "text-ul" to underline
                ReportHTML += '     </ br>';

                ReportHTML += '     <div class="col-xs-6 m-l-n ">' + '<b><span class="float-left">' + TranslateString("JvNo") + '        : ' + pJVHeader.JVNo + '</span></b></div>';
                ReportHTML += '     <div class="col-xs-6 m-l-n ">' + '<b><span class="float-left">' + TranslateString("UserName") + '    : ' + pJVHeader.UserName + '</span></b></div>';
                ReportHTML += '     <div class="col-xs-6 m-l-n ">' + '<b><span class="float-left">' + TranslateString("JVDate") + '     : ' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pJVHeader.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pJVHeader.JVDate))) + '</span></b></div>';
                ReportHTML += '     <div class="col-xs-6 m-l-n ">' + '<b><span class="float-left">' + TranslateString("JournalType") + ' : ' + pJVHeader.Journal_Name + '</span></b></div>';
                ReportHTML += '     <div class="col-xs-6 m-l-n ">' + '<b><span class="float-left">' + TranslateString("JVType") + '      : ' + pJVHeader.JVType_Name + '</span></b></div>';
                ReportHTML += '     <div class="col-xs-6 m-l-n ">' + '<b><span class="float-left">' + TranslateString("ReceiptNo") + '   : ' + pJVHeader.ReceiptNo + '</span></b></div>';
                ReportHTML += '     <div class="col-xs-12 m-l-n ">' + '<b><span class="float-left">' + TranslateString("Notes") + '       : ' + (pJVHeader.RemarksHeader == 0 ? "" : pJVHeader.RemarksHeader) + '</span></b></div>';

                //ReportHTML += '     <body style="background-color:white;">';
                ReportHTML += '     <br>';
                ReportHTML += '     <body>';

                ReportHTML += '         <table id="tblPrintJVItems" class="table table-striped b-t b-light text-sm table-bordered m-t-lg">';
                ReportHTML += '             <thead>';
                ReportHTML += '                 <tr>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Account") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("SubAccount") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("CostCenter") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Debit") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Credit") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Cur") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Ex.Rate") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("LocalDebit") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("LocalCredit") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Description") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Documented") + '</th>';
                ReportHTML += '                 </tr>';
                ReportHTML += '             </thead>';
                ReportHTML += '             <tbody>';
                var Counter = 0;
                $.each(pJVItems, function (i, item) {
                    debugger;
                    ReportHTML += '                 <tr style="font-size:95%;">';
                    ReportHTML += '                     <td class="text-center">' + (item.AccountName == 0 ? '' : item.AccountName) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.subAccountName == 0 ? '' : item.subAccountName) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.CostCenter == 0 ? "" : item.CostCenter) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.Debit == 0 ? "" : item.Debit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.Credit == 0 ? "" : item.Credit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + item.Code + '</td>';
                    ReportHTML += '                     <td class="text-center">' + item.ExchangeRate + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.LocalDebit == 0 ? "" : item.LocalDebit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.LocalCredit == 0 ? "" : item.LocalCredit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.Description == 0 ? '' : item.Description.replace(/\n/g, "<br />")) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + '<input  disabled="disabled" type="checkbox" ' + (item.isDocumented == true ? "checked" : "") + '></td>';

                    ReportHTML += '                 </tr>';
                });
                ReportHTML += '             </tbody>';
                ReportHTML += '         </table>';
                ReportHTML += '     </body>';


                ReportHTML += '<div class="col-xs-6  text-right">' + '<b>  ' + TranslateString("Total") + ' : </b>' + pJVHeader.TotalDebit + ' ' + $("#hDefaultCurrencyCode").val() + '</div>';
                ReportHTML += '<div class="col-xs-6 text-left" style=" padding-bottom: 10px;">' + toWords(pJVHeader.TotalDebit) + '</div>';
                //if ($("#cbPrintLogo").prop("checked")) {
                //    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                //    ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                //    ReportHTML += '     </footer>';
                //}

                ReportHTML += ReportHTMLCurrenyTotal;


                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:relative; bottom:0;  padding-top: 10px;">';
                ReportHTML += '                 <div class="col-xs-4  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("PreparedBy") + '</br> </br>' + (pJVHeader.UserName != 0 ? pJVHeader.UserName : '') + '</div></b></div>';
                ReportHTML += '                 <div class="col-xs-4  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("ReviewedBy") + '</div></div></div>';
                ReportHTML += '                 <div class="col-xs-4  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("ApprovedBy") + '</div></b></div>';
                ReportHTML += '     <div class="col-xs-6 "><b>' + TranslateString("PrintedOn") + ' :</b> ' + FormattedTodaysDate + '</div>';
                ReportHTML += '     <div class="col-xs-6 "><b>' + 'Printed By' + ' :</b> ' + pLoggedUser.Name + '</div>';
                ReportHTML += '     </footer>';
                ReportHTML += '</html>';



                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
            else {
                if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                    swal("Sorry", "Connection failed. Please try again.");
                }
                else {
                    swal("معذرة", "فشل الإتصال، حاول مرة أخري.");
                }
            }
            FadePageCover(false);
        }
        , null);
}

function CalcTotal() {


    var result = [];
    // fill currency codes --------------
    debugger;

    var Currency;
    $('#' + 'tblPayables' + ' td.' + 'PayableID' + ' input:checkbox').click(function () {

        $('#lblTotalCost').html(' ');

        $('#tblPayables  > tbody > tr').each(function () {

            if ($(this).find('input[name="Delete"]').is(':checked')) {
                Currency = $(this).find('td.PayableCurrency').attr('val2');
                if ($.inArray(Currency, result) == -1)
                    result.push(Currency);
            }
        });

        debugger;
        for (var j = 0; j < result.length ; j++) {
            var Total = 0;
            $('#tblPayables  > tbody > tr').each(function () {

                if ($(this).find('input[name="Delete"]').is(':checked')) {
                    if ($(this).find('td.PayableCostAmount').attr('val') != 0 && result[j] == $(this).find('td.PayableCurrency').attr('val2')) {
                        var Cost = $(this).find('td.PayableCostAmount').attr('val');
                        Total += parseFloat(Cost);  // .replace(/\b0+/g, "")
                    }


                }
            });
            $('#lblTotalCost').append(result[j] + ": ");
            $('#lblTotalCost').append(Total.toFixed(2));
            $('#lblTotalCost').append(' ');
        }
    });
}
function JournalVoucher_PrintEXcel() {
    debugger;
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pID = $("#hID").val();

    var pParametersWithValues = {
        pJournalVoucherIDForPrinting: pID
    };
    // FadePageCover(true);
    //CallGETFunctionWithParameters(pFunctionName, pParametersWithValues, callback, callback1)
    CallGETFunctionWithParameters("/api/JournalVouchers/GetJournalVoucherDataForPrinting", pParametersWithValues
        , function (pData) {
            if (pData[0]) {


                var pJVHeader = JSON.parse(pData[1]); // its 1 row
                var pJVItems = JSON.parse(pData[2]);



                var ReportHTML = '';



                ReportHTML += '         <table id="tblPrintJVItems" class="table table-striped text-sm  table-bordered" style="" >';
                ReportHTML += '             <thead class="" style="" >';
                ReportHTML += '                 <tr class="" style="" >';
                ReportHTML += '                     <th class="" >' + TranslateString("Account") + '</th>';
                ReportHTML += '                     <th class="" >' + TranslateString("SubAccount") + '</th>';
                ReportHTML += '                     <th class="" >' + TranslateString("CostCenter") + '</th>';
                ReportHTML += '                     <th class="" >' + TranslateString("Debit") + '</th>';
                ReportHTML += '                     <th class="" >' + TranslateString("Credit") + '</th>';
                ReportHTML += '                     <th class="" >' + TranslateString("Cur") + '</th>';
                ReportHTML += '                     <th class="" >' + TranslateString("Ex.Rate") + '</th>';
                ReportHTML += '                     <th class="" >' + TranslateString("LocalDebit") + '</th>';
                ReportHTML += '                     <th class="" >' + TranslateString("LocalCredit") + '</th>';;
                ReportHTML += '                     <th class="" >' + TranslateString("Description") + '</th>';
                ReportHTML += '                 </tr>';
                ReportHTML += '             </thead>';
                ReportHTML += '             <tbody>';
                var Counter = 0;
                $.each(pJVItems, function (i, item) {
                    debugger;
                    ReportHTML += '                 <tr class="" style="font-size:95%;">';
                    ReportHTML += '                     <td class="text-center">' + (item.AccountName == 0 ? '' : item.AccountName) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.subAccountName == 0 ? '' : item.subAccountName) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.CostCenter == 0 ? "" : item.CostCenter) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.Debit == 0 ? "" : item.Debit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.Credit == 0 ? "" : item.Credit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + item.Code + '</td>';
                    ReportHTML += '                     <td class="text-center">' + item.ExchangeRate + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.LocalDebit == 0 ? "" : item.LocalDebit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.LocalCredit == 0 ? "" : item.LocalCredit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.Description == 0 ? '' : item.Description.replace(/\n/g, "<br />")) + '</td>';

                    ReportHTML += '                 </tr>';
                });
                ReportHTML += '             </tbody>';
                ReportHTML += '         </table>';


                $("#hExportedTable").html(ReportHTML);
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblPrintJVItems", $("#txtJVNo").val());


            }
            else {
                if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                    swal("Sorry", "Connection failed. Please try again.");
                }
                else {
                    swal("معذرة", "فشل الإتصال، حاول مرة أخري.");
                }
            }
            FadePageCover(false);
        }
        , null);
}
function JournalVoucher_PrintTotals(pOutputTo) {
    debugger;
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat() + ' ' + getTime();

    if ($("#txtFromDate").val() == "") {
        swal("Sorry", "Please Choose From Date.");
        return;
    }
    if ($("#txtToDate").val() == "") {
        swal("Sorry", "Please Choose To Date");
        return;
    }

    var pParametersWithValues = {
        pFromDate: $("#txtFromDate").val()
        , pToDate: $("#txtToDate").val()
        , pJournalType: $("#slSearchJournalTypePrint").val()
         , pJVType: $("#slSearchJVTypePrint").val()
    };
    FadePageCover(true);
    //CallGETFunctionWithParameters(pFunctionName, pParametersWithValues, callback, callback1)

    CallGETFunctionWithParameters("/api/JournalVouchers/GetJournalVoucherDataForPrintingTotals", pParametersWithValues
        , function (pData) {
            if (pData != null && pData[0]) {

                debugger;
                var pJVHeader = JSON.parse(pData[1]); // its 1 row
                var pJVItems = JSON.parse(pData[2]);



                var ReportHTML = '';
                if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                    ReportHTML += '<html>';
                }
                else {
                    ReportHTML += '<html dir="rtl">';
                }
                ReportHTML += '     <head><title>' + TranslateString("PrintJV") + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                //ReportHTML += '     <head><title>' + 'Print JV' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                //if ($("#cbPrintLogo").prop("checked"))
                //    ReportHTML += '     <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="header"/></div>';
                //else
                ReportHTML += '     <div class="row text-center"><br><br><br><br><br><br><br></div>';

                ReportHTML += '     <div class="col-xs-12 text-center text-ul m-t-n"><h3> ' + TranslateString("JournalVouchers") + '</h3></div> '; //addClass "text-ul" to underline
                ReportHTML += '     <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pJVHeader.JVNo + '</h3></div> '; //addClass "text-ul" to underline
                ReportHTML += '     </ br>';

                //ReportHTML += '     <div class="col-xs-6 m-l-n text-left">' + '<b><span class="float-left">' + 'Jv No        : ' + pJVHeader.JVNo + '</span></b></div>';
                //ReportHTML += '     <div class="col-xs-6 m-l-n text-left">' + '<b><span class="float-left">' + 'User Name    : ' + pJVHeader.UserName + '</span></b></div>';
                //ReportHTML += '     <div class="col-xs-6 m-l-n text-left">' + '<b><span class="float-left">' + 'JV Date      : ' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pJVHeader.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pJVHeader.JVDate))) + '</span></b></div>';
                ////ReportHTML += '     <div class="col-xs-6 m-l-n text-left">' + '<b>' + 'Date : ' + FormattedTodaysDate + '</b></div>'; //addClass "text-ul" to underline
                //ReportHTML += '     <div class="col-xs-6 m-l-n text-left">' + '<b><span class="float-left">' + 'Journal Type : ' + pJVHeader.Journal_Name + '</span></b></div>';
                //ReportHTML += '     <div class="col-xs-6 m-l-n text-left">' + '<b><span class="float-left">' + 'JV Type      : ' + pJVHeader.JVType_Name + '</span></b></div>';
                //ReportHTML += '     <div class="col-xs-6 m-l-n text-left">' + '<b><span class="float-left">' + 'Receipt No   : ' + pJVHeader.ReceiptNo + '</span></b></div>';
                //ReportHTML += '     <div class="col-xs-12 m-l-n text-left">' + '<b><span class="float-left">' + 'Notes       : ' + (pJVHeader.RemarksHeader == 0 ? "" : pJVHeader.RemarksHeader) + '</span></b></div>';

                //ReportHTML += '     <body style="background-color:white;">';
                ReportHTML += '     <br>';
                ReportHTML += '     <body>';

                ReportHTML += '         <table id="tblPrintJVItems" class="table table-striped b-t b-light text-sm table-bordered m-t-lg">';
                ReportHTML += '             <thead>';
                ReportHTML += '                 <tr>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Account") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("SubAccount") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("CostCenter") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Debit") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Credit") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Cur") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Ex.Rate") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("LocalDebit") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("LocalCredit") + '</th>';;
                ReportHTML += '                     <th class="text-center">' + TranslateString("Description") + '</th>';
                ReportHTML += '                 </tr>';
                ReportHTML += '             </thead>';
                ReportHTML += '             <tbody>';
                var Counter = 0;
                $.each(pJVItems, function (i, item) {
                    debugger;
                    ReportHTML += '                 <tr style="font-size:95%;">';
                    ReportHTML += '                     <td class="text-center">' + (item.AccountName == 0 ? '' : item.AccountName) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.subAccountName == 0 ? '' : item.subAccountName) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.CostCenter == 0 ? "" : item.CostCenter) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.Debit == 0 ? "" : item.Debit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.Credit == 0 ? "" : item.Credit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + item.Code + '</td>';
                    ReportHTML += '                     <td class="text-center">' + item.ExchangeRate + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.LocalDebit == 0 ? "" : item.LocalDebit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.LocalCredit == 0 ? "" : item.LocalCredit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.Description == 0 ? '' : item.Description.replace(/\n/g, "<br />")) + '</td>';

                    ReportHTML += '                 </tr>';
                });
                ReportHTML += '             </tbody>';
                ReportHTML += '         </table>';
                ReportHTML += '     </body>';


                //ReportHTML += '<div class="col-xs-6  text-right">' + '<b>  Total : </b>' + pJVHeader.TotalDebit + ' ' + $("#hDefaultCurrencyCode").val() + '</div>';
                //ReportHTML += '<div class="col-xs-6 text-left" style=" padding-bottom: 10px;">' + toWords(pJVHeader.TotalDebit) + '</div>';
                //if ($("#cbPrintLogo").prop("checked")) {
                //    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                //    ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                //    ReportHTML += '     </footer>';
                //}
                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:relative; bottom:0;  padding-top: 10px;">';
                ReportHTML += '                 <div class="col-xs-4  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("PreparedBy") + '</br> </br>' + (pJVHeader.UserName != 0 ? pJVHeader.UserName : '') + '</div></b></div>';
                ReportHTML += '                 <div class="col-xs-4  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("ReviewedBy") + '</div></div></div>';
                ReportHTML += '                 <div class="col-xs-4  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("ApprovedBy") + '</div></b></div>';
                ReportHTML += '     <div class="col-xs-12 "><b>' + TranslateString("PrintedOn") + ' :</b> ' + FormattedTodaysDate + '</div>';
                ReportHTML += '     </footer>';
                ReportHTML += '</html>';

                $("#hExportedTable").html(ReportHTML);

                if (pOutputTo == "Excel") {
                    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
                    var pFormattedPrintTime = getTime();
                    var ReportHTML = '';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>' + 'Account Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '         <div id="Reportbody">';
                        ReportHTML += '         <div class="break"></div>';
                        ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';

                        ReportHTML += '                     <table id="tblPrintJVItems'  + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
                        ReportHTML += '                         <tbody>';

                        ReportHTML += '             <tr class="">';

                        ReportHTML += '             <tr class="">';
                        ReportHTML += '                  <td class="col-xs-12"style="border: 1px solid black;" ><h4><b>' + ' From Date : ' + '</b>'  + '</h4> </td>';
                        ReportHTML += '                  <td class="col-xs-12"style="border: 1px solid black;" ><h4>'+ $("#txtFromDate").val() + '</h4> </td>';

                        ReportHTML += '                  <td class="col-xs-12"style="border: 1px solid black;" ><h4><b>' + ' To Date : ' + '</b>'  + '</h4> </td>';
                        ReportHTML += '                  <td class="col-xs-12"style="border: 1px solid black;" ><h4>' + $("#txtToDate").val() + '</h4> </td>';

                        ReportHTML += '                  <td class="col-xs-12"style="border: 1px solid black;" ><h4><b>' + ' Journal Type : ' + '</b>' + '</h4> </td>';
                        ReportHTML += '                  <td class="col-xs-12"style="border: 1px solid black;" ><h4>'  + $('#slSearchJournalTypePrint option:selected').text() + '</h4> </td>';

                        ReportHTML += '                  <td class="col-xs-12"style="border: 1px solid black;" ><h4><b>' + ' JVType  : ' + '</h4> </td>';
                        ReportHTML += '                  <td class="col-xs-12"style="border: 1px solid black;" ><h4>'  + $('#slSearchJVTypePrint option:selected').text() + '</h4> </td>';


                        ReportHTML += '             </tr>';
                        ReportHTML += '                         </tbody>';
                        ReportHTML += '                     </table>';

                        ReportHTML += '             <table id="tblPrintJVItems' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                        ReportHTML += '             ' + $("#tblPrintJVItems").html();
                        ReportHTML += '             </table>';
                        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
                        /*****************************Creating table tblSumCurrencyByCC****************************************/
                        ReportHTML += '             <div class="col-xs-12"></div>';


                 //of for (var j = 0; j < ArrAccountIDList.length; j++) {
                    ReportHTML += '         </div>';
                    ReportHTML += '         <body>';

                    ReportHTML += '</html>';

                    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();

                    $("#hExportedTable").html(ReportHTML);

                    $("#Reportbody").table2excel({
                        exclude: ".excludeThisClass",
                        name: "Sheet 1",
                        filename: " Print Total By Journal Report " + pFormattedTodaysDate //do not include extension
                    });
                }
                else {
                    var mywindow = window.open('', '_blank');
                    mywindow.document.write(ReportHTML);
                    mywindow.document.close();
                }
            }
            else {
                if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                    swal("Sorry", "Connection failed. Please try again.");
                }
                else {
                    swal("معذرة", "فشل الإتصال، حاول مرة أخري.");
                }
            }
            FadePageCover(false);
        }
        , null);
}
/************************************Details Fns**********************************************/
function Details_BindTableRows(pTableRows) {
    debugger;
    ClearAllTableRows("tblDetails");
    maxDetailsIDInTable = 0;
    $.each(pTableRows, function (i, item) {
        maxDetailsIDInTable = (item.ID > maxDetailsIDInTable ? item.ID : maxDetailsIDInTable);
        var tr = "";
        tr += "<tr ID='" + item.ID + "' " + ">";
        tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + item.ID + "' /></td>";
        tr += "     <td class='DetailsID'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>";

        tr += "     <td class='Activity_ID" + (IsActivityOption ? " " : " hide ") +"' style='width:20%;' val='" + item.ActivityID + "'><p class='text-center' id='cellActivity" + item.ID + "' ondblclick='Details_EnterEditModeForSL(" + '"' + "Activity" + '",' + item.ID + ");'>" + (item.ActivityID == 0 ? "N/A" : (item.ActivityName)) + "</p><select id='slActivity" + item.ID + "' style='width:112%;' class='selectactivityID controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);ClearCostCenter(" + item.ID + ',' + item.Account_ID + ");' data-required='false'>" + "<option value=" + item.ActivityID + "></option>" + "</select></td>";

        tr += "     <td class='Account_ID' style='width:30%;' val='" + item.Account_ID + "'><p id='cellAccount" + item.ID + "' class='text-center' ondblclick='Details_EnterEditModeForSL(" + '"' + "Account" + '",' + item.ID + ");'>" + (item.Account_ID == 0 ? "N/A" : (item.Account_Name + " - " + item.Account_Number)) + "</p><select id='slAccount" + item.ID + "' style='width:112%;' class='selectAccountID controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id); Details_AccountChanged(" + item.ID + ");' data-required='true'>" + "<option value=" + item.Account_ID + "></option>" + "</select></td>";
        tr += "     <td class='SubAccount_ID' style='width:30%;' val='" + item.SubAccount_ID + "'><p class='text-center' id='cellSubAccount" + item.ID + "' ondblclick='Details_EnterEditModeForSL(" + '"' + "SubAccount" + '",' + item.ID + ");'>" + (item.SubAccount_ID == 0 ? "N/A" : (item.SubAccount_Name + " - " + item.SubAccount_Number)) + "</p><select id='slSubAccount" + item.ID + "' style='width:112%;' class='selectSubAccountID controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + item.SubAccount_ID + "></option>" + "</select></td>";

        tr += "     <td class='Branch_ID' style='width:20%;' val='" + item.Branch_ID + "'><p class='text-center' id='cellBranch" + item.ID + "' ondblclick='Details_EnterEditModeForSL(" + '"' + "Branch" + '",' + item.ID + ");'>" + (item.Branch_ID == null ? "N/A" : (item.Branch_Name)) + "</p><select id='slBranch" + item.ID + "' style='width:112%;' class='controlStyle selectBranchID hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + item.Branch_ID + "></option>" + "</select></td>";
        tr += "     <td class='Operation_ID' style='width:20%;' val='" + item.Operation_ID + "'><p class='text-center' id='cellOperation" + item.ID + "' ondblclick='Details_EnterEditModeForSL(" + '"' + "Operation" + '",' + item.ID + ");'>" + (item.Operation_ID == null ? "N/A" : (item.Operation_Code)) + "</p><select id='slOperation" + item.ID + "' style='width:112%;' class='controlStyle hide selectOperationID' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + item.Operation_ID + "></option>" + "</select></td>";


        tr += "     <td class='CostCenter_ID' style='width:20%;' val='" + item.CostCenter_ID + "'><p class='text-center' id='cellCostCenter" + item.ID + "' ondblclick='Details_EnterEditModeForSL(" + '"' + "CostCenter" + '",' + item.ID + ");'>" + (item.CostCenter_ID == 0 ? "N/A" : (item.CostCenterName + " - " + item.CostCenterNumber)) + "</p><select id='slCostCenter" + item.ID + "' style='width:112%;' class='selectcostcenterID controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + item.CostCenter_ID + ">" + item.CostCenterName + "</option>" + "</select></td>";

        tr += "     <td class='Debit' style='width:7%;'><p class='text-center' id='cellDebit" + item.ID + "' ondblclick='Details_EnterEditModeForTxt(" + '"' + "Debit" + '",' + item.ID + ");'>" + (item.Debit) + "</p><input type='text' style='width:112%;font-size:90%;' id='txtDebit" + item.ID + "' class='form-control controlStyle hide' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);Details_ClearDebitOrCredit(id);' onchange='Details_SetIsRowChanged(id);' data-required='false' value='" + item.Debit + "' /> </td>";
        tr += "     <td class='Credit' style='width:7%;'><p class='text-center' id='cellCredit" + item.ID + "' ondblclick='Details_EnterEditModeForTxt(" + '"' + "Credit" + '",' + item.ID + ");'>" + (item.Credit) + "</p><input type='text' style='width:112%;font-size:90%;' id='txtCredit" + item.ID + "' class='form-control controlStyle hide' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);Details_ClearDebitOrCredit(id);' onchange='Details_SetIsRowChanged(id);' data-required='false' value='" + item.Credit + "' /> </td>";
        tr += "     <td class='Currency_ID' val='" + item.Currency_ID + "'><p class='text-center' id='cellCurrency" + item.ID + "' ondblclick='Details_EnterEditModeForSL(" + '"' + "Currency" + '",' + item.ID + ");'>" + (item.Currency_ID == 0 ? "N/A" : item.CurrencyCode) + "</p><select id='slCurrency" + item.ID + "' style='width:auto;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id); Details_CurrencyChanged(" + '"slCurrency","txtExchangeRate",' + item.ID + ");' data-required='true'>" + "<option value=" + (item.Currency_ID == 0 ? "" : item.Currency_ID) + "></option>" + "</select></td>";
        tr += "     <td class='ExchangeRate' style='width:2%;'><p class='text-center' id='cellExchangeRate" + item.ID + "' ondblclick='Details_EnterEditModeForTxt(" + '"' + "ExchangeRate" + '",' + item.ID + ");'>" + (item.ExchangeRate) + "</p><input type='text' style='width:112%;font-size:90%;' " + (item.Currency_ID == $("#hDefaultCurrencyID").val() ? 'disabled' : '') + " id='txtExchangeRate" + item.ID + "' class='form-control controlStyle hide' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);Details_CalculateTotals();' onchange='Details_SetIsRowChanged(id);' data-required='true' value='" + item.ExchangeRate + "' /> </td>";
        tr += "     <td class='LocalDebit' style='width:9%;'><p class='text-center' id='cellLocalDebit" + item.ID + "' ondblclick='Details_EnterEditModeForTxt(" + '"' + "LocalDebit" + '",' + item.ID + ");'>" + (item.LocalDebit) + "</p><input type='text' style='width:112%;font-size:90%;' disabled id='txtLocalDebit" + item.ID + "' class='form-control controlStyle hide' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='Details_SetIsRowChanged(id);' data-required='false' value='" + item.LocalDebit + "' /> </td>";
        tr += "     <td class='LocalCredit' style='width:9%;'><p class='text-center' id='cellLocalCredit" + item.ID + "' ondblclick='Details_EnterEditModeForTxt(" + '"' + "LocalCredit" + '",' + item.ID + ");'>" + (item.LocalCredit) + "</p><input type='text' style='width:112%;font-size:90%;' disabled id='txtLocalCredit" + item.ID + "' class='form-control controlStyle hide' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='Details_SetIsRowChanged(id);' data-required='false' value='" + item.LocalCredit + "' /> </td>";
        tr += "     <td class='Description' style='width:12%;'><p class='text-center' id='cellDescription" + item.ID + "' ondblclick='Details_EnterEditModeForTxt(" + '"' + "Description" + '",' + item.ID + ");'>" + (item.Description == 0 ? "N/A" : item.Description) + "</p><input type='text' style='width:112%;font-size:90%;text-transform:uppercase;' id='txtDescription" + item.ID + "' class='form-control controlStyle hide'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false' value='" + (item.Description == 0 ? "" : item.Description) + "' /> </td>";
        tr += "      <td class='IsDocumented'><input id='cbIsDocumented" + item.ID + "' " + (item.IsDocumented == true ? 'checked' : '') + " type='checkbox' value='" + item.IsDocumented + "'></td>";
        //else
        //    tr += "      <td class='IsDocumented'><input id='cbIsDocumented" + item.ID + "'  type='checkbox' value='" + item.IsDocumented + "'></td>";

        tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + item.ID + "' type='checkbox' value='" + item.ID + "' /></td>";
        tr += "</tr>";
        AppendRowtoTable("tblDetails", tr);
    });

    $.each(pTableRows, function (i, item) {
        debugger;
        $("#slCurrency" + item.ID).html($("#hReadySlCurrencies").html());
        $("#slCurrency" + item.ID).val(item.Currency_ID);
        $("#slAccount" + item.ID).html($("#slAccount").html());
        $("#slAccount" + item.ID).val(item.Account_ID);
        if (!IsActivityOption) {
            $("#slCostCenter" + item.ID).html($("#slCostCenter").html());
            $("#slCostCenter" + item.ID).val(item.CostCenter_ID);
        }



        $("#slActivity" + item.ID).html($("#slActivity").html());
        $("#slActivity" + item.ID).val(item.ActivityID);

        $("#slBranch" + item.ID).html($("#slBranch").html());
        $("#slBranch" + item.ID).val(item.Branch_ID);

        if (item.Operation_ID != 0)
        {
            $("#slOperation" + item.ID).html($("#slOperation").html());
             $("#slOperation" + item.ID).val(item.Operation_ID);
        }


        if ($("#hDefaultUnEditableCompanyName").val() == "SAF") {
            $(".isDepartement").removeClass("hide");
            $("#isDepartement").removeClass('hide');

            $(".isBranch").addClass("hide");
            $("#isBranch").addClass('hide');
        }
        else {
            $(".isBranch").removeClass("hide");
            $("#isBranch").removeClass('hide');

            $(".isDepartement").addClass("hide");
            $("#isDepartement").addClass('hide');
        }
    });
    //SetDatepickerFormat();
    BindAllCheckboxonTable("tblDetails", "DetailsID", "cbDetailsDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeleteDetailsID");
}
function Details_EnterEditModeForSL(pControlID, pRowID) {
    debugger;
    if ($("#hf_CanEdit").val() == "1") {
        var tr = $("#tblDetails tr[ID='" + pRowID + "']");
        $("#cell" + pControlID + pRowID).addClass("hide");
        $("#sl" + pControlID + pRowID).removeClass("hide");
        if (pControlID == "SubAccount" || pControlID == "Account") {
            var pAccountID = $(tr).find("td.Account_ID").attr("val");
            var pSubAccountID = $(tr).find("td.SubAccount_ID").attr("val");
            $("#cellSubAccount" + pRowID).addClass("hide");
            $("#slSubAccount" + pRowID).removeClass("hide");
            //if (pDefaults.UnEditableCompanyName != "FAI") {
            // Start Auto Filter
            $("#sl" + pControlID + pRowID).css({ "width": "100%" }).select2();
            $("div[tabindex='-1']").removeAttr('tabindex');
            $("#sl" + pControlID + pRowID).trigger("change");
            //End Auto Filter
            //   }
            Details_FillSlSubAccount("slSubAccount" + pRowID, pSubAccountID, pAccountID);
        }
        else if (pControlID == "CostCenter") {

            if (IsActivityOption) {
                var activityIDSelector = "#slActivity" + pRowID;
                Select2OnlineSearch(("slCostCenter" + pRowID), "/api/CostCenters/LoadCostCenterByActivity", function (params) {
                    var query = {
                        pSearchWord: params.term.trim()
                        , pOrderBy: "Name, Code"
                        , pActivityID: $(activityIDSelector).val()
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
                }, 3, 2000);
            }


        }
        else if (pControlID == "Activity")
        {
            var pAccountID = $(tr).find("td.Account_ID").attr("val");
            var pActivityID = $(tr).find("td.Acticity_ID").attr("val");
            var pCostCenterID = $(tr).find("td.CostCenter_ID").attr("val");

            LoadAccountsByActivityID(pRowID, pAccountID);
        }
        else if (pControlID == "Currency") {
            $("#cellExchangeRate" + pRowID).addClass("hide"); $("#txtExchangeRate" + pRowID).removeClass("hide");
            $("#cellLocalDebit" + pRowID).addClass("hide"); $("#txtLocalDebit" + pRowID).removeClass("hide");
            $("#cellLocalCredit" + pRowID).addClass("hide"); $("#txtLocalCredit" + pRowID).removeClass("hide");
        }
    }
}
function Details_EnterEditModeForTxt(pControlID, pRowID) {
    debugger;
    if ($("#hf_CanEdit").val() == "1") {
        //var tr = $("#tblDetails tr[ID='" + pRowID + "']");
        //var pItemID = $(tr).find("td." + pControlID + "ID").text();
        $("#cell" + pControlID + pRowID).addClass("hide"); $("#txt" + pControlID + pRowID).removeClass("hide");
        if (pControlID == "ExchangeRate") {
            $("#cellLocalDebit" + pRowID).addClass("hide"); $("#txtLocalDebit" + pRowID).removeClass("hide");
            $("#cellLocalCredit" + pRowID).addClass("hide"); $("#txtLocalCredit" + pRowID).removeClass("hide");
        }
        if (pControlID == "Debit" || pControlID == "Credit") {
            $("#cellLocalDebit" + pRowID).addClass("hide"); $("#txtLocalDebit" + pRowID).removeClass("hide");
            $("#cellLocalCredit" + pRowID).addClass("hide"); $("#txtLocalCredit" + pRowID).removeClass("hide");
            $("#cellDebit" + pRowID).addClass("hide"); $("#txtDebit" + pRowID).removeClass("hide");
            $("#cellCredit" + pRowID).addClass("hide"); $("#txtCredit" + pRowID).removeClass("hide");
        }
    }
}
function Details_NewRow() {
    debugger;
    
    ++maxDetailsIDInTable;
    var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'></span>";
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);
    var tr = "";
    tr += "<tr ID='" + maxDetailsIDInTable + "'>";
    tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxDetailsIDInTable + "' checked='checked' /></td>";
    tr += "     <td class='DetailsID'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";

    tr += "     <td class='Activity_ID" + (IsActivityOption ? " " : " hide ") +"' style='width:15%;' val=''><select id='slActivity" + maxDetailsIDInTable + "' style='width:112%;' class='controlStyle selectActivityID' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);ClearCostCenter(" + maxDetailsIDInTable + ",0);' data-required='false'>" + "<option value=0></option>" + "</select></td>";

    tr += "     <td class='Account_ID' style='width:20%;' val=''><select id='slAccount" + maxDetailsIDInTable + "' style='width:112%;' class='selectAccountID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id); Details_AccountChanged(" + maxDetailsIDInTable + ");' data-required='true'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='SubAccount_ID' style='width:20%;' val=''><select id='slSubAccount" + maxDetailsIDInTable + "' style='width:112%;' class='selectSubAccountID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='Branch_ID' style='width:15%;' val=''><select id='slBranch" + maxDetailsIDInTable + "' style='width:112%;' class='controlStyle selectBranchID' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='Operation_ID' style='width:15%;' val=''><select id='slOperation" + maxDetailsIDInTable + "' style='width:112%;' class='controlStyle selectOperationID' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='CostCenter_ID' style='width:15%;' val=''><select id='slCostCenter" + maxDetailsIDInTable + "' style='width:112%;' class='controlStyle selectcostcenterID' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='Debit' style='width:7%;'><input type='text' style='width:112%;font-size:90%;' id='txtDebit" + maxDetailsIDInTable + "' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);Details_ClearDebitOrCredit(id);' onchange='Details_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
    tr += "     <td class='Credit' style='width:7%;'><input type='text' style='width:112%;font-size:90%;' id='txtCredit" + maxDetailsIDInTable + "' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);Details_ClearDebitOrCredit(id);' onchange='Details_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
    tr += "     <td class='Currency_ID' val='" + $("#hDefaultCurrencyID").val() + "'><select id='slCurrency" + maxDetailsIDInTable + "' style='width:auto;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id); Details_CurrencyChanged(" + '"slCurrency","txtExchangeRate",' + maxDetailsIDInTable + ");' data-required='true'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='ExchangeRate' style='width:1%;'><input type='text' style='width:112%;font-size:90%;' " + ($("#slCurrency" + (maxDetailsIDInTable - 1)).val() == undefined || $("#slCurrency" + (maxDetailsIDInTable - 1)).val() == $("#hDefaultCurrencyID").val() ? "disabled" : "") + " id='txtExchangeRate" + maxDetailsIDInTable + "' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);Details_CalculateTotals();' onchange='Details_SetIsRowChanged(id);' data-required='true' value='" + ($("#txtExchangeRate" + (maxDetailsIDInTable - 1)).val() == undefined ? 1 : $("#txtExchangeRate" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
    tr += "     <td class='LocalDebit' style='width:9%;'><input type='text' style='width:112%;font-size:90%;' disabled id='txtLocalDebit" + maxDetailsIDInTable + "' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='Details_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
    tr += "     <td class='LocalCredit' style='width:9%;'><input type='text' style='width:112%;font-size:90%;' disabled id='txtLocalCredit" + maxDetailsIDInTable + "' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='Details_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
    tr += "     <td class='Description' style='width:12%;'><input type='text' style='width:112%;font-size:90%;text-transform:uppercase;' id='txtDescription" + maxDetailsIDInTable + "' class='form-control controlStyle'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false' value='" + ($("#txtDescription" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtDescription" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
    tr += "      <td class='IsDocumented' style='width:1%;'><input id='cbIsDocumented" + maxDetailsIDInTable + "' type='checkbox' value=''></td>";
    tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + maxDetailsIDInTable + "' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";
    tr += "     <td class='hide'>"
                        //+ "<a href='#'  onclick='Pricing_CopyRow(" + maxDetailsIDInTable + ");' " + copyControlsText + "</a>"
                  + "</td>";
    tr += "</tr>";
    //if ($("#tblDetails tbody tr").length > 0)
    //    $(tr).insertBefore('#tblDetails > tbody > tr:first');
    //else
    $("#tblDetails tbody").prepend(tr);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $("#tblDetails tbody tr[ID=" + maxDetailsIDInTable + "]").reverseChildren();
    /***************************Filling row controls******************************/

    //  if (pDefaults.UnEditableCompanyName != "FAI") {
    // Start Auto Filter
    $("#slAccount" + maxDetailsIDInTable).css({ "width": "100%" }).select2();
    $("#slSubAccount" + maxDetailsIDInTable).css({ "width": "100%" }).select2();
    //  }

    //$("#slCurrency" + maxDetailsIDInTable).html($("#slCurrencyDetails").html()); //to get the exchangerate
    $("#slCurrency" + maxDetailsIDInTable).html($("#hReadySlCurrencies").html());
    $("#slCurrency" + maxDetailsIDInTable).val($("#slCurrency" + (maxDetailsIDInTable - 1)).val() == undefined ? $("#hDefaultCurrencyID").val() : $("#slCurrency" + (maxDetailsIDInTable - 1)).val());


    debugger;
    $("#slActivity" + maxDetailsIDInTable).html($("#slActivity").html());
    $("#slActivity" + maxDetailsIDInTable).val($("#slActivity" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slActivity" + (maxDetailsIDInTable - 1)).val());

    var activityIDSelector = "#slActivity" + maxDetailsIDInTable;

    if (!IsActivityOption)
        $("#slAccount" + maxDetailsIDInTable).html($("#slAccount").html());
    else {
        LoadAccountsByActivityID(maxDetailsIDInTable, $("#slAccount" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slAccount" + (maxDetailsIDInTable - 1)).val());
    }

    $("#slAccount" + maxDetailsIDInTable).val($("#slAccount" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slAccount" + (maxDetailsIDInTable - 1)).val());

    //if (pDefaults.UnEditableCompanyName == "ERP") {
    //Start Auto Filter

    $("div[tabindex='-1']").removeAttr('tabindex');
    $("#slAccount" + maxDetailsIDInTable).trigger("change");

    //End Auto Filter
    //  }

    $("#slSubAccount" + maxDetailsIDInTable).html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");
    $("#slSubAccount" + maxDetailsIDInTable).html($("#slSubAccount" + (maxDetailsIDInTable - 1)).html());
    $("#slSubAccount" + maxDetailsIDInTable).val($("#slSubAccount" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slSubAccount" + (maxDetailsIDInTable - 1)).val());


    $("#slSubAccount" + maxDetailsIDInTable).trigger("change");

    $("#slCostCenter" + maxDetailsIDInTable).html($("#slCostCenter").html());
    $("#slCostCenter" + maxDetailsIDInTable).val($("#slCostCenter" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slCostCenter" + (maxDetailsIDInTable - 1)).val());
    $("#slCostCenter" + maxDetailsIDInTable).css({ "width": "100%" }).select2();



    if (IsActivityOption)
    Select2OnlineSearch(("slCostCenter" + maxDetailsIDInTable), "/api/CostCenters/LoadCostCenterByActivity", function (params) {
        var query = {
            pSearchWord: params.term.trim()
            , pOrderBy: "Name, Code"
            , pActivityID: $(activityIDSelector).val()
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
    }, 3, 2000);
    
    $("#slCostCenter" + maxDetailsIDInTable).trigger("change");
    $("#slBranch" + maxDetailsIDInTable).html($("#slBranch").html());
    $("#slBranch" + maxDetailsIDInTable).val($("#slBranch" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slBranch" + (maxDetailsIDInTable - 1)).val());

    $("#slOperation" + maxDetailsIDInTable).html($("#slOperation").html());
    $("#slOperation" + maxDetailsIDInTable).val($("#slOperation" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slOperation" + (maxDetailsIDInTable - 1)).val());

    Details_FillSlSubAccount("slSubAccount" + maxDetailsIDInTable, $("#slSubAccount" + maxDetailsIDInTable).val(), $("#slAccount" + maxDetailsIDInTable).val());

    if ($("#hDefaultUnEditableCompanyName").val() == "SAF") {
        $(".isDepartement").removeClass("hide");
        $("#isDepartement").removeClass('hide');

        $(".isBranch").addClass("hide");
        $("#isBranch").addClass('hide');
    }
    else {
        $(".isBranch").removeClass("hide");
        $("#isBranch").removeClass('hide');

        $(".isDepartement").addClass("hide");
        $("#isDepartement").addClass('hide');
    }
    //SetDatepickerFormat();
    BindAllCheckboxonTable("tblDetails", "DetailsID", "cbDetailsDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    /***********************EOF Filling row controls******************************/
}
function Details_DeleteList() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblDetails', 'Delete');
    if (pSelectedIDs != "") {
        for (var i = 0; i < pSelectedIDs.split(",").length; i++)
            $("#tblDetails tbody tr[ID=" + pSelectedIDs.split(",")[i] + "]").remove();
        Details_CalculateTotals();
    }
}
function Details_SetIsRowChanged(pControlID) {
    debugger;
    var ChangedRowID = $("#" + pControlID).parent().parent().attr("ID");
    $("#SelectedIDsToUpdate" + ChangedRowID).prop("checked", true);
}
function ClearCostCenter(pRowID,pAccountID) {
    debugger;
    $("#slCostCenter" + pRowID).html('');
    $("#slCostCenter" + pRowID).val('');
    LoadAccountsByActivityID(pRowID, pAccountID);


}
function LoadAccountsByActivityID(pRowID, pAccountID) {
    FadePageCover(true);
    var pSlName = 'slAccount' + pRowID;

    CallGETFunctionWithParameters("/api/ChartOfAccounts/LoadAll"
        , {
            pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pWhereClause: " WHERE IsMain = 0 And ID in (select AA.AccountID from Users_Activities UA join A_Accounts_Activities AA on AA.ActivityCostCenterID = UA.ActivityCostCenterID where UA.UserID= " + pLoggedUser.ID + " And AA.ActivityCostCenterID=" + $('#slActivity' + pRowID).val() +")"
            , pOrderBy: " Name, Code"
        }
        , function (pData) {
            var pAccounts = pData[0];
            FillListFromObject_ERP(pAccountID, OptionNameCodeAccount == "true" ? 4 : 3 /*pCodeOrName*/, TranslateString("SelectFromMenu"), pSlName, pAccounts, null);
            FadePageCover(false);
        }
        , null);
}
function Details_FillSlSubAccount(pSlName, pSubAccountID, pAccountID) {
    debugger;
    FadePageCover(true);

    CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
        , {
            pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + pAccountID
            , pOrderBy: "Name"
        }
        , function (pData) {
            FillListFromObject_ERP(pSubAccountID, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), pSlName, pData[0], null);
            //   if (pDefaults.UnEditableCompanyName != "FAI") {
            //Start Auto Filter
            $("#" + pSlName).css({ "width": "100%" }).select2();
            $("div[tabindex='-1']").removeAttr('tabindex');
            $("#" + pSlName).trigger("change");
            //  End Auto Filter
            //    }
            FadePageCover(false);
        }
        , null);
}
function Details_AccountChanged(pRowID) {
    debugger;
    $("#slSubAccount" + pRowID).val(0);

    Details_FillSlSubAccount("slSubAccount" + pRowID, 0, $("#slAccount" + pRowID).val());
}
function Details_CurrencyChanged(pCurrencyControlID, pExchangeRateControlID, pRowID) {
    debugger;
    FadePageCover(true);
    GetListCurrencyWithCodeAndExchangeRateAttr_ERP(null, "/api/Currencies/LoadCurrencyDetails"
        , null/*1st Row*/, "slCurrencyDetails"
        , ("WHERE '" + GetDateWithFormatyyyyMMdd($("#txtJVDate").val()) + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
            + " AND '" + GetDateWithFormatyyyyMMdd($("#txtJVDate").val()) + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
            + " ORDER BY CODE"
          )
        , function () {
            if ($("#" + pCurrencyControlID + pRowID).val() == $("#hDefaultCurrencyID").val()) {
                $("#" + pExchangeRateControlID + pRowID).attr("disabled", "disabled");
                $("#" + pExchangeRateControlID + pRowID).val(1);
            }
            else {
                $("#" + pExchangeRateControlID + pRowID).removeAttr("disabled");
                $("#slCurrencyDetails").val($("#" + pCurrencyControlID + pRowID).val());
                if ($("#slCurrencyDetails option:selected").attr("ExchangeRate") == undefined)
                    $("#" + pExchangeRateControlID + pRowID).val("");
                else
                    $("#" + pExchangeRateControlID + pRowID).val($("#slCurrencyDetails option:selected").attr("ExchangeRate"));
            }
            var pExchangeRate = ($("#" + pExchangeRateControlID + pRowID).val() == "" ? 0 : $("#" + pExchangeRateControlID + pRowID).val());
            var pCredit = ($("#txtCredit" + pRowID).val() == "" ? 0 : $("#txtCredit" + pRowID).val());
            var pDebit = ($("#txtDebit" + pRowID).val() == "" ? 0 : $("#txtDebit" + pRowID).val());
            $("#txtLocalCredit" + pRowID).val((pCredit * pExchangeRate).toFixed(2));
            $("#txtLocalDebit" + pRowID).val((pDebit * pExchangeRate).toFixed(2));
            Details_CalculateTotals();
            FadePageCover(false);
        });

}
function Details_ClearDebitOrCredit(pCallingControlID) {
    debugger;
    if ($("#" + pCallingControlID).val() != "" && parseFloat($("#" + pCallingControlID).val()) != 0)
        if (pCallingControlID.search("Credit") > -1) {
            $("#" + pCallingControlID.replace("Credit", "Debit")).val(0);
        }
        else {
            $("#" + pCallingControlID.replace("Debit", "Credit")).val(0);
        }
    Details_CalculateTotals();
}
function Details_CalculateTotals() {
    debugger;
    var pTotalLocalCredit = 0;
    var pTotalLocalDebit = 0;
    $("#tblDetails tbody tr").each(function (i, item) {
        if ($("#txtExchangeRate" + item.id).val() == 0 || $("#txtExchangeRate" + item.id).val() == "")
            $("#txtExchangeRate" + item.id).val(0);
        var pLocalCredit = (($("#txtCredit" + item.id).val() == "" ? 0 : $("#txtCredit" + item.id).val()) * $("#txtExchangeRate" + item.id).val()).toFixed(2);
        var pLocalDebit = (($("#txtDebit" + item.id).val() == "" ? 0 : $("#txtDebit" + item.id).val()) * $("#txtExchangeRate" + item.id).val()).toFixed(2);
        //I set the LocalCredit&Debit for case i called from exchange rate
        $("#txtLocalCredit" + item.id).val(pLocalCredit);
        $("#txtLocalDebit" + item.id).val(pLocalDebit);
        pTotalLocalCredit = (parseFloat(pTotalLocalCredit) + parseFloat(pLocalCredit)).toFixed(2);
        pTotalLocalDebit = (parseFloat(pTotalLocalDebit) + parseFloat(pLocalDebit)).toFixed(2);
    });
    $("#lblDebitTotal").html("<span> : </span><span>" + pTotalLocalDebit + "</span>");
    $("#lblCreditTotal").html("<span> : </span><span>" + pTotalLocalCredit + "</span>");
    $("#lblDebitCreditDifference").html("<span> : </span><span>" + (parseFloat(pTotalLocalDebit) - parseFloat(pTotalLocalCredit)).toFixed(2) + "</span>");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblDebitTotal").reverseChildren();
        $("#lblCreditTotal").reverseChildren();
        $("#lblDebitCreditDifference").reverseChildren();
    }
}
function Details_GetExchangeRateFromLocal() {
    debugger;
    var pTotalLocalCredit = 0;
    var pTotalLocalDebit = 0;
    $("#tblDetails tbody tr").each(function (i, item) {
        if ($("#txtExchangeRate" + item.id).val() == 0 || $("#txtExchangeRate" + item.id).val() == "")
            $("#txtExchangeRate" + item.id).val(0);

        var pExchangeRate = 0;
        if ($("#txtCredit" + item.id).val() != "" && $("#txtCredit" + item.id).val() != "0" &&
            $("#txtLocalCredit" + item.id).val() != "" && $("#txtLocalCredit" + item.id).val() != "0") {
            pExchangeRate = parseFloat($("#txtLocalCredit" + item.id).val()).toFixed(2) / parseFloat($("#txtCredit" + item.id).val()).toFixed(2);
        }

        if ($("#txtDebit" + item.id).val() != "" && $("#txtDebit" + item.id).val() != "0" &&
            $("#txtLocalDebit" + item.id).val() != "" && $("#txtLocalDebit" + item.id).val() != "0") {
            pExchangeRate = parseFloat($("#txtLocalDebit" + item.id).val()).toFixed(2) / parseFloat($("#txtDebit" + item.id).val()).toFixed(2);
        }

        var pLocalCredit = ($("#txtCredit" + item.id).val() == "" ? 0 : $("#txtCredit" + item.id).val())
            * $("#txtExchangeRate" + item.id).val();
        var pLocalDebit = ($("#txtDebit" + item.id).val() == "" ? 0 : $("#txtDebit" + item.id).val())
            * $("#txtExchangeRate" + item.id).val();
        //I set the LocalCredit&Debit for case i called from exchange rate
        $("#txtLocalCredit" + item.id).val(pLocalCredit.toFixed(2));
        $("#txtLocalDebit" + item.id).val(pLocalDebit.toFixed(2));
        pTotalLocalCredit = (parseFloat(pTotalLocalCredit) + parseFloat(pLocalCredit)).toFixed(2);
        pTotalLocalDebit = (parseFloat(pTotalLocalDebit) + parseFloat(pLocalDebit)).toFixed(2);
    });
    $("#lblDebitTotal").html("<span> : </span><span>" + pTotalLocalDebit + "</span>");
    $("#lblCreditTotal").html("<span> : </span><span>" + pTotalLocalCredit + "</span>");
    $("#lblDebitCreditDifference").html("<span> : </span><span>" + (parseFloat(pTotalLocalDebit) - parseFloat(pTotalLocalCredit)).toFixed(2) + "</span>");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblDebitTotal").reverseChildren();
        $("#lblCreditTotal").reverseChildren();
        $("#lblDebitCreditDifference").reverseChildren();
    }
}
function Details_txtRemarksChanged() {
    debugger;
    if ($('#cbRemarks').prop('checked') == true) {
        $("#tblDetails tbody tr").each(function (i, item) {
            $("#txtDescription" + item.id).val($("#txtRemarksHeader").val());
            $("#cellDescription" + item.id).text($("#txtRemarksHeader").val());
        });
    }
}
function JVsPrinting() {
    debugger;
    var pFromDate = ConvertDateFormat($("#txtFromDate").val());
    var pToDate = ConvertDateFormat($("#txtToDate").val());



    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("FromDate");
    arr_Keys.push("ToDate");

    arr_Values.push(pFromDate);
    arr_Values.push(pToDate);

    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Values: arr_Values
               , pTitle: "Journal Voucher"
                , pReportName: "Rep_JournalVouchersPrint"
            };
    }
    else {
        var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Values: arr_Values
               , pTitle: "القيود اليومية"
                , pReportName: "Rep_JournalVouchersPrint_ar"
            };
    }


    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '' + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;

}

function JVsPrintingSelected() {
    debugger;
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat() + ' ' + getTime();
    var pID = $("#hID").val();
    var listOfIDs = "";
    var pIsTotal = $('#cbJvsTotals').prop('checked');

    $('#tblJournalVouchers td').find('input[Selectedjv="Selectedjv"]:checked').each(function () {
        listOfIDs += ((listOfIDs == "") ? "" : ",") + ($(this).attr('value'));
    });

    if (listOfIDs == "") {
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            swal("Sorry", "Select one jv at least.");
        }
        else {
            swal("معذرة", "بجل اختيار قيد واحد على الاقل.");
        }
    }
    else {
        var pParametersWithValues = {
            pJournalVoucherIDsForPrintingSelected: listOfIDs
    , pIsTotal: pIsTotal
        };
        FadePageCover(true);
        if (pIsTotal) {
            CallGETFunctionWithParameters("/api/JournalVouchers/GetJournalVoucherDataForPrintingSelected", pParametersWithValues
        , function (pData) {
            if (pData != null && pData[0]) {

                debugger;
                var pJVHeader = JSON.parse(pData[1]); // its 1 row
                var pJVItems = JSON.parse(pData[3]);



                var ReportHTML = '';
                if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                    ReportHTML += '<html>';
                }
                else {
                    ReportHTML += '<html dir="rtl">';
                }
                ReportHTML += '     <head><title>' + TranslateString("PrintJV") + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                //if ($("#cbPrintLogo").prop("checked"))
                //    ReportHTML += '     <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="header"/></div>';
                //else
                ReportHTML += '     <div class="row text-center"><br><br><br><br><br><br><br></div>';

                ReportHTML += '     <div class="col-xs-12 text-center text-ul m-t-n"><h3>  ' + TranslateString("JournalVouchersTotals") + '</h3></div> '; //addClass "text-ul" to underline
                ReportHTML += '     </ br>';

                ReportHTML += '     <br>';
                ReportHTML += '     <body>';

                ReportHTML += '         <table id="tblPrintJVItems" class="table table-striped b-t b-light text-sm table-bordered m-t-lg">';
                ReportHTML += '             <thead>';
                ReportHTML += '                 <tr>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Account") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("SubAccount") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("CostCenter") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Debit") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Credit") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Cur") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Ex.Rate") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("LocalDebit") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("LocalCredit") + '</th>';;
                ReportHTML += '                     <th class="text-center">' + TranslateString("Description") + '</th>';
                ReportHTML += '                 </tr>';
                ReportHTML += '             </thead>';
                ReportHTML += '             <tbody>';
                var Counter = 0;
                $.each(pJVItems, function (i, item) {
                    debugger;
                    ReportHTML += '                 <tr style="font-size:95%;">';
                    ReportHTML += '                     <td class="text-center">' + (item.AccountName == 0 ? '' : item.AccountName) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.subAccountName == 0 ? '' : item.subAccountName) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.CostCenter == 0 ? "" : item.CostCenter) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.Debit == 0 ? "" : item.Debit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.Credit == 0 ? "" : item.Credit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + item.Code + '</td>';
                    ReportHTML += '                     <td class="text-center">' + item.ExchangeRate + '</td>';
                    ReportHTML += '                     <td class="LocalDebit">' + (item.LocalDebit == 0 ? "" : item.LocalDebit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="LocalCredit">' + (item.LocalCredit == 0 ? "" : item.LocalCredit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.Description == 0 ? '' : item.Description.replace(/\n/g, "<br />")) + '</td>';

                    ReportHTML += '                 </tr>';
                });

                ReportHTML += '             </tbody>';
                ReportHTML += '         </table>';
                ReportHTML += '     </body>';

                $("#hExportedTable").html(ReportHTML);

                var pRowTotalsHTML = "";
                var pTotalLocalDebit = GetColumnSum("tblPrintJVItems", "LocalDebit");
                var pTotalLocalCredit = GetColumnSum("tblPrintJVItems", "LocalCredit");

                pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
                pRowTotalsHTML += '                     <td class="" colspan="7" style="text-align:center;"><b><u>' + TranslateString("Total") + ':</u></b> &emsp;' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                            </tr>';


                $("#tblPrintJVItems" + " tbody").append(pRowTotalsHTML);


                ReportHTML = "";
                if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                    ReportHTML += '<html>';
                }
                else {
                    ReportHTML += '<html dir="rtl">';
                }
                ReportHTML += '     <head><title>' + TranslateString("PrintJV") + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                //if ($("#cbPrintLogo").prop("checked"))
                //    ReportHTML += '     <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="header"/></div>';
                //else
                ReportHTML += '     <div class="row text-center"><br><br><br><br><br><br><br></div>';

                ReportHTML += '     <div class="col-xs-12 text-center text-ul m-t-n"><h3> ' + TranslateString("JournalVouchersTotals") + '</h3></div> '; //addClass "text-ul" to underline
                ReportHTML += '     </ br>';

                ReportHTML += '     <br>';
                ReportHTML += '     <body>';
                ReportHTML += '             <table id="tblPrintJVItems' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblPrintJVItems").html();
                ReportHTML += '             </table>';

                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:relative; bottom:0;  padding-top: 10px;">';
                ReportHTML += '                 <div class="col-xs-4  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("PreparedBy") + '</br> </br>' + '' + '</div></b></div>';
                ReportHTML += '                 <div class="col-xs-4  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("ReviewedBy") + '</div></div></div>';
                ReportHTML += '                 <div class="col-xs-4  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("ApprovedBy") + '</div></b></div>';
                ReportHTML += '     <div class="col-xs-12 "><b>' + TranslateString("PrintedOn") + ' :</b> ' + FormattedTodaysDate + '</div>';
                ReportHTML += '     </footer>';
                ReportHTML += '</html>';


                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
            else {
                if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                    swal("Sorry", "Connection failed. Please try again.");
                }
                else {
                    swal("معذرة", "فشل الإتصال، حاول مرة أخري.");
                }
            }
            FadePageCover(false);
        }
        , null);
        }
        else {
            CallGETFunctionWithParameters("/api/JournalVouchers/GetJournalVoucherDataForPrintingSelected", pParametersWithValues
                , function (pData) {
                    if (pData[0]) {
                        debugger;
                        var pJVsHeader = JSON.parse(pData[1]); // its 1 row
                        var pJVsItems = JSON.parse(pData[2]);

                        var cnt = 0;
                        var ReportHTML = '';
                        for (cnt = 0; cnt < pJVsHeader.length; cnt++) {
                            var pJVHeader = pJVsHeader[cnt]; // its 1 row
                            var pJVItems = $(pJVsItems).filter(function (i, n) {
                                return n.JV_ID == pJVsHeader[cnt].JV_ID;
                            });

                            if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                                ReportHTML += '<html>';
                            }
                            else {
                                ReportHTML += '<html dir="rtl">';
                            }
                            ReportHTML += '     <head><title>' + TranslateString("PrintJV") + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';

                            ReportHTML += '     <div class="row text-center"><br><br><br><br><br><br><br></div>';
                            ReportHTML += '     <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + TranslateString("JournalVouchers") + ' </h3></div> '; //addClass "text-ul" to underline
                            ReportHTML += '     <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pJVHeader.JVNo + '</h3></div> '; //addClass "text-ul" to underline
                            ReportHTML += '     </ br>';

                            ReportHTML += '     <div class="col-xs-6 m-l-n ">' + '<b><span class="float-left">' + TranslateString("JvNo") + '      : ' + pJVHeader.JVNo + '</span></b></div>';
                            ReportHTML += '     <div class="col-xs-6 m-l-n ">' + '<b><span class="float-left">' + TranslateString("UserName") + '  : ' + pJVHeader.UserName + '</span></b></div>';
                            ReportHTML += '     <div class="col-xs-6 m-l-n ">' + '<b><span class="float-left">' + TranslateString("JVDate") + '     : ' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pJVHeader.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pJVHeader.JVDate))) + '</span></b></div>';
                            ReportHTML += '     <div class="col-xs-6 m-l-n ">' + '<b><span class="float-left">' + TranslateString("JournalType") + ': ' + pJVHeader.Journal_Name + '</span></b></div>';
                            ReportHTML += '     <div class="col-xs-6 m-l-n ">' + '<b><span class="float-left">' + TranslateString("JVType") + '     : ' + pJVHeader.JVType_Name + '</span></b></div>';
                            ReportHTML += '     <div class="col-xs-6 m-l-n ">' + '<b><span class="float-left">' + TranslateString("ReceiptNo") + '  : ' + pJVHeader.ReceiptNo + '</span></b></div>';
                            ReportHTML += '     <div class="col-xs-12 m-l-n ">' + '<b><span class="float-left">' + TranslateString("Notes") + '     : ' + (pJVHeader.RemarksHeader == 0 ? "" : pJVHeader.RemarksHeader) + '</span></b></div>';

                            ReportHTML += '     <br>';
                            ReportHTML += '     <body>';

                            ReportHTML += '         <table id="tblPrintJVItems" class="table table-striped b-t b-light text-sm table-bordered m-t-lg">';
                            ReportHTML += '             <thead>';
                            ReportHTML += '                 <tr>';
                            ReportHTML += '                     <th class="text-center">' + TranslateString("Account") + '</th>';
                            ReportHTML += '                     <th class="text-center">' + TranslateString("SubAccount") + '</th>';
                            ReportHTML += '                     <th class="text-center">' + TranslateString("CostCenter") + '</th>';
                            ReportHTML += '                     <th class="text-center">' + TranslateString("Debit") + '</th>';
                            ReportHTML += '                     <th class="text-center">' + TranslateString("Credit") + '</th>';
                            ReportHTML += '                     <th class="text-center">' + TranslateString("Cur") + '</th>';
                            ReportHTML += '                     <th class="text-center">' + TranslateString("Ex.Rate") + '</th>';
                            ReportHTML += '                     <th class="text-center">' + TranslateString("LocalDebit") + '</th>';
                            ReportHTML += '                     <th class="text-center">' + TranslateString("LocalCredit") + '</th>';
                            ReportHTML += '                     <th class="text-center">' + TranslateString("Description") + '</th>';
                            ReportHTML += '                     <th class="text-center">' + TranslateString("Documented") + '</th>';
                            ReportHTML += '                 </tr>';
                            ReportHTML += '             </thead>';
                            ReportHTML += '             <tbody>';
                            var Counter = 0;
                            $.each(pJVItems, function (i, item) {
                                debugger;
                                ReportHTML += '                 <tr style="font-size:95%;">';
                                ReportHTML += '                     <td class="text-center">' + (item.AccountName == 0 ? '' : item.AccountName) + '</td>';
                                ReportHTML += '                     <td class="text-center">' + (item.subAccountName == 0 ? '' : item.subAccountName) + '</td>';
                                ReportHTML += '                     <td class="text-center">' + (item.CostCenter == 0 ? "" : item.CostCenter) + '</td>';
                                ReportHTML += '                     <td class="text-center">' + (item.Debit == 0 ? "" : item.Debit.toFixed(2)) + '</td>';
                                ReportHTML += '                     <td class="text-center">' + (item.Credit == 0 ? "" : item.Credit.toFixed(2)) + '</td>';
                                ReportHTML += '                     <td class="text-center">' + item.Code + '</td>';
                                ReportHTML += '                     <td class="text-center">' + item.ExchangeRate + '</td>';
                                ReportHTML += '                     <td class="text-center">' + (item.LocalDebit == 0 ? "" : item.LocalDebit.toFixed(2)) + '</td>';
                                ReportHTML += '                     <td class="text-center">' + (item.LocalCredit == 0 ? "" : item.LocalCredit.toFixed(2)) + '</td>';
                                ReportHTML += '                     <td class="text-center">' + (item.Description == 0 ? '' : item.Description.replace(/\n/g, "<br />")) + '</td>';
                                ReportHTML += '                     <td class="text-center">' + '<input  disabled="disabled" type="checkbox" ' + (item.isDocumented == true ? "checked" : "") + '></td>';
                                ReportHTML += '                 </tr>';
                            });
                            ReportHTML += '             </tbody>';
                            ReportHTML += '         </table>';
                            ReportHTML += '     </body>';


                            ReportHTML += '<div class="col-xs-6  text-right">' + '<b>  ' + TranslateString("Total") + ' : </b>' + pJVHeader.TotalDebit + ' ' + $("#hDefaultCurrencyCode").val() + '</div>';
                            ReportHTML += '<div class="col-xs-6 text-left" style=" padding-bottom: 10px;">' + toWords(pJVHeader.TotalDebit) + '</div>';

                            ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:relative; bottom:0;  padding-top: 10px;">';
                            ReportHTML += '                 <div class="col-xs-4  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("PreparedBy") + '</br> </br>' + (pJVHeader.UserName != 0 ? pJVHeader.UserName : '') + '</div></b></div>';
                            ReportHTML += '                 <div class="col-xs-4  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("ReviewedBy") + '</div></div></div>';
                            ReportHTML += '                 <div class="col-xs-4  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("ApprovedBy") + '</div></b></div>';
                            ReportHTML += '     <div class="col-xs-12 "><b>' + TranslateString("PrintedOn") + ' :</b> ' + FormattedTodaysDate + '</div>';
                            ReportHTML += '     </footer>';
                            ReportHTML += '         <div class="break"></div>';
                            ReportHTML += '</html>';
                            //if (cnt != (pJVsHeader.length - 1))

                                
                        }

                            var mywindow = window.open('', '_blank');
                            mywindow.document.write(ReportHTML);
                            mywindow.document.close();

                    }
                    else {
                        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                            swal("Sorry", "Connection failed. Please try again.");
                        }
                        else {
                            swal("معذرة", "فشل الإتصال، حاول مرة أخري.");
                        }
                    }
                    FadePageCover(false);
                }
                , null);
        }

    }


}

function UploadExcel() {
    debugger;

    //  else {
    // Checking whether FormData is available in browser
    if (window.FormData !== undefined) {

        FadePageCover(true);

        var fileUpload = $("#excelfile").get(0);
        //var fileUpload = $("#FileUpload1").get(0);
        var files = fileUpload.files;

        // Create FormData object
        var fileData = new FormData();

        // Looping over all files and add it to FormData object
        for (var i = 0; i < files.length; i++) {
            fileData.append(files[i].name, files[i]);
        }

        // Adding one more key to FormData object
        fileData.append('pJournal_ID', $("#slJournalType").val());
        fileData.append('pJVType_ID', $("#slJVType").val());
        fileData.append('pReceiptNo', ($("#txtReceiptNo").val().trim() == "" ? "0" : $("#txtReceiptNo").val().trim().toUpperCase()));
        fileData.append('pRemarksHeader', ($("#txtRemarksHeader").val() == "" ? "0" : $("#txtRemarksHeader").val().trim().toUpperCase()));
        fileData.append('pJVDate', ConvertDateFormat($("#txtJVDate").val()));

        var pParametersWithValues = {
            //HeaderData
            pID: ($("#hID").val() == "" ? 0 : $("#hID").val())
            , pJVNo: $("#txtJVNo").val().trim().toUpperCase()
            , pJVDate: ConvertDateFormat($("#txtJVDate").val())
            , pTotalDebit: 0.0
            , pTotalCredit: 0.0
            , pJournal_ID: $("#slJournalType").val()
            , pJVType_ID: $("#slJVType").val()
            , pReceiptNo: ($("#txtReceiptNo").val().trim() == "" ? "0" : $("#txtReceiptNo").val().trim().toUpperCase())
            , pRemarksHeader: ($("#txtRemarksHeader").val() == "" ? "0" : $("#txtRemarksHeader").val().trim().toUpperCase())
            , pDeleted: false
            , pPosted: false
            , File: fileData
        };


        //,JSON.stringify(pParametersWithValues)
        $.ajax({
            url: '/UploadExcel/UploadFiles',
            type: "POST",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            data: fileData,
            success: function (result) {
                if (result != 'File Uploaded Successfully!') {
                    FadePageCover(false);
                    $('#excelfile').val("");
                    $('#tblExcel').html('');
                    swal(strSorry, result);
                }
                else {
                    //alert(result);
                    jQuery("#I_ExcelModal").modal("hide");
                    jQuery("#JournalVouchersModal").modal("hide");
                    ClearAll("#JournalVouchersModal");
                    ClearAll("#I_ExcelModal");
                    $('#excelfile').val("");
                    $('#tblExcel').html('');

                    JournalVouchers_LoadingWithPaging();
                    swal("Success", "Saved successfully.");
                }

            },
            error: function (err) {
                // alert(err.statusText);
                swal(strSorry, err.statusText);
            }
        });
    } else {
        alert("FormData is not supported.");
    }
    // }


}
function ValidateType() {
    if ($("#slJournalType").val() == "0")
        swal("Sorry", "Select Journal Type");

    else if ($("#slJVType").val() == "0")
        swal("Sorry", "Select JV Type");
    else
        jQuery("#I_ExcelModal").modal("show");
}

function UploadFiles(pID) {
    debugger;
    $("#hID").val(pID);
    ClearAll("#UploadFilesModal");
    jQuery("#UploadFilesModal").modal("show");
    Vouchers_GeneralUpload_Initialise();

}
function Vouchers_GeneralUpload_Initialise() {
    debugger;
    glbGeneralUploadModalName = ""; //if the upload is in a modal then is not opened
    glbGeneralUploadTableName = "tblUploadedFiles_JournalVouchers";
    //glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#txtName").val().trim();
    glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#hID").val();

    glbGeneralUploadPath = "/DocsInFiles//JournalVouchers//";
    glbGeneralUploadRelativePath = "~/DocsInFiles/JournalVouchers/";
    glbGeneralUploadBtnUploadName = "inputFileUpload_JournalVouchers";
    glbTblTHSelectAllTagName = "HeaderDeleteUploadedFiles_JournalVouchers";
    glbTblInputSelectAllInputName = "cb-CheckAll-UploadedFiles_JournalVouchers";

    if (glbGeneralUploadFolderName != "")
        GeneralUpload_FillControls();
}

function Dynamic_Export() {
    debugger;

    if ($("#txtExportFromDate").val() == '' || $("#txtExportToDate").val() == '')
        swal("Sorry", "Please, select Export Date.");
    else {
             FadePageCover(true);
            var pParametersWithValues = {
                pExportFromDate: $("#txtExportFromDate").val()
                , pExportToDate: $("#txtExportToDate").val()

            };
            CallGETFunctionWithParameters("/api/JournalVouchers/GetDynamicExportData", pParametersWithValues
                , function (pData) {
                    ExportToExcelCSV(pData);      
                }
                , null);
    }
}
function ExportToExcelCSV(pData) {
    var pFileName = "DynamicExcel";
    var pAccountLedger = JSON.parse(pData[0]);
    ExportToExcelDynamic(pAccountLedger, "", pFileName, "");
    FadePageCover(false);
}
function ExportToExcelDynamic(pArray, pHeader, pFileName, pExcludedColumns) {
    debugger;
    if (pExcludedColumns != null && pExcludedColumns != undefined && pExcludedColumns != "" && pExcludedColumns != "0") {
        for (var i = 0 ; i < pArray.length ; i++) {
            for (var j = 0; j < pExcludedColumns.split(',').length; j++)
                delete pArray[i][pExcludedColumns.split(',')[j]];
        }
    }
    exportToCsv = function () {
        var CsvString = "";
        //pHeader is the column names separated by commas
        //for (var i = 0; i < pHeader.split(',').length; i++)
        //    CsvString += pHeader.split(',')[i] + ',';
        //CsvString += "\r\n";
        pArray.forEach(function (RowItem, RowIndex) {
            for (var key in RowItem) {
                CsvString += RowItem[key].replace(",", "-") + ','
            }
            CsvString += "\r\n";
        });
        //CsvString = "data:application/csv," + encodeURIComponent(CsvString);
        CsvString = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURIComponent(CsvString);
        var x = document.createElement("A");
        x.setAttribute("href", CsvString);
        if (pFileName == undefined) pFileName = "NewFile";
        x.setAttribute("download", pFileName + ' ' + getTodaysDateInddMMyyyyFormat() + ' ' + getTime() + ".xls");
        document.body.appendChild(x);
        x.click();
    }
    exportToCsv();
}

function JournalVouchers_Reverse(pIDToReverse) {
    debugger;


    swal({
        title: "Are you sure?",
        //text: "The approval status for the selected row(s) will be changed and take effect into the partner balance. \n N.B. Also, please be informed that if the Partner is a custody in a payable then selecting a custody will have no effect on that payable.",
        text: "JV Will Be Reverse",
        type: "",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Apply",
        closeOnConfirm: true
    },
        //callback function in case of confirm delete
        function () {
            FadePageCover(true);
            var pParametersWithValues = {
                pIDToReverse: pIDToReverse
                //LoadWithPaging Parameters
                , pWhereClause: JournalVouchers_GetWhereClause()
                , pPageSize: $('#select-page-size').val()
                , pPageNumber: 1 //($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text())
                , pOrderBy: "ID DESC"
            }
            CallGETFunctionWithParameters("/api/JournalVouchers/Reverse"
                , pParametersWithValues
                , function (pData) {
                    if (pData[0] == "") {
                        JournalVouchers_BindTableRows(JSON.parse(pData[1]));
                        swal("Success", "Saved successfully.");
                        FadePageCover(false);
                    }
                    else {
                        swal("Sorry", pData[0]);
                        FadePageCover(false);
                    }
                }
                , null);

        }
    );


}
//link job from shipping and tramp added by ahmed maher27112024
function ValidateJob() {
    if ($("#slJournalType").val() == "0")
        swal("Sorry", "Select Journal Type");

    else if ($("#slJVType").val() == "0")
        swal("Sorry", "Select JV Type");
    else {
        jQuery("#JVJobModal").modal("show");
        if ($("#hID").val()!="") {
            setVessel(1);

        }
        else {
            setVesselCreate(1);
        }
    }

}

function setVessel(type) {
    debugger;
    FadePageCover(true);
    $("#slJob").val("0");

    if ($("#hID").val() != "") {


            $("#cbIsLiner").prop('checked', false);
            $("#cbIsTramp").prop('checked', false);

            $.ajax({
                type: "GET",
                url: strServerURL + "api/JobSummery/FillSearchControlsWhere",
                data: { pWhereClause: "where Vessel_ID=" + ($("#slVessel").val() == "" || $("#slVessel").val() == null || $("#slVessel").val() == undefined) ? "0" : $("#slVessel").val(), pID: $("#hID").val() == "" ? 0 : $("#hID").val() },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (d) {
                    //[0] clients , //[1] currencies ,//[2] paymentmethod ,//[3] stores ,//[4] costecenter ,
                    Fill_SelectInputAfterLoadData(d[3], 'DisbursementJob_ID', 'JobNumber', '<-- Select -->', '#slJob', '');
                    if (d[3]!='[]') {
                        $("#slJob").val(JSON.parse(d[3])[0].DisbursementJob_ID)
                    }

                    FadePageCover(false);
                },
                error: function (jqXHR, exception) {
                    debugger;
                    swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
                    FadePageCover(false);
                }
            });
        
    }
    else {
        if (type == 1) {
            if ($("#cbIsLiner").prop("checked")) {
                $.ajax({
                    type: "GET",
                    url: strServerURL + "api/JobSummery/FillSearchControls",
                    data: {},
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (d) {
                        //[0] clients , //[1] currencies ,//[2] paymentmethod ,//[3] stores ,//[4] costecenter ,
                        Fill_SelectInputAfterLoadData(d[8], 'ID', 'Name', '<-- Select -->', '#slVessel', '');


                        FadePageCover(false);
                    },
                    error: function (jqXHR, exception) {
                        debugger;
                        swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
                        FadePageCover(false);
                    }
                });
            }
            else if ($("#cbIsTramp").prop("checked")) {
                $.ajax({
                    type: "GET",
                    url: strServerURL + "api/JobSummery/FillSearchControls",
                    data: {},
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (d) {
                        //[0] clients , //[1] currencies ,//[2] paymentmethod ,//[3] stores ,//[4] costecenter ,
                        Fill_SelectInputAfterLoadData(d[7], 'ID', 'Name', '<-- Select -->', '#slVessel', '');


                        FadePageCover(false);
                    },
                    error: function (jqXHR, exception) {
                        debugger;
                        swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
                        FadePageCover(false);
                    }
                });
            }

        }
        else if (type == 2) {
            $.ajax({
                type: "GET",
                url: strServerURL + "api/JobSummery/FillSearchControlsWhere",
                data: { pWhereClause: "where Vessel_ID=" + $("#slVessel").val() },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (d) {
                    //[0] clients , //[1] currencies ,//[2] paymentmethod ,//[3] stores ,//[4] costecenter ,
                    Fill_SelectInputAfterLoadData(d[3], 'DisbursementJob_ID', 'JobNumber', '<-- Select -->', '#slJob', '');


                    FadePageCover(false);
                },
                error: function (jqXHR, exception) {
                    debugger;
                    swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
                    FadePageCover(false);
                }
            });
        }

    }
    
}

function setVesselCreate(type) {
    debugger;
    FadePageCover(true);
    $("#slJob").val("0");


        if (type == 1) {
            if ($("#cbIsLiner").prop("checked")) {
                $.ajax({
                    type: "GET",
                    url: strServerURL + "api/JobSummery/FillSearchControls",
                    data: {},
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (d) {
                        //[0] clients , //[1] currencies ,//[2] paymentmethod ,//[3] stores ,//[4] costecenter ,
                        Fill_SelectInputAfterLoadData(d[8], 'ID', 'Name', '<-- Select -->', '#slVessel', '');


                        FadePageCover(false);
                    },
                    error: function (jqXHR, exception) {
                        debugger;
                        swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
                        FadePageCover(false);
                    }
                });
            }
            else if ($("#cbIsTramp").prop("checked")) {
                $.ajax({
                    type: "GET",
                    url: strServerURL + "api/JobSummery/FillSearchControls",
                    data: {},
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (d) {
                        //[0] clients , //[1] currencies ,//[2] paymentmethod ,//[3] stores ,//[4] costecenter ,
                        Fill_SelectInputAfterLoadData(d[7], 'ID', 'Name', '<-- Select -->', '#slVessel', '');


                        FadePageCover(false);
                    },
                    error: function (jqXHR, exception) {
                        debugger;
                        swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
                        FadePageCover(false);
                    }
                });
            }

    }
   else if (type == 2) {
            $.ajax({
                type: "GET",
                url: strServerURL + "api/JobSummery/FillSearchControlsWhere",
                data: { pWhereClause: "where Vessel_ID=" + $("#slVessel").val(), pID: $("#hID").val() == "" ? 0 : $("#hID").val() },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (d) {
                    //[0] clients , //[1] currencies ,//[2] paymentmethod ,//[3] stores ,//[4] costecenter ,
                    Fill_SelectInputAfterLoadData(d[3], 'DisbursementJob_ID', 'JobNumber', '<-- Select -->', '#slJob', '');


                    FadePageCover(false);
                },
                error: function (jqXHR, exception) {
                    debugger;
                    swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
                    FadePageCover(false);
                }
            });
        }
       


}

//-----------------------------------------------------------Charges-------------------------------------------
var maxDetailsIDInTableCharge = 0;
function OpenChargeModal() {
        $('#tblCharge tbody').html('');
        $('#txtOperationCode').val('');
        $('#txtChargeAmount').val('');
        $('#txtChargeTypeNotes').val('');
        $('#slChargeType').val('');
        var today = new Date();
        var yyyy = today.getFullYear().toString();
        $('#txtOperationYear').val(yyyy);
    jQuery('#ChargeModal').modal('show');
    $('#slChargeType').select2();

}
function A_ChargeChanged() {
    debugger;

    if ($('#txtOperationCode').val() == '')
        swal('Excuse me', 'Please insert operation code', 'warning');
    else if ($('#txtOperationYear').val() == '')
        swal('Excuse me', 'Please insert year', 'warning');
    else if ($('#slChargeType').val() == '0' || $('#slChargeType').val() == '')
        swal('Excuse me', 'Please choose charge type', 'warning');
    else if ($('#txtChargeAmount').val() == '' || $('#txtChargeAmount').val() == '0')
        swal('Excuse me', 'Please insert amount', 'warning');
    else if ($('#txtChargeTypeNotes').val() == '')
        swal('Excuse me', 'Please insert notes', 'warning');
    else {
        CallGETFunctionWithParameters("/api/Voucher/GetOperationIDByCode"
            , {
                pOperationCode: $('#txtOperationCode').val()
                , pOperationYear: $('#txtOperationYear').val()
            }
            , function (pData) {
                if (pData[0] != '') {
                    debugger;

                    var pOperationID = pData[0];
                    Charges_BindTableRows(pOperationID);
                }

                FadePageCover(false);
            }
            , null);
    }




}
function Charges_BindTableRows(pOperationID) {

    $(".isDepartement").addClass("hide");
    $("#isDepartement").addClass('hide');

    var TodaysDate = new Date();
    var FormattedTodaysDate = TodaysDate.toLocaleDateString();
    //$("#tblOperation").html("");
    debugger;
    var pCheckboxNameAttr = "Delete";
    var pTableHTML = "";

    maxDetailsIDInTableCharge++;


    var table = $("#tblCharge");

    pTableHTML += "<tr ID='" + maxDetailsIDInTableCharge + "'" + "'>";
    pTableHTML += "<td class='ID ' > <input name='" + pCheckboxNameAttr + "' type='checkbox' value='" + maxDetailsIDInTableCharge + "' " + (1 == 1 ? "" : "checked='checked'") + "></td> ";
    //pTableHTML += "<td class='shownDirectionIconName'><i class= 'fa " + item.DirectionIconName + " " + item.DirectionIconStyle + " fa-2x'/><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-2x'/></td>";
    pTableHTML += "<td class='Code'>" + $('#txtOperationCode').val() + "</td>";
    pTableHTML += "<td class='OperationID hide'>" + pOperationID + "</td>";
    pTableHTML += "<td class='OperationYear'>" + $('#txtOperationYear').val() + "</td>";
    pTableHTML += "<td class='ChargeTypeID hide'>" + $('#slChargeType option:selected').val() + "</td>";
    pTableHTML += "<td class='ChargeTypeName'>" + $('#slChargeType option:selected').text() + "</td>";
    pTableHTML += "<td class='ChargeAmount'>" + $('#txtChargeAmount').val() + "</td>";

    pTableHTML += "<td class='DebitCreditID hide'>" + $('#slDebitCredit option:selected').val() + "</td>";
    pTableHTML += "<td class='DebitCreditName hide'>" + $('#slDebitCredit option:selected').text() + "</td>";

    pTableHTML += "<td class='IsPayable hide'>" + $('#slPayableRec option:selected').val() + "</td>";
    pTableHTML += "<td class='PayableRecName'>" + $('#slPayableRec option:selected').text() + "</td>";


    pTableHTML += "<td class='ChargeTypeNotes'>" + $('#txtChargeTypeNotes').val() + "</td>";
    pTableHTML += " </tr> ";


    // pTableHTML += "</tbody>";
    $("#tblCharge tbody").append(pTableHTML);


    BindAllCheckboxonTable("tblCharge", "ID");
    CheckAllCheckbox("HeaderDeleteChargeID");

}
function Details_ChargeDeleteList() {
    debugger;
    var pDeletedDetailsIDs = GetAllSelectedIDsAsString('tblCharge', 'Delete');

    if (pDeletedDetailsIDs != "")
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

                for (var i = 0; i < pDeletedDetailsIDs.split(",").length; i++) {
                    $("#tblCharge tbody tr[Counter=" + pDeletedDetailsIDs.split(",")[i] + "]").remove();
                    $("#tblCharge tbody tr[ID=" + pDeletedDetailsIDs.split(",")[i] + "]").remove();
                }

                FadePageCover(false);

            });
}
function Charge_Save() {
    debugger;
    //*************
    if ($('#tblCharge tbody >tr').length > 0) {
        swal({
            title: "Are you sure  ?",
            text: "You will Create Charges  ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "OK ,  !",
            cancelButtonText: "NO",
            closeOnConfirm: true
        },
            function (isConfirm) {
                //swal("Poof! Your imaginary file has been deleted!", {
                //    icon: "success",
                //});

                if (isConfirm) {

                    var arrayOfItems = new Array();
                    var _InvoiceTotalAmount = 0;
                    $("#tblCharge tbody tr").each(function (i, tr) {

                        var objItem = new Object();
                        objItem.OperationID = $(tr).find("td.OperationID ").text();
                        objItem.ChargeAmount = $(tr).find("td.ChargeAmount").text();
                        objItem.ChargeTypeID = $(tr).find("td.ChargeTypeID ").text();
                        objItem.ChargeTypeNotes = $(tr).find("td.ChargeTypeNotes ").text();
                        objItem.IsPayable = ($(tr).find("td.IsPayable ").text() == 1 ? true : false);
                        _InvoiceTotalAmount += parseFloat($(tr).find("td.ChargeAmount").text());
                        arrayOfItems.push(objItem);
                    });

        
                    var strReturnedMessage = ""
                    var pChargeData;

                    var pFunctionName = '';
                    pFunctionName = "/api/JournalVouchers/GetChargeAccountsList";


                    CallPOSTFunctionWithParameters(pFunctionName,
                        JSON.stringify(arrayOfItems)
                        , function (pData) {
                            debugger;
                            if (pData[0]) {
                                pChargeData = JSON.stringify(pData[1]);
                                var InvoiceAccounts = JSON.parse(pChargeData);
                                maxDetailsIDInTable = 1000;
                                $.each(InvoiceAccounts, function (i, item) {
                                    debugger;
                                    ++maxDetailsIDInTable;
                                    var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'></span>";
                                    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
                                    var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);
                                    var tr = "";
                                    tr += "<tr ID='" + maxDetailsIDInTable + "'>";
                                    tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxDetailsIDInTable + "' checked='checked' /></td>";
                                    tr += "     <td class='DetailsID'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";
                                    tr += "     <td class='Account_ID' style='width:20%;' val=''><select id='slAccount" + maxDetailsIDInTable + "' style='width:112%;' class='selectAccountID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id); Details_AccountChanged(" + maxDetailsIDInTable + ");' data-required='true'>" + "<option value=0></option>" + "</select></td>";
                                    tr += "     <td class='SubAccount_ID' style='width:20%;' val=''><select id='slSubAccount" + maxDetailsIDInTable + "' style='width:112%;' class='selectSubAccountID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";
                                    tr += "     <td class='Branch_ID' style='width:15%;' val=''><select id='slBranch" + maxDetailsIDInTable + "' style='width:112%;' class='controlStyle selectBranchID' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";
                                    tr += "     <td class='Operation_ID' style='width:15%;' val=''><select id='slOperation" + maxDetailsIDInTable + "' style='width:112%;' class='controlStyle selectOperationID' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";

                                    tr += "     <td class='CostCenter_ID' style='width:15%;' val=''><select id='slCostCenter" + maxDetailsIDInTable + "' style='width:112%;' class='controlStyle selectcostcenterID' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";
                                    tr += "     <td class='Debit' style='width:7%;'><input type='text' style='width:112%;font-size:90%;' id='txtDebit" + maxDetailsIDInTable + "' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);Details_ClearDebitOrCredit(id);' onchange='Details_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
                                    tr += "     <td class='Credit' style='width:7%;'><input type='text' style='width:112%;font-size:90%;' id='txtCredit" + maxDetailsIDInTable + "' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);Details_ClearDebitOrCredit(id);' onchange='Details_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
                                    tr += "     <td class='Currency_ID' val='" + $("#hDefaultCurrencyID").val() + "'><select id='slCurrency" + maxDetailsIDInTable + "' style='width:auto;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id); Details_CurrencyChanged(" + '"slCurrency","txtExchangeRate",' + maxDetailsIDInTable + ");' data-required='true'>" + "<option value=0></option>" + "</select></td>";
                                    tr += "     <td class='ExchangeRate' style='width:1%;'><input type='text' style='width:112%;font-size:90%;' " + ($("#slCurrency" + (maxDetailsIDInTable - 1)).val() == undefined || $("#slCurrency" + (maxDetailsIDInTable - 1)).val() == $("#hDefaultCurrencyID").val() ? "disabled" : "") + " id='txtExchangeRate" + maxDetailsIDInTable + "' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);Details_CalculateTotals();' onchange='Details_SetIsRowChanged(id);' data-required='true' value='" + ($("#txtExchangeRate" + (maxDetailsIDInTable - 1)).val() == undefined ? 1 : $("#txtExchangeRate" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
                                    tr += "     <td class='LocalDebit' style='width:9%;'><input type='text' style='width:112%;font-size:90%;' disabled id='txtLocalDebit" + maxDetailsIDInTable + "' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='Details_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
                                    tr += "     <td class='LocalCredit' style='width:9%;'><input type='text' style='width:112%;font-size:90%;' disabled id='txtLocalCredit" + maxDetailsIDInTable + "' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='Details_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
                                    tr += "     <td class='Description' style='width:12%;'><input type='text' style='width:112%;font-size:90%;text-transform:uppercase;' id='txtDescription" + maxDetailsIDInTable + "' class='form-control controlStyle'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false' value='" + ($("#txtDescription" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtDescription" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
                                    tr += "     <td class='IsDocumented' style='width:1%;'><input id='cbIsDocumented" + maxDetailsIDInTable + "' type='checkbox' value=''></td>";
                                    tr += "     <td class='ChargeTypeID hide'>" + item.mChargeTypeID + "</td>";
                                    tr += "     <td class='AccountID hide'>" + item.mAccountID + "</td>";
                                    tr += "     <td class='SubAccountID hide'>" + item.mSubAccountID + "</td>";
                                    tr += "     <td class='IsPayable hide'>" + item.mIsPayable + "</td>";

                                    tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + maxDetailsIDInTable + "' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";
                                    tr += "     <td class='hide'>"
                                        + "</td>";
                                    tr += "</tr>";

                                    $("#tblDetails tbody").prepend(tr);

                                    $('#txtDescription' +  maxDetailsIDInTable).val(item.mChargeTypeNotes);

                                    
                                    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
                                        $("#tblDetails tbody tr[ID=" + maxDetailsIDInTable + "]").reverseChildren();

                                    if (item.mIsPayable) {
                                        $('#txtDebit' + maxDetailsIDInTable).val(item.mChargeAmount);
                                        $('#txtLocalDebit' + maxDetailsIDInTable).val(item.mChargeAmount);
                                    }
                                    else
                                    {
                                        $('#txtCredit' + maxDetailsIDInTable).val(item.mChargeAmount);
                                        $('#txtLocalCredit' + maxDetailsIDInTable).val(item.mChargeAmount);
                                        
                                    }
                                       

                                    $("#slAccount" + maxDetailsIDInTable).css({ "width": "100%" }).select2();
                                    $("#slSubAccount" + maxDetailsIDInTable).css({ "width": "100%" }).select2();

                                    $("#slCurrency" + maxDetailsIDInTable).html($("#hReadySlCurrencies").html());
                                    $("#slCurrency" + maxDetailsIDInTable).val($("#slCurrency" + (maxDetailsIDInTable - 1)).val() == undefined ? $("#hDefaultCurrencyID").val() : $("#slCurrency" + (maxDetailsIDInTable - 1)).val());
                                    $("#slAccount" + maxDetailsIDInTable).html($("#slAccount").html());
                                    $("#slAccount" + maxDetailsIDInTable).val($("#slAccount" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slAccount" + (maxDetailsIDInTable - 1)).val());


                                    $("#slAccount" + maxDetailsIDInTable).val(item.mAccountID);
                                    $("div[tabindex='-1']").removeAttr('tabindex');
                                    $("#slAccount" + maxDetailsIDInTable).trigger("change");


                                    $("#slSubAccount" + maxDetailsIDInTable).html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");
                                    $("#slSubAccount" + maxDetailsIDInTable).html($("#slSubAccount" + (maxDetailsIDInTable - 1)).html());
                                    $("#slSubAccount" + maxDetailsIDInTable).val($("#slSubAccount" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slSubAccount" + (maxDetailsIDInTable - 1)).val());

                                    $("#slSubAccount" + maxDetailsIDInTable).val(item.mSubAccountID);
                                    $("#slSubAccount" + maxDetailsIDInTable).trigger("change");

                                    $("#slCostCenter" + maxDetailsIDInTable).html($("#slCostCenter").html());
                                    $("#slCostCenter" + maxDetailsIDInTable).val($("#slCostCenter" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slCostCenter" + (maxDetailsIDInTable - 1)).val());
                                    $("#slCostCenter" + maxDetailsIDInTable).css({ "width": "100%" }).select2();
                                    $("#slCostCenter" + maxDetailsIDInTable).trigger("change");

                                    $("#slBranch" + maxDetailsIDInTable).html($("#slBranch").html());
                                    $("#slBranch" + maxDetailsIDInTable).val($("#slBranch" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slBranch" + (maxDetailsIDInTable - 1)).val());

                                    $("#slOperation" + maxDetailsIDInTable).html($("#slOperation").html());
                                    $("#slOperation" + maxDetailsIDInTable).val(item.mOperationID);


                                    Details_FillSlSubAccount("slSubAccount" + maxDetailsIDInTable, $("#slSubAccount" + maxDetailsIDInTable).val(), $("#slAccount" + maxDetailsIDInTable).val());

                                    if ($("#hDefaultUnEditableCompanyName").val() == "SAF") {
                                        $(".isDepartement").removeClass("hide");
                                        $("#isDepartement").removeClass('hide');

                                        $(".isBranch").addClass("hide");
                                        $("#isBranch").addClass('hide');
                                    }
                                    else {
                                        $(".isBranch").removeClass("hide");
                                        $("#isBranch").removeClass('hide');

                                        $(".isDepartement").addClass("hide");
                                        $("#isDepartement").addClass('hide');
                                    }

                                    if (i == InvoiceAccounts.length - 1) {
                                        jQuery("#ChargeModal").modal("hide");
                                        BindAllCheckboxonTable("tblDetails", "DetailsID", "cbDetailsDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
                                        Details_CalculateTotals();
                                    }
                                    //SetDatepickerFormat();

                                    //        maxDetailsIDInTable++;
                                    //        AppendRowtoTable("tblDetails",
                                    //            ("<tr ID='" + 0 + "' " + ">"
                                    //                + "<td class='DetailsID'> <input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + 0 + "' /></td>"
                                    //                + "<td class='Value' style='width:9%;'><input  tag='" + (item.Value) + "' type='text' style='width:100%;font-size:90%;'  id='txtValue" + maxDetailsIDInTable + "' class='form-control inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);Voucher_CalculateTotal();' onchange='Details_SetIsRowChanged(id);Voucher_CalculateTotal();' data-required='false' value='" + (item.Value) + "' /> </td>"
                                    //                + "<td class='Description' style='width:20%;'><input  tag='" + ' Auto Generate' + "' type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtDescription" + maxDetailsIDInTable + "' class='form-control inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='true' value='" + item.Description + "' /> </td>"
                                    //                + "<td class='AccountID' style='width:20%;' val='" + (item.AccountID) + "'>" + "<select  tag='" + (item.AccountID) + "' id='slAccount" + maxDetailsIDInTable + "' style='width:100%;' class='form-control selectAccountID' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);Details_FillSlSubAccountInTable(this , \".SubAccountID\" ," + item.SubAccountID + ");' data-required='true'>" + $('#slAccount').html() + "</select></td>"
                                    //                + "<td class='SubAccountID' style='width:20%;' val='" + (item.SubAccountID) + "'>" + "<select  tag='" + (item.SubAccountID) + "'id='slSubAccount" + maxDetailsIDInTable + "' style='width:100%;' class='form-control selectSubAccountID' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>"
                                    //                + "<td class='CostCenterID' style='width:15%;' val='" + 0 + "'>" + "<select  tag='" + (0) + "' id='slCostCenter" + maxDetailsIDInTable + "' style='width:100%;' class='form-control selectcostcenterID' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + $('#slCostCenter').html() + "</select></td>"
                                    //                + "<td class='OperationID' style='width:15%;' val=''><select tag='" + (item.OperationID) + "' id='slOperation" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle selectOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='Details_HouseAndCertificateChangedByOperation(" + maxDetailsIDInTable + ");'   data-required='true'>" + $('#slOperation').html() + "</select></td>"
                                    //                + "<td class='OperationSearch' style='width:3%; padding:6px 0px 6px 0px;' val=''><button id='btnOperationSearch' class='btn btn-sm btn-lightblue m-t-xmd' type='button' onclick='ChangeOperation(" + maxDetailsIDInTable + ");'><i class='fa fa-search'></i></button> </td>"
                                    //                + "<td class='HouseID' disabled style='width:7%;' val=''><select id='slHouse" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle selectHouseNumber' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'    data-required='false'>" + "<option value=0></option>" + "</select></td>"
                                    //                + "<td class='TruckingOrderID' disabled style='width:7%;' val=''><select id='slTruckingOrder" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle selectTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'    data-required='false'>" + "<option value=0></option>" + "</select></td>"
                                    //                + "<td class='BranchID' disabled style='width:7%;' val=''><select id='slBranch" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle selectBranch' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 3 + ");'  data-required='false'>" + $('#slBranch').html() + "</select></td>"
                                    //                + "<td class='Documented'> <input name='Documented' id=cbDocumented" + maxDetailsIDInTable + " type='checkbox'  " + (false ? " checked='checked' " : "") + " /></td>"
                                    //                + "<td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + maxDetailsIDInTable + "' type='checkbox' value='" + maxDetailsIDInTable + "' /></td></tr>"
                                    //            ));
                                 }
                        , null);

                }
            });

}
            });
    }
    else
        swal("Sorry", "Insert Data First.");

}


function callprintmail() {
    var mailid = (parseInt($('#hLocalEmailID').val(), 10))
    SendMailAsRequest(mailid, true);


}
function LocalEmails_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-LocalEmails").parent().addClass("active");

    ClearAllTableRows("tblLocalEmails");
    var editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    //var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    var removeAlarmControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-quote-left' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Remove Alarm" + "</span>";
    //var cancelControlsText = " class='btn btn-xs btn-rounded btn-danger float-right' > <i class='fa ' style='padding-left: 5px;'>X &nbsp;&nbsp;&nbsp;</i> <span style='padding-right: 5px;'>" + "إلغاء" + "</span>";
    //var cancelledControlsText = " class='btn btn-xs btn-rounded btn-danger float-right' > <i class='fa ' style='padding-left: 5px;'>X </i> <span style='padding-right: 5px;'>" + "تم إلغائها" + "</span>";
    //var restoreControlsText = " class='btn btn-xs btn-rounded btn-warning float-right' > <i class='fa fa-undo' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "استعادة" + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblLocalEmails",
            ("<tr title='" + item.Body + "' ID='" + item.ID + "' class='" +"" /*(item.IsAlarm ? "text-danger" : "") */+ "' ondblclick='LocalEmails_EditByDblClick(" + item.ID + ");' >"
                //+ "<td class='ARFID'> <input " + (item.TotalActuallyReceived > 0 || item.UnPaidCashiersCount > 0 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='LocalEmailID'> <input type='checkbox' name='Delete' value='" + item.ID + "' /></td>"
                + "<td class='SenderUserID hide'>" + item.SenderUserID + "</td>"
                + "<td class='SenderUserName' val=" + item.SenderUserID + ">" + item.Senders + "</td>"
                + "<td class='Receivers'>" + item.Receivers + "</td>"
                + "<td class='Subject'>" + item.Subject + "</td>"
                + "<td class='Body hide'>" + item.Body + "</td>"
                + "<td class='OperationID hide' val=" + item.OperationID + " >" + item.OperationID + "</td>"
                + "<td class='QuotationID hide' val=" + item.QuotationID + " >" + item.QuotationID + "</td>"
                + "<td class='EmailSource hide' val=" + item.EmailSource + " >" + item.EmailSource + "</td>"
                + "<td class='OperationCode'>" + (item.OperationID == 0 ? "" : item.OperationCode) + "</td>"
                + "<td class='SendingDateAndTime'>" + item.SendingDateAndTime + "</td>"
                + "<td class='QuotationRouteID hide' val=" + item.QuotationRouteID + " >" + item.QuotationCode + "</td>"
                + "<td class='ParentEmailID hide' val=" + item.ParentEmailID + " >" + item.ParentEmailID + "</td>"

                + "<td class='IsAlarm hide'> <input type='checkbox' disabled='disabled' " + (item.IsAlarm == true ? " checked='checked' " : "") + " /></td>"
                //+ "<td class='IsRead hide'> <input type='checkbox' disabled='disabled' " + (item.IsRead == true ? " checked='checked' " : "") + " /></td>"
                //+ "<td class='IsAlarm hide'>  val='" + item.IsAlarm + "'") + " /></td>"
                //+ "<td class='IsDeleted hide'>  val='" + item.IsDeleted + "'") + " /></td>"

                + "<td class=''>"
                //+ (item.IsCancelled
                //    ? ("<a href='#' " + (!(IsDeptManagerRoleID || IsFinancialManagerID || IsGeneralManagerRoleID) ? " disabled='disabled' " : " ") + " onclick='ARF_CancelOrRestore(" + item.ID + ',"' + item.CustomerName + '",0' + ");' " + restoreControlsText + "</a>")
                //    //? ("<a href='#' " + ($("#hf_CanDelete").val() == 0 ? " disabled='disabled' " : " ") + (item.IsCancelled ? " disabled='disabled' " : " ") + cancelledControlsText + "</a>")
                //    : ("<a href='#' " + (!(IsDeptManagerRoleID || IsFinancialManagerID || IsGeneralManagerRoleID) ? " disabled='disabled' " : " ") + " onclick='ARF_CancelOrRestore(" + item.ID + ',"' + item.CustomerName + '",1' + ");' " + cancelControlsText + "</a>")
                //  )
                //+ "<a href='#'" + (item.IsCancelled ? "disabled='disabled' " : " ") + " onclick='Notification_ARF_FillControls(" + item.ID + ',' + item.FormNo + "," + "10" + ");' " + notificationsControlsText + "</a>" + "<a href='#'" + (item.IsCancelled ? " disabled='disabled' " : " ") + " onclick='Cashier_ARF_FillControls(" + item.ID + ',' + item.FormNo + "," + "10" + ");' " + printControlsText + "</a>"
                + "<a href='#' " + (item.QuotationRouteID > 0 && pDefaults.UnEditableCompanyName == "UNF" ? "class='hide' ": "") + (!item.IsAlarm ? "disabled='disabled'" : "") + " onclick='LocalEmails_RemoveAlarm(" + item.ID + ");' " + removeAlarmControlsText + "</a>"
                ////i disable notifications if its cancelled and not manager
                //+ "<a href='#'" + (item.IsCancelled && !(IsDeptManagerRoleID || IsFinancialManagerID || IsGeneralManagerRoleID) ? "disabled='disabled' " : " ") + " onclick='Notification_ARF_FillControls(" + item.ID + ',' + item.FormNo + "," + "10" + ");' " + notificationsControlsText + "</a>" + "<a href='#'" + (item.IsCancelled ? " disabled='disabled' " : " ") + " onclick='Cashier_ARF_FillControls(" + item.ID + ',' + item.FormNo + "," + "10" + ");' " + printControlsText + "</a>"
                + "</td>"

                + "<td class='hide'><a href='#' data-toggle='modal' onclick='LocalEmails_EditByDblClick(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    //ApplyPermissions();
    BindAllCheckboxonTable("tblLocalEmails", "LocalEmailID", "cbLocalEmailDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeleteLocalEmailID");
    HighlightText("#tblLocalEmails>tbody>tr", $("#txt-Search").val().trim());
    if (pDefaults.UnEditableCompanyName == "MAN")
        $("#btn-DeleteEmails").removeClass("hide");
    //if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
    //    swal(strSorry, strDeleteFailMessage, "warning");
    //    showDeleteFailMessage = false;
    //}
    //$("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function LocalEmails_LoadingWithPaging() {
    debugger;
    if (glbCallingControl == "OperationsEdit")
        LocalEmails_LoadALLFromOperations();
    else {
        var pWhereClause = LocalEmails_GetWhereClause();
        var pPageSize = $('#select-page-size').val();
        var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
        var pOrderBy = "ID DESC";
        var pControllerParameters = { pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pIsReceived: ($("#slEmailStatus").val() == 10 ? true : false) }
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { LocalEmails_BindTableRows(JSON.parse(pData[0])); });
        HighlightText("#tblLocalEmail>tbody>tr", $("#txt-Search").val().trim());
    }
}
/*****************************Called From OperationsEdit*************************************/
function LocalEmails_LoadALLFromOperations() {
    debugger;
    //FadePageCover(true);
    $("#slRegardingOperation").html("<option value=" + ($("#hOperationID").val() == undefined ? "0" : $("#hOperationID").val()) + ">" + ($("#hOperationCode").val() == undefined ? "0" : $("#hOperationCode").val()) + "</option>");
    var pWhereClause = "WHERE OperationID=" + ($("#hOperationID").val() == undefined ? "0" : $("#hOperationID").val()) + " \n";
    //pWhereClause += "AND (ReceiverUserID = " + pLoggedUser.ID + " OR SenderUserID=" + pLoggedUser.ID + ")" + " \n";
    //if ($("#slEmailStatus").val() != undefined && $("#slEmailStatus").val() != "") {
    //    pWhereClause += " AND (";
    //    pWhereClause += ($("#slEmailStatus").val() == constReceivedEmail
    //        ? (" ReceiverUserID = " + $("#hLoggedUserID").val() + "\n")//(" Receivers LIKE N'%" + $("#hLoggedUserNameNotLogin").val() + "%'")
    //        : (" SenderUserID=" + $("#hLoggedUserID").val()));
    //    pWhereClause += ")" + " \n";
    //}
    var pPageSize = 999999;
    var pPageNumber = 1;
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pIsReceived: ($("#slEmailStatus").val() == 10 ? true : false) }
    CallGETFunctionWithParameters("/api/LocalEmails/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned", pControllerParameters
        , function (pData) {
            LocalEmails_BindTableRows(JSON.parse(pData[0]));
            //FadePageCover(false);
        });
}
function LocalEmails_GetWhereClause() {
    debugger;
    //var pWhereClause = " WHERE IsDeleted=0 AND (ReceiverUserID = " + $("#hLoggedUserID").val() + " OR SenderUserID = " + $("#hLoggedUserID").val() + ")";
    // var pWhereClause = " WHERE (Receivers LIKE N'%" + $("#hLoggedUserNameNotLogin").val() + "%' OR SenderUserID = " + $("#hLoggedUserID").val() + ")";
    //var pWhereClause = "where (" + $("#hLoggedUserID").val() + " IN(SELECT CONVERT(INT , value ) from [fn_split]( vwEmailGroup.RelatedUsersIDs , ',') ) )";

    //if (IsMESCOCompany) {
    pWhereClause = "where ReceiverUserID=" + $("#hLoggedUserID").val();
    //}

    // IN(SELECT CONVERT(INT, value) from[fn_split]( @SupplierIDs, '*') )


    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (";
        pWhereClause += " Subject LIKE N'%" + $("#txt-Search").val().trim() + "%' ";
        //  pWhereClause += " OR Receivers LIKE N'%" + $("#txt-Search").val().trim() + "%' ";
        //  pWhereClause += " OR SenderName LIKE N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR QuotationCode LIKE N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += ")" + " \n";
    }
    if ($("#slUser").val() != "" && !IsMESCOCompany) {
        //pWhereClause += " and (" + $("#slUser").val() + " IN(SELECT CONVERT(INT , value ) from [fn_split]( vwEmailGroup.RelatedUsersIDs , ',') ) )";
        pWhereClause += " and SenderUserID=" + $("#slUser").val();
    } else if ($("#slUser").val() != "" && IsMESCOCompany) {
        pWhereClause += " and SenderUserID=" + $("#slUser").val();
    }
    if ($("#slOperationFilterEmail").val() != undefined && $("#slOperationFilterEmail").val() != "") {
        pWhereClause += " AND (";
        pWhereClause += "   OperationID=" + $("#slOperationFilterEmail").val();
        pWhereClause += ")" + " \n";
    }
    //if ($("#slEmailOrAlarm").val() != "") {
    //    pWhereClause += " and ( IsNull( IsAlarm , 0 ) = " + $("#slEmailOrAlarm").val() +")";
    //}

    //if ($("#slEmailStatus").val() != "") {
    //    pWhereClause += " AND (";
    //    pWhereClause += ($("#slEmailStatus").val() == constReceivedEmail
    //        ? (" ReceiverUserID = " + $("#hLoggedUserID").val() + "\n")//(" Receivers LIKE N'%" + $("#hLoggedUserNameNotLogin").val() + "%'")
    //        : (" SenderUserID=" + $("#hLoggedUserID").val()));
    //    pWhereClause += ")" + " \n";
    //}
    return pWhereClause;
}
function LocalEmail_ClearAllControls(pOption) {
    debugger;

    if (pOption == "Reply") {
        $("#txtSubject").val("RE: " + $("#txtSubject").val());
        $("#txtBody").val(""); //$("#txtBody").val("\r\n\r\n" + "OLD:" + $("#txtBody").val())
        $("#slRegardingOperation").attr("disabled", "disabled");
        $("#btnReplyLocalEmail").addClass("hide");
        $("#txtSubject").attr("disabled", "disabled");
        $("#BodyArea").removeClass('hide');
    }
    else
    { // for new


        $('#ChatArea').html('');
        $('#hLocalEmailID').val("0");
        $('#hParentEmailID').val("0");

        $("#hSenderUserID").val("");
        $("#txtSubject").val("");
        $("#txtBody").val("");
        if (glbCallingControl == "LocalEmails") //might be called from OperationsEdit
            $("#slRegardingOperation").val("");
        $("#slRegardingOperation").attr("disabled",false);
        $("#BodyArea").removeClass('hide')
        $("#txtSubject").removeAttr("disabled");
        $('#btnReplyLocalEmail').addClass('hide')
    }

    $("#txtBody").removeAttr("disabled");

    $("#btnSendLocalEmail").removeAttr("disabled");

    //$("#btnReplyLocalEmail").addClass("hide");
}









function LocalEmails_EditByDblClick(pID) {
    debugger;
    LocalEmails_RemoveAlarm(pID);
    $('#ChatArea').html('');
    jQuery("#LocalEmailsModal").modal("show");
    tr = $("#tblLocalEmails tr[id=" + pID + "]");

    $("#hSenderUserID").val(tr.find("td.SenderUserID").text());
    $("#txtSubject").val(tr.find("td.Subject").text());
    $("#txtBody").val(tr.find("td.Body").text());



    $("#txtSubject").attr("disabled", "disabled");
    $("#txtBody").attr("disabled", "disabled");
    $("#slRegardingOperation").attr("disabled", "disabled");
    $("#slRegardingOperation").val(tr.find("td.OperationID").text() == 0 ? "" : tr.find("td.OperationID").text());
    $("#btnSendLocalEmail").attr("disabled", "disabled");
    //if ($("#slEmailStatus").val() == constReceivedEmail)
    $("#btnReplyLocalEmail").removeClass("hide");
    //else
    //    $("#btnReplyLocalEmail").addClass("hide");

    $('#hParentEmailID').val(tr.find("td.ParentEmailID").text());
    $('#hLocalEmailID').val(pID);
    DrawChat(pID)
    $("#BodyArea").addClass('hide')

    $('#slRegardingOperation').trigger("change");

}



function DrawChat(pID)
{

    FadePageCover(true);
    CallGETFunctionWithParameters("/api/LocalEmails/LoadAll"
        , { pWhereClause: " where ParentEmailID = " + pID + " Order by ID" }
        , function (pData)
        {
            $('#ChatArea').html('');
            var data = JSON.parse(pData[0]);
            var ArrUserColor = [pLoggedUser.ID, constCurrentUserColor];
            var ColorCounter = 0;
            $(data).each(function (index, item)
            {
                var color = "";
                if (ArrUserColor.indexOf(item.SenderUserID) == -1) {
                    color = constArrColors[ColorCounter];
                    ColorCounter++;
                    ArrUserColor.push(item.SenderUserID, color);

                }
                else
                {
                    indexcolor = (ArrUserColor.indexOf(item.SenderUserID) + 1);
                    color = ArrUserColor[indexcolor];
                }

                var removeAlarmControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-quote-left' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Remove Alarm" + "</span>";


                $('#ChatArea').append("<div style='max-width:900px;'><span class='fa fa-circle' style='font-size:2rem; color:" + color + ";'></span><b><span style='font-size:2rem;'>" + (item.SenderUserID == pLoggedUser.ID ? "You" : item.SenderName) + "</span></b>&nbsp;&nbsp;<mark>TO:</mark>&nbsp;<span style='color:red;'>@&nbsp;" + item.Receivers.replace(/,/g, ' @') + "&nbsp;</span>" + "&nbsp;" + item.SendingDateAndTime + "&nbsp;" + (item.IsAlarm ? "<span class='fa fa-bell text-danger'></span>" : "") + "<a href='#'" + "<a href='#' " + (!item.IsAlarm ? "disabled='disabled'" : "") + " onclick='LocalEmails_RemoveAlarm(" + item.ID + ");' " + removeAlarmControlsText + "</a></div>");

                if (pDefaults.UnEditableCompanyName == "MED" && tr.find("td.EmailSource").text() == "80") {
                    //$('#ChatArea').append(`<div style='max-width:900px;'><a href='#' class='btn btn-xs btn-rounded btn-primary' onclick="LoadViews('QuotationsEdit_Approval',null, ${item.QuotationID});">ChargeEdit Approval</a></div>`);
                    CallPOSTFunctionWithParameters("api/UserPrivileges/LoadAll", { pFormID: 315 }, function (pData) {
                        debugger;
                        let R = JSON.parse(pData[0])[0];
                        if (R.CanView == true) {
                            $('#ChatArea div').eq(0).after(`<div style='max-width:900px;'><a href='#' class='btn btn-xs btn-rounded btn-primary' onclick="LoadViews('QuotationsEdit_Approval',null, ${item.QuotationID});">ChargeEdit Approval</a></div>`);
                        }
                    }, null);
                }

                $('#ChatArea').append("<div  style='max-width:900px; min-height:62px; border-radius: 7px; line-height: 26px; padding: 18px 20px; background-color:" + color + "'>" + item.Body + "</div><br>");

            });
            FadePageCover(false);
        }
        , null);

}



function LocalEmails_SelectReceivers() {
    debugger;
    if ($("#txtSubject").val().trim() == "" || $("#txtBody").val().trim() == "")
        swal("Sorry", "Please, make sure to enter subject and body.");
    else {
        jQuery("#CheckboxesListModal").modal("show");
        LocalEmails_GetAvailableItems();
        $("#btnCheckboxesListApply").attr("onclick", "LocalEmails_Send();");
        $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
        $("#btn-SearchItems").attr("onclick", "LocalEmails_GetAvailableItems();");
    }
}
function LocalEmails_GetAvailableItems() {
    $("#lblShownItems").html(" Contacts");
    $("#divCheckboxesList").html("");
    var pStrFnName = "/api/Users/LoadAll";
    var pDivName = "divCheckboxesList";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pWhereClause = "";
    //pWhereClause += " WHERE IsInactive=0 AND ID <> " + $("#hLoggedUserID").val();
    pWhereClause += " WHERE IsInactive=0 ";
    //pWhereClause += " AND ( Name LIKE N'%" + $("#txtSearchItems").val().trim().toUpperCase() + "%' OR LocalName LIKE N'%" + $("#txtSearchItems").val().trim().toUpperCase() + "%') ";
    pWhereClause += " AND Name LIKE N'%" + $("#txtSearchItems").val().trim().toUpperCase() + "%' ";
    pWhereClause += " ORDER BY Name ";
    debugger;
    FadePageCover(true);
    //GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
    //    , function () {
    //        HighlightText("#" + pDivName, $("#txtSearchItems").val().trim());
    //        FadePageCover(false);
    //    });
    //GetListAsCheckboxesWithVariousParameters(pStrFnName, pControllerParameters, pDivName, pCheckboxNameAttr, callback, pCodeOrName, pCol_sm_size);
    GetListAsCheckboxesWithVariousParameters(pStrFnName, { pWhereClause: pWhereClause }, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#" + pDivName, $("#txtSearchItems").val().trim());
            //CheckIncludedItemsInDivFromArray(pMainDivName, pCheckboxNameAttr, pSelectedCbList, pColumnName, pCallback);
            CheckIncludedItemsInDivFromArray(pDivName, pCheckboxNameAttr, [{ID: $("#hSenderUserID").val()}], "ID", null);
            FadePageCover(false);
        }
        , 1, 3);
    //$("#hSenderUserID").val()
}
function LocalEmails_Send() {
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
            , pSubject: $("#txtSubject").val().trim().toUpperCase()
            , pBody: $("#txtBody").val().trim().toUpperCase()
            , pQuotationRouteID: 0
            , pPricingID: 0
            , pRequestOrReply: 0
            , pOperationID: ($("#slRegardingOperation").val() == undefined || $("#slRegardingOperation").val() == "" ? 0 : $("#slRegardingOperation").val())
            , pIsAlarm: true
            , pParentID: IsNull($('#hParentEmailID').val(), IsNull($('#hLocalEmailID').val(), "0"))
            , pEmailSource: 0
            , pIsSendNormalEmail: false
            //LoadWithPaging parameters
            , pWhereClauseForLoadWithPaging: LocalEmails_GetWhereClause()
            , pPageSize: $("#select-page-size").val()
            //pPageNumber is 1 coz its insert so it will be on the top
            , pPageNumber: 1 //$("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text() 
            , pOrderBy: "ID DESC"
            , pSenderUserID: pLoggedUser.ID
        };
        CallGETFunctionWithParameters("/api/LocalEmails/SendEmail", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    LocalEmails_LoadingWithPaging(); //LocalEmails_BindTableRows(JSON.parse(pData[1]));
                    jQuery("#CheckboxesListModal").modal("hide");
                    jQuery("#LocalEmailsModal").modal("hide");
                    swal("Success", "Sent Successfully.");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}
function LocalEmails_RemoveAlarm(pID) {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/LocalEmails/RemoveAlarm"
        , { pRemoveAlarmEmailID: pID }
        , function (pData) {
            if (glbCallingControl == "LocalEmails" && pDefaults.UnEditableCompanyName != "BED")
                LocalEmails_LoadingWithPaging();
            else if (glbCallingControl == "OperationsEdit")
                LocalEmails_LoadALLFromOperations();
            //FadePageCover(false);
            //DrawChat($('#hLocalEmailID').val());
        }
        , null);
}






function Alarm_FillSelectOperationTypeModal(pEmailID, pQuotationRouteID, pQuotationCode, pBody) {
    debugger;
    //sherif: uncomment all the if condtions to return back the expiration date validation
    //var tr = $("#tblRoutings tbody tr[ID=" + pSelectedID + "]");
    //var varExpirationDate = tr.find("td.ExpirationDate").text();
    //if (Date.prototype.compareDates(FormattedTodaysDate, ConvertDateFormat(varExpirationDate)) <= 0)
    //    swal("Sorry", "This quotation is expired.");
    //else
    //if (tr.find("td.QuotationStageID").attr('val') != AcceptedQuoteAndOperStageID)
    //    swal("Sorry", "This quotation must be accepted to create the operation.");
    //else { //valid choice
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $("#HideForUniFreight").addClass("hide");
        $("#btnSelectOperationType").html("Create Routing Order");
    }
    jQuery("#SelectOperationTypeModal").modal("show");

    $("#lblSelectOperationTypeShown").html(": " + pQuotationCode);
    $("#txtBodyCreateOperation").html(pBody.replace(/\n/g, "<br/>"));

    $("#btnSelectOperationType").attr("onclick", "Alarm_CreateOperationFromAlarm(" + pEmailID + "," + pQuotationRouteID + ")");

    if (IsMESCOCompany) {
        $("#cbIsMaster").prop("checked", true);
        GetQuotationCharges(pQuotationRouteID);
    }
    else
        $("#cbIsDirect").prop("checked", true);
    $("#hBLTypeIconName").val(DirectIconName);
    $("#hBLTypeIconStyle").val(strDirectIconStyleClassName);
    //}
}
function GetQuotationCharges(QuotationRouteID) {
    debugger;
    ClearAllTableRows("tblQuotationPayables");
    ClearAllTableRows("tblQuotationReceivables");
    if (QuotationRouteID > 0) {
        $("#divQuotationCharges").removeClass("hide");
        CallGETFunctionWithParameters("/api/Quotations/GetQuotationCharges", { pQuotationRouteID: QuotationRouteID },
            function (pData) {
                debugger;
                let QuotationCharges = JSON.parse(pData[0]);
                let Categories = pData[1];
                if (QuotationCharges.length > 0) {
                    $.each(QuotationCharges, function (i, item) {
                        if (item.CostAmount != 0) {
                            AppendRowtoTable("tblQuotationPayables",
                                ("<tr ID='" + item.ID + "'>"
                                    + "<td class='ChargeTypeName'>" + (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) + "</td>"
                                    + "<td class='CostAmount'>" + item.CostAmount + " " + item.CostCurrencyCode + "</td>"
                                    + "<td class='CategoryID'><select id='slPayableCategory" + item.ID + "' style='width:100%;text-align:center' class='selectPayableCategoryID form-control' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='true'></select></td>"
                                    + "</tr>"
                                ));
                        }
                        FillListFromObject(null, 2, "<--Select-->", "slPayableCategory" + item.ID, pData[1], null);

                        if (item.SaleAmount != 0) {
                            AppendRowtoTable("tblQuotationReceivables",
                                ("<tr ID='" + item.ID + "'>"
                                    + "<td class='ChargeTypeName'>" + (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) + "</td>"
                                    + "<td class='CostAmount'>" + item.SaleAmount + " " + item.SaleCurrencyCode + "</td>"
                                    + "<td class='CategoryID'><select id='slReceivableCategory" + item.ID + "' style='width:100%;text-align:center' class='selectReceivableCategoryID form-control' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='true'></select></td>"
                                    + "</tr>"
                                ));
                        }
                        FillListFromObject(null, 2, "<--Select-->", "slReceivableCategory" + item.ID, pData[1], null);
                    })

                }
            });
    }
}
function Alarm_CreateOperationFromAlarm(pEmailID, pQuotationRouteID) {
    if (pDefaults.UnEditableCompanyName == "MED") {
        //for MED we can't create more than one operation from a single quotation route --Mustafa Mahmoud
        CallGETFunctionWithParameters("/api/Quotations/GetOperationsCreatedFromQuotationRoute", { pQuotationRouteID: pQuotationRouteID },
            function (pData) {
                debugger;
                if (pData > 0) {
                    swal({
                        title: "Creation Failed",
                        text: "There is already an operation created from this quotation route.",
                        showCancelButton: false,
                        confirmButtonColor: "#65bd77",
                        confirmButtonText: "OK",
                        closeOnConfirm: true
                    }, null);
                } else
                    Alarm_CreateOperationFromAlarmAfterAccept(pEmailID, pQuotationRouteID);
            });
    } else {
        Alarm_CreateOperationFromAlarmAfterAccept(pEmailID, pQuotationRouteID);
    }
}
function GetChargesCategories(PayableOrReceivable) {
    let ChargesCategories = [];
    $("#tblQuotation" + PayableOrReceivable + " tbody tr").each(function (i, tr) {
        ChargesCategories.push({
            pQuotationChargeID: $(tr).attr("ID"),
            pCategoryID: $(tr).find("td.CategoryID select").val()
        });
    });
    return ChargesCategories;
}
function Alarm_CreateOperationFromAlarmAfterAccept(pEmailID, pQuotationRouteID) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "UNF") {
        if (ValidateForm("form", "SelectOperationTypeModal")) {
            jQuery("#SelectOperationTypeModal").modal("hide");
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/Quotations/CreateHouseFormQuotation", { pQuotationRouteID: pQuotationRouteID }
                , function (pData) {

                    if (pData[0]) {
                        swal("Saved Successfully", "House is Added");
                        LocalEmails_RemoveAlarm(pEmailID);
                        setTimeout(function () {
                            LoadDefaults("/api/Defaults/LoadAll", "WHERE 1=1 ");
                        }, 1000);
                        FadePageCover(false);
                    }
                    else {//false and there is message
                        if (!pData[0] && pData[1]=="") {
                            swal("Sorry", "an Error is Occur");
                            FadePageCover(false);
                        }
                        else if (!pData[0] && pData[1]) {
                            swal("Sorry", pData[1]);
                            FadePageCover(false);
                        }

                    }
                });
        }
    }
    else {
        var pParameterObject = {
            pEmailID: pEmailID
            , pQuotationRouteID: pQuotationRouteID
            , pBLType: ($("#cbIsDirect").prop("checked")
                ? constDirectBLType
                : ($("#cbIsMaster").prop("checked") ? constMasterBLType : constHouseBLType)
            )
            , pBLTypeIconName: ($("#cbIsDirect").prop("checked")
                ? DirectIconName
                : ($("#cbIsMaster").prop("checked") ? MasterIconName : HouseIconName)
            )
            , pBLTypeIconStyle: ($("#cbIsDirect").prop("checked")
                ? strDirectIconStyleClassName
                : ($("#cbIsMaster").prop("checked") ? strMasterIconStyleClassName : strHouseIconStyleClassName)
            )
            , pNumberOfTruckingOrders: $('#NumberOfTruckingOrders').val() == '' ? "0" : $('#NumberOfTruckingOrders').val()
            , pIsOwnedByCompany: $("#cbTruckingOrderIsOwnedByCompany").prop("checked") ? true : false
            , pPayableCategories: GetChargesCategories("Payables")
            , pReceivableCategories: GetChargesCategories("Receivables")
        };
        if (ValidateForm("form", "SelectOperationTypeModal")) {
            jQuery("#SelectOperationTypeModal").modal("hide");
            FadePageCover(true);
            PostInsertUpdateFunction("form", "/api/Quotations/CreateOperationFromAlarm", pParameterObject, false, "SelectOperationTypeModal",
                function (pData) {
                    if (pData[0]) {
                        if (pData[1] == 0) {
                            FadePageCover(false);
                            swal("Sorry", "Please, ensure that partners are not inactive.");
                        }
                        else {
                            LoadViews("OperationsEdit", null, pData[1]); //pData[1]: is the Created OperationID
                            LoadOperationsSubMenu();
                            LoadDefaults("/api/Defaults/LoadAll", " WHERE ID = 1 ");
                        }
                    }
                    else if (pData[2] == "") {//false with no message
                        swal("Sorry", "Connection failed, please try again.");
                        FadePageCover(false);
                    }
                    else {//false and there is message
                        swal("Sorry", pData[2]);
                        FadePageCover(false);
                    }
                });
        }

    }
}


function RemoveAllAlarms() {
    debugger;
    var strIDs = GetAllSelectedIDsAsString('tblLocalEmails');
    if (IsNull(strIDs,'') == '') {
        swal("Sorry", "Select emails to delete");
        return;
    }
    swal({
        title: "Are you sure?",
        text: "The all alarms sent to you will be removed!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, remove!",
        closeOnConfirm: true
    },
        //callback function in case of confirm
        function () {
            debugger;
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/LocalEmails/RemoveAllAlarms"
                , { pUpdateClause: `IsAlarm=0 where ReceiverUserID = ${pLoggedUser.ID} and EmailID in (` + strIDs +`)` }
                , function (pResult) {
                    console.log(pResult);
                    FadePageCover(false);
                    LocalEmails_LoadingWithPaging();
                });
        });
}



function DeleteAllAlarms() {
    debugger;
    var strIDs = GetAllSelectedIDsAsString('tblLocalEmails');
    if (IsNull(strIDs, '') == '') {
        swal("Sorry", "Select emails to delete");
        return;
    }
    swal({
        title: "Are you sure?",
        text: "The all alarms sent to you will be Deleted!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, remove!",
        closeOnConfirm: true
    },
        //callback function in case of confirm
        function () {
            debugger;
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/LocalEmails/DeleteAlarm"
                , { pUpdateClause: `where ReceiverUserID = ${pLoggedUser.ID} and EmailID in (` + strIDs + `)` }
                , function (pResult) {
                    console.log(pResult);
                    FadePageCover(false);
                    LocalEmails_LoadingWithPaging();
                });
        });
}



function SendMailAsRequest(EmailID, isAgreed) {

    CallGETFunctionWithParameters("/api/LocalEmails/LoadAll", { pWhereClause: "where id = " + EmailID }
        , function (pData) {
            var Email = JSON.parse(pData[0]);


            var source = Email[0].EmailSource;
            var sender = Email[0].SenderUserID;
            var opId = Email[0].OperationID;
            if (isAgreed) {

                var pParametersWithValues = {
                    pUserIDs: sender,
                    pSubject: 'Request Accepted',
                    pBody: 'Request Accepted',
                    pQuotationRouteID: 0,
                    pPricingID: 0,
                    pRequestOrReply: 1,
                    pOperationID: opId,
                    pIsAlarm: true,
                    pParentID: null, // Ensure this is assigned correctly
                    pEmailSource: 800,
                    pIsSendNormalEmail: false,
                    // LoadWithPaging parameters
                    pWhereClauseForLoadWithPaging: LocalEmails_GetWhereClause(),
                    pPageSize: $("#select-page-size").val(),
                    // pPageNumber is 1 because it's an insert so it will be on the top
                    pPageNumber: 1,
                    pOrderBy: "ID DESC",
                    pSenderUserID: $('#hLoggedUserID').val()
                };
                if (source == 801)
                    pParametersWithValues.pEmailSource = 800;
                if (source == 601)
                    pParametersWithValues.pEmailSource = 600;
                if (source == 701)
                    pParametersWithValues.pEmailSource = 700;
                if (source == 702)
                    pParametersWithValues.pEmailSource = 900;
                if (source == 802)
                    pParametersWithValues.pEmailSource = 1000;




                CallGETFunctionWithParameters("/api/LocalEmails/SendEmail", pParametersWithValues, function (pData) { swal("success", "Report Sent") }, null);


            }
            else {

            }





        }
        , null);

}
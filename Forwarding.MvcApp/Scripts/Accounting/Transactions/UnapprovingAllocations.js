function UnapprovingAllocations_BindTableRows(pUnapprovingAllocations) {
    debugger;
    $("#hl-menu-Accounting").parent().addClass("active");
    ClearAllTableRows("tblUnapprovingAllocations");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pUnapprovingAllocations, function (i, item) {
        AppendRowtoTable("tblUnapprovingAllocations",
            //("<tr ID='" + item.ID + "' ondblclick='UnapprovingAllocations_FillControls(" + item.ID + ");'>"
            ("<tr InvoiceIDs='" + item.InvoiceID +"' Amount='" + item.ItemDebitAmount +"' JVID='" + item.JVID + "' InvoicePaymentDetailsID='" + item.InvoicePaymentDetailsID +"' ID='" + item.ID + "'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='InvoiceID' val='" + item.InvoiceID +"'>" + item.InvoiceNumber + "</td>"
                + "<td class='PartenerID' val='" + item.PartenerID + "'>" + (item.PartenerName).replace(/ *\([^)]*\) */g, "") + "</td>"
                + "<td class='ItemDebitAmount' val='" + item.ItemDebitAmount + "'>" + (item.ItemDebitAmount).toFixed(3) + "</td>"
                + "<td class='InvoiceCurrencyID' val='" + item.InvoiceCurrencyID + "'>" + $("#hiddenslCurrecies option[value='" + item.InvoiceCurrencyID + "']").text() + "</td>"
                + "<td class='BalanceDebitAmount' val='" + item.BalanceDebitAmount + "'>" + (item.BalanceDebitAmount).toFixed(3) + "</td>"
                + "<td class='BalanceCurrencyID' val='" + item.InvoiceCurrencyID + "'>" + $("#hiddenslCurrecies option[value='" + item.BalanceCurrencyID + "']").text() + "</td>"
                + "<td class='ExchangeRate' val='" + item.ExchangeRate + "'>" + item.ExchangeRate + "</td>"
                + "<td class='CreationDate' val='" + GetDateFromServer(item.CreationDate) + "'>" + GetDateFromServer(item.CreationDate) + "</td>"
                + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblUnapprovingAllocations", "ID");
    CheckAllCheckbox("ID");
    //HighlightText("#tblUnapprovingAllocations>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
        strDeleteFailMessage = "This command is not completed because of dependencies existance."
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function UnapprovingAllocations_LoadingWithPaging()
{

    debugger;
    var WhereClause = "Where InvoicePaymentDetailsID IS NOT NULL    AND   (IsDeleted = 0 OR IsDeleted IS NULL )     ";
    //WhereClause += "   AND    (JVID IS NOT NULL and JVID<>0) AND   TransactionType = 60";

    if ($('#slPartner').val() != null && $('#slPartner').val().trim() != "0") {

        var TypeID = $('#slPartnerType').val();
        var PartenerIDName = "";
        switch (TypeID)     {
            case "1":
                PartenerIDName = 'CustomerID';
                break;
            case "2":
                PartenerIDName ='AgentID';
                break;
            case "3":
                PartenerIDName = 'ShippingAgentID';
                break;
            case "4":
                PartenerIDName = 'CustomsClearanceAgentID';
                break;
            case "5":
                PartenerIDName ='ShippingLineID';
                break;
            case "6":
                PartenerIDName = 'AirlineID';
                break;
            case "7":
                PartenerIDName = 'TruckerID';
                break;
            case "8":
                PartenerIDName = 'SupplierID';
                break;
            case "20":
                PartenerIDName = 'CustodyID';
                break;
            default:
        }

        console.log(PartenerIDName);


        WhereClause += " AND " + PartenerIDName + " = " + $('#slPartner').val() + "";
    }
    if ($('#txtSearchFrom').val().trim() != "") {
        WhereClause += " AND CONVERT(date , CreationDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtSearchFrom').val()) + "')";
    }
    if ($('#txtSearchTo').val().trim() != "") {
        WhereClause += " AND CONVERT(date , CreationDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtSearchTo').val()) + "')";
    }
    //-------------------------

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/A_ARAllocation/vwAccPartnerBalanceUnapproving_LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { UnapprovingAllocations_BindTableRows(pTabelRows); });
}

function UnapprovingAllocations_UnpostList()
{
    if ( $('#tblUnapprovingAllocations td').find('input[name="Delete"]:checked').length > 0 )
    {
        swal({
            title: "Are you sure?",
            text: "This selected items will be unposted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, unpost!",
            closeOnConfirm: true
        },
            //callback function in case of success
            function () {
                InsertUpdateFunction("form", "/api/A_ARAllocation/UnapprovingAllocations_Unpost",
                    { 'IDs': GetAllSelectedIDsAsString('tblUnapprovingAllocations'), 'JVIDs': GetAllSelectedRowsAttributeAsString('tblUnapprovingAllocations', 'JVID'), 'InvoicePaymentDetailsIDs': GetAllSelectedRowsAttributeAsString('tblUnapprovingAllocations', 'InvoicePaymentDetailsID'), 'Amounts': GetAllSelectedRowsAttributeAsString('tblUnapprovingAllocations', 'Amount'), 'InvoiceIDs': GetAllSelectedRowsAttributeAsString('tblUnapprovingAllocations', 'InvoiceIDs') }
                    , false, null, function () {
                        UnapprovingAllocations_LoadingWithPaging();
                        ClearAllTableRows('tblUnapprovingAllocations');
                    });
            });
    }
}

//InvoiceIDs
function FillParteners()
{
    FadePageCover(true);
    $.ajax({
        type: "GET",
        url: strServerURL + "api/A_ARAllocation/UnapprovingAllocations_IntializeData",
        data: { 'PartenertTypeID': $('#slPartnerType').val() },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {

          
            Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', '<--  Parteners  -->', '#slPartner', '');
            FadePageCover(false);


           // $('#slPartner option').text($('#slPartner option').text().replace(/ *\([^)]*\) */g, ""));
           

            $.each($('#slPartner option'), function (i, option) {
                if (pDefaults.UnEditableCompanyName == 'AOL')
                   $(option).text(($(option).text()) );
                else
                    $(option).text(($(option).text()).replace(/ *\([^)]*\) */g, "")  );

            });


          
        },
        error: function (jqXHR, exception)
        {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });

}




function GetAllSelectedRowsAttributeAsString(pTableName , pRowAttribute) {
    var listOfIDs = "";
    $('#' + pTableName + ' td').find('input[name="Delete"]:checked').each(function () {
        listOfIDs += ((listOfIDs == "") ? "" : ",") + ($(this).closest('tr').attr(pRowAttribute));
    });
    return listOfIDs;
}
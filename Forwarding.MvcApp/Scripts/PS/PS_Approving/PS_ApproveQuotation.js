// City Country ---------------------------------------------------------------
// Bind SC_Transactions Table Rows
var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' title='Edit'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";

function PS_ApproveQuotation_BindTableRows(pPS_Quotations) {
    debugger;
    $("#hl-menu-PS").parent().addClass("active");
    ClearAllTableRows("tblPS_Quotations");
    $.each(pPS_Quotations, function (i, item) {
        debugger;
        var disable = "";
        if (item.IsApproved == true) {
            disable = "disabled = disabled";
        }




        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblPS_Quotations",
            ("<tr ID='" + item.ID + "' ondblclick=''>"
                + "<td class='ID'> <input " + disable + "  name='cbPS_ApproveQuotation' type='radio' value='" + item.ID + "' /></td>"
                + "<td class='QuotationNo' val='" + item.QuotationNo + "'>" + item.QuotationNo + "</td>"
                + "<td class='QuotationNoManual' val='" + item.QuotationNoManual + "'>" + item.QuotationNoManual + "</td>"
                + "<td class='QuotationDate' val='" + GetDateFromServer(item.QuotationDate) + "'>" + GetDateFromServer(item.QuotationDate) + "</td>"
                + "<td class='SupplierID' val='" + item.SupplierID + "'>" + item.SupplierName + "</td>"
                + "<td class='BranchID' val='" + item.BranchID + "'>" + item.BranchName + "</td>"
                + "<td class='DepartmentID' val='" + item.DepartmentID + "'>" + item.DepartmentName + "</td>"
                + "<td class='CurrencyID' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                + "<td class='ExchangeRate hide' val='" + item.ExchangeRate + "'>" + item.ExchangeRate + "</td>"
                + "<td class='CostCenter_ID hide' val='" + item.CostCenter_ID + "'>" + item.CostCenterName + "</td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td class='CreatedUserID hide' val='" + item.CreatedUserID + "'>" + item.CreatedUserID + "</td>"
                + "<td class='EditedByUserID hide' val='" + item.EditedByUserID + "'>" + item.EditedByUserID + "</td>"
                + "<td class='ApprovedUserID hide' val='" + item.ApprovedUserID + "'>" + item.ApprovedUserID + "</td>"
                + "<td class='CreatedDate hide' val='" + GetDateFromServer(item.CreatedDate) + "'>" + GetDateFromServer(item.CreatedDate) + "</td>"
                + "<td class='EditedDate hide' val='" + GetDateFromServer(item.EditedDate) + "'>" + GetDateFromServer(item.EditedDate) + "</td>"
                + "<td class='ApprovedDate hide' val='" + GetDateFromServer(item.ApprovedDate) + "'>" + GetDateFromServer(item.ApprovedDate) + "</td>"
                + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='hPS_Quotations hide'><a href='#PS_QuotationsModal' data-toggle='modal' onclick='PS_Quotations_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "<td class='pPS_Quotations'><a href='#' onclick='PrintQuotation(" + item.ID + ");' " + printControlsText + "</a></td></tr > "));
    });
    ApplyPermissions();
  //  BindAllCheckboxonTable("tblPS_Quotations", "ID");
  //  CheckAllCheckbox("ID");
    HighlightText("#tblPS_Quotations>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function IntializeData() {


    $.ajax({
        type: "GET",
        url: strServerURL + "/api/PS_ApproveQuotation/IntializeData",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            ClearAllTableRows("tblPS_Quotations");
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[0], 'ID', 'RequestNo,RequestNoManual', '-', 'Select Request No - اختر الطلب', '#slRequests_Filter', '', 'RequestNo');
            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! This is print region !", "");
            FadePageCover(false);
        }
    });




}
function PS_ApproveQuotation_LoadingWithPaging() {
    debugger;
    var WhereClause = "Where ISNULL(IsDeleted , 0) = 0 and ISNULL(IsApproved , 0) = 0";


    if ($('#slRequests_Filter').val().trim() != "") {
        WhereClause += " AND PurchasingRequestID = " + $('#slRequests_Filter').val() + "";
    }


    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_ApproveQuotation/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PS_ApproveQuotation_BindTableRows(pTabelRows); PS_ApproveQuotation_ClearAllControls(); });
    HighlightText("#tblPS_Quotations>tbody>tr", $("#txt-Search").val().trim());
}


function PS_ApproveQuotation_ClearAllControls() {


}
function GetAllSelectedRadioButtonAsString(pTableName) {
    debugger;
    var listOfIDs = "";
    //$('#' + pTableName + ' td').find('input[type="checkbox"]:checked').each(function () {
    $('#' + pTableName + ' td').find('input[name="cbPS_ApproveQuotation"]:checked').each(function () {
        listOfIDs += ((listOfIDs == "") ? "" : ",") + ($(this).attr('value'));
    });
    return listOfIDs;
}

function PS_ApproveQuotation_Approve() {

  //  console.log(GetAllSelectedIDsAsString("tblPS_Quotations"));
    var pSelectedIDs = GetAllSelectedRadioButtonAsString("tblPS_Quotations");
    if (pSelectedIDs != "") {


        //*************
        swal({
            title: "Are you sure  ?",
            text: "You will Approve Selected Invoices ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "OK , Approve !",
            cancelButtonText: "NO",
            closeOnConfirm: true
        },
            function (isConfirm) {
                //swal("Poof! Your imaginary file has been deleted!", {
                //    icon: "success",
                //});

                if (isConfirm) {
                    //-----------------------
                    FadePageCover(true);
                    CallGETFunctionWithParameters("/api/PS_ApproveQuotation/Approve"
                        , { pSelectedIDs: pSelectedIDs, pApproved: true }
                        , function (pData) {
                            if (pData[0]) {
                                swal("Success", "Saved successfully", "success");
                              //  PS_ApproveQuotation_LoadingWithPaging();
                                IntializeData();
                            }
                            else {
                                swal("Sorry", JSON.parse(pData[1]), "warning");

                            }
                        }
                        , null);

                    //----------
                }
                else {
                    console.log('refuse merge');
                }
            }
        );
        //*************





    }
}




function PrintRequest() {

    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("ID");
    arr_Values.push(IsNull($('#slRequests_Filter').val(),"0"));


    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        var pParametersWithValues =
        {
            arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: 'Request Quotations Summary'
            , pReportName: 'PS_RequestQuotations'
        };
    }
    else {
        var pParametersWithValues =
        {
            arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: 'Request Quotations Summary'
            , pReportName: 'PS_RequestQuotations_AR'
        };
    }
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;

}


function PrintQuotation(QuotationID) {
    FadePageCover(true);
    if (QuotationID == 0)
        QuotationID = $('#hID').val();
    $('#hExportedTable').html('');
    LoadAll("/api/PS_Quotations/LoadDetails", "where ID = " + QuotationID, function (data) {
        var pReportTitle = " Quotation - عرض سعر ";
        var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
        var _Details = JSON.parse(data[0]);
        //****************** fill html table *************************************************
        var pTablesHTML = "";
        var ItemsCellsClass = "ForItems";
        var HasItems = false;
        var TotalAmount = 0.00;
        var _InvDate = "";
        var _InvCurrency = "";
        var _SupplierName = "";
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Details xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        pTablesHTML += '<table id="tblInvDetails" style="" class="table table-striped text-sm table-bordered" >';
        pTablesHTML += '<thead>';
        pTablesHTML += '<th>' + (lang == "ar" ? "البند" : "Item") + '</th>';

        pTablesHTML += '<th class="' + ItemsCellsClass + '">' + (lang == "ar" ? "الكمية" : "Qty") + '</th>';
        pTablesHTML += '<th>' + (lang == "ar" ? "الوحدة" : "Unit") + '</th>';
        pTablesHTML += '<th>' + (lang == "ar" ? "السعر" : "Price") + '</th>';
        pTablesHTML += '<th>' + (lang == "ar" ? "ملاحظات" : "Notes") + '</th>';
        pTablesHTML += '</thead>';
        pTablesHTML += '<tbody>';

        //hExportedTable
        $(_Details).each(function (i, item) {
            var name = '';
            if (item.D_ItemID != null && item.D_ItemID != 0) {
                name = item.D_ItemName;
                HasItems = true;
            }
            else {
                name = item.D_ServiceName;
            }

            pTablesHTML += '<tr>';
            pTablesHTML += '<td>' + name + '</td>';
            pTablesHTML += '<td>' + item.D_UnitName + '</td>';
            pTablesHTML += '<td class="' + ItemsCellsClass + '">' + parseFloat(item.D_Quantity).toFixed(2) + '</td>';
            pTablesHTML += '<td>' + item.Price + '</td>';
            pTablesHTML += '<td>' + item.D_Notes + '</td>';
            pTablesHTML += '</tr>';


            if ($(_Details).length - 1 == i) {

                _InvDate = GetDateFromServer(item.QuotationDate);
                _InvCode = item.QuotationNo;
                _InvNotes = item.Notes;
                _InvRequestNo = item.RequestNo;
                _InvBranch = item.BranchName;
                _InvDepartment = item.DepartmentName;
                _InvCreator = item.CreatorName;
                _SupplierName = item.SupplierName;

                //pTablesHTML += '<tr>';
                //pTablesHTML += '<td colspan="5"><b style="float:right; border:solid 1px;">' + (lang == "ar" ? " المجموع " : " Total ") + ' ' + parseFloat(TotalAmount).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
                //pTablesHTML += '</tr>';
            }
        });
        pTablesHTML += '</tbody></table>';




        $('#hExportedTable').html(pTablesHTML);

        if (!HasItems) {
            $('.ForItems').addClass('hide');

        }



        debugger;
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html ' + (lang == "ar" ? 'dir="rtl"' : '') + '>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';

        ReportHTML += '<style type="text/css" media="print">td.header-row{background-color:Gainsboro!important;}</style> ';
        ReportHTML += '<style type="text/css" >td.header-row{background-color:Gainsboro!important; text-align:left!important; }</style> ';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '         <div id="Reportbody">';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h2 style="font-family:\'Arial black\'">' + pReportTitle + '</h2></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3 style="font-family:\'Arial black\'">' + _SupplierName + '</h3></div> </br>';

        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  رقم العرض " : "  Quotation No ") + ': </b> ' + _InvCode + '</div>';

        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  تاريخ العرض " : "  Date ") + ': </b> ' + _InvDate + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  طلب شراء رقم " : "  Request NO ") + ': </b> ' + _InvRequestNo + '</div>';

        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  فرع " : "  Branch ") + ': </b> ' + _InvBranch + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  قسم " : "  Department ") + ': </b> ' + _InvDepartment + '</div>';




        ReportHTML += '                 <div class="col-xs-6"><b>' + (lang == "ar" ? "  الطباعة " : " Print on ") + ' :</b> ' + TodaysDateddMMyyyy + ' ' + $('#sp-LoginName').html() + '</div>';
        ReportHTML += '         <div> &nbsp; </div>';
        ReportHTML += $('#hExportedTable').html();
        ReportHTML += '         </div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        mywindow.document.write(ReportHTML);
        // $("#hExportedTable").html(ReportHTML);
        mywindow.document.close();
        FadePageCover(false)
    });
}








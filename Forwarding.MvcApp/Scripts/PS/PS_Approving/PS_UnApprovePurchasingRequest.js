// City Country ---------------------------------------------------------------
// Bind SC_Transactions Table Rows
var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' title='Edit'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";

function IntializePage()
{
    var WhereClause = "Where ISNULL(IsDeleted , 0) <> 1 and isnull(IsApproved , 0 ) = 1";
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_ApprovePurchasingRequest/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PS_UnApprovePurchasingRequest_BindTableRows(pTabelRows); PS_ApprovePurchasingRequest_ClearAllControls(); });
}
    

function PS_UnApprovePurchasingRequest_BindTableRows(pPS_Invoices) {
    debugger;
    $("#hl-menu-PS").parent().addClass("active");
    ClearAllTableRows("tblPS_ApprovePurchasingRequest");
    $.each(pPS_Invoices, function (i, item) {
        debugger;

        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblPS_ApprovePurchasingRequest",
            ("<tr ID='" + item.ID + "' ondblclick=''>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='RequestNo' val='" + item.RequestNo + "'>" + item.RequestNo + "</td>"
                + "<td class='RequestNoManual hide' val='" + item.RequestNoManual + "'>" + item.RequestNoManual + "</td>"
                + "<td class='RequestDate' val='" + GetDateFromServer(item.RequestDate) + "'>" + GetDateFromServer(item.RequestDate) + ' ' + item.strTime + "</td>"
                + "<td class='BranchID' val='" + item.BranchID + "'>" + item.BranchName + "</td>"
                + "<td class='DepartmentID' val='" + item.DepartmentID + "'>" + item.DepartmentName + "</td>"
                + "<td class='EquipmentID' val='" + item.EquipmentID + "'>" + item.EquipmentName + "</td>"
                + "<td class='EditedByUserID' val='" + item.EditedByUserID + "'>" + item.EditorName + "</td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='pPS_PurchasingRequest'><a href='#' onclick='PrintPurchasingRequest(" + item.ID + ");' " + printControlsText + "</a></td>"
                + "<td class='hPS_ApprovePurchasingRequest hide'><a href='#PS_InvoicesModal' data-toggle='modal' onclick='PS_ApprovePurchasingRequest_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr > "));

    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPS_ApprovePurchasingRequest", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblPS_ApprovePurchasingRequest>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PrintPurchasingRequest(InvID) {

    FadePageCover(true)


    if (InvID == 0)
        InvID = $('#hID').val();
    $('#hExportedTable').html('');
    LoadAll("/api/PS_PurchasingRequest/LoadDetails", "where ID = " + InvID, function (data) {
        var pReportTitle = " Purchasing Request - طلب شراء ";
        var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
        var _Details = JSON.parse(data[0]);
        //****************** fill html table *************************************************
        var pTablesHTML = "";
        var ItemsCellsClass = "ForItems";
        var HasItems = false;
        var TotalAmount = 0.00;
        var _InvDate = "";
        var _InvCurrency = "";

        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Details xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        pTablesHTML += '<table id="tblInvDetails" style="" class="table table-striped text-sm table-bordered" >';
        pTablesHTML += '<thead>';
        pTablesHTML += '<th>' + (lang == "ar" ? "البند" : "Item") + '</th>';
        pTablesHTML += '<th>' + (lang == "ar" ? "الوحدة" : "Unit") + '</th>';
        pTablesHTML += '<th class="' + ItemsCellsClass + '">' + (lang == "ar" ? "الكمية" : "Qty") + '</th>';

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
            pTablesHTML += '<td>' + item.D_Notes + '</td>';
            pTablesHTML += '</tr>';


            if ($(_Details).length - 1 == i) {

                _InvDate = GetDateFromServer(item.RequestDate);
                _InvCode = item.RequestNo;
                _InvNotes = item.Notes;

                _InvBranch = item.BranchName;
                _InvDepartment = item.DepartmentName;
                _InvCreator = item.CreatorName;


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

        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  رقم الطلب " : "  Request No ") + ': </b> ' + _InvCode + '</div>';

        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  تاريخ طلب " : "  Date ") + ': </b> ' + _InvDate + ' ' + _Details[0].strTime + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  المعد " : "  Editor ") + ': </b> ' + _Details[0].EditorName + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>' + _Details[0].strIsImportant + '</b></div>';
        ReportHTML += '                 <div class="col-xs-3"><b>' + _Details[0].strIsInsurance + '</b></div>';

        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  الطلب مقدم من " : "  Request From ") + ': </b> ' + _InvCreator + '</div>';

        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  فرع " : "  Branch ") + ': </b> ' + _InvBranch + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  قسم " : "  Department ") + ': </b> ' + _InvDepartment + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  سيارة " : "  Vehicle ") + ': </b> ' + _Details[0].EquipmentName + '</div>';



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
function PS_ApprovePurchasingRequest_LoadingWithPaging() {
    debugger;
    var WhereClause = "Where ISNULL(IsDeleted , 0) = 0 and ISNULL(IsApproved , 0) = 1";


    if ($('#txtCode_Filter').val().trim() != "") {
        WhereClause += " AND RequestNo LIKE '%" + $('#txtCode_Filter').val() + "%'";
    }
    if ($('#txtFromDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , RequestDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Filter').val()) + "')";
    }
    if ($('#txtToDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , RequestDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Filter').val()) + "')";
    }

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_ApprovePurchasingRequest/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PS_UnApprovePurchasingRequest_BindTableRows(pTabelRows); PS_ApprovePurchasingRequest_ClearAllControls(); });
    HighlightText("#tblPS_ApprovePurchasingRequest>tbody>tr", $("#txt-Search").val().trim());
}


function PS_ApprovePurchasingRequest_ClearAllControls() {


}


function PS_ApprovePurchasingRequest_Approve() {

    console.log(GetAllSelectedIDsAsString("tblPS_ApprovePurchasingRequest"));
    var pSelectedIDs = GetAllSelectedIDsAsString("tblPS_ApprovePurchasingRequest");
    if (pSelectedIDs != "") {


        //*************
        swal({
            title: "Are you sure  ?",
            text: "You will Approve Selected Invoices ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "OK , Un Approve !",
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
                    CallGETFunctionWithParameters("/api/PS_ApprovePurchasingRequest/Approve"
                        , { pSelectedIDs: pSelectedIDs, pApproved: false }
                        , function (pData) {
                            if (pData[0]) {
                                swal("Success", "Saved successfully", "success");
                               PS_ApprovePurchasingRequest_LoadingWithPaging();
                            }
                            else {
                               // swal("Sorry", JSON.parse(pData[1]), "warning");
                                FadePageCover(false);

                                setTimeout(function () {
                                    swal("Sorry - معذرة", pData[1], "warning");

                                }, 500); 
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





function SC_Transactions_DeleteList() {
    //debugger;
    ////Confirmation message to delete
    //if (GetAllSelectedIDsAsString('tblSC_Transactions') != "")
    //    swal({
    //        title: "Are you sure?",
    //        text: "The selected records will be deleted permanently!",
    //        type: "warning",
    //        showCancelButton: true,
    //        confirmButtonColor: "#DD6B55",
    //        confirmButtonText: "Yes, delete!",
    //        closeOnConfirm: true
    //    },
    //    //callback function in case of success
    //    function () {
    //        DeleteListFunction("/api/SC_Transactions/Delete", { "pPS_InvoicesIDs": GetAllSelectedIDsAsString('tblSC_Transactions') }, function () { SC_Transactions_LoadingWithPaging(); });
    //    });
    //    //DeleteListFunction("/api/SC_Transactions/Delete", { "pSC_TransactionsIDs": GetAllSelectedIDsAsString('tblSC_Transactions') }, function () { SC_Transactions_LoadingWithPaging(); });
}






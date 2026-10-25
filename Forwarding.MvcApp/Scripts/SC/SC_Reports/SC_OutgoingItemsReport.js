function cbCheckAllRequestsChanged() {
    debugger;
    if ($("#cbCheckAllRequests").prop("checked"))
        $("#divCbRequests input[name=nameCbRequests]").prop("checked", true);
    else
        $("#divCbRequests input[name=nameCbRequests]").prop("checked", false);
}
function cbCheckAllItemsChanged() {
    debugger;
    if ($("#cbCheckAllItems").prop("checked"))
        $("#divCbRequests input[name=nameCbItems]").prop("checked", true);
    else
        $("#divCbRequests input[name=nameCbItems]").prop("checked", false);
}
//GetAllSelectedIDsAsStringWithNameAttr("nameCbRequests"); 
function SC_OutgoingItemsReport_Print(pOutputTo)
{
    LoadAll("/api/SC_Transactions/LoadItems", " where 'OutgoingReport' = 'OutgoingReport' and 70 = 70 and ID IN( " + GetAllSelectedIDsAsStringWithNameAttr("nameCbRequests") + ")", function (pTabelRows) { PrintOutGoingReport(pTabelRows); });
}




function GetRequests()
{
    CallGETFunctionWithParameters("/api/SC_Transactions/LoadWithWhereClause"
        , {  pPageNumber:1,  pPageSize:100000,  pWhereClause: " where isnull( vwSC_Transactions.IsDeleted , 0 ) = 0 and vwSC_Transactions.TransactionTypeID = 70  " + $('#slStatue option:selected').attr("Condition") + " AND convert(date , vwSC_Transactions.TransactionDate) Between \'" + ConvertDateFormat($("#txtFromDate").val()) + "\' AND  \'" + ConvertDateFormat($("#txtToDate").val()) + "\'" }
        , function (pData)
        {
            $("#hl-menu-SC").parent().addClass("active");
            var Requests = pData[0];
            FillDivWithCheckboxes_DynamicFiledCustomizedForOutgoingReport("divCbRequests", Requests, "nameCbRequests", "Code", null);
            // var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
            
            FadePageCover(false);
        }
        , null);
}
function  LoadOutgoingReport() {
    debugger;

    LoadAll("/api/SC_Transactions/LoadItems", " where 'OutgoingReport' = 'OutgoingReport' and 70 = 70 and ID = " + ID, function (pTabelRows) { PrintOutGoingReport(pTabelRows); });


}

function FillDivWithCheckboxes_DynamicFiledCustomizedForOutgoingReport(pDivName, pData, pCheckboxNameAttr, FieldName, callback) {
    //Clear the div
    $("#" + pDivName).html("");
    var option = "";
    // Bind Data
    //option = '<section class="panel panel-default">';
    //option += '<header class="panel-heading">';
    //option += '</header>';
    $.each(JSON.parse(pData), function (i, item) {
        option += '<div class="swapCheckBoxesClass"> ';
        option += ' <input type="checkbox" name="' + pCheckboxNameAttr + '" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);"  value="' + item.ID + '" /> ';
        option += ' <label> ' + ' Trans.Code :' + item[FieldName] + " From Store : " + item.FromStoreName + " To Store : " + item.ToStoreName ;
        option += ' &nbsp;</label> </div>';
    });
    //option += '<footer class="panel-footer">';
    //option += "</footer>";
    //option += "</section>";
    $("#" + pDivName).append(option);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapCheckBoxesClass:not(.reversed)").reverseChildren();
}
function PrintOutGoingReport(data)
{
    //-----------
    var pReportTitle = "Outgoing Material Issue Request - طــلـبات صـــرف منصرفة"
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var header = data;
    var pTablesHTML = "";
    var ReportHTML = '';
    //-----------



    $(JSON.parse(data)).each(function (i, item)
    {

        if (i == 0 || item.ID != $(JSON.parse(data))[i - 1].ID)
        {

   // console.log(data)
    //****************** fill html table *************************************************
    pTablesHTML = '';
    pTablesHTML +=  '<table id="tbltransaction"' + item.ID +' style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered" >';
    pTablesHTML += '<thead><th>Item</th><th>Unit</th><th>Quantity</th><th>Outgoing Qty</th> <th>Remain Qty</th> <th>Notes</th></thead>'
    pTablesHTML += '<tbody>';
         }

        pTablesHTML += '<tr>';
        pTablesHTML += '<td>' + item.ItemName_D + '</td>';
        pTablesHTML += '<td>' + item.TypeName_D + '</td>';
        pTablesHTML += '<td>' + item.Qty_D + '</td>';
        pTablesHTML += '<td>' + item.D_OutgoingQty + '</td>';
        pTablesHTML += '<td>' + (item.Qty_D * 1 - item.D_OutgoingQty * 1) + '</td>';
        pTablesHTML += '<td>' + item.Notes_D + '</td>';
        pTablesHTML += '</tr>';

        if (i == $(JSON.parse(data)).length - 1 || item.ID != $(JSON.parse(data))[i + 1].ID ) {
            pTablesHTML += '</tbody></table>';


            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
            ReportHTML += '             <div id="Reportbody"' + item.ID +'>';
            ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

            ReportHTML += '                 <div class="col-xs-3"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
            ReportHTML += '                 <div class="col-xs-3"><b>by :</b> ' + $('#sp-LoginName').html() + '</div>';
            ReportHTML += '                 <div class="col-xs-3"><b>Code : </b> ' + item.Code + '</div>';
            ReportHTML += '                 <div class="col-xs-3"><b>Customer : </b> ' + item.PartnerName + '</div>';
            ReportHTML += '                 <div class="col-xs-3"><b>From Store : </b> ' + item.FromStoreName + '</div>';
            ReportHTML += '                 <div class="col-xs-3"><b>To Store : </b> ' + item.ToStoreName + '</div>';

            ReportHTML += '                 <div class="col-xs-3"><b>Transaction Date : </b> ' + GetDateFromServer(item.TransactionDate) + '</div>';
            ReportHTML += '                         <div> &nbsp; </div>';
            ReportHTML += pTablesHTML;
            ReportHTML += '         </div>';





        }
       



        var AllHtml = '';
        if (i == $(JSON.parse(data)).length - 1) {
            var mywindow = window.open('', '_blank');

            AllHtml += '<html>';
            AllHtml += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            AllHtml += '         <body id="" style="background-color:white;">';

            AllHtml += '<style type="text/css" media="print">td.header-row{background-color:Gainsboro!important;}</style> ';
            AllHtml += '<style type="text/css" >td.header-row{background-color:Gainsboro!important; text-align:left!important; }</style> ';

            AllHtml += ReportHTML;
            AllHtml += '         </body>';
            AllHtml += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

            AllHtml += '     </footer>';

            AllHtml += '</html>';
            console.log(AllHtml)
            mywindow.document.write(AllHtml);
            mywindow.document.close();
        }

    });




}
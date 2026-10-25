// City Country ---------------------------------------------------------------
// Bind ItemsInquiry Table Rows




function IntializePage()
{

    $.ajax({
        type: "GET",
        url: strServerURL + "/api/ItemsInquiry/IntializeData",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[0], 'ID', 'Code,Name,ItemGroupName', ' - ', ' <-- select item - اختر من الاصناف --> ', '#slItems', 0, '');
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[2], 'ID', 'Name', ' - ', ' <-- select from customers - اختر من العملاء --> ', '#slCustomers', 0, 'LockingUserID');
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[1], 'ID', 'Name', ' - ' , '<-- select Price List - اختر من قائمة السعر -->', '#slPriceLists', 0, '');


            FadePageCover(false);
            $("#slItems").css({ 'width': '100%' }).select2();
            $("#slItems").addClass('IsAutoSelect');
            $("div[tabindex='-1']").removeAttr('tabindex');
            $("#slCustomers").css({ 'width': '100%' }).select2();
            $("#slCustomers").addClass('IsAutoSelect');
            $("div[tabindex='-1']").removeAttr('tabindex');

            $("#slCustomers").off('change').on('change', function ()
            {
                if (IsNull($(this).val(), "0") == "0")
                    $("#slPriceLists").prop('disabled', false);
                else
                {
                    $("#slPriceLists").val($(this).find("option:selected").attr('lockinguserid'));
                    $("#slPriceLists").prop('disabled', true);
                }
               
            });

        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! This is print region !", "");
            FadePageCover(false);
        }
    });

}


function ItemsInquiry_BindTableRows(pItemsInquiry) {
    debugger;
    $("#hl-menu-SC").parent().addClass("active");
    ClearAllTableRows("tblItemsInquiry");
    $.each(JSON.parse( pItemsInquiry ), function (i, item) {
        debugger;
        editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblItemsInquiry",
        ("<tr ID='" + item.ID + ">"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
            + "<td class='Name' val='" + item.Name + "'>" + item.Name + "</td>"
            + "<td class='ParentGroupID' val='" + item.ItemGroupName + "'>" + item.ItemGroupName + "</td>"
            + "<td class='Price' val='" + item.Price + "'>" + item.Price + "</td>"/*التكلفة*/
            + "<td class='PriceListValue' val='" + item.PriceListValue + "'>" + item.PriceListValue + "</td>" /*النسبة او القيمة*/
            + "<td class='PriceListValue' val='" + item.PriceListPrice + "'>" + item.PriceListPrice + "</td>"  /*القيمة النهائية */
            + "<td class='ItemStoresQty' val='" + item.ItemStoresQty + "'>" + item.ItemStoresQty + "</td>"
            + "<td class='PriceListName' val='" + item.PriceListName + "'>" + item.PriceListName + "</td>"
            + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblItemsInquiry", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblItemsInquiry>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ItemsInquiry_EditByDblClick(pID) {
    jQuery("#ItemsInquiryModal").modal("show");
    ItemsInquiry_FillControls(pID);
}
// Loading with data
function ItemsInquiry_Loading() {
    debugger;
    LoadAll("/api/ItemsInquiry/LoadAll",

        "where 1 = 1  " 
        + IsNullElse($('#slItems').val(), " ", " AND ID = " + $('#slItems').val())
        + IsNullElse($('#slPriceLists').val(), " ", " AND PriceListID = " + $('#slPriceLists').val())

        , function (pTabelRows)
    {
        ItemsInquiry_BindTableRows(pTabelRows);
    });
}


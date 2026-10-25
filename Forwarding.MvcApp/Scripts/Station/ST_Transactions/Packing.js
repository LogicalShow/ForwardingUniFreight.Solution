// City Country ---------------------------------------------------------------
// Bind Packing Table Rows
//Start Auto Filter
$(document).ready(function () {
    $("#slCustomerID").css({ "width": "100%" }).select2();
    $("#slOperation").css({ "width": "100%" }).select2();
    $("#slCommodity").css({ "width": "100%" }).select2();

    $("div[tabindex='-1']").removeAttr('tabindex');
});
//End Auto Filter

var maxDetailsIDInTable = 0; //used to for when adding new row then make td control names unique

function Packing_BindTableRows(pPacking) {
    debugger;
    var UploadText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Upload") + "</span>";

    $("#hl-menu-Station").parent().addClass("active");
    ClearAllTableRows("tblPacking");
    $.each(pPacking, function (i, item) {
        debugger;
        editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblPacking",
            ("<tr ID='" + item.ID + "' ondblclick='Packing_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='ContainerNumber' val='" + item.ContainerNumber + "'>" + item.ContainerNumber + "</td>"
                + "<td class='OperationID' val='" + item.OperationID + "'>" + item.OperationCode + "</td>"
                + "<td class='CustomerID' val='" + item.CustomerID + "'>" + item.CustomerName + "</td>"
                + "<td class='ContainerID hide' val='" + item.ContainerID + "'>" + item.ContainerID + "</td>"
                + "<td class='ST_PreGateInDetailsID hide' val='" + item.ST_PreGateInDetailsID + "'>" + item.ST_PreGateInDetailsID + "</td>"
                + "<td class='ID1 hide' val='" + item.ID + "'>" + item.ID + "</td>"
                + "<td class='Upload'><a href='#tabUploadFiles' data-toggle='modal' onclick='UploadFiles(" + item.ID + ");' " + UploadText + "</a></td>"


                + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPacking", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblPacking>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
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


var localID = 0;
function Packing_EditByDblClick(GateInDetailsID) {
    jQuery("#BeforePackingModal").modal("show");




    debugger;

    var tr = $("tr[ID='" + GateInDetailsID + "']");
    localID = GateInDetailsID;
    _GateInDetailsID = GateInDetailsID;
    _ContainerID = $(tr).find("td.ContainerID").attr('val');
    _PreGateInDetailsID = $(tr).find("td.ST_PreGateInDetailsID ").attr('val');
    _CustomerID = $(tr).find("td.CustomerID").attr('val');
    _ContainerNumber = $(tr).find("td.ContainerNumber").attr('val');
    _OperationID = $(tr).find("td.OperationID").attr('val');
    

    LoadST_Packing(GateInDetailsID);
   



    //}, 300);
    //Packing_FillControls(OperationID);
    //Packing_FillControls();



}

function PackingDetails_EditByDblClick(ID) {


    _print = 0;
    var tr = $("tr[ID='" + ID + "']");
    _StoreID = $(tr).find("td.StoreID").attr('val');
    _PO = $(tr).find("td.PO").attr('val');
    _Lot = $(tr).find("td.Lot").attr('val');


    jQuery("#PackingModal").modal("show");


    $("#tblPackingDetails  tbody").html('');
    LoadPackingDetails(ID);
    $("#btnSave").attr("onclick", "Packing_Update(false);");
    $('#btn-Delete').removeClass("hide");
    //$("#btnSaveandNew").attr("onclick", "Packing_Update(true);");

}



// Loading with data
function Packing_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Packing/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows)
    { Packing_BindTableRows(pTabelRows); });
    HighlightText("#tblPacking>tbody>tr", $("#txt-Search").val().trim());
}

//var IsOldName = "0";
var Isvalidated = true;

function Packing_Insert(pSaveandAddNew) {
    var _Suceess = true;
    debugger;
    
    //if ($("#slStore").val() == "0") {
    //    _Suceess = false;
    //    $("#slStore").focus()
    //    $("#slStore").css("background-color", "#ff232387");
    //    swal("معذرة ! ", "اختار المخزن من فضلك ", "error");

    //}
        

    if (_Suceess) {
        InsertUpdateFunctionAndReturnID("form", "/api/Packing/Insert", {
            pDate: ConvertDateFormat($('#txtDate').val()),
            pNotes: $('#txtNotes').val() == "" ? "0" : $('#txtNotes').val() == "undefined" ? "0" : $('#txtNotes').val(),
            pOperationID: _OperationID,
            pPO: $('#txtPO').val() == "" ? "0" : $('#txtPO').val() == "undefined" ? "0" : $('#txtPO').val(),
            pLot: $('#txtLot').val() == "" ? "0" : $('#txtLot').val()
                     
        }, pSaveandAddNew, null, '#hID', function () {
            LoadST_Packing(localID);
                    //------------------------------------- ----------- -  - - - - -- - - - - -
                    InsertUpdateListOfObject("/api/Packing/InsertItems",
                       SetArrayOfItems()
                        , pSaveandAddNew, "PackingModal", function () {

       $.ajax({
        type: "Get",
           url: "/api/Packing/TransactionInsert",
           data: { pTransactionDate: ConvertDateFormat($('#txtDate').val()), pNotes: $('#txtNotes').val() == "" ? "0" : $('#txtNotes').val() == "undefined" ? "0" : $('#txtNotes').val(), pSLInvoiceID: $('#hID').val(), pClientID: _CustomerID},
        dataType: "json",
           success: function (d) {
               debugger
               //int pItemID, decimal pQty, int pStoreID, string pNotes, int pSLInvoiceDetailsID, DateTime pTransactionDate ) //pID : AccountID


               //int pItemID, decimal pQty, int pStoreID, string pNotes, int pSLInvoiceDetailsID, DateTime pTransactionDate ) //pID : AccountID




               var item15 = $('#txtItem15').val() == "" ? "0" : $('#txtItem15').val() == "undefined" ? "0" : $('#txtItem15').val();
               var item16 = $('#txtItem16').val() == "" ? "0" : $('#txtItem16').val() == "undefined" ? "0" : $('#txtItem16').val();
              
               var StoreID = $("#slStore").val();
               var Notes = $('#txtNotes').val() == "" ? "0" : $('#txtNotes').val() == "undefined" ? "0" : $('#txtNotes').val();
                   $.ajax({
                       type: "Get",
                       url: "/api/Packing/TransactiondetailsInsert",
                       data: {
                           pQty13: IsNull($("#lblItem13").text(), 0),
                           pQty14: IsNull($("#lblItem14").text(), 0),
                           pQty15: IsNull(item15, 0),
                           pQty16: IsNull(item16, 0),
                           pQty17: $("#lblItem17").text(),
                           pQty18: IsNull($("#lblItem18").text(), 0),
                           pStoreID: StoreID,
                           pNotes: Notes,
                           pSLInvoiceDetailsID: $('#hID').val(),
                           pTransactionDate: ConvertDateFormat($('#txtDate').val())
                       },
                       dataType: "json",
                       success: function (d) {
                           


                           LoadST_Packing(localID);
                           ClearAllTableRows('tblPackingDetails');

                           if (pDefaults.UnEditableCompanyName == "AGR") {
                               debugger
                               $.ajax({
                                   type: "Get",
                                   url: "/api/Packing/Receivables_AGRInsert",
                                   data: { pOperationID: _OperationID, pContainerID: $("#txtContainerID").val() },
                                   dataType: "json",
                                   success: function (d) {
                                       debugger
                                   }
                                  
                               });
                               


                           }


                       }
                   });




               


               //-----------------------------------------


               




           }
    });


                            //----------------- ennnnnnnnnnnnnnnd

                      
                        });
                    //------------------------------------- ----------- -  - - - - -- - - - - -
                });
            }

        
    

}

function ChangeDetails() {
    debugger;
    $('#tblPackingDetails > tbody > tr').find('td.Commodity').find('.selectCommodity').val($('#slCommodity').val());
    $('#tblPackingDetails > tbody > tr').find('td.Commodity').find('.selectCommodity').trigger("change");

}

function Packing_Update(pSaveandAddNew) {
    var _Suceess = true;

    //if ($("#slStore").val() == "0") {
    //    _Suceess = false;
    //    $("#slStore").focus()
    //    $("#slStore").css("background-color", "#ff232387");
    //    swal("معذرة ! ", "اختار المخزن من فضلك ", "error");

    //}
    if (_Suceess) {
        debugger;
        InsertUpdateFunctionAndReturnID("form", "/api/Packing/Update", {
            pID: $('#hID').val(),
            pDate: ConvertDateFormat($('#txtDate').val()),
            pNotes: $('#txtNotes').val() == "" ? "0" : $('#txtNotes').val() == "undefined" ? "0" : $('#txtNotes').val(), pOperationID: _OperationID, pPO: $('#txtPO').val() == "" ? "0" : $('#txtPO').val() == "undefined" ? "0" : $('#txtPO').val(),
            pLot: $('#txtLot').val() == "" ? "0" : $('#txtLot').val()
          
        }, pSaveandAddNew, null, '#hID', function () {
            LoadST_Packing(localID);
            //------------------------------------- ----------- -  - - - - -- - - - - -
            InsertUpdateListOfObject("/api/Packing/InsertItems",
                SetArrayOfItems()
                , pSaveandAddNew, "PackingModal", function () {


                    $.ajax({
                        type: "Get",
                        url: "/api/Packing/TransactionInsert",
                        data: { pTransactionDate: ConvertDateFormat($('#txtDate').val()), pNotes: $('#txtNotes').val() == "" ? "0" : $('#txtNotes').val() == "undefined" ? "0" : $('#txtNotes').val(), pSLInvoiceID: $('#hID').val(), pClientID: _CustomerID },
                        dataType: "json",
                        success: function (d) {
                            debugger
                            //int pItemID, decimal pQty, int pStoreID, string pNotes, int pSLInvoiceDetailsID, DateTime pTransactionDate ) //pID : AccountID


                            //int pItemID, decimal pQty, int pStoreID, string pNotes, int pSLInvoiceDetailsID, DateTime pTransactionDate ) //pID : AccountID




                            var item15 = $('#txtItem15').val() == "" ? "0" : $('#txtItem15').val() == "undefined" ? "0" : $('#txtItem15').val();
                            var item16 = $('#txtItem16').val() == "" ? "0" : $('#txtItem16').val() == "undefined" ? "0" : $('#txtItem16').val();

                            var StoreID = $("#slStore").val();
                            var Notes = $('#txtNotes').val() == "" ? "0" : $('#txtNotes').val() == "undefined" ? "0" : $('#txtNotes').val();
                            $.ajax({
                                type: "Get",
                                url: "/api/Packing/TransactiondetailsInsert",
                                data: { pQty13: IsNull($("#lblItem13").text(), 0), pQty14: IsNull($("#lblItem14").text(), 0), pQty15: IsNull(item15, 0), pQty16: IsNull(item16, 0), pQty17: $("#lblItem17").text(), pQty18: IsNull($("#lblItem18").text(), 0), pStoreID: StoreID, pNotes: Notes, pSLInvoiceDetailsID: $('#hID').val(), pTransactionDate: ConvertDateFormat($('#txtDate').val()) },
                                dataType: "json",
                                success: function (d) {
                                    debugger


                                    LoadST_Packing(localID);
                                    ClearAllTableRows('tblPackingDetails');


                                    if (pDefaults.UnEditableCompanyName == "AGR") {
                                        debugger
                                        $.ajax({
                                            type: "Get",
                                            url: "/api/Packing/Receivables_AGRInsert",
                                            data: { pOperationID: _OperationID, pContainerID: $("#txtContainerID").val() },
                                            dataType: "json",
                                            success: function (d) {
                                          
                                            }

                                        });



                                    }


                                }
                            });







                            //-----------------------------------------







                        }
                    });



                });
            //------------------------------------- ----------- -  - - - - -- - - - - -
        });
    }

}


function IntializeData() {

    //FadePageCover(true);
    //$.ajax({
    //    type: "GET",
    //    url: strServerURL + "api/Packing/IntializeData",
    //    data: { pStoresNamesOnly: "true" },
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (d) {
    //        Fill_SelectInputAfterLoadData(d[0], 'ID', 'StoreName', '<-- select store name -->', '#hidden_slstoresnames', '');
    //        FadePageCover(false);
    //    },
    //    error: function (jqXHR, exception) {
    //        debugger;
    //        swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
    //        FadePageCover(false);
    //    }
    //});
}





function Packing_DeleteList() {
    debugger;  
    DeleteListFunction("/api/Packing/Delete", { pPackingIDs: $('#hID').val() }, function () {
        LoadST_Packing(localID);
        jQuery.noConflict();
        (function ($) {

            $('#PackingModal').modal('hide');
        })(jQuery);


    });
}
//after pressing edit, this function fills the data
var _ContainerID = "0";
var _PreGateInDetailsID = "0";
var _GateInDetailsID = "0";
var _CustomerID = "0";
var _StoreID = 0;
var _OperationID = 0;
var _PO = 0;
var _Lot = '';

var _CustomerName = "0";

function Packing_FillControls() {
    debugger;

    $("#slStore").val(0)
    $("lblTotalExtraSize").val(0);
    $("lblTotalSize").val(0);
    $("lblItem17").val(0);
    $("lblItem16").val(0);
    $("lblItem15").val(0);
    $("lblItem14").val(0);
    $("lblItem13").val(0);
    $("#slStore").val(0)
    jQuery("#PackingModal").modal("show");
    $("lblItem18").val(0);

    ClearAll("#PackingModal", null);
    ClearAllTableRows("tblPackingDetails");
    $("#txtNotes").focus();
    $("#btnSave").attr("onclick", "Packing_Insert(false);");
    $('#btn-Delete').addClass("hide");

    $("#txtDate").val(getTodaysDateInddMMyyyyFormat());

    $("#slCustomerID").val(_CustomerID);
    $("#txtContainer").val(_ContainerNumber);
    $("#txtContainerID").val(_ContainerID);
    
   // _GateInDetailsID ;
    //_ContainerID = $(tr).find("td.ContainerID").attr('val');
    //_PreGateInDetailsID = $(tr).find("td.PreGateInDetailsID").attr('val');
    //_CustomerID = $(tr).find("td.CustomerID").attr('val');
    //_ContainerNumber = $(tr).find("td.ContainerNumber").attr('val');
    $("#slCustomerID").trigger("change");
    $("#slOperation").trigger("change");



    for (var i = 0; i < 21; i++) {

        
        debugger;
        AppendRowtoTable("tblPackingDetails",
            (" <tr tag='service' isdeleted='0' Class='Row-" + (i + 1) + "'  counter='" + (i + 1) + "' value='" + (i + 1) + "'>"
                + " <td class='btn-lightblue hide' style='font-size:15px;'> S </td>"
                //+ "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
              // + "<td counter='" + (i + 1) + "'> <button id='btn-DeleteDetails-" + (i + 1) + "' type='button' onclick='DeleteItems(" + (i + 1) + "," + (i+1) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (i + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td counter='" + (i + 1) + "'> <button tag='" + 0 + "' id='btn-DeleteDetails-" + (i + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (i + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='Exporter hide' >" + "<input value='Agro Green'  disabled  type='text' class='input_Exporter input-sm  col-sm'>" + "</td>"
                + "<td class='CountryOfOrigin hide' >" + "<input tag='Egypt' type='text'  disabled class='input_CountryOfOrigin input-sm  col-sm'>" + "</td>"
                + "<td class='ContainerNumber hide' val='" + _ContainerNumber + "'>" + "<input  disabled tag='" + _ContainerNumber +"'   type='text' class='input_ContainerNumber input-sm  col-sm'>" + "</td>"
                + "<td class='PalletReferenceNumber-" + (i + 1) + "' val='(i + 1)" + (i + 1) + "'>" + "<input disabled tag='" + (i + 1) + "'   type='text' class='input_PalletReferenceNumber input-sm  col-sm'>" + "</td>"
                + "<td class='MixedPallet' val=''>" + "<select   class= 'input-sm  col-sm selectMixedPallet'  id = 'MixedPallet-" + (i + 1) + "' >  <option value='1'>No</option> <option value='0'>Yes</option></select>" + "</td>"
                + "<td class='Commodity ' val='" + "0" + "'>" + "<select  id='Commodity-" + (i + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectCommodity'>" + $('#slCommodity').html() + "</select>" + "</td>"
                + "<td class='Variety ' val='" + "0" + "'>" + "<select  id='Variety-" + (i + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectVariety'>" + $('#slItemID').html() + "</select>" + "</td>"
                + "<td class='Class ' val='" + "0" + "'>" + "<select  id='class-" + (i + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectClass'><option value='0' selected> < -- select class -- >  </option> <option value='A' >  Class A   </option> <option value='B' >  Class B   </option> <option value='C' >  Class C   </option> </select></td>"
                + "<td class='CustomerName hide ' val='" + _CustomerID + "'>" + "<select disabled id='CustomerName-" + (i + 1) + "' tag='" + _CustomerID + "' class='input-sm  col-sm selectCustomerName'>" + $('#slCustomerID').html() + "</select>" + "</td>"
                + "<td class='PackType ' val='" + "0" + "'>" + "<select onchange='SetSize(this);'   id='PackType-" + (i + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectPackType'>" + $('#slPackType').html() + "</select>" + "</td>"
                + "<td class='Size' val=''>" + "<select class= 'input-sm  col-sm selectSize'  id = 'Size-" + (i + 1) + "' ><option value='50g-300g' >  50g-300g   </option>   <option value='80g-300g' >  80g-300g   </option> <option value='100g-150g'>	100g-150g  </option> <option value='100g-300g'>	100g-300g  </option> <option value='100g-800g'>	100g-800g  </option> <option value='150g-300g'>	150g-300g  </option> <option value='250g-350g'>	250g-350g  </option> <option value='300g-450g'>	300g-450g  </option> <option value='300g-800g'>	300g-800g  </option> <option value='450g-600g'>	450g-600g  </option> <option value='600g-800g'>	600g-800g  </option> <option value='800g-200g'>	200g-800g </option><option value='800g-1000g'>	800g-1000g  </option><option value='1000g-1200g'>	1000g-1200g  </option><option value='1200g-1500g'>	1200g-1500g  </option><option value='1500g-1950g'>	1500g-1950g  </option><option value='800g-2000g'>	800g-2000g  </option><option value='50g-100g'>	50g-100g  </option><option value='150g-450g'>150g-450g</option>  </select > " + "</td > "
                + "<td class='ClassAB hide' val=''>" + "<select class= 'input-sm  col-sm selectClassAB'  id = 'Size' >  <option value='1'>A</option> <option value='0'>B</option></select>" + "</td>"
                + "<td class='OrNot' val=''>" + "<select class= 'input-sm  col-sm selectOrNot'  id = 'Size' >  <option value='1'>Organic</option> <option value='0'>Conventional</option></select>" + "</td>"
                + "<td class='QtyBox' >" + "<input tag='' type='text'  class='input_QtyBox input-sm  col-sm'>" + "</td>"
                + "<td class='ExtraSize' >" + "<input tag='' disabled type='text'   class='input_ExtraSize input-sm  col-sm'>" + "</td>"
                + "<td class='Item13'>" + "<input tag='' type='text'   class='input_Item13 input-sm  col-sm'>" + "</td>"
                + "<td class='Item14'>" + "<input tag='' type='text'   class='input_Item14 input-sm  col-sm'>" + "</td>"
                + "<td class='Item15 hide'>" + "<input tag='' type='text'   class='input_Item15 input-sm  col-sm'>" + "</td>"
                + "<td class='Item16 hide'>" + "<input tag='' type='text'   class='input_Item16 input-sm  col-sm'>" + "</td>"
                + "<td class='Item17'>" + "<input tag='' type='text'   class='input_Item17 input-sm  col-sm'>" + "</td>"
                + "<td class='TotalSize' >" + "<input tag='' type='text' disabled  class='input_TotalSize input-sm  col-sm'>" + "</td>"
                + "<td class='TotalExtraSize' >" + "<input tag='' type='text' disabled   class='input_TotalExtraSize input-sm  col-sm'>" + "</td>"


                

                + "</tr>"));
        $("#txtExporter").val("Agro Green");
        $("#txtCountryOfOrigin").val("Egypt");
        debugger;
  
        $('#tblPackingDetails > tbody > tr').find('td.PalletReferenceNumber-' + (i + 1)).find('.input_PalletReferenceNumber ').val((i + 1));
      
        //  $('#tblItems > tbody > tr').find('td.Qty > input , td.Discount > input , td.UnitPrice > input').inputmask('decimal', { digits: 2 });
  


    }
    debugger;
    var val = $('#tblPackingDetails tbody td.Exporter input');
    $('#tblPackingDetails tbody td.Exporter input').val('Agro Green');
    //$('#tblPackingDetails > tbody > tr').find('td.Exporter').find('.input_Exporter ').val($('#tblPackingDetails > tbody > tr').find('td.Exporter').find('.input_Exporter ').attr('tag'));
    $('#tblPackingDetails > tbody > tr').find('td.CountryOfOrigin').find('.input_CountryOfOrigin ').val($('#tblPackingDetails > tbody > tr').find('td.CountryOfOrigin').find('.input_CountryOfOrigin ').attr('tag'));
    $('#tblPackingDetails > tbody > tr').find('td.ContainerNumber').find('.input_ContainerNumber ').val($("#txtContainer").val());

    $('#tblPackingDetails > tbody > tr').find('td.CustomerName').find('.selectCustomerName ').val(_CustomerID);
    $('#tblPackingDetails > tbody > tr').find('td.CustomerName').find('.selectCustomerName ').trigger("change");

    //$('#tblPackingDetails > tbody > tr').find('td.CustomerName').find('.selectCustomerName ').css({ "width": "100%" }).select2();
    $('#tblPackingDetails > tbody > tr').find('td.Commodity').find('.selectCommodity').css({ "width": "100%" }).select2();
    $('#tblPackingDetails > tbody > tr').find('td.Variety').find('.selectVariety ').css({ "width": "100%" }).select2();
    $('#tblPackingDetails > tbody > tr').find('td.Size').find('.selectSize').css({ "width": "100%" }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');

    //$("#tblPackingDetails").find("select").attr('onchange', 'CalculateAll(this);');
    $("#tblPackingDetails").find("input,button,textarea").attr('onblur', 'CalculateAll (this);  SetSize(this);');

    //$("#tblPackingDetails").find("input,button,textarea").attr('onblur', 'SetSize(this);');

    $("#tblPackingDetails").find(".selectMixedPallet").attr('onchange', 'AddinsertAfter(this);');

}


function FillinsertAfter(ItemSelect) {



    var  tr = $('#tblPackingDetails > tbody > tr.' + _cl);


    
    $(tr).find('td.Exporter ').find('.input_Exporter').val($(tr).find('td.Exporter').find('.input_Exporter').attr('value'));
    $(tr).find('td.CountryOfOrigin ').find('.input_CountryOfOrigin').val($(tr).find('td.CountryOfOrigin').find('.input_CountryOfOrigin').attr('tag'));
    $(tr).find('td.ContainerNumber').find('.input_ContainerNumber').val($(tr).find('td.ContainerNumber').find('.input_ContainerNumber').attr('tag'));
    $(tr).find('.input_PalletReferenceNumber').val($(tr).find('.input_PalletReferenceNumber').attr('tag'));


    //$(tr).find('td.MixedPallet').find('.selectMixedPallet').val($(tr).find('td.MixedPallet').find('.selectMixedPallet').attr('tag'));
    //$(tr).find('td.MixedPallet').find('.selectMixedPallet').trigger("change");

    //$(tr).find('td.Commodity').find('.selectCommodity').val($(tr).find('td.Commodity').find('.selectCommodity').attr('tag'));
    //$(tr).find('td.Commodity').find('.selectCommodity').trigger("change");

    //$(tr).find('td.Variety').find('.selectVariety').val($(tr).find('td.Variety').find('.selectVariety').attr('tag'));
    //$(tr).find('td.Variety').find('.selectVariety').trigger("change");

    //$(tr).find('td.PackType').find('.selectPackType').val($(tr).find('td.PackType').find('.selectPackType').attr('tag'));
    //$(tr).find('td.PackType').find('.selectPackType').trigger("change");


    $(tr).find('td.CustomerName').find('.selectCustomerName').val($(tr).find('td.CustomerName').find('.selectCustomerName').attr('tag'));
    $(tr).find('td.CustomerName').find('.selectCustomerName').trigger("change");


    $(tr).find('td.QtyBox').find('.input_QtyBox').val($(tr).find('td.QtyBox').find('.input_QtyBox').attr('tag'));
    $(tr).find('td.Size').find('.input_Size').val($(tr).find('td.Size').find('.input_Size').attr('tag'));



    //$(tr).find('td.ClassAB').find('.selectClassAB').val($(tr).find('td.ClassAB').find('.selectClassAB').attr('tag'));
    //$(tr).find('td.ClassAB').find('.selectClassAB').trigger("change");
    //$(tr).find('td.OrNot').find('.selectOrNot').val($(tr).find('td.OrNot').find('.selectOrNot').attr('tag'));
    //$(tr).find('td.OrNot').find('.selectOrNot').trigger("change");


    $(tr).find('td.ExtraSize').find('.input_ExtraSize').val($(tr).find('td.ExtraSize').find('.input_ExtraSize').attr('tag'));
    $(tr).find('td.Item13').find('.input_Item13').val($(tr).find('td.Item13').find('.input_Item13').attr('tag'));
    $(tr).find('td.Item14').find('.input_Item14').val($(tr).find('td.Item14').find('.input_Item14').attr('tag'));
    $(tr).find('td.Item15').find('.input_Item15').val($(tr).find('td.Item15').find('.input_Item15').attr('tag'));
    $(tr).find('td.Item16').find('.input_Item16').val($(tr).find('td.Item16').find('.input_Item16').attr('tag'));
    $(tr).find('td.Item17').find('.input_Item17').val($(tr).find('td.Item17').find('.input_Item17').attr('tag'));

    $(tr).find('td.TotalSize').find('.input_TotalSize').val($(tr).find('td.TotalSize').find('.input_TotalSize').attr('tag'));
    $(tr).find('td.TotalExtraSize').find('.input_TotalExtraSize').val($(tr).find('td.TotalExtraSize').find('.input_TotalExtraSize').attr('tag'));






    $(tr).find('td.GateInDetailsID').find('.input_GateInDetailsID').val($(tr).find('td.GateInDetailsID').find('.input_GateInDetailsID').attr('tag'));
    $(tr).find('td.PreGateInDetailsID').find('.input_PreGateInDetailsID').val($(tr).find('td.PreGateInDetailsID').find('.input_PreGateInDetailsID').attr('tag'));


    $(tr).find(".selectMixedPallet").attr('onchange', 'CalculateAll (this);');

}
var _cl = "";
var CI = 10;
function AddinsertAfter(ItemSelect) {
    debugger;

   
    var cl =  $(ItemSelect).closest('tr').attr('class');
    _cl = cl + CI;

    $("<tr class='" + cl + CI + "'>" + $('.' + cl).html()  ).insertAfter("." + cl);
    //$("<tr class='" + cl + CI + "'>" + $('.' + cl).html() + "<tr/>").insertAfter("." + cl);
   
    FillinsertAfter(ItemSelect);

    var tr = $('#tblPackingDetails > tbody > tr.' + cl);

   
    $(tr).find(".selectMixedPallet").attr('onchange', 'CalculateAll (this);');


}
function CalculateAll(ItemSelect) {

    debugger;
    var TotalSize = 0;
    var TotalExtraSize = 0;
    var Item13 = 0;
    var Item14 = 0;
    var Item15 = 0;
    var Item16 = 0;
    var Item17 = 0;
    var Item18 = 0;


    $("#tblPackingDetails>tbody>tr").each(function (i, tr) {

   


        TotalSize += parseFloat(IsNull($(tr).find('td.TotalSize .input_TotalSize').val(), 0)) * 1;
        $('#lblTotalSize').text(parseFloat(TotalSize));
        //$('#lblTotalSize').text(parseFloat(TotalSize).toFixed(0)); // للتحكم في الكسور 


        TotalExtraSize += parseFloat(IsNull($(tr).find('td.TotalExtraSize .input_TotalExtraSize').val(), 0)) * 1 ;
        $('#lblTotalExtraSize').text(TotalExtraSize);






        Item13 += parseFloat(IsNull($(tr).find('td.Item13 .input_Item13').val(), 0)).toFixed(0) * 1 ;
        $('#lblItem13').text(Item13);
        Item14 += parseFloat(IsNull($(tr).find('td.Item14 .input_Item14').val(), 0)).toFixed(0) *1 ;
        $('#lblItem14').text(Item14);
        //Item15 += parseFloat(IsNull($(tr).find('td.Item15 .input_Item15').val(), 0)).toFixed(0) * 1 ;
        //$('#lblItem15').text(Item15);
        //Item16 += parseFloat(IsNull($(tr).find('td.Item16 .input_Item16').val(), 0)).toFixed(0) * 1 ;
        //$('#lblItem16').text(Item16);
        Item17 += parseFloat(IsNull($(tr).find('td.Item17 .input_Item17').val(), 0)).toFixed(0) * 1;
        $('#lblItem17').text(Item17);
        Item18 += parseFloat(IsNull($(tr).find('td.QtyBox .input_QtyBox').val(), 0)).toFixed(0) * 1 ;
        $('#lblItem18').text(Item18);




    });
    //if ($('#tblPackingDetails > tbody > tr').length > 0) {
    //    //$('#tblItems > tbody > tr').each(function (i_items, tr_items) { });
    //    var tr = $(ItemSelect).closest("tr");



    //}
}
function SetSize(ItemSelect) {
    debugger;
    console.log(ItemSelect);
    console.log($(ItemSelect).is(".selectCommodity"));

    var tr = $(ItemSelect).closest("tr");
    var Size = IsNull($(tr).find('td.PackType .selectPackType').val(), 0);
    var percent = 0;
    if (Size !=0) {
         percent = Size == 6 ? .13
            : Size == 14.5 ? .11
                : Size == 15 ? .11
                    : Size == 500 ? .15
                        : Size == 550 ? .15
                             : Size == 575 ? .13043478260869565
                                 : Size == 590 ? 0.093220338983051
                            : .125;
    }


    $(tr).find('td.QtyBox .input_QtyBox').val(IsNull($(tr).find('td.QtyBox .input_QtyBox').val(), 0));
    if (Size == 590) {
     var percent = (645.0 / 590.0) - 1;
    }
    var ExtraSize = (Size *1) + (Size * percent);
    $(tr).find('td.ExtraSize .input_ExtraSize').val(IsNull( ExtraSize ,0 ) );

    $(tr).find('td.TotalSize .input_TotalSize').val(IsNull( (Size * 1) * $(tr).find('td.QtyBox .input_QtyBox').val() ,0 ));
    $(tr).find('td.TotalExtraSize .input_TotalExtraSize').val(IsNull($(tr).find('td.QtyBox .input_QtyBox').val() * $(tr).find('td.ExtraSize .input_ExtraSize').val() ,0) );


    CalculateAll(this);

}

function LoadST_Packing(GateInDetailsID) {
    debugger;
    LoadAll("/api/Packing/LoadST_Packing", "where GateInDetailsID IN (" + GateInDetailsID + ")"  , function (pTabelRows) {
        var Lenght = JSON.parse(pTabelRows); 
        if (Lenght != 0) { $('#btn-NewAdd').addClass("hide"); } else {
        $('#btn-NewAdd').removeClass("hide");
        }
        PackingMaster_BindTableRows(pTabelRows[0]);

    });
}

//function Packing_ClearAllControls() {
//    debugger;
//    return;
//    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
//    ClearAll("#PackingModal", null);
//    //  ArrDeleted = [];

//    // $('#slSubAccountID').html('');
//    //$("#btnSave").attr("onclick", "Packing_Update(false);");
//    //$("#btnSaveandNew").attr("onclick", "Packing_Insert(true);");
//    $("#cb-CheckAll").prop('checked', false);
//    $("#hID").val("0");

//    $('#slFiscalYearID').html("");

//    $('#slCustomerID').val("0");
//    $("#slCustomerID").trigger("change");

//    $('#slOperation').val("");
//    $("#slOperation").trigger("change");
//}






var RowsCounter = 0;
var ArrDeleted = [];

function DeleteDetails(This) {

    if ($(This).attr('tag') == "0" || $(This).attr('tag') == "" || $(This).attr('tag') == null) {
        $(This).closest('tr').remove();

    }
    else {
        swal({
            title: "Are you sure?",
            text: "The selected  will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            //callback function in case of success
            function () {
                ArrDeleted.push($(This).attr('tag'));
                $(This).closest('tr').remove();
            });

    }

}

function SetArrayOfItems() {
    // var cobjItem = null;
    debugger;
    var arrayOfItems = new Array();

    $("#tblPackingDetails>tbody>tr").each(function (i, tr) {
        debugger;
        var objItem = new Object();
        //objItem.ID = $(tr).attr('ID');
        objItem.ST_PackingID = $('#hID').val();
        objItem.Exporter = "Agro Green";
        //objItem.Exporter = $(tr).find('td.Exporter').find('.input_Exporter ').val();
        objItem.Country ="Egypt";
        //objItem.Country = $(tr).find('td.CountryOfOrigin').find('.input_CountryOfOrigin ').val();
        objItem.ContainerID = _ContainerID;
        objItem.ContainerNumber = $(tr).find('td.ContainerNumber').find('.input_ContainerNumber ').val();
        objItem.PalletRefNumber = $(tr).find('.input_PalletReferenceNumber ').val() ;
        objItem.MixedPallet = $(tr).find('td.MixedPallet').find('.selectMixedPallet').val() == 1 ? true : false ;
        objItem.CommodityID = $(tr).find('td.Commodity ').find('.selectCommodity').val();
        objItem.VarietyID = $(tr).find('td.Variety ').find('.selectVariety').val();
        objItem.Class = $(tr).find('td.Class ').find('.selectClass').val();
        objItem.PackType = $(tr).find('td.PackType').find('.selectPackType').val();
        objItem.CustomerID = _CustomerID;
        objItem.QuantityBoxes = IsNull($(tr).find('td.QtyBox').find('.input_QtyBox ').val(),0);
        objItem.Size = IsNull($(tr).find('td.Size').find('.selectSize').val(),0);
        //objItem.ClassAB = $(tr).find('td.ClassAB').find('.selectClassAB').val() == 1 ? true : false;;
        objItem.ClassAB = $(tr).find('td.ClassAB').find('.selectClassAB').val() == 1 ? true : false;
        objItem.OrNot = $(tr).find('td.OrNot').find('.selectOrNot').val() == 1 ? true : false;
        objItem.GateInDetailsID = _GateInDetailsID;
        objItem.PreGateInDetailsID = _PreGateInDetailsID;
        objItem.ExtraSize =       IsNull($(tr).find('td.ExtraSize').find('.input_ExtraSize').val()        ,0);
        objItem.NumOfPallet =     IsNull($(tr).find('td.Item13').find('.input_Item13').val()              ,0);
        objItem.NumOfAngles =     IsNull($(tr).find('td.Item14').find('.input_Item14').val()              ,0);
        objItem.BakrChamber =     IsNull($('#txtItem15').val() == "" ? "0" : $('#txtItem15').val() == "undefined" ? "0" : $('#txtItem15').val()           ,0); 
        objItem.ClipsChamber =    IsNull($('#txtItem16').val() == "" ? "0" : $('#txtItem16').val() == "undefined" ? "0" : $('#txtItem16').val()           ,0);
        objItem.PalletCover =     IsNull($(tr).find('td.Item17').find('.input_Item17').val()           ,0);
        objItem.TotalSize =       IsNull($(tr).find('td.TotalSize').find('.input_TotalSize').val()       ,0);
    objItem.TotalExtraSize = IsNull($(tr).find('td.TotalExtraSize').find('.input_TotalExtraSize').val(), 0);

        arrayOfItems.push(objItem);
    });

    debugger;
    return arrayOfItems;
}

function Details_AccountChanged(pRowID) {
    debugger;
    $("#slSubAccount" + pRowID).val(0);
    Details_FillSlSubAccount("slSubAccount" + pRowID, 0, $("#slAccount" + pRowID).val());
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
            if ($("#hDefaultUnEditableCompanyName").val() == "ERP") {
                //Start Auto Filter
                $("#" + pSlName).css({ "width": "80%" }).select2();
                $("div[tabindex='-1']").removeAttr('tabindex');
                $("#" + pSlName).trigger("change");
                //End Auto Filter
            }
            FadePageCover(false);
        }
        , null);
}
function Details_FillSlSubAccountInTable(THIS, ChildClass, pSubAccountID) {

    debugger;
    var ChildComboBox = $(THIS).closest('tr').find(ChildClass).find("select");
    Fill_SelectInput_WithDependedID("/api/ChartOfLinkingAccounts/FillUpdateSubAccount", "ID", "Name", "<--Select-->", ChildComboBox, pSubAccountID, $(THIS).val())
}
//function PackingDetails_BindTableRows(pID) {
//    debugger;
//    var LoadAccounts = $("#cbLoadAccounts").prop("checked");

//    if (pID != null) {
//        ClearAllTableRows("tblPackingDetails");
//        maxDetailsIDInTable = 0;
//        LoadAll("api/Packing/LoadPackingDetails", " where BudgetFiscalID = " + pID + " ", function (pitems) {
//            var items = JSON.parse(pitems);
//            FadePageCover(false);

//            $.each(items, function (i, item) {
//                maxDetailsIDInTable = (item.ID > maxDetailsIDInTable ? item.ID : maxDetailsIDInTable);
//                //debugger;
//                AppendRowtoTable("tblPackingDetails",
//                    ("<tr ID='" + item.ID + "'>"
//                        + "<td class=''> <button tag='" + item.ID + "' id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class=' btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
//                        + "<td class='AccountID' val='" + item.AccountID + "'>" + "<select tag='" + item.AccountID + "' id='slAccount" + maxDetailsIDInTable + "' onchange='Details_FillSlSubAccountInTable(this , \".SubAccountID\" ," + item.SubAccountID + ");' style='width:100%;' class='controlStyle selectaccountID'>" + $('#hidden_slAccount').html() + "</select>" + "</td>"
//                        + "<td class='SubAccountID' val='" + item.SubAccountID + "'>" + "<select tag='" + item.SubAccountID + "'id='slSubAccount" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle selectsubaccount'>" + "<option value=0>" + TranslateString("SelectFromMenu") + "</option>" + "</select>" + "</td>"
//                        + "<td class='Value' val='" + item.Value + "'>" + "<input tag='" + item.Value + "'  type='number' id='txtValue" + maxDetailsIDInTable + "' class='inputvalue input-sm  col-sm'>" + "</td>"
//                        + "</tr>"));


//                if (i == items.length - 1) {
//                    FillHTMLtblInputs("#tblPackingDetails > tbody");
//                    //if (i == items.length - 1) {
//                    //    var a = $('#tblPackingDetails > tbody > tr').length
//                    //    debugger;
//                    //    $.each($('#tblPackingDetails>tbody>tr'), function (j, tr) {
//                    //        try {
//                    //            var sl = $(tr).find('input[type=select]');
//                    //            console.log("sl" + sl.length)
//                    //            $.each($(tr).find('select'), function (i1, i_sl) {
//                    //                $(i_sl).val($(i_sl).attr('tag'));
//                    //            });
//                    //        } catch (ex1) { }
//                    //        //---------------------------------------------------------------------------------------------------------
//                    //        try {
//                    //            var nu = $(tr).find('input[type=number]');
//                    //            console.log("nu" + nu.length)
//                    //            $.each($(tr).find('input[type=number]'), function (i2, i_nu) {
//                    //                $(i_nu).val($(i_nu).attr('tag'));
//                    //            });
//                    //        } catch (ex2) { }
//                    //        //---------------------------------------------------------------------------------------------------------
//                    //        try {
//                    //            var txt = $(tr).find('input[type=text]');
//                    //            console.log("txt" + txt.length)
//                    //            $.each($(tr).find('input[type=text]'), function (i3, i_txt) {
//                    //                $(i_txt).val($(i_txt).attr('tag'));
//                    //            });
//                    //        } catch (ex3) { }
//                    //    });

//                    //*************************
//                    if (LoadAccounts) {
//                        LoadAll("api/Packing/LoadAccounts", " where IsMain = '" + 0 + "' and ID NOT IN(select bfd.AccountID from PackingDetails bfd where bfd.BudgetFiscalID = " + pID + "   ) ", function (pitems) {
//                            var items = JSON.parse(pitems);
//                            $.each(items, function (i, item) {

//                                AppendRowtoTable("tblPackingDetails",
//                                    ("<tr ID='" + 0 + "'>"
//                                        + "<td class=''> <button tag='0' id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class='  btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
//                                        + "<td class='AccountID' val='" + item.ID + "'>" + "<select tag='" + item.ID + "' id='slAccount" + maxDetailsIDInTable + "' onchange='Details_FillSlSubAccountInTable(this , \".SubAccountID\" ," + "0" + ");' style='width:100%;' class='controlStyle   selectaccountID'>" + $('#hidden_slAccount').html() + "</select>" + "</td>"
//                                        + "<td class='SubAccountID' val='" + "0" + "'>" + "<select tag='" + item.SubAccountID + "'id='slSubAccount" + maxDetailsIDInTable + "'  style='width:100%;' class='controlStyle  selectsubaccount'>" + "<option value=0>" + TranslateString("SelectFromMenu") + "</option>" + "</select>" + "</td>"
//                                        + "<td class='Value' val='" + "0" + "'>" + "<input tag='0'  type='number' class='inputvalue input-sm  col-sm'>" + "</td>"
//                                        + "</tr>"));
//                            });


//                        });
//                    }
//                    //*************************




//                }

//            });

//        });
//    }
//    else {
//        ClearAllTableRows("tblPackingDetails");

//        FadePageCover(false);
//        if (LoadAccounts) {
//            LoadAll("api/Packing/LoadAccounts", " where IsMain = '" + 0 + "' ", function (pitems) {
//                var items = JSON.parse(pitems);
//                $.each(items, function (i, item) {

//                    AppendRowtoTable("tblPackingDetails",
//                        ("<tr ID='" + 0 + "'>"
//                            + "<td class='hide'> <button tag='0' id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class='hide btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
//                            + "<td class='AccountID' val='" + item.ID + "'>" + "<select tag='" + item.ID + "' id='slAccount" + maxDetailsIDInTable + "' onchange='Details_FillSlSubAccountInTable(this , \".SubAccountID\" ," + 0 + ");' style='width:100%;' class='controlStyle selectaccountID'>" + $('#hidden_slAccount').html() + "</select>" + "</td>"
//                            + "<td class='SubAccountID' val='" + "0" + "'>" + "<select  id='slSubAccount" + maxDetailsIDInTable + "'tag='0'  style='width:100%;' class='controlStyle selectsubaccount'>" + "<option value=0>" + TranslateString("SelectFromMenu") + "</option>" + "</select>" + "</td>"
//                            + "<td class='Value' val='" + "0" + "'>" + "<input tag='0'  type='number' class='inputvalue input-sm  col-sm'>" + "</td>"
//                            + "</tr>"));
//                });


//            });
//        }

//    }
//}

function DeleteItems(This) {
    debugger;
    if ($(This).attr('tag') == "0" || $(This).attr('tag') == "" || $(This).attr('tag') == null) {
        $(This).closest('tr').remove();
        CalculateAll();
    }
    else {
        swal({
            title: "Are you sure?",
            text: "The selected  will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            //callback function in case of success
            function () {
                $(This).closest('tr').remove();
                CalculateAll();
            });
    }
  
}


var ItemsRowsCounter = 0;
function PackingMaster_BindTableRows(pItems) {
    debugger;

    var PrintText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";

    $("#hl-menu-SL").parent().addClass("active");
    ItemsRowsCounter = 0;
    ClearAllTableRows("tblBeforePackingDetails");
    $.each(JSON.parse(pItems), function (i, item) {

        debugger;

        AppendRowtoTable("tblBeforePackingDetails",
            ("<tr ID='" + item.ID + "' ondblclick='PackingDetails_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                + "<td class='Date' val='" + GetDateFromServer(item.Date) + "'>" + GetDateFromServer(item.Date) + "</td>"
                + "<td class='CustomerID' val='" + item.CustomerID + "'>" + item.CustomerName + "</td>"
                + "<td class='ContainerNumber ' val='" + item.ContainerNumber + "'>" + item.ContainerNumber + "</td>"
                + "<td class='Upload'><a  onclick='PrintDOc(" + item.ID + ");' " + PrintText + "</a></td>"
                + "<td class='ContainerID hide' val='" + item.ContainerID + "'>" + item.ContainerID + "</td>"
                + "<td class='PO hide' val='" + item.PO + "'>" + item.PO + "</td>"
                + "<td class='Lot hide' val='" + item.Lot + "'>" + item.Lot + "</td>"
                + "<td class='ST_PreGateInDetailsID hide' val='" + item.PreGateInDetailsID + "'>" + item.PreGateInDetailsID + "</td>"
                + "<td class='ID1 hide' val='" + item.ID + "'>" + item.ID + "</td>"
                + "<td class='StoreID hide' val='" + item.StoreID + "'>" + item.StoreID + "</td>"


                + "</tr>"));
        

        //  $('#tblItems > tbody > tr').find('td.Qty > input , td.Discount > input , td.UnitPrice > input').inputmask('decimal', { digits: 2 });
        ItemsRowsCounter++;
        //$("#tblPackingDetails").find("select").attr('onchange', 'CalculateTotalExpenses();');
        //$("#tblPackingDetails").find("input,button,textarea").attr('onblur', 'CalculateTotalExpenses();');

    });

}





function PackingDetails_BindTableRows(pItems) 
 {
    debugger;
    $("#hl-menu-SL").parent().addClass("active");
    ItemsRowsCounter = 0;
    ClearAllTableRows("tblPackingDetails");
    if (pDefaults.UnEditableCompanyName == "AGR") {
        $("#txtContainerID").val(JSON.parse(pItems)[0].ContainerID);
    }
    $.each(JSON.parse(pItems), function (i, item) {

        debugger;
        var item15 = item.BakrChamber;
        var item16 = item.ClipsChamber;

        $('#txtItem15').val(item15);
        $('#txtItem16').val(item16);
        var slCommodityHtml = $('#slCommodity').html();
        var slItemIDHtml = $('#slItemID').html();
        var slCustomerIDHtml = $('#slCustomerID').html();
        var slpackTypeHtml = $('#slPackType').html();

        AppendRowtoTable("tblPackingDetails",
            ("<tr id='" + (ItemsRowsCounter + 1) + "' Class='Row-" + (ItemsRowsCounter + 1) + "'>"
                + " <td class='btn-lightblue hide' style='font-size:15px;'> s </td>"
                + "<td class='id hide'> <input name='delete' type='checkbox' value='" + item.id + "' /></td>"

                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"

                // + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-deletedetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='deleteitems(" + (ItemsRowsCounter + 1) + "," + (item.id) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-undodeletedetails' type='button' onclick='undodeleteitems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                //+ "<td class='containerid hide' val='" + item.containerid + "'>" + "<input tag='" + item.containerid + "'   type='text' class='input_containerid input-sm  col-sm'>" + "</td>"
                + "<td class='Exporter hide' val='" + item.Exporter + "'>" + "<input disabled tag='" + item.Exporter + "'   type='text' class='input_Exporter input-sm  col-sm'>" + "</td>"
                + "<td class='CountryOfOrigin hide' val='" + item.Country + "'>" + "<input disabled tag='" + item.Country + "'   type='text' class='input_CountryOfOrigin input-sm  col-sm'>" + "</td>"
                + "<td class='ContainerNumber hide' val='" + item.ContainerNumber + "'>" + "<input disabled tag='" + item.ContainerNumber + "'   type='text' class='input_ContainerNumber input-sm  col-sm'>" + "</td>"
                + "<td class='PalletReferenceNumber-" + (ItemsRowsCounter + 1)+"' val='" + item.PalletRefNumber + "'>" + "<input disabled tag='" + item.PalletRefNumber + "'   type='text' class='input_PalletReferenceNumber input-sm  col-sm'>" + "</td>"
                + "<td class='MixedPallet' val='" + (item.MixedPallet == true ? 1 : 0) + "'>" + "<select   id='MixedPallet-" + (ItemsRowsCounter + 1) + "' tag='" + (item.MixedPallet == true ? 1 : 0 )+ "' class='input-sm  col-sm selectMixedPallet' >  <option value='1'>No</option> <option value='0'>Yes</option></select>" + "</td>"
                + "<td class='Commodity' val='" + item.CommodityID + "'>" + "<select id='Commodity-" + (ItemsRowsCounter + 1) + "' tag='" + item.CommodityID + "' class='input-sm  col-sm selectCommodity'>" + slCommodityHtml + "</select>" + "</td>"
                + "<td class='Variety' val='" + item.VarietyID + "'>" + "<select id='Variety-" + (ItemsRowsCounter + 1) + "' tag='" + item.VarietyID + "' class='input-sm  col-sm selectVariety'>" + slItemIDHtml + "</select>" + "</td>"
                + "<td class='Class ' val='" + item.Class + "'>" + "<select  tag='" + item.Class + "' id='class-" + (i + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectClass'><option value='0' selected> < -- select class -- >  </option> <option value='Class A' >  Class A   </option> <option value='Class B' >  Class B   </option> <option value='Class C' >  Class C   </option> </select></td>"
                + "<td class='CustomerName hide' val='" + item.CustomerID + "'>" + "<select disabled id='CustomerName-" + (ItemsRowsCounter + 1) + "' tag='" + item.CustomerID + "' class='input-sm  col-sm selectCustomerName'>" + slCustomerIDHtml + "</select>" + "</td>"
                + "<td class='PackType' val='" + item.PackType + "'>" + "<select onchange='SetSize(this);' id='PackType-" + (ItemsRowsCounter + 1) + "' tag='" + item.PackType + "' class='input-sm  col-sm selectPackType'>" + slpackTypeHtml + "</select>" + "</td>"

                + "<td class='Size' val='" + item.Size + "'>" + "<select id='Size' tag='" + item.Size + "' class='input-sm  col-sm selectSize' > <option value='50g-300g' >  50g-300g   </option> <option value='80g-300g' >  80g-300g   </option> <option value='100g-150g'>	100g-150g  </option> <option value='100g-300g'>	100g-300g  </option> <option value='100g-800g'>	100g-800g  </option> <option value='150g-300g'>	150g-300g  </option> <option value='250g-350g'>	250g-350g  </option> <option value='300g-450g'>	300g-450g  </option> <option value='300g-800g'>	300g-800g  </option> <option value='450g-600g'>	450g-600g  </option> <option value='600g-800g'>	600g-800g  </option> <option value='800g-200g'>	200g-800g </option><option value='800g-1000g'>	800g-1000g  </option><option value='1000g-1200g'>	1000g-1200g  </option><option value='1200g-1500g'>	1200g-1500g  </option><option value='1500g-1950g'>	1500g-1950g  </option><option value='800g-2000g'>	800g-2000g  </option><option value='50g-100g'>	50g-100g  </option><option value='150g-450g'>150g-450g</option></select>" + "</td>"

                + "<td class='ClassAB hide' val='" + item.ClassAB + "'>" + "<select id='ClassAB' tag='" + item.ClassAB + "' class='input-sm  col-sm selectClassAB' > <option value='true'>A</option> <option value='false'>B</option></select>" + "</td>"
                + "<td class='OrNot' val='" + (item.OrNot == true ? 1 : 0) + "'>" + "<select id='OrNot' tag='" + (item.OrNot == true ? 1 : 0  ) + "' class='input-sm  col-sm selectOrNot' > <option value='1'>Organic</option> <option value='0'>Conventional</option> </select>" + "</td>"
                + "<td class='QtyBox' val='" + item.QuantityBoxes + "'>" + "<input tag='" + item.QuantityBoxes + "'   type='text' class='input_QtyBox input-sm  col-sm'>" + "</td>"



                + "<td class='ExtraSize' val='" + item.ExtraSize + "'>" + "<input disabled tag='" + item.ExtraSize + "'   type='text' class='input_ExtraSize input-sm  col-sm'>" + "</td>"
                + "<td class='Item13' val='" + item.NumOfPallet + "'>" + "<input tag='" + item.NumOfPallet + "'   type='text' class='input_Item13 input-sm  col-sm'>" + "</td>"
                + "<td class='Item14' val='" + item.NumOfAngles + "'>" + "<input tag='" + item.NumOfAngles + "'   type='text' class='input_Item14 input-sm  col-sm'>" + "</td>"
                + "<td class='Item15 hide ' val='" + item.BakrChamber + "'>" + "<input tag='" + item.BakrChamber + "'   type='text' class='input_Item15 input-sm  col-sm'>" + "</td>"
                + "<td class='Item16 hide ' val='" + item.ClipsChamber + "'>" + "<input tag='" + item.ClipsChamber + "'   type='text' class='input_Item16 input-sm  col-sm'>" + "</td>"
                + "<td class='Item17' val='" + item.PalletCover + "'>" + "<input tag='" + item.PalletCover   + "'   type='text' class='input_Item17 input-sm  col-sm'>" + "</td>"
                + "<td class='TotalSize' val='" + item.TotalSize + "'>" + "<input disabled tag='" + item.TotalSize + "'   type='text' class='input_TotalSize input-sm  col-sm'>" + "</td>"
                + "<td class='TotalExtraSize' val='" + item.TotalExtraSize + "'>" + "<input disabled tag='" + item.TotalExtraSize + "'   type='text' class='input_TotalExtraSize input-sm  col-sm'>" + "</td>"


           



                + "<td class='GateInDetailsID hide' val='" + item.GateInDetailsID + "'>" + "<input tag='" + item.GateInDetailsID + "'   type='text' class='input_GateInDetailsID input-sm  col-sm'>" + "</td>"
                + "<td class='PreGateInDetailsID hide' val='" + item.PreGateInDetailsID + "'>" + "<input tag='" + item.PreGateInDetailsID + "'   type='text' class='input_PreGateInDetailsID input-sm  col-sm'>" + "</td>"
                + "<td class='ContainerID hide' val='" + item.ContainerID + "'>" + "<input disabled tag='" + item.ContainerID + "'   type='text' class='input_ContainerID input-sm  col-sm'>" + "</td>"
                + "<td class='CustomerID hide' val='" + item.CustomerID + "'>" + "<input disabled tag='" + item.CustomerID + "'   type='text' class='input_CustomerID input-sm  col-sm'>" + "</td>"

                + "</tr>"));

        //  $('#tblItems > tbody > tr').find('td.Qty > input , td.Discount > input , td.UnitPrice > input').inputmask('decimal', { digits: 2 });
        ItemsRowsCounter++;

        $('#tblPackingDetails > tbody > tr').find('td.Commodity').find('.selectCommodity').css({ "width": "100%" }).select2();
        $('#tblPackingDetails > tbody > tr').find('td.Variety').find('.selectVariety ').css({ "width": "100%" }).select2();
        $('#tblPackingDetails > tbody > tr').find('td.Size').find('.selectSize ').css({ "width": "100%" }).select2();
        $("div[tabindex='-1']").removeAttr('tabindex');

        //$("#tblPackingDetails").find("select").attr('onchange', 'CalculateTotalExpenses();');
     
        $("#tblPackingDetails").find("input,button,textarea").attr('onblur', 'CalculateAll (this);  SetSize(this);')

    });


    setTimeout(function () {
        FillItemsData();
        //  SL_HideShowEditBtns(_IsApproved);
    }, 300);

}

function FillItemsData() {

    $($('#tblPackingDetails > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.Exporter ').find('.input_Exporter').val($(tr).find('td.Exporter').find('.input_Exporter').attr('tag'));
        $(tr).find('td.CountryOfOrigin ').find('.input_CountryOfOrigin').val($(tr).find('td.CountryOfOrigin').find('.input_CountryOfOrigin').attr('tag'));
        $(tr).find('td.ContainerNumber').find('.input_ContainerNumber').val($(tr).find('td.ContainerNumber').find('.input_ContainerNumber').attr('tag'));
        $(tr).find('td.PalletReferenceNumber-'+(i + 1)).find('.input_PalletReferenceNumber').val($(tr).find('td.PalletReferenceNumber-'+(i + 1)).find('.input_PalletReferenceNumber').attr('tag'));

        $(tr).find('td.MixedPallet').find('.selectMixedPallet').val($(tr).find('td.MixedPallet').find('.selectMixedPallet').attr('tag'));
        $(tr).find('td.MixedPallet').find('.selectMixedPallet').trigger("change");

        $(tr).find('td.Commodity').find('.selectCommodity').val($(tr).find('td.Commodity').find('.selectCommodity').attr('tag'));
        $(tr).find('td.Commodity').find('.selectCommodity').trigger("change");

        $(tr).find('td.Variety').find('.selectVariety').val($(tr).find('td.Variety').find('.selectVariety').attr('tag'));
        $(tr).find('td.Variety').find('.selectVariety').trigger("change");


        $(tr).find('td.Class').find('.selectClass').val($(tr).find('td.Class').find('.selectClass').attr('tag'));
        $(tr).find('td.Class').find('.selectClass').trigger("change");

        $(tr).find('td.PackType').find('.selectPackType').val($(tr).find('td.PackType').find('.selectPackType').attr('tag'));
        $(tr).find('td.PackType').find('.selectPackType').trigger("change");


        $(tr).find('td.CustomerName').find('.selectCustomerName').val($(tr).find('td.CustomerName').find('.selectCustomerName').attr('tag'));
        $(tr).find('td.CustomerName').find('.selectCustomerName').trigger("change");


        $(tr).find('td.QtyBox').find('.input_QtyBox').val($(tr).find('td.QtyBox').find('.input_QtyBox').attr('tag'));
        $(tr).find('td.Size').find('.selectSize').val($(tr).find('td.Size').find('.selectSize').attr('tag'));
        $(tr).find('td.Size').find('.selectSize').trigger("change");



        $(tr).find('td.ClassAB').find('.selectClassAB').val($(tr).find('td.ClassAB').find('.selectClassAB').attr('tag'));
        $(tr).find('td.ClassAB').find('.selectClassAB').trigger("change");
        $(tr).find('td.OrNot').find('.selectOrNot').val($(tr).find('td.OrNot').find('.selectOrNot').attr('tag') == true  ? 1 : 0 );
        $(tr).find('td.OrNot').find('.selectOrNot').trigger("change");


        $(tr).find('td.ExtraSize').find('.input_ExtraSize').val($(tr).find('td.ExtraSize').find('.input_ExtraSize').attr('tag'));
        $(tr).find('td.Item13').find('.input_Item13').val($(tr).find('td.Item13').find('.input_Item13').attr('tag'));
        $(tr).find('td.Item14').find('.input_Item14').val($(tr).find('td.Item14').find('.input_Item14').attr('tag'));
        $(tr).find('td.Item15').find('.input_Item15').val($(tr).find('td.Item15').find('.input_Item15').attr('tag'));
        $(tr).find('td.Item16').find('.input_Item16').val($(tr).find('td.Item16').find('.input_Item16').attr('tag'));
        $(tr).find('td.Item17').find('.input_Item17').val($(tr).find('td.Item17').find('.input_Item17').attr('tag'));

        $(tr).find('td.TotalSize').find('.input_TotalSize').val($(tr).find('td.TotalSize').find('.input_TotalSize').attr('tag'));
        $(tr).find('td.TotalExtraSize').find('.input_TotalExtraSize').val($(tr).find('td.TotalExtraSize').find('.input_TotalExtraSize').attr('tag'));






        $(tr).find('td.GateInDetailsID').find('.input_GateInDetailsID').val($(tr).find('td.GateInDetailsID').find('.input_GateInDetailsID').attr('tag'));
        $(tr).find('td.PreGateInDetailsID').find('.input_PreGateInDetailsID').val($(tr).find('td.PreGateInDetailsID').find('.input_PreGateInDetailsID').attr('tag'));

        $("#txtDate").val(getTodaysDateInddMMyyyyFormat());

        
       
        $("#slCustomerID").val($(tr).find("td.CustomerID").attr('val'));
        $("#slStore").val(_StoreID);
        $("#slStore").trigger("change");
        $("#txtContainer").val($(tr).find("td.ContainerNumber").attr('val'));
        $("#txtPO").val(_PO);
        $("#txtLot").val(_Lot);
        $("#txtExporter").val("Agro Green");
        $("#txtCountryOfOrigin").val("Egypt");


        _GateInDetailsID = $(tr).find("td.GateInDetailsID").attr('val');
        _ContainerID = $(tr).find("td.ContainerID").attr('val');
        _PreGateInDetailsID = $(tr).find("td.PreGateInDetailsID").attr('val');
        _CustomerID = $(tr).find("td.CustomerID").attr('val');
        
        _ContainerNumber = $(tr).find("td.ContainerNumber").attr('val');
        $("#slCustomerID").trigger("change");
      
        $("#slOperation").trigger("change");


        CalculateAll(this);

     
        
    });

    $("#tblPackingDetails").find(".selectMixedPallet").attr('onchange', 'AddinsertAfter(this);');

    //setTimeout(function () {
    //    CalculateAll();
    //}, 30);
}

function LoadAccounts() {
    debugger;
    var LoadAccounts = $("#cbLoadAccounts").prop("checked");
    if (LoadAccounts) {
        LoadAll("api/Packing/LoadAccounts", " where IsMain = '" + 0 + "' ", function (pitems) {
            var items = JSON.parse(pitems);
            $.each(items, function (i, item) {

                AppendRowtoTable("tblPackingDetails",
                    ("<tr ID='" + 0 + "'>"
                        + "<td class=''> <button tag='0' id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class=' btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                        + "<td class='AccountID' val='" + item.ID + "'>" + "<select tag='" + item.ID + "' id='slAccount" + maxDetailsIDInTable + "' onchange='Details_FillSlSubAccountInTable(this , \".SubAccountID\" ," + "0" + ");'  style='width:100%;' class='controlStyle selectaccountID'>" + $('#hidden_slAccount').html() + "</select>" + "</td>"
                        + "<td class='SubAccountID' val='" + "0" + "'>" + "<select  id='slSubAccount" + maxDetailsIDInTable + "'tag='0'  style='width:100%;' class='controlStyle selectsubaccount'>" + "<option value=0>" + TranslateString("SelectFromMenu") + "</option>" + "</select>" + "</td>"
                        + "<td class='Value' val='" + "0" + "'>" + "<input tag='0'  type='number' class='inputvalue input-sm  col-sm'>" + "</td>"
                        + "</tr>"));

                if (i == items.length - 1)
                    FillHTMLtblInputs("#tblPackingDetails > tbody");
            });



        });
    }
    //if (Boolean(ShowSubAccount) == true)
    //{
    //    $("#btnAddDetails").removeClass("hide");
    //    $("#tblPackingDetailsWithSubAccount").removeClass("hide");
    //    $("#tblPackingDetails").addClass("hide");
    //}
    //else
    //{
    //    $("#btnAddDetails").addClass("hide");
    //    $("#tblPackingDetailsWithSubAccount").addClass("hide");      
    //    $("#tblPackingDetails").removeClass("hide");
    //}



}
//---------------------------------------------------------------------------------

function PrintDOc(ID) {
    debugger;

    _print = 1;
    LoadPackingDetails(ID)
}

var _print = 0;
function LoadPackingDetails(ID) {
    debugger;
    //$.getJSON("/api/Packing/LoadAccounts", { pWhereClause: "where OperationID = " + $('#slOperation').val() }, function (Result) {
    //    if (Result.length > 0) {
    //        PackingDetails_BindTableRows(Result[0]);
    //    }
    //});


    if (_print == 1) {

        LoadAll("api/Packing/LoadPackingDetails", "where ST_PackingID =" + ID, function (pTabelRows) {
            Packing_print(pTabelRows);

        });
       
    }


    else {
        $("#hID").val(ID);
        LoadAll("api/Packing/LoadPackingDetails", "where ST_PackingID = " + ID, function (pTabelRows) {
            PackingDetails_BindTableRows(pTabelRows[0]);

        });

    }


  
   
}



function Packing_print(data) {
    debugger;
   
    var ptblDetails = JSON.parse(data[0]);
    var EntryDate = data[1];

        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Packing'  +  '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '        <div style="margin-top: 15px;" class="col-xs-12 text-center text-ul m-t-n-lg"> <img  style = " width: 350px; float: left; display: block;" src="/Content/Images/CompanyHeader.jpg" alt="logo"/> </br>';
    ReportHTML += '            <h1 style="display: block; float: left; margin-left: 500;" >' + 'Packing' + '</h1></div> </br>';



        ReportHTML += '</br> </br></br></br></br></br></br> '
    ReportHTML += '</br> </br> '

    ReportHTML += '     <div style = "font-size : 15px ;" class="col-xs-4 m-t-n"><b>Exporter :</b> ' + ptblDetails[0].Exporter + '</div>'
    ReportHTML += '     <div style = "font-size : 15px ;" class="col-xs-4 m-t-n"><b>Country Of Orgin :</b> ' + ptblDetails[0].Country + '</div>'
    ReportHTML += '     <div style = "font-size : 15px ;" class="col-xs-4 m-t-n"><b>Container Number :</b> ' + ptblDetails[0].ContainerNumber + '</div>'
    ReportHTML += '  <br/><br/>'
    ReportHTML += '     <div style = "font-size : 15px ;" class="col-xs-4 m-t-n"><b>Customer :</b> ' + ptblDetails[0].CustomerName + '</div>'
    ReportHTML += '     <div style = "font-size : 15px ;" class="col-xs-4 m-t-n"><b>Entry Date :</b> ' + (pDefaults.UnEditableCompanyName == "AGR" ? EntryDate : ConvertDateFormat(GetDateWithFormatMDY(ptblDetails[0].EntryDate))) + '</div>'
    ReportHTML += '     <div style = "font-size : 15px ;background: #67bf67;" class="col-xs-4 m-t-n"><b>PO :</b> ' + $('#tblBeforePackingDetails > tbody > tr').find('td.PO').text() + '</div>'
    ReportHTML += '</br> </br> '
    ReportHTML += '     <div style = "font-size : 15px ;" class="col-xs-4 m-t-n"><b>Lot :</b> ' + ptblDetails[0].Lot + '</div>'

    ReportHTML += '  <br/><br/>'
    ReportHTML += '     <div style = "font-size : 15px ;" class="col-xs-4 m-t-n"><b>Date Of Print :</b> ' + getTodaysDateInddMMyyyyFormat() + '</div>'

        //--------------------- 2ND ROW TABLE 
    ReportHTML += ' </br> </br> '
    ReportHTML += ' <table id="tblDetailsReport" style="background-color: #d0cece;width: 91%; font-size: 16px; margin-left: 85px;" class="table b-light b-a text-sm table-bordered"> '
    ReportHTML += ' <thead style = "background: #67bf67;" > <tr> '
        //ReportHTML += '   <th>' + 'Exporter ' + '</th> '
        //ReportHTML += '   <th>' + 'Country Of Orgin' + '</th> '
        //ReportHTML += '   <th>' + 'Container Number' + '</th> '
        ReportHTML += '   <th>' + 'Pallet Reference' + '</th> '
        ReportHTML += '   <th>' + 'Mixed Pallet' + '</th> '
        ReportHTML += '   <th>' + 'Commodity' + '</th> '
        ReportHTML += '   <th>' + 'Variety' + '</th> '
        ReportHTML += '   <th>' + 'Packtype' + '</th> '
        //ReportHTML += '   <th>' + 'Customer' + '</th> '
        ReportHTML += '   <th>' + 'Quantity (boxes) ' + '</th> '
        ReportHTML += '   <th>' + 'Size' + '</th> '
        ReportHTML += '   <th>' + 'Or Not' + '</th> '
        ReportHTML += '    </tr>  </thead>   '
        ReportHTML += ' <tbody> '

    var TotalQTY = 0;
    var TotalPackType = 0;
    var TotalSize = 0;
    var TotalExtraSize = 0;
    for (var i = 0; i < ptblDetails.length; i++) {
        ReportHTML += '          <tr class="" style="background-color: white !important;">  '
        //ReportHTML += ' <td>' + ptblDetails[i].Exporter + ' </td>'
        //ReportHTML += ' <td>' + ptblDetails[i].Country + ' </td>'
        //ReportHTML += ' <td>' + ptblDetails[i].ContainerNumber + ' </td>'
        ReportHTML += ' <td>' + ptblDetails[i].PalletRefNumber + ' </td>'
        var MixedPallet = ptblDetails[i].MixedPallet == false ? "Yes" : "No"
        ReportHTML += ' <td>' + MixedPallet + ' </td>'
        ReportHTML += ' <td>' + ptblDetails[i].CommodityName + ' </td>'
        ReportHTML += ' <td>' + ptblDetails[i].VarietyName + ' </td>'
        ReportHTML += ' <td>' + ptblDetails[i].PackType + ' </td>'
        //ReportHTML += ' <td>' + ptblDetails[i].CustomerName + ' </td>'
        ReportHTML += ' <td>' + ptblDetails[i].QuantityBoxes + ' </td>'
        ReportHTML += ' <td>' + ptblDetails[i].Size + ' </td>'
        ReportHTML += ' <td>' + (ptblDetails[i].OrNot == true ? "Organic" : "Conventional") + ' </td>'

        ReportHTML += '           </tr>    '

        TotalQTY = parseFloat(TotalQTY) + parseFloat(ptblDetails[i].QuantityBoxes);
        TotalPackType = parseFloat(TotalPackType) + parseFloat(ptblDetails[i].PackType);
        TotalSize = parseFloat(TotalSize) + parseFloat(ptblDetails[i].TotalSize);
        TotalExtraSize = parseFloat(TotalExtraSize) + parseFloat(ptblDetails[i].TotalExtraSize);
        
    }

    ReportHTML += '          <tr  style = "background: #67bf67;" >'
    ReportHTML += ' <td background-color: #d0cece; > </td>'
    ReportHTML += ' <td background-color: #d0cece; > </td>'
    ReportHTML += ' <td background-color: #d0cece; > Total Net Weight = ' + TotalSize.toFixed(3) + ' </td>'
    ReportHTML += ' <td background-color: #d0cece; > Total Gross Weight = ' + TotalExtraSize.toFixed(3) + ' </td>'
    ReportHTML += ' <td background-color: #d0cece;  ></td>'
    ReportHTML += ' <td background-color: #d0cece; >' + TotalQTY + ' </td>'
    ReportHTML += ' <td background-color: #d0cece; > </td>'
    ReportHTML += ' <td background-color: #d0cece; > </td>'
    ReportHTML += '           </tr>    '



        ReportHTML += '                        </tbody>                         </table>   '




        ReportHTML += '         </body>';

        ReportHTML += '     <footer class="footer col-xs-12 hide" style="width:100%; position:absolute; bottom:0;">';


        ReportHTML += '     <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        ReportHTML += '     </footer>';


        ReportHTML += '</html>';
       
            var mywindow = window.open('', '_blank');
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
   
      

    



}














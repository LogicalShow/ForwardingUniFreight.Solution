// City Country ---------------------------------------------------------------
// Bind I_PriceList Table Rows
function I_PriceList_BindTableRows(pI_PriceList) {
    debugger;
    $("#hl-menu-SL_MasterData").parent().addClass("active");
    ClearAllTableRows("tblI_PriceList");
    $.each(pI_PriceList, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblI_PriceList",
        ("<tr ID='" + item.ID + "' ondblclick='I_PriceList_EditByDblClick(" + item.ID + ");'>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Name' val='" + item.Name + "'>" + item.Name + "</td>"
            //+ "<td class='AccountID' val='" + item.AccountID + "'>" + item.AccountName + "</td>"
            //+ "<td class='SubAccountID' val='" + item.SubAccountID + "'>" + (item.SubAccountName == "0" ? "-" : item.SubAccountName )  + "</td>"
            //+ "<td class='CostCenterID hide' val='" + item.CostCenterID + "'>" + "0" + "</td>"
            + "<td class='hI_PriceList'><a href='#I_PriceListModal' data-toggle='modal' onclick='I_PriceList_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblI_PriceList", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblI_PriceList>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function I_PriceList_EditByDblClick(pID) {
    jQuery("#I_PriceListModal").modal("show");
    I_PriceList_FillControls(pID);
}
// Loading with data
function I_PriceList_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/I_PriceList/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { I_PriceList_BindTableRows(pTabelRows); I_PriceList_ClearAllControls(); });
    HighlightText("#tblI_PriceList>tbody>tr", $("#txt-Search").val().trim());
}

//var IsOldName = "0";

function I_PriceList_Insert(pSaveandAddNew) {

  
    //$('#hidden_slstoresnames > option').each(function (i, option)
    //{
    //    if ($(option).text().trim().toUpperCase() == $("#txtStoreName").val().trim().toUpperCase()) {
    //      //  IsOldName = "1";
    //        swal("Sorry", "The Store Name is duplicated in the System", "warning");
    //        return false;

    //    }
    //    else if (i == ($('#hidden_slstoresnames > option').length - 1))
    ////    {
    //if ($('#slSubAccountID option').length > 1 && $('#slSubAccountID').val() == "0") {

    //    swal("Excuse me", "You must select SubAccount", "warning");

    //}
    //else {
        debugger;
        InsertUpdateFunction("form", "/api/I_PriceList/Insert", {
            pName: $("#txtName").val().trim().toUpperCase()
            //pAccountID: $("#slAccountID").val().trim(),
            //pSubAccountID: $("#slSubAccountID").val().trim()
        }, pSaveandAddNew, "I_PriceListModal", function () {
                I_PriceList_LoadingWithPaging();
                //IntializeData();
            });
   // }
    //    }

    //});


}


function I_PriceList_Update(pSaveandAddNew) {


    //$('#hidden_slstoresnames > option').each(function (i, option)
    //{
    //    if ($(option).text().trim().toUpperCase() == $("#txtStoreName").val().trim().toUpperCase()) {
    //      //  IsOldName = "1";
    //        swal("Sorry", "The Store Name is duplicated in the System", "warning");
    //        return false;

    //    }
    //    else if (i == ($('#hidden_slstoresnames > option').length - 1))
    //    {
    //if ($('#slSubAccountID option').length > 1 && $('#slSubAccountID').val() == "0") {

    //    swal("Excuse me", "You must select SubAccount", "warning");

    //}
    //else {
        debugger;
        InsertUpdateFunction("form", "/api/I_PriceList/Update", {
            pID: $("#hID").val(),
            pName: $("#txtName").val().trim().toUpperCase(),
        }, pSaveandAddNew, "I_PriceListModal", function () {
            I_PriceList_LoadingWithPaging();
            //IntializeData();
        });
        //    }

        //});

    //}
}




//function Fill_SelectInputAfterLoadData_WithAttr(data, ID_Name, Item_Name, Title, SelectInput_ID, Selected_ID, AttrItemName) {
//    var option = "";
//    if (Title != null)
//        option += '<option ' + AttrItemName + ' = "' + 0 + '" value="' + 0 + '" selected "> ' + Title + '</option>';
//    $.each(JSON.parse(data), function (i, item) {
//        // console.log(item[ID_Name]);


//        if (item[ID_Name] == Selected_ID) {

//            option += '<option ' + AttrItemName + ' = "' + item[AttrItemName] + '" value="' + item[ID_Name] + '" selected "> ' + (item[Item_Name]).trim() + '</option>';

//        }
//        else {
//            option += '<option ' + AttrItemName + ' = "' + item[AttrItemName] + '" value="' + item[ID_Name] + '"  "> ' + (item[Item_Name]).trim() + '</option>';
//        }
//    });


//    $(SelectInput_ID).html("");
//    $(SelectInput_ID).append(option);

//}









function I_PriceList_Delete(pID) {
    DeleteListFunction("/api/I_PriceList/DeleteByID", { "pID": pID }, function () { I_PriceList_LoadingWithPaging(); });
}

function I_PriceList_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblI_PriceList') != "")
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
            DeleteListFunction("/api/I_PriceList/Delete", { "pI_PriceListIDs": GetAllSelectedIDsAsString('tblI_PriceList') }, function () { I_PriceList_LoadingWithPaging(); });
        });
        //DeleteListFunction("/api/I_PriceList/Delete", { "pI_PriceListIDs": GetAllSelectedIDsAsString('tblI_PriceList') }, function () { I_PriceList_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function I_PriceList_FillControls(pID) {
    debugger;
    ClearAll("#I_PriceListModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");
    $("#txtName").val($(tr).find("td.Name").attr('val').toUpperCase());
   // $("#slAccountID").val($(tr).find("td.AccountID").attr('val'));
  //  Fill_SelectInput_WithDependedID("api/I_PriceList/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", $(tr).find("td.SubAccountID").attr('val'), $(tr).find("td.AccountID").attr('val'));

    //$("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));
    $("#btnSave").attr("onclick", "I_PriceList_Update(false);");
    $("#btnSaveandNew").attr("onclick", "I_PriceList_Update(true);");
}

function I_PriceList_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#I_PriceListModal", null);
   // $('#slSubAccountID').html('');
    $("#btnSave").attr("onclick", "I_PriceList_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "I_PriceList_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}


function GetSubAccount()
{
    //Fill_SelectInputAfterLoadData(d[1], 'ID', , '<-- select SubAccount -->', '#hidden_slSubAccountID', '');

    Fill_SelectInput_WithDependedID("api/I_PriceList/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", null, $('#slAccountID').val());
}
//*******************************************************************************************************************************************************************************************
var ItemID = "0"
var PriceListID = "0";
var PriceListItemID = "0";
var price = 0.00;
var ArrObj = new Array();
var counter = 0;
var ItemName = "";


function IntializeData() {

    FadePageCover(false);
    $.ajax({
        type: "GET",
        url: strServerURL + "api/I_PriceList/IntializeData",
        data: { pID: null },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData_WithMultiAttrUpperCase(d[0], 'ID', 'Name', '<-- select Items -->', '#hidden_slItems', '', 'Name');
            Fill_SelectInputAfterLoadData_WithMultiAttrUpperCase(d[1], 'ID', 'Name', '<-- select SubAccount -->', '#hidden_slPriceList', '', 'Name');
            Fill_SelectInputAfterLoadData_WithMultiAttrWithoutName(d[2], 'ID', 'Name', 'xxxxxxxxxx', '#hidden_slPriceListItems', '', 'PriceListID,ItemID');
            // Fill_SelectInputAfterLoadData(d[1], 'ID', 'SubAccount_Name', '<-- select SubAccount -->', '#hidden_slSubAccountID', '');


            //hidden_slPriceList
            //hidden_slPriceListItems

            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });




}

function Fill_SelectInputAfterLoadData_WithMultiAttrWithoutName(data, ID_Name, Item_Name, Title, SelectInput_ID, Selected_ID, AttrItemNames) {
    var selectAttrs = "";
    var option = "";
    if (Title != null)
        option += '<option value="' + 0 + '" selected "> ' + Title + '</option>';
    $.each(JSON.parse(data), function (i, item) {
        // console.log(item[ID_Name]);
        selectAttrs = "";
        $(AttrItemNames.split(",")).each(function (attrindex, attr) {
            // element == this
            selectAttrs += ' ' + attr + ' = "' + item[attr] + '" ';
            if (attrindex == AttrItemNames.split(",").length - 1) {
                if (item[ID_Name] == Selected_ID) {
                    option += '<option' + selectAttrs + ' value="' + item[ID_Name] + '" selected> ' + '' + '</option>';
                }
                else {
                    option += '<option' + selectAttrs + ' value="' + item[ID_Name] + '"> ' +''+ '</option>';
                }
            }
        });
    });
    $(SelectInput_ID).html("");
    $(SelectInput_ID).append(option);
}



function Fill_SelectInputAfterLoadData_WithMultiAttrUpperCase(data, ID_Name, Item_Name, Title, SelectInput_ID, Selected_ID, AttrItemNames) {
    var selectAttrs = "";
    var option = "";
    if (Title != null)
        option += '<option value="' + 0 + '" selected "> ' + Title + '</option>';
    $.each(JSON.parse(data), function (i, item) {
        // console.log(item[ID_Name]);
        selectAttrs = "";
        $(AttrItemNames.split(",")).each(function (attrindex, attr) {
            // element == this
            selectAttrs += ' ' + attr + ' = "' + (item[attr]).trim().toUpperCase() + '" ';
            if (attrindex == AttrItemNames.split(",").length - 1) {
                if (item[ID_Name] == Selected_ID) {
                    option += '<option' + selectAttrs + ' value="' + item[ID_Name] + '" selected> ' + (item[Item_Name]).trim().toUpperCase() + '</option>';
                }
                else {
                    option += '<option' + selectAttrs + ' value="' + item[ID_Name] + '"> ' + (item[Item_Name]).trim().toUpperCase() + '</option>';
                }
            }
        });
    });
    $(SelectInput_ID).html("");
    $(SelectInput_ID).append(option);
}





var NoError = true;

function InsertPriceListFromExcel()
{
    ArrObj = [];
    ItemID = "0";
    PriceListID = "0";
    PriceListItemID = "0";
    counter = 0;
    ItemName = "";
    NoError = true;
    $("#tblExcel tr").each(function (i, tr)
    {

        /// [1] 
        var tr0 = $("#tblExcel").find("tr")[0];

        if (i == 0)
        {
            tr0 = tr;

        }
        else
        {
         

            $(tr).find("td").each(function (tdi, td) {


                console.log($(td).index() + "  td index");

                if ($(td).index() == 0) { //************* Code Not Used **************************************************************


                }
                else if ($(td).index() == 1) //************************** ITEMS *******************************************************
                {
              
                    var slItem = $('#hidden_slItems option[Name="' + $(td).text().trim().toUpperCase() + '"]');
                    ItemID = (($(slItem) == null || $(slItem) == "undefined" ) ? "0" : $(slItem).val());
                    if ($(slItem) == null || $(slItem) == "undefined")
                    {
                        console.log($(td).text() + $(td).index());
                    }
                    ItemName = $(td).text();
                }
                else //*********************************************** Category / Price ************************************************
                {
                    var tdindex = $(td).index();
                    var slPriceList = $('#hidden_slPriceList option[Name="' + $("#tblExcel tr th").eq(tdindex).text().trim().toUpperCase() + '"]');



                    if ($(slPriceList) != null && $(slPriceList) != "undefined")
                    {
                        PriceListID = $(slPriceList).val();
                        var slPriceListItems = $('#hidden_slPriceListItems option[ItemID="' + ItemID + '"][PriceListID="' + PriceListID + '"]');

                        PriceListItemID = (($(slPriceListItems) == null || typeof $(slPriceListItems) === "undefined") ? "0" : $(slPriceListItems).val());
                        price = parseFloat($(td).text());
                        //xxxxxxxxxxxxxxxxxxxxxxxx
                        var Obj = new Object();
                        counter = counter + 1;

                        Obj.ID = ((typeof PriceListItemID === "undefined" || PriceListItemID == null || PriceListItemID == "undefined" ) ? "0" : PriceListItemID );
                        Obj.ItemID = ((typeof ItemID === "undefined" || ItemID == null) ? "0" : ItemID); 
                        Obj.Price = ((typeof price === "undefined" || price == null) ? "0" : price);  
                        Obj.PriceListID = ((typeof PriceListID === "undefined" || PriceListID == null) ? "0" : PriceListID);   


                        if ( Obj.PriceListID == "0")
                        {
                            swal("sorry", "Price List" + $(slPriceList).text() + " Is Not Found In The System")
                            NoError = false;
                            return false;
                        }
                        if (Obj.ItemID == "0") {
                            swal("sorry", "Product" +  ItemName + " Is Not Found In The System")
                            NoError = false;
                            return false;
                        }
                          


                        ArrObj.push(Obj);

                        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxx");

                        console.log("ID : " + Obj.ID );
                        console.log("ItemID : " + Obj.ItemID);
                        console.log("Price : " + Obj.Price);
                        console.log("PriceListID : " + Obj.PriceListID);
                        console.log("Counter : " + counter);
                        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxx");
                        // $('#tblFromExcel tbody').append("<tr></td>")
                       // $('#tblFromExcel tbody').append("<tr><td>" + $(slItem).text() + "</td><td>" + Obj.ItemID + "</td><td>" + $(slPriceList).text() + "</td><td>" + Obj.PriceListID + "</td><td>" + Obj.ID + "</td></tr>")
                        //xxxxxxxxxxxxxxxxxxxxxxxx

                    }
                    else
                    {
                       // console.log("Price List : " + $("#tblExcel tr")[$(td).index()].text().trim().toUpperCase() + "   Is Not Defined , Please Insert It To Database");

                    }




                }

             });


             

        }

      //  PriceListID, ItemID
      // val
        //Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', '<-- select Items -->', '#hidden_slItems', '');
        //Fill_SelectInputAfterLoadData(d[1], 'ID', 'Name', '<-- select SubAccount -->', '#hidden_slPriceList', '');
        //Fill_SelectInputAfterLoadDataWithMultiAttrs(d[2], 'ID', 'Name', '<-- select Store Account -->', '#hidden_slPriceListItems', '', 'PriceListID,ItemID');

        if (i == $("#tblExcel tr").length - 1) {
         
            if (NoError == true) {
                InsertUpdateFunction2("form", "/api/I_PriceList/InsertItems",
                    JSON.stringify(ArrObj)
                    , false, "I_ExcelModal", function (Code) {
                        FadePageCover(false)
                        // $('#txtCode').val(Code[1]);
                        // PrintTransaction();
                        //console.log(Code[0]);
                        // setTimeout(function () {
                        //  SC_Transactions_LoadingWithPaging();
                        //  IntializeData();
                        //  ClearAllTableRows('tblItems');
                        //  all_has_store = false;

                        // }, 500);
                        swal("Done", "Is Uploaded", "success");
                    });
            }

        }
    });


}



function InsertUpdateFunction2(pValidateFormID, pFunctionName, pParametersWithValues, pSaveandAddNew, pModalID, callback) {
    debugger;
    console.log(pParametersWithValues);
    if (ValidateForm(pValidateFormID, pModalID)) {
        FadePageCover(true);
        $.ajax({
            type: "POST",
            url: strServerURL + pFunctionName,
            data: { "": pParametersWithValues },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",/*"application/json; charset=utf-8"*/
            beforeSend: function () { },
            success: function (data) {
                debugger;
                if (data != undefined && data.length > 1) {
                    if (data[0] == true) {
                        if (callback != null && callback != undefined) {
                            if (data[1] != null && data[1] != undefined) //data[1] is the ID: for opening quotation or operation after saving a new one / or strMessageReturned
                                callback(data);
                        }

                        if (!pSaveandAddNew && pModalID != null) {
                            jQuery.noConflict();
                            (function ($) {
                                $('#' + pModalID).modal('hide');
                            })(jQuery);
                        }
                    }
                    else {
                        debugger;

                      //  CallbackHeaderData();


                        swal(strSorry, data[1]);




                    }
                }
                else {
                    if (data == true) {
                        if (callback != null && callback != undefined) {
                            callback();
                        }
                        if (!pSaveandAddNew && pModalID != null) {
                            jQuery.noConflict();
                            (function ($) {
                                $('#' + pModalID).modal('hide');
                            }
                            )(jQuery);
                        }
                    }
                    else //unique key violated
                        swal(strSorry, strUniqueFailInsertUpdateMessage);
                }
                FadePageCover(false);
            },
            error: function (jqXHR, exception) {
                FadePageCover(false);
                alert('Error when trying to call function [' + pFunctionName + ']. InsertUpdateFunction fn in mainapp.master');
            }
        });
    }
    else
        FadePageCover(false);
}


var ItemList = null;
var PriceList = null;
var ItemPriceList = null;

function PrintPriceList()
{
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/I_PriceList/IntializeData"
        , { pID: null }
        , function (pData) {

             ItemList = JSON.parse(pData[0]);
             PriceList = JSON.parse(pData[1]);
             ItemPriceList = JSON.parse(pData[2]);
            FadePageCover(false);

            DrawExcelForDownload(ItemList, PriceList, ItemPriceList);
         
        }
        , null);
}




function DrawExcelForDownload(ItemList, PriceList, ItemPriceList, pOutputTo) {
    debugger;

    if (ItemList.length > 0) {

    
    FadePageCover(true)
    var pReportTitle = "Price List";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";
    var IndexForRow = 0;
    var HeaderCells = PriceList.map(item => item.Name).filter((value, index, self) => self.indexOf(value) === index);
    var HeaderCellsIDs = PriceList.map(item => item.ID).filter((value, index, self) => self.indexOf(value) === index);
    var HeaderCellsLength = HeaderCells.length;
    pTableHTML += '                         <table id="tblDownloadedExcel" class="print table" style="">';
    //----------------------------------------------------------- table header ---------------------------------------------------------------------
    pTableHTML += '                             <thead>';
    pTableHTML += '                                 <tr class="">';
    pTableHTML += '<th class="">ItemCode</th>';
    pTableHTML += '<th class="">ItemName</th>';
    for (var i = 0; i < HeaderCellsIDs.length; i++)
    {
        pTableHTML += '<th index="'+i+'" class="">' + PriceList.filter(x => x.ID == HeaderCellsIDs[i] )[0].Name + '</th>';
    }
    pTableHTML += '                                 </tr>';
    pTableHTML += '                             </thead>';


    //---------------------------------------------------------  table body  ------------------------------------------------------------------------
    pTableHTML += '                             <tbody>';
    $.each((ItemList), function (i, item)
    {
        pTableHTML += '<tr>';
        pTableHTML += '<td>' + item.Code + '</td>';
        pTableHTML += '<td>' + item.Name + '</td>';
        $.each((HeaderCellsIDs), function (j, _PriceListID)
        {
            var _ItemPriceList = ItemPriceList.filter(x => x.PriceListID == _PriceListID && x.ItemID == item.ID);

           // console.log("itemID : " + item.ID + " PriceListID : " + _PriceListID + " " + _ItemPriceList.length);
            if (typeof _ItemPriceList !== "undefined" && _ItemPriceList != null && _ItemPriceList.length > 0 )
                pTableHTML += '<td>' + IsNull(_ItemPriceList[0].Price, 0.00) + '</td>';
            else
            pTableHTML += '<td>' + 0.00 + '</td>';

            if (j == (HeaderCellsIDs).length - 1)
            {
                pTableHTML += '</tr>';



                if ((ItemList).length - 1 == i) {

                    pTableHTML += '                             </tbody>';
                    pTableHTML += '                         </table>';

                    var ReportHTML = '';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>' + pReportTitle + '</title><link href="/Content/CSS/fontawesome5/css/all.css" rel="stylesheet" /><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css"/></style></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                    //ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';
                    //ReportHTML += '                     <div>&nbsp;</div>';
                    ReportHTML += '                         ' + pTableHTML + '';
                    ReportHTML += '         </body>';
                    ReportHTML += '</html>';
                    //if (pOutputTo == "PrintInReportBody")
                    //    $("#ReportBody").html(ReportHTML);
                    //else {
                    //    //var mywindow = window.open('', '_blank');
                    //    //mywindow.document.write(ReportHTML);
                    //    //mywindow.document.close();
                    //    $('#redips-drag').html(ReportHTML);
                    //}
                    //var mywindow = window.open('', '_blank');
                    //mywindow.document.write(ReportHTML);
                    //mywindow.document.close();
                    $("#ReportBody").html(ReportHTML);




                         // Is Too Long Data
                         setTimeout(function () {
                             var $table = $('#tblDownloadedExcel');
                             $table.table2excel({
                                 exclude: ".noExl",
                                 name: "sheet",
                                 filename: "PriceList" + "@" + getTodaysDateInddMMyyyyFormat() + ".xls", // do include extension
                                 preserveColors: false // set to true if you want background colors and font colors preserved
                             });
                             setTimeout(function () {

                                 FadePageCover(false);
                             }, 1000);
                         }, 1000);
                   
                }
            }
        });



    });
    }
}
$(document).ready(function () {
    


    if (pDefaults.UnEditableCompanyName == "ERP") {
        $('.IsNotERP').addClass('hide');
    }
    else {
        $('.IsNotERP').removeClass('hide');
    }
});


function RefreshTree()
{
    $("#tree").fancytree("destroy");
    strBindTableRowsFunctionName = "PurchaseItem_BindTableRows";
    strLoadWithPagingFunctionName = "/api/I_ItemsGroups/LoadWithPaging";
    $("#slCurrency").html($("#hReadySlCurrencies").html());
    LoadWithPagingWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, 1, 2000
        , function (pData) {
            var pLengthUnit = pData[2];
            var pWeightUnit = pData[3];
            var pVolumeUnit = pData[4];
            var pCommodity = pData[5];
            var pPackageType = pData[6];
            var pIMOClass = pData[7];
            var pWH_Area = pData[8];
            var ItemsType = pData[9];
            var ItemsGroup = pData[10];

            Fill_SelectInputAfterLoadData(ItemsType, "ID", "Name", "Select Item Type", "#slItemType", '');
            Fill_SelectInputAfterLoadData(ItemsGroup, "ID", "Name", "Select Item Group", "#slItemGroup", '');

            FillListFromObject(pDefaults.LengthUnitID, 1, null/*pStrFirstRow*/, "slLengthUnit", pLengthUnit, null);
            FillListFromObject(pDefaults.WeightUnitID, 1, null/*pStrFirstRow*/, "slWeightUnit", pWeightUnit, null);
            FillListFromObject(pDefaults.VolumeUnitID, 1, null/*pStrFirstRow*/, "slVolumeUnit", pVolumeUnit, null);
            FillListFromObject(null, 2, "<--Select-->", "slCommodity", pCommodity, null);
            FillListFromObject(null, 2, "<--Select-->", "slPackageType", pPackageType
                , function () { $("#slPackageTypeBarCode").html($("#slPackageType").html()); $("#slToPackageType").html($("#slPackageType").html()); $("#slFromPackageType").html($("#slPackageType").html()); });
            FillListFromObject(null, 9, "<--Select-->", "slIMOClass", pIMOClass, null);
            FillListFromObject(null, 2, "<--Select-->", "slPreferredArea", pWH_Area, null);
            console.log(JSON.parse(pData[0]))
           // console.log(ConvertDataToTree(JSON.parse(pData[0])))
            DrawTree(JSON.parse(pData[0]))

            //************************* Tree ****************************
            //var FT = $.ui.fancytree;

            //// attach to instance 1 and 3
            //$("#tree1, #tree3").fancytree({
            //    checkbox: true,
            //    selectMode: 1,
            //    activate: function (event, data) {
            //        var node = data.node;
            //        FT.debug("activate: event=", event, ", data=", data);
            //        if (!$.isEmptyObject(node.data)) {
            //            alert("custom node data: " + JSON.stringify(node.data));
            //        }
            //    },
            //    lazyLoad: function (event, data) {
            //        // we can't `return` values from an event handler, so we
            //        // pass the result as `data.result` attribute:
            //        data.result = { url: "ajax-sub2.json" };
            //    }
            //    // }).on("fancytreeactivate", function(event, data){
            //    //   $.ui.fancytree.debug("fancytreeactivate: event=", event, ", data=", data);
            //    //   return false;
            //});

            //**********************************************************************

        });




}




function PurchaseItem_BindTableRows(pPurchaseItem) {
    debugger;
    if (glbCallingControl == "PurchaseItem")
        $("#hl-menu-MasterData").parent().addClass("active");
    else
        $("#hl-menu-SC").parent().addClass("active");
    ClearAllTableRows("tblPurchaseItem");
    editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pPurchaseItem, function (i, item) {
        AppendRowtoTable("tblPurchaseItem",
        ("<tr ID='" + item.ID + "' ondblclick='PurchaseItem_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input " + (item.Code.toUpperCase() == "FLEXI" ? " disabled=disabled " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='Name'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
                    + "<td class='LocalName hide'>" + (item.LocalName == 0 ? "" : item.LocalName) + "</td>"
                    + "<td class='PartNumber'>" + (item.PartNumber == 0 ? "" : item.PartNumber) + "</td>"
                    + "<td class='HSCode'>" + (item.HSCode == 0 ? "" : item.HSCode) + "</td>"
                    + "<td class='Price'>" + item.Price + "</td>"
                    + "<td class='CurrencyID hide'>" + item.CurrencyID + "</td>"
                    + "<td class='CurrencyCode hide'>" + item.CurrencyCode + "</td>"
                    + "<td class='AccountID hide'>" + item.AccountID + "</td>"
                    + "<td class='SubAccountID hide'>" + item.SubAccountID + "</td>"
                    + "<td class='CostCenterID hide'>" + item.CostCenterID + "</td>"
                    + "<td class='ViewOrder hide'>" + item.ViewOrder + "</td>"
                    + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    
                    + "<td class='hide'><a href='#PurchaseItemModal' data-toggle='modal' onclick='PurchaseItem_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblPurchaseItem", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblPurchaseItem>tbody>tr", $("#txt-Search").val().trim());//sherif:new
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PurchaseItem_EditByDblClick(pID) {
   
    jQuery("#PurchaseItemModal").modal("show");
    PurchaseItem_FillControls(pID);
}


//cbCheckAllItemsChanged
function cbCheckAllItemsChanged() {
    debugger;
    if ($("#cbCheckAllItems").prop("checked"))
        $("#divCbItems input[name=nameCbItems]").prop("checked", true);
    else
        $("#divCbItems input[name=nameCbItems]").prop("checked", false);
}






// Loading with data
var parent = new Object();
var nodeMap = new Object();
function ConvertDataToTree(childList) {
    console.log(childList.length)
    debugger;
    parent = {};
    nodeMap = {};
    parent.children = new Array();
    //if (childList.kind === "tasks#tasks") {
    //    childList = childList.items;
    //}
    // Pass 1: store all tasks in reference map

    //if (childList.length =)

    $.each(childList, function (i, c) {
        if (c.parent == "0")
            c.parent = null;
        nodeMap[c.id] = c;
    });
    // Pass 2: adjust fields and fix child structure
    childList = $.map(childList, function (c) {
        if (c.parent == "0")
            c.parent = null
        // Rename 'key' to 'id'
        c.key = c.id;
        console.log("key : " + c.key + " id : " + c.id + " parent : " + c.parent);
        delete c.id;
        // Set checkbox for completed tasks
        c.selected = (c.status === "completed");
        // Check if c is a child node
        if (typeof c.parent !== "undefined" && c.parent != null) {
            console.log(" Send to " + c.parent + "NODE");
            // add c to `children` array of parent node
            parent = nodeMap[c.parent];
           // nodeMap[c.id]
            //console.log(parent);
            //console.log(c);
            try {

           
                 
                if (typeof parent.children !== "undefined" && parent.children != null) {
                    try {
                        parent.children.push(c);
                    }
                    catch (ex) {
                        console.log(parent);
                        console.log(c);
                    }

                } else {
                    parent.children = new Array();
                    parent.children = [c];
                }

                console.log(" ****** OK ******" + parent + " ");
            }
            catch (exx) {
                parent = nodeMap["G"+c.parent];
                console.log(" Error In " + parent + " ");
                if (typeof parent.children !== "undefined" && parent.children != null) {
                    try {
                        parent.children.push(c);
                    }
                    catch (ex) {
                        console.log(parent);
                        console.log(c);
                    }

                } else {
                    parent.children = new Array();
                    parent.children = [c];
                }
            }

            return null;  // Remove c from childList//
        }
        return c;  // Keep top-level nodes
    });
    // Pass 3: sort children by 'position'
    $.each(childList, function (i, c) {
        if (c.parent == "0")
            c.parent = null
        if (c.children && c.children.length > 1) {
            c.children.sort(function (a, b) {
                return ((a.position < b.position) ? -1 : ((a.position > b.position) ? 1 : 0));
            });
        }
    });
    return childList;
}


function Special_Fill_SelectInputAfterLoadData(data, ID_Name, Item_Name, Title, SelectInput_ID, Selected_ID) {



    var option = "";
    if (Title != null)
        option = '<option value="G0">' + Title + '</option>';
    $.each(data, function (i, item) {
        // console.log(item[ID_Name]);


        if (item[ID_Name] == Selected_ID) {

            option += '<option value="' + item[ID_Name] + '" selected "> ' + (item[Item_Name]).trim() + '</option>';

        }
        else {
            option += '<option value="' + item[ID_Name] + '"> ' + (item[Item_Name]).trim() + '</option>';
        }
    });


    $(SelectInput_ID).html("");
    $(SelectInput_ID).append(option);





}


var ItemsRowsCounter = 0;

function AddNewGroup(type) {
    if (type == 1) {
        debugger;
        AppendRowtoTable("tblGroups",
            ("<tr ID='" + 0 + "' isdeleted='0' tag='NewGroup'   counter='" + (ItemsRowsCounter + 1) + "' value='" + 0 + "'>"
                + " <td class='bg-warning' style ='font-size:15px;' > New </td>"
                + "<td class='ID hide'> <input  name='Delete' type='checkbox' value='" + "0" + "' /></td>"
                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger hide'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='GroupID ' IsNew=true val='" + "0" + "'>" + "<input type='text' style='max-width:200px;' id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectitem'/>" + "</td>"
                + "<td class='Notes hide' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                + "</tr>"));



    }
    else {
        AppendRowtoTable("tblGroups",
            ("<tr ID='" + 0 + "' tag='OldGroup' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + 0 + "'>"
                + " <td class='btn-lightblue' style='font-size:15px;'> Old </td>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteGroups(this);' class='btn btn-sm btn-danger hide'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='GroupID  ' IsNew=false val='" + "0" + "'>" + "<select style='max-width:200px;' id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectgroup'>" + $('#slGroupParent').html() + "</select>" + "</td>"
                + "<td class='Notes hide' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                + "</tr>"));
    }
    //$('#tblItems > tbody > tr').find('td.Qty > input , td.Discount > input , td.UnitPrice > input').inputmask('decimal', { digits: 2 });
    //ItemsRowsCounter++;
    //$("#tblItems").find("select").attr('onchange', 'CalculateAll(this);');
    //$("#tblItems").find("input,button,textarea").attr('onblur', 'CalculateAll();');




}

function FillGroupsData() {


    if ($('#tblGroups > tbody > tr').length > 0)
        FadePageCover(true)

    setTimeout(function () {
        $($('#tblGroups > tbody > tr')).each(function (i, tr) {
            $(tr).find('td.GroupID ').find('.selectitem').val($(tr).find('td.ItemID ').find('.selectitem').attr('tag'));
            $(tr).find('td.ServiceID ').find('.selectservice').val($(tr).find('td.ServiceID ').find('.selectservice').attr('tag'));
            $(tr).find('td.StoreID ').find('.selectstore').val($(tr).find('td.StoreID ').find('.selectstore').attr('tag'));
            $(tr).find('td.UnitPrice ').find('.input_unitprice').val($(tr).find('td.UnitPrice ').find('.input_unitprice').attr('tag'));
            $(tr).find('td.Discount ').find('.input_discount').val($(tr).find('td.Discount ').find('.input_discount').attr('tag'));
            $(tr).find('td.Qty').find('.input_quantity').val($(tr).find('td.Qty ').find('.input_quantity').attr('tag'));
            $(tr).find('td.CostCenterID ').find('.selectcostcenter').val($(tr).find('td.CostCenterID ').find('.selectcostcenter').attr('tag'));
            $(tr).find('td.Notes ').find('.inputnotes').val($(tr).find('td.Notes ').find('.inputnotes').attr('tag'));
            $(tr).find('td.UnitID ').find('.selectunit').val($(tr).find('td.UnitID ').find('.selectunit').attr('tag'));


            if ($('#tblItems > tbody > tr').length - 1 == i) {

                CalculateAll();
                FadePageCover(false)
            }

        });


    }, 1000);

}

function GroupsGetDetails(pItems) {
    debugger;
    $("#hl-menu-SC").parent().addClass("active");
    ItemsRowsCounter = 0;
    ClearAllTableRows("tblGroups");
    $.each(pItems, function (i, item) {
            debugger;
            AppendRowtoTable("tblGroups",
                ("<tr ID='" + (item.data.parent) + "' isdeleted='0' tag='item'   counter='" + (ItemsRowsCounter + 1) + "' value='" + item.data.parent  + "'>"
                    + " <td class='bg-warning' style ='font-size:15px;' >  </td>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + (item.parent) + "' /></td>"
                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + (item.parent)+ "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm hide btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + "<td class='GroupID IsNew=false' val='" + (item.key) + "'>" + "<select disabled='disabled' style='max-width:200px;' onchange='SetItemUnit(this)'  id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + (item.key) + "' class='input-sm  col-sm selectitem'>" + $('#slGroupParent').html() + "</select>" + "</td>"
                    + "<td class='Notes hide' val='" + 0 + "'>" + "<input tag='" + 0 + "' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                    + "</tr>"));

        //$('#tblItems > tbody > tr').find('td.Qty > input , td.Discount > input , td.UnitPrice > input').inputmask('decimal', { digits: 2 });
        ItemsRowsCounter++;
        //$("#tblItems").find("select").attr('onchange', 'CalculateAll(this);');
        //$("#tblItems").find("input,button,textarea").attr('onblur', 'CalculateAll();');
        //---------------------------------------------------------------------------------


        if (pItems.length - 1 == i)
            FillHTMLtblInputs("#tblGroups > tbody > tr");


    });
    //ApplyPermissions();

    //if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
    //    swal(strSorry, strDeleteFailMessage, "warning");
    //    showDeleteFailMessage = false;
    //}
    //$("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


    //setTimeout(function () {
    //   // FillItemsData();
      
    //}, 300);
    
}
function DrawTree(Data , ActivatedKey) {

    Special_Fill_SelectInputAfterLoadData(Data.filter(x => x.NodeType == "Group" || x.NodeType == "MainGroup"), "id", "title", " Set as Main Group ", "#slGroupParent" , '')

    $("#tree").fancytree({
        extensions: ["childcounter", "filter"],
        quicksearch: true,
        autoScroll: true,
        childcounter: {
            deep: true,
            hideZeros: true,
            hideExpanded: false

        },
        init: function (event, data) {
            var key = ((typeof ActivatedKey == "undefined" || ActivatedKey == null || ActivatedKey == "" ) ? "G0" : ActivatedKey) ;
            if (key !== '') {
                data.tree.activateKey(key);
            }
        },
        filter: {
            autoExpand: true,
            counter: false,
            mode:"hide" /*"dimm"*/,
            highlight: true
        },
        dblclick: function (event, data) {


            $('#hActivatedKey').val(data.node.key);

            debugger

            if (data.node.data.NodeType == "Item") {


                jQuery("#PurchaseItemModal").modal("show");
                PurchaseItem_FillControls(data.node.key);

            }
            else if (data.node.data.NodeType == "Root") {
                $('#tblGroups tbody').html('');
                debugger
                $('.IsGroup').addClass('hide');
                console.log(data.node);
                jQuery("#GroupModal").modal("show");
                $('#hGroupID').val(data.node.key)
                try {
                    GroupsGetDetails(data.node.children.filter(x => x.data.NodeType == "MainGroup"));
                }
                catch(ex)
                {
                    console.log("***************No Children**************")
                }
               // $('#hGroupID').val("0");
                $('#OldCheckedItemIDs').val("0");
               
            }
            else {
                $('#tblGroups tbody').html('');
                $('.IsGroup').removeClass('hide');
                $('#hGroupID').val(data.node.key);
                // console.log();
                jQuery("#GroupModal").modal("show");
                try {
                    GroupsGetDetails(data.node.children.filter(x => x.data.NodeType == "Group"));
                }
                catch (ex) {

                    console.log("***************No Children**************")
                }
                $('#txtGroupName').val(data.node.title);
                $('#slGroupParent').val(data.node.data.parent);
                console.log(Data.filter(x => x.NodeType == "Item"))
                try {
                    FillDivWithCheckboxes_DynamicFiledWithChecked("divCbItems", Data.filter(x => x.NodeType == "Item"), "nameCbItems", "key", "title", data.node.children.filter(x => x.data.NodeType == "Item").map(y => y.key), null);

                }
                catch(ex)
                {
                    console.log("***************No Children**************")
                    FillDivWithCheckboxes_DynamicFiledWithChecked("divCbItems", Data.filter(x => x.NodeType == "Item"), "nameCbItems", "key", "title", [], null);

                }



                try {
                    $('#OldCheckedItemIDs').val(data.node.children.filter(x => x.data.NodeType == "Item").map(y => y.key).join(","));
                }
                catch (ex) {
                    console.log("***************No Children**************")
                    $('#OldCheckedItemIDs').val("");

                }

            }

            //$.ajax({
            //    type: "GET",
            //    url: strServerURL + "api/I_ItemsGroups/GetItemData",
            //    data: { pID: data.node.key, pWhereCondition : " 1 = 1"},
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    success: function (d) {

            //    },
            //    error: function (jqXHR, exception) {
            //        debugger;
            //        swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            //        FadePageCover(false);
            //    }
            //});



            //        data.node.toggleSelect();
        },
        expand: function (event, data) {
            console.log(data.node);
        },
        selectMode: 3,
        checkbox: true,
        source: ConvertDataToTree(Data)
    });
    $('#tree ul').addClass('fancytree-connectors');
}




var CanSave = true;

function SetArrayOfGroups() {
    debugger
    CanSave = false;
    var ItemsIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbItems");
    var arrayOfItems = new Array();



    if ($("#tblGroups>tbody tr").length == 0)
    {
        if ($('#hGroupID').val() != "G0" && ($('#hGroupID').val() == $('#slGroupParent').val())) {
            swal('Sorry', " The Group Must has Different Parent Group", "warning");
            CanSave = false;
            return false;

        }
        var objItem = new Object();
        objItem.MainID = $('#hGroupID').val().substring(1);
        objItem.MainName = $('#txtGroupName').val();
        objItem.ParentMainID = $('#slGroupParent').val().substring(1);
        objItem.ID = 0;
        objItem.Name = 0;
        objItem.ParentID = $('#hGroupID').val().substring(1);
        objItem.UnCheckedItemIDs = $('#OldCheckedItemIDs').val();
        objItem.ItemIDs = ItemsIDs;
        arrayOfItems.push(objItem);
        CanSave = true;

    }


    $("#tblGroups>tbody>tr").each(function (i, tr) {
        if ($('#hGroupID').val() != "G0" && ($('#hGroupID').val() == $('#slGroupParent').val()))
        {
            swal('Sorry', " The Group Must has Different Parent Group", "warning");
            CanSave = false;
            return false;

        }

        else if ($('#hGroupID').val() != "G0" && ($('#hGroupID').val() == ($(tr).find("td.GroupID").attr("IsNew") == "true" ? "0" : $(tr).find("td.GroupID").find("select").val()))) {
            swal('Sorry', " The Group Must has Different Parent Group In the Children Groups ", "warning");
            CanSave = false;
            return false;

        }
        else if (($(tr).find("td.GroupID").attr("IsNew") == "false" && $(tr).find("td.GroupID").find("select").val() == "G0")) {

            swal('Sorry', " The Group Must has Different Parent Group In the Children Groups ", "warning");
            CanSave = false;
            return false;
        }
        else
        {
            var objItem = new Object();
            objItem.MainID = $('#hGroupID').val().substring(1);
            objItem.MainName = $('#txtGroupName').val();
            objItem.ParentMainID = $('#slGroupParent').val().substring(1);
            objItem.ID = ($(tr).find("td.GroupID").attr("IsNew") == "true" ? "0" : $(tr).find("td.GroupID").find("select").val().substring(1));
    objItem.Name = ($(tr).find("td.GroupID").attr("IsNew") == "true" ? $(tr).find("td.GroupID").find("input").val() : $(tr).find("td.GroupID").find("select option:selected").text());
    objItem.ParentID = $('#hGroupID').val().substring(1);
    objItem.UnCheckedItemIDs = $('#OldCheckedItemIDs').val();
    objItem.ItemIDs = ItemsIDs;
            arrayOfItems.push(objItem);
            CanSave = true;
        }
    });
    return [arrayOfItems, CanSave];
}
function SaveGroup()
{
    if (SetArrayOfGroups()[1] == true) {
        InsertUpdateListOfObject_Special("/api/I_ItemsGroups/InsertItems",
            SetArrayOfGroups()[0]
            , false, "GroupModal", function (data) {
                FadePageCover(true);
                setTimeout(function () {
                    //if ($("#cbIsFromTrans").is(":checked")) {
                    //    InsertUpdateFunction3("form", "/api/SL_Invoices/InsertItems",
                    //        JSON.stringify(SetArrayOfTrans())
                    //        , pSaveandAddNew, "SC_TransactionsModal", function (Code) {
                    //            // $('#txtCode').val(Code[1]);
                    //            //PrintTransaction();

                    //            console.log(Code[0]);
                    //            setTimeout(function () {
                    //                //SC_Transactions_LoadingWithPaging();
                    //                ////  IntializeData();
                    //                //ClearAllTableRows('tblItems');
                    //                //all_has_store = false;
                    //                PrintInvoice($('#hID').val());
                    //                SL_Invoices_LoadingWithPaging();
                    //            }, 500);

                    //        });

                    //}
                    //else {
                    //  FadePageCover(true);
                    // PrintInvoice($('#hID').val());
                    //  SL_Invoices_LoadingWithPaging();
                    //  }

                    //  IntializeData();
                }, 300);

            });


    }
    else
    {

        FadePageCover(false);
    }



    //if (CanSave == true) {
    //    CallPOSTFunctionWithParameters("/api/I_ItemsGroups/InsertList", SetArrayOfGroups()
    //        , function (pData) {
    //            if (pData[0]) {
    //                swal("Success", "Saved Successfully.");
    //                PurchaseItem_LoadingWithPaging();
    //            }
    //            else {
    //                swal("Sorry", "");
    //                FadePageCover(false);
    //            }
    //        }
    //        , null);
    //}
}


function InsertUpdateListOfObject_Special(pFunctionName, ArrayOfObject /*See Notes*/, pSaveandAddNew, pModalID, callback) {
    debugger;
    //console.log(ArrayOfObject);
    //if (1 == 1) {
    FadePageCover(true);
    $.ajax({
        type: "POST",
        url: strServerURL + pFunctionName,
        data: { "": JSON.stringify(ArrayOfObject) },
        //contentType:"application/json; charset=utf-8", 
        beforeSend: function () { },
        success: function (data) {
            debugger;
            if (data != undefined && data.length > 1) {
               
                if (data[0] == true) {
                    $('#tree').fancytree("destroy");
                    DrawTree(JSON.parse(data[2]), $('#hActivatedKey').val());
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
                else //data[0] = false
                    //swal(strSorry, strUniqueFailInsertUpdateMessage, "warning");
                    swal(strSorry, data[1]);
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
    //}
    //else
    //    FadePageCover(false);
}



function SearchOnTree() {

    $('#tree').fancytree("getTree").filterNodes($("#txt-Search").val());
}



function PurchaseItem_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/I_ItemsGroups/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PurchaseItem_BindTableRows(pTabelRows); });
    HighlightText("#tblPurchaseItem>tbody>tr", $("#txt-Search").val().trim());
}


function FillDivWithCheckboxes_DynamicFiledWithChecked(pDivName, pData, pCheckboxNameAttr, IDName, FieldName, CheckedIDs, callback) {
    //Clear the div
    $("#" + pDivName).html("");
    var option = "";
    // Bind Data
    //option = '<section class="panel panel-default">';
    //option += '<header class="panel-heading">';
    //option += '</header>';
    $.each(pData, function (i, item) {
        option += '<div class="swapCheckBoxesClass"> ';
        if (CheckedIDs.indexOf(item[IDName]) != -1)
            option += ' <input type="checkbox" checked=true name="' + pCheckboxNameAttr + '" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);"  value="' + item[IDName] + '" /> ';
        else
            option += ' <input type="checkbox"  name="' + pCheckboxNameAttr + '" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);"  value="' + item[IDName] + '" /> ';

        option += ' <label> ' + item[FieldName];
        option += ' &nbsp;</label> </div>';
    });
    //option += '<footer class="panel-footer">';
    //option += "</footer>";
    //option += "</section>";
    $("#" + pDivName).append(option);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapCheckBoxesClass:not(.reversed)").reverseChildren();
}

function PurchaseItem_ClearAllControls(callback) {
    debugger;
    $("#tblPackageTypeBarCode tbody").html("");
    $("#tblPackageTypeConversion tbody").html("");
    $("#tblDocsIn tbody").html("");
    ClearAll("#PurchaseItemModal");
    PurchaseItem_EnableDisableIMOProprties(false);
    $("#slCurrency").val($("#hDefaultCurrencyID").val());
    $("#slLengthUnit").val(pDefaults.LengthUnitID);
    $("#slWeightUnit").val(pDefaults.WeightUnitID);
    $("#slVolumeUnit").val(pDefaults.VolumeUnitID);
    //***** For ERP
    $('#slItemGroup').val("0");
    $('#slItemType').val("0");
    $("#btnSave").attr("onclick", "PurchaseItem_Insert(false);");
    $("#btnSaveAndAddNew").attr("onclick", "PurchaseItem_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
    $('#btn-Delete2').addClass('hide')
   // if ($("#hDefaultUnEditableCompanyName").val() == "ERP") {
        $("#txtCode").attr("disabled", "disabled");
       // $("#txtName").attr("disabled", "disabled");
       // $("#txtLocalName").attr("disabled", "disabled");
  //  }
    if (callback != null && callback != undefined)
        callback();
}
function PurchaseItem_FillControls(pID) {
    debugger;
    FadePageCover(true);
    $("#tblPackageTypeBarCode tbody").html("");
    $("#tblPackageTypeConversion tbody").html("");
    $("#tblDocsIn tbody").html("");
    $('#btn-Delete2').removeClass('hide')
    CallGETFunctionWithParameters("/api/I_ItemsGroups/LoadHeaderWithDetails"
        , { pPurchaseItemHeaderID: pID }
        , function (pData) {
            var pHeader = JSON.parse(pData[0]);
            var pPackageTypeBarCode = JSON.parse(pData[1]);
            var pPackageTypeConversion = JSON.parse(pData[2]);
            //if ($("#hDefaultUnEditableCompanyName").val() == "ERP") {
                $("#txtCode").attr("disabled", "disabled");
               // $("#txtName").attr("disabled", "disabled");
               // $("#txtLocalName").attr("disabled", "disabled");
            //}
            //else
            //{

            //    if (pHeader.Code == "FLEXI")
            //    {
            //        $("#txtCode").attr("disabled", "disabled");
            //        $("#txtName").attr("disabled", "disabled");
            //        $("#txtLocalName").attr("disabled", "disabled");
            //    }
            //    else
            //    {
            //        $("#txtCode").removeAttr("disabled");
            //        $("#txtName").removeAttr("disabled");
            //        $("#txtLocalName").removeAttr("disabled");
            //    }
            //}
           
            $("#hID").val(pID);
            $("#txtUploadFolderName").val(pHeader.CreationYear + '_' + pID);
            PackageTypeBarCode_BindTableRows(pPackageTypeBarCode);
            PackageTypeConversion_BindTableRows(pPackageTypeConversion);
            PurchaseItem_EnableDisableIMOProprties(pHeader.IsIMO);
            $("#lblShown").html(": " + pHeader.Name == 0 ? "" : pHeader.Name);
            $("#txtCode").val(pHeader.Code == 0 ? "" : pHeader.Code);
            $("#txtName").val(pHeader.Name == 0 ? "" : pHeader.Name);
            $("#txtLocalName").val(pHeader.LocalName == 0 ? "" : pHeader.LocalName);
            $("#txtPartNumber").val(pHeader.PartNumber == 0 ? "" : pHeader.PartNumber);
            $("#txtHSCode").val(pHeader.HSCode == 0 ? "" : pHeader.HSCode);
            $("#txtPrice").val(pHeader.Price);
            $("#slCurrency").val(pHeader.CurrencyID);
            $("#txtViewOrder").val(pHeader.ViewOrder);
            $("#txtNotes").val(pHeader.Notes == 0 ? "" : pHeader.Notes);

            $("#slCommodity").val(pHeader.CommodityID == 0 ? "" : pHeader.CommodityID);
            $("#slPackageType").val(pHeader.PackageTypeID == 0 ? "" : pHeader.PackageTypeID);
            $("#txtGrossWeight").val(pHeader.GrossWeight);
            $("#txtNetWeight").val(pHeader.NetWeight);
            $("#slWeightUnit").val(pHeader.WeightUnitID == 0 ? pDefaults.WeightUnitID : pHeader.WeightUnitID);
            $("#txtWidth").val(pHeader.Width);
            $("#txtDepth").val(pHeader.Depth);
            $("#txtHeight").val(pHeader.Height);
            $("#slLengthUnit").val(pHeader.LengthUnitID == 0 ? pDefaults.LengthUnitID : pHeader.LengthUnitID);
            $("#txtVolume").val(pHeader.Volume);
            $("#slVolumeUnit").val(pHeader.VolumeUnitID == 0 ? pDefaults.VolumeUnitID : pHeader.VolumeUnitID);

            $("#cbIsIMO").prop("checked", pHeader.IsIMO);
            $("#slIMOClass").val(pHeader.IMOClassID == 0 ? "" : pHeader.IMOClassID);
            $("#txtUN").val(pHeader.UN == 0 ? "" : pHeader.UN);
            $("#slPG").val(pHeader.PG == 0 ? "" : pHeader.PG);

            $("#slPreferredArea").val(pHeader.PreferredArea == 0 ? "" : pHeader.PreferredArea);
            $("#cbByExpireDate").prop("checked", pHeader.ByExpireDate);
            $("#cbBySerialNo").prop("checked", pHeader.BySerialNo);
            $("#cbByLotNo").prop("checked", pHeader.ByLotNo);
            $("#cbByVehicle").prop("checked", pHeader.ByVehicle);



            //*************** For ERP ******************************
            $('#slItemGroup').val(pHeader.ParentGroupID);
            $('#slItemType').val(pHeader.ItemTypeID);
            debugger;
            $('#slReturnedItem').val(pHeader.ReturnedItemID)
            if ($('#slReturnedItem').val() == null)
                $('#slReturnedItem').val("")

            $('#txtReturnedQuantity').val(pHeader.ReturnedQuantity)
            $('#txtExpectedAlarm').val(pHeader.ExpectedAlarm)
            $('#txtActualAlarm').val(pHeader.ActualAlarm)
            $('#txtMinimumLimit').val(pHeader.MinimumLimit)
            $('#txtMaximumLimit').val(pHeader.MaximumLimit)
            $('#txtReOrderlimit').val(pHeader.ReOrderlimit)
            

            $("#btnSave").attr("onclick", "PurchaseItem_Update(false);");
            $("#btnSaveAndAddNew").attr("onclick", "PurchaseItem_Update(true);");
            FadePageCover(false);
        }
        , null);
}
function PurchaseItem_Insert(pSaveAndNew) {
    debugger;
    FadePageCover(true);

    //if ($("#hDefaultUnEditableCompanyName").val() == "ERP")
    //{
   // $("#txtCode").val("AUTO");
    //}

    //if ($("#hDefaultUnEditableCompanyName").val() != "ERP" && ($("#txtCode").val() == "" || $("#txtCode").val() == "0")    ) {
    //    swal("Sorry", "You Must Insert Code", "warning");
    //    FadePageCover(false);
    //}
    //else
        if ($('#slItemType').val() == "3" && ($("#txtVolume").val() == "" || parseFloat($("#txtVolume").val()) <= 0))
    {
        swal("Sorry", "You Must Insert Density", "warning");
        FadePageCover(false);
    }
    else
    {





        if (ValidateForm("form", "PurchaseItemModal")) {
            pParametersWithValues = {
                  pCode: "0"
                , pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim()
                , pLocalName: $("#txtLocalName").val().trim() == "" ? "0" : $("#txtLocalName").val().trim()
                , pPartNumber: $("#txtPartNumber").val().trim() == "" ? "0" : $("#txtPartNumber").val().trim().toUpperCase()
                , pHSCode: $("#txtHSCode").val().trim() == "" ? "0" : $("#txtHSCode").val().trim().toUpperCase()
                , pPrice: $("#txtPrice").val().trim() == "" ? "0" : $("#txtPrice").val().trim().toUpperCase()
                , pCurrencyID: pDefaults.CurrencyID
                , pAccountID: 0
                , pSubAccountID: 0
                , pCostCenterID: 0
                , pViewOrder: $("#txtViewOrder").val().trim() == "" ? "0" : $("#txtViewOrder").val().trim().toUpperCase()
                , pNotes: $("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()
                //Warehouse parameters
                , pCommodityID: $("#slCommodity").val() == "" ? "0" : $("#slCommodity").val()
                , pPackageTypeID: $("#slPackageType").val() == "" ? "0" : $("#slPackageType").val()
                , pGrossWeight: $("#txtGrossWeight").val() == "" ? "0" : $("#txtGrossWeight").val()
                , pNetWeight: $("#txtNetWeight").val() == "" ? "0" : $("#txtNetWeight").val()
                , pWeightUnitID: $("#slWeightUnit").val() == "" ? "0" : $("#slWeightUnit").val()
                , pWidth: $("#txtWidth").val() == "" ? "0" : $("#txtWidth").val()
                , pDepth: $("#txtDepth").val() == "" ? "0" : $("#txtDepth").val()
                , pHeight: $("#txtHeight").val() == "" ? "0" : $("#txtHeight").val()
                , pLengthUnitID: $("#slLengthUnit").val() == "" ? "0" : $("#slLengthUnit").val()
                , pVolume: $("#txtVolume").val() == "" ? "0" : $("#txtVolume").val()
                , pVolumeUnitID: $("#slVolumeUnit").val() == "" ? "0" : $("#slVolumeUnit").val()
                , pIsIMO: $("#cbIsIMO").prop("checked")
                , pIMOClassID: $("#slIMOClass").val() == "" ? "0" : $("#slIMOClass").val()
                , pUN: $("#txtUN").val() == "" ? "0" : $("#txtUN").val()
                , pPG: $("#slPG").val() == "" ? "0" : $("#slPG").val()
                , pPreferredAreaID: $("#slPreferredArea").val() == "" ? "0" : $("#slPreferredArea").val()
                , pByExpireDate: $("#cbByExpireDate").prop("checked")
                , pBySerialNo: $("#cbBySerialNo").prop("checked")
                , pByLotNo: $("#cbByLotNo").prop("checked")
                , pByVehicle: $("#cbByVehicle").prop("checked")
                //***** For ERP
                , pGroupID: $('#slItemGroup').val()
                , pTypeID: ($('#slItemType').val() == "" ? "0" : $('#slItemType').val())
                , pReturnedItemID: ($('#slReturnedItem').val() == "" ? "0" : $('#slReturnedItem').val())
                , pReturnedQuantity: ($('#txtReturnedQuantity').val() == "" ? "0" : $('#txtReturnedQuantity').val())
                , pExpectedAlarm: ($('#txtExpectedAlarm').val() == "" ? "0" : $('#txtExpectedAlarm').val())
                , pActualAlarm: ($('#txtActualAlarm').val() == "" ? "0" : $('#txtActualAlarm').val())
                , pMinimumLimit: ($('#txtMinimumLimit').val() == "" ? "0" : $('#txtMinimumLimit').val())
                , pMaximumLimit: ($('#txtMaximumLimit').val() == "" ? "0" : $('#txtMaximumLimit').val())
                , pReOrderlimit: ($('#txtReOrderlimit').val() == "" ? "0" : $('#txtReOrderlimit').val())

            };
            CallGETFunctionWithParameters("/api/I_ItemsGroups/Insert", pParametersWithValues
                , function (pData) {
                    if (pData[0]) {
                        var pCreationYear = pData[2];
                       // PurchaseItem_LoadingWithPaging();
                        PurchaseItem_ClearAllControls();
                        if (pSaveAndNew) {
                            PurchaseItem_ClearAllControls();
                        }
                        else {
                            $("#hID").val(pData[1]);
                            $("#txtUploadFolderName").val(pCreationYear + '_' + pData[1]);
                            $("#btnSave").attr("onclick", "PurchaseItem_Update(false);");
                            $("#btnSaveAndAddNew").attr("onclick", "PurchaseItem_Update(true);");
                        }
                        swal("Success", "Saved successfully.");
                        $("#tree").fancytree("destroy");
                        DrawTree(JSON.parse(pData[3]), $('#hActivatedKey').val());
                        FadePageCover(false);

                    }
                    else {
                        swal("Sorry", strUniqueFailInsertUpdateMessage);
                        FadePageCover(false);
                    }
                }
                , null);
        }
        else //if (ValidateForm("form", "PurchaseItemModal"))
            FadePageCover(false);
    }
}
function PurchaseItem_Update(pSaveAndNew) {
    debugger;
    FadePageCover(true);


    //if ($("#hDefaultUnEditableCompanyName").val() != "ERP" && ($("#txtCode").val() == "" || $("#txtCode").val() == "0")) {
    //    swal("Sorry", "You Must Insert Code", "warning");
    //    FadePageCover(false);
    //}
    //else

        if ($('#slItemType').val() == "3" && ($("#txtVolume").val() == "" || parseFloat($("#txtVolume").val()) <= 0)) {
        swal("Sorry", "You Must Insert Density", "warning");
        FadePageCover(false);
    }
    else {
        if (ValidateForm("form", "PurchaseItemModal")) {
            pParametersWithValues = {
                pID: $("#hID").val()
                , pCode: $("#txtCode").val().trim() == "" ? "0" : $("#txtCode").val().trim().toUpperCase()
                , pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim()
                , pLocalName: $("#txtLocalName").val().trim() == "" ? "0" : $("#txtLocalName").val().trim()
                , pPartNumber: $("#txtPartNumber").val().trim() == "" ? "0" : $("#txtPartNumber").val().trim().toUpperCase()
                , pHSCode: $("#txtHSCode").val().trim() == "" ? "0" : $("#txtHSCode").val().trim().toUpperCase()
                , pPrice: $("#txtPrice").val().trim() == "" ? "0" : $("#txtPrice").val().trim().toUpperCase()
                , pCurrencyID: pDefaults.CurrencyID
                , pAccountID: 0
                , pSubAccountID: 0
                , pCostCenterID: 0
                , pViewOrder: $("#txtViewOrder").val().trim() == "" ? "0" : $("#txtViewOrder").val().trim().toUpperCase()
                , pNotes: $("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()
                //Warehouse parameters
                , pCommodityID: $("#slCommodity").val() == "" ? "0" : $("#slCommodity").val()
                , pPackageTypeID: $("#slPackageType").val() == "" ? "0" : $("#slPackageType").val()
                , pGrossWeight: $("#txtGrossWeight").val() == "" ? "0" : $("#txtGrossWeight").val()
                , pNetWeight: $("#txtNetWeight").val() == "" ? "0" : $("#txtNetWeight").val()
                , pWeightUnitID: $("#slWeightUnit").val() == "" ? "0" : $("#slWeightUnit").val()
                , pWidth: $("#txtWidth").val() == "" ? "0" : $("#txtWidth").val()
                , pDepth: $("#txtDepth").val() == "" ? "0" : $("#txtDepth").val()
                , pHeight: $("#txtHeight").val() == "" ? "0" : $("#txtHeight").val()
                , pLengthUnitID: $("#slLengthUnit").val() == "" ? "0" : $("#slLengthUnit").val()
                , pVolume: $("#txtVolume").val() == "" ? "0" : $("#txtVolume").val()
                , pVolumeUnitID: $("#slVolumeUnit").val() == "" ? "0" : $("#slVolumeUnit").val()
                , pIsIMO: $("#cbIsIMO").prop("checked")
                , pIMOClassID: $("#slIMOClass").val() == "" ? "0" : $("#slIMOClass").val()
                , pUN: $("#txtUN").val() == "" ? "0" : $("#txtUN").val()
                , pPG: $("#slPG").val() == "" ? "0" : $("#slPG").val()
                , pPreferredAreaID: $("#slPreferredArea").val() == "" ? "0" : $("#slPreferredArea").val()
                , pByExpireDate: $("#cbByExpireDate").prop("checked")
                , pBySerialNo: $("#cbBySerialNo").prop("checked")
                , pByLotNo: $("#cbByLotNo").prop("checked")
                , pByVehicle: $("#cbByVehicle").prop("checked")
                //***** For ERP
                , pGroupID: $('#slItemGroup').val()
                , pTypeID: $('#slItemType').val()
                 , pReturnedItemID: ($('#slReturnedItem').val() == "" ? "0" : $('#slReturnedItem').val())
                , pReturnedQuantity: ($('#txtReturnedQuantity').val() == "" ? "0" : $('#txtReturnedQuantity').val())
                , pExpectedAlarm: ($('#txtExpectedAlarm').val() == "" ? "0" : $('#txtExpectedAlarm').val())
                , pActualAlarm: ($('#txtActualAlarm').val() == "" ? "0" : $('#txtActualAlarm').val())
                , pMinimumLimit: ($('#txtMinimumLimit').val() == "" ? "0" : $('#txtMinimumLimit').val())
                , pMaximumLimit: ($('#txtMaximumLimit').val() == "" ? "0" : $('#txtMaximumLimit').val())
                , pReOrderlimit: ($('#txtReOrderlimit').val() == "" ? "0" : $('#txtReOrderlimit').val())
            }; 
            CallGETFunctionWithParameters("/api/I_ItemsGroups/Update", pParametersWithValues
                , function (pData) {
                    if (pData[0]) {
                        var pCreationYear = pData[2];
                      //  PurchaseItem_LoadingWithPaging();
                        PurchaseItem_ClearAllControls();
                        jQuery('#PurchaseItemModal').modal('hide');
                        if (pSaveAndNew) {
                            PurchaseItem_ClearAllControls();
                        }
                        else {
                            $("#hID").val(pData[1]);
                            $("#txtUploadFolderName").val(pCreationYear + '_' + pData[1]);
                            $("#btnSave").attr("onclick", "PurchaseItem_Update(false);");
                            $("#btnSaveAndAddNew").attr("onclick", "PurchaseItem_Update(true);");
                        }
                        //swal("Success", "Saved successfully.");
                        $("#tree").fancytree("destroy");
                        //RefreshTree();
                        DrawTree(JSON.parse(pData[3]), $('#hActivatedKey').val());
                        FadePageCover(false);
                    }
                    else {
                        swal("Sorry", strUniqueFailInsertUpdateMessage);
                        FadePageCover(false);
                    }
                }
                , null);
        }
        else //if (ValidateForm("form", "PurchaseItemModal"))
            FadePageCover(false);
    }
}
function PurchaseItem_DeleteList() {
    debugger;
    //Confirmation message to delete
   // if (GetAllSelectedIDsAsString('tblPurchaseItem') != "")
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
            DeleteListFunction("/api/I_ItemsGroups/Delete", { "pPurchaseItemIDs": $('#hID').val() }, function () { RefreshTree(); jQuery('#PurchaseItemModal').modal('hide'); /*PurchaseItem_LoadingWithPaging();*/ });
        });
    //DeleteListFunction("/api/I_ItemsGroups/Delete", { "pPurchaseItemIDs": GetAllSelectedIDsAsString('tblPurchaseItem') }, function () { PurchaseItem_LoadingWithPaging(); });
}
function PurchaseItem_CalculateVolume() {
    debugger;
    if ($("#txtWidth").val() != "" && $("#txtDepth").val() != "" && $("#txtHeight").val() != "") {
        $("#txtVolume").val((($("#txtWidth").val() * $("#txtDepth").val() * $("#txtHeight").val()) / 1000000).toFixed(3));
    }
    else {
        $("#txtVolume").val(0);
    }
}
function PurchaseItem_EnableDisableIMOProprties(pIsEnable) {
    if (pIsEnable || $("#cbIsIMO").prop("checked")) {
        $("#txtUN").removeAttr("disabled");
        $("#slIMOClass").removeAttr("disabled");
        $("#slPG").removeAttr("disabled");
    }
    else {
        $("#txtUN").attr("disabled", "disabled");
        $("#txtUN").val("");
        $("#slIMOClass").attr("disabled", "disabled");
        $("#slIMOClass").val("");
        $("#slPG").attr("disabled", "disabled");
        $("#slPG").val("");
    }
}
//*********************************PackageTypeBarCode***************************************//
function PackageTypeBarCode_BindTableRows(pPackageTypeBarCode) {
    ClearAllTableRows("tblPackageTypeBarCode");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pPackageTypeBarCode, function (i, item) {

        AppendRowtoTable("tblPackageTypeBarCode",
        ("<tr ID='" + item.ID + "' " + (1 == 1 ? ("ondblclick='PackageTypeBarCode_FillControls(" + item.ID + ");'") : "") + ">"
                    + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                    + "<td class='PackageTypeID hide'>" + item.PackageTypeID + "</td>"
                    + "<td class='PackageTypeName'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>"
            + "<td class='BarCode hide'>" + (item.BarCode1 == 0 ? "" : item.BarCode1) + "</td>"
            + "<td class='BarCode1'>" + (item.BarCode == 0 ? "" : item.BarCode) + "</td>"

            + "<td class='Color hide'>" + (item.Color == 0 ? "" : item.Color) + "</td>"
            + "<td class='Model hide'>" + (item.Model == 0 ? "" : item.Model) + "</td>"


                    + "<td class='hide'><a href='#PackageTypeBarCodeModal' data-toggle='modal' onclick='PackageTypeBarCode_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblPackageTypeBarCode", "ID", "cb-CheckAll-PackageTypeBarCode");
    CheckAllCheckbox("HeaderDeletePackageTypeBarCodeID");
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function PackageTypeBarCode_ClearAllControls() {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save header first.");
    else {
        ClearAll("#PackageTypeBarCodeModal");
        $("#btnSavePackageTypeBarCode").attr("onclick", "PackageTypeBarCode_Save(false);");
        $("#btnSaveAndAddNewPackageTypeBarCode").attr("onclick", "PackageTypeBarCode_Save(true);");
        jQuery("#PackageTypeBarCodeModal").modal("show");
    }
}
function PackageTypeBarCode_FillControls(pID) {
    debugger;
    ClearAll("#PackageTypeBarCodeModal");
    $("#hPackageTypeBarCodeID").val(pID);
    var tr = $("#tblPackageTypeBarCode tr[ID='" + pID + "']");
    $("#slPackageTypeBarCode").val($(tr).find("td.PackageTypeID").text());
    $("#txtBarCode").val($(tr).find("td.BarCode").text());
    $("#txtColor").val($(tr).find("td.Color").text());
    $("#txtModel").val($(tr).find("td.Model").text());


    jQuery("#PackageTypeBarCodeModal").modal("show");
}
function PackageTypeBarCode_Save(pSaveAndNew) {
    debugger;
    FadePageCover(true);
    if (ValidateForm("form", "PackageTypeBarCodeModal")) {
        var pParametersWithValues = {
            pPackageTypeBarCodeID: $("#hPackageTypeBarCodeID").val() == "" ? 0 : $("#hPackageTypeBarCodeID").val()
            , pPurchaseItemID: $("#hID").val()
            , pPackageTypeID: $("#slPackageTypeBarCode").val() == "" ? 0 : $("#slPackageTypeBarCode").val()
            , pBarCode: $("#txtBarCode").val().trim() == "" ? 0 : $("#txtBarCode").val().trim()
            , pColor: $("#txtColor").val().trim() == "" ? 0 : $("#txtColor").val().trim()
            , pModel: $("#txtModel").val().trim() == "" ? 0 : $("#txtModel").val().trim()

        };
        CallGETFunctionWithParameters("/api/I_ItemsGroups/PackageTypeBarCode_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    PackageTypeBarCode_BindTableRows(JSON.parse(pData[1]));
                    if (pSaveAndNew)
                        ClearAll("#PackageTypeBarCodeModal");
                    else
                        jQuery("#PackageTypeBarCodeModal").modal("hide");
                    swal("Success", "Saved successfully.");
                }
                else
                    swal("Sorry", "Saving failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
    else
        FadePageCover(false);
}
function PackageTypeBarCode_DeleteList() {
    debugger;
    //Confirmation message to delete
    var pPackageTypeBarCodeIDsToDelete = GetAllSelectedIDsAsString('tblPackageTypeBarCode');
    if (pPackageTypeBarCodeIDsToDelete != "")
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
            CallGETFunctionWithParameters("/api/I_ItemsGroups/PackageTypeBarCode_Delete"
                , { pPackageTypeBarCodeIDsToDelete: pPackageTypeBarCodeIDsToDelete, pPurchaseItemID: $("#hID").val() }
                , function (pData) {
                    if (pData[0]) {
                        PackageTypeBarCode_BindTableRows(JSON.parse(pData[1]));



                       
                    }
                    else
                        swal("Sorry", strDeleteFailMessage);
                    FadePageCover(false);
                });
        });
}
//*********************************EOF PackageTypeBarCode***************************************//

//*********************************PackageTypeConversion***************************************//
function PackageTypeConversion_BindTableRows(pPackageTypeConversion) {
    ClearAllTableRows("tblPackageTypeConversion");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pPackageTypeConversion, function (i, item) {

        AppendRowtoTable("tblPackageTypeConversion",
        ("<tr ID='" + item.ID + "' " + (1 == 1 ? ("ondblclick='PackageTypeConversion_FillControls(" + item.ID + ");'") : "") + ">"
                    + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                    + "<td class='FromPackageTypeID hide'>" + item.FromPackageTypeID + "</td>"
                    + "<td class='FromPackageTypeName'>" + (item.FromPackageTypeName == 0 ? "" : item.FromPackageTypeName) + "</td>"
                    + "<td class='ToPackageTypeID hide'>" + item.ToPackageTypeID + "</td>"
                    + "<td class='ToPackageTypeName'>" + (item.ToPackageTypeName == 0 ? "" : item.ToPackageTypeName) + "</td>"
                    + "<td class='Factor'>" + (item.Factor == 0 ? "" : item.Factor) + "</td>"
                    + "<td class='hide'><a href='#PackageTypeConversionModal' data-toggle='modal' onclick='PackageTypeConversion_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblPackageTypeConversion", "ID", "cb-CheckAll-PackageTypeConversion");
    CheckAllCheckbox("HeaderDeletePackageTypeConversionID");
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function PackageTypeConversion_ClearAllControls() {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save header first.");
    else {
        ClearAll("#PackageTypeConversionModal");
        $("#btnSavePackageTypeConversion").attr("onclick", "PackageTypeConversion_Save(false);");
        $("#btnSaveAndAddNewPackageTypeConversion").attr("onclick", "PackageTypeConversion_Save(true);");
        jQuery("#PackageTypeConversionModal").modal("show");
    }
}
function PackageTypeConversion_FillControls(pID) {
    debugger;
    ClearAll("#PackageTypeConversionModal");
    $("#hPackageTypeConversionID").val(pID);
    var tr = $("#tblPackageTypeConversion tr[ID='" + pID + "']");
    $("#slFromPackageType").val($(tr).find("td.FromPackageTypeID").text());
    $("#slToPackageType").val($(tr).find("td.ToPackageTypeID").text());
    $("#txtFactor").val($(tr).find("td.Factor").text());
    jQuery("#PackageTypeConversionModal").modal("show");
}
function PackageTypeConversion_Save(pSaveAndNew) {
    debugger;
    FadePageCover(true);
    if (parseFloat($("#txtFactor").val().trim()) == 0) {
        swal("Sorry", "Factor can not be 0.");
        FadePageCover(false);
    }
    else if ($("#slFromPackageType").val() == $("#slToPackageType").val()) {
        swal("Sorry", "Stock units can not be the same.");
        FadePageCover(false);
    }
    else if (ValidateForm("form", "PackageTypeConversionModal")) {
        var pParametersWithValues = {
            pPackageTypeConversionID: $("#hPackageTypeConversionID").val() == "" ? 0 : $("#hPackageTypeConversionID").val()
            , pPurchaseItemID: $("#hID").val()
            , pFromPackageTypeID: $("#slFromPackageType").val() == "" ? 0 : $("#slFromPackageType").val()
            , pToPackageTypeID: $("#slToPackageType").val() == "" ? 0 : $("#slToPackageType").val()
            , pFactor: $("#txtFactor").val().trim() == "" ? 0 : $("#txtFactor").val().trim()
        };
        CallGETFunctionWithParameters("/api/I_ItemsGroups/PackageTypeConversion_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    PackageTypeConversion_BindTableRows(JSON.parse(pData[1]));
                    if (pSaveAndNew)
                        ClearAll("#PackageTypeConversionModal");
                    else
                        jQuery("#PackageTypeConversionModal").modal("hide");
                    swal("Success", "Saved successfully.");
                }
                else
                    swal("Sorry", "Saving failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
    else
        FadePageCover(false);
}
function PackageTypeConversion_DeleteList() {
    debugger;
    //Confirmation message to delete
    var pPackageTypeConversionIDsToDelete = GetAllSelectedIDsAsString('tblPackageTypeConversion');
    if (pPackageTypeConversionIDsToDelete != "")
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
            CallGETFunctionWithParameters("/api/I_ItemsGroups/PackageTypeConversion_Delete"
                , { pPackageTypeConversionIDsToDelete: pPackageTypeConversionIDsToDelete, pPurchaseItemID: $("#hID").val() }
                , function (pData) {
                    if (pData[0]) {
                        PackageTypeConversion_BindTableRows(JSON.parse(pData[1]));
                    }
                    else
                        swal("Sorry", strDeleteFailMessage);
                    FadePageCover(false);
                });
        });
}
//*********************************EOF PackageTypeConversion***************************************//

//*********************************Reading Excel Files***************************************//
//Must be saved as Excel 97-2003
function onFileSelected(event) {
    debugger;
    var selectedFile = event.target.files[0];
    if (selectedFile != undefined) { //to handle the case of not choosing a file
        var sFilename = selectedFile.name;
        // Create A File Reader HTML5
        var reader = new FileReader();
        var result = document.getElementById("hExtractedData");
        reader.onload = function (e) {
            var data = e.target.result;
            var cfb = XLS.CFB.read(data, { type: 'binary' });
            var wb = XLS.parse_xlscfb(cfb);
            // Loop Over Each Sheet
            wb.SheetNames.forEach(function (sheetName) {
                //// Obtain The Current Row As CSV
                //var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
                var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
                //$("#hExtractedData").val(sCSV);
                if (oJS.length > 0 && oJS[0].Code != undefined && oJS[0].Name != undefined && oJS[0].HSCode != undefined && oJS[0].PartNumber != undefined && oJS[0].Price != undefined) //if (sCSV != "")
                    ImportFromExcelFile(oJS);
                else
                    swal("Sorry", "Please, revise data and version of the file.");
            });
        };
        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(selectedFile);
    }
}
function ImportFromExcelFile(pDataRows) {
    debugger;
    FadePageCover(true);
    var pCodeList = "";
    var pNameList = "";
    var pPartNumberList = "";
    var pHSCodeList = "";
    var pPriceList = "";
    for (var i = 0; i < pDataRows.length; i++) { //replace '\', ' ', ',' with space
        pCodeList += (pCodeList == "" ? (pDataRows[i].Code.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Code.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].Code.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Code.replace(/[\, ]/g, ' ').toUpperCase().trim())));
        pNameList += (pNameList == "" ? (pDataRows[i].Name.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].Name.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim())));
        pPartNumberList += (pPartNumberList == "" ? (pDataRows[i].PartNumber.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].PartNumber.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].PartNumber.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].PartNumber.replace(/[\, ]/g, ' ').toUpperCase().trim())));
        pHSCodeList += (pHSCodeList == "" ? (pDataRows[i].HSCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].HSCode.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].HSCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].HSCode.replace(/[\, ]/g, ' ').toUpperCase().trim())));
        pPriceList += (pPriceList == "" ? (pDataRows[i].Price.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Price.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].Price.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Price.replace(/[\, ]/g, ' ').toUpperCase().trim())));
    }
    var pParametersWithValues = {
        pCodeList: pCodeList
            , pNameList: pNameList
            , pPartNumberList: pPartNumberList
            , pHSCodeList: pHSCodeList
            , pPriceList: pPriceList
    };
    CallPOSTFunctionWithParameters("/api/I_ItemsGroups/InsertList", pParametersWithValues
        , function (pData) {
            if (pData[0]) {
                swal("Success", "Saved Successfully.");
                PurchaseItem_LoadingWithPaging();
            }
            else {
                swal("Sorry", "Please, revise data and version of the file.");
                FadePageCover(false);
            }
        }
        , null);
    $("#btnAddFromExcel").val(""); //if removed the last selected file remains till unselected
}
//******************************EOF Reading Excel Files***************************************//

//*********************************Uploaded Docs***************************************//
function DocsIn_FillControls() {
    debugger;
    if ($("#txtUploadFolderName").val() == "")
        swal("Sorry", "Please, save header first.");
    else {
        var pStrFolderPath = "";
        constProductDocsInFilesPath = "/DocsInFiles//PurchaseItem//";
        pStrFolderPath = "~/DocsInFiles/PurchaseItem/";
        jQuery("#DocsInModal").modal("show");
        //CallGETFunctionWithParameters(pFunctionName, pParametersWithValues, callback, callback1)
        CallGETFunctionWithParameters("/api/I_ItemsGroups/LoadFiles"
            , { pFolderName: $("#txtUploadFolderName").val(), pStrFolderPath: pStrFolderPath }
            , function (data) {
                DocsIn_BindTableRows(JSON.parse(data[0]));
            }
            , null);
    }
}
function DocsIn_BindTableRows(pDocsInFileNames) {
    debugger;
    ClearAllTableRows("tblDocsIn");
    if (pDocsInFileNames != null) {
        //var editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        var downloadControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-cloud-download' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Download" + "</span>";
        var openControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-folder-open' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Open" + "</span>";
        var emailControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-envelope-o' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Mail" + "</span>";
        for (i = 0; i < pDocsInFileNames.length; i++) {
            AppendRowtoTable("tblDocsIn",
            //("<tr ID='" + item.ID + "' ondblclick='DocumentTypes_EditByDblClick(" + item.ID + ");'>"
            ("<tr ID='" + i + "'>"
                + "<td class='DocsInID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + pDocsInFileNames[i] + "'></td>"
                + "<td class='DocsInSerial'>" + (parseInt(i) + 1) + "</td>"
                + "<td class='FileName'>" + pDocsInFileNames[i] + "</td>"
                //+ "<td class=''><a onclick='DocsIn_OpenUploadedFile(" + '"' + pDocsInFileNames[i] + '","' + $("#txtUploadFolderName").val() + '"' + ");' " + openControlsText + "</a><a onclick='SaveFile(" + '"' + pDocsInFileNames[i] + '","' + $("#txtUploadFolderName").val() + '"' + ");' " + downloadControlsText + "</a>&nbsp;&nbsp;&nbsp;</td>"
                + "<td class=''><a onclick='DocsIn_OpenUploadedFile(" + '"' + pDocsInFileNames[i] + '","' + $("#txtUploadFolderName").val() + '"' + ");' " + openControlsText + "</a>&nbsp;&nbsp;&nbsp;</td>"
                //+ ($("#hIsOperationDisabled").val() == false
                //? ("<td class=''><a href='#DocumentTypeModal' data-toggle='modal' onclick='DocsOut_Print(" + item.ID + ");' " + printControlsText + "</a><a onclick='DocsOut_SendEmail(" + item.ID + ", function(){window.onbeforeunload = confirmExit;});' " + emailControlsText + "</a>&nbsp;&nbsp;&nbsp;</td>")
                //: "<td></td>")
                + "</tr>"));
        }
    }
    //ApplyPermissions();
    //if (OADocIn && $("#hIsOperationDisabled").val() == false) { $("#inputFileUpload").removeClass("hide"); $("#divUpload").removeClass("hide"); } else { $("#inputFileUpload").addClass("hide"); $("#divUpload").addClass("hide"); }
    //if (ODDocIn && $("#hIsOperationDisabled").val() == false) { $("#btn-DeleteDocsIn").removeClass("hide"); } else { $("#btn-DeleteDocsIn").addClass("hide"); }
    BindAllCheckboxonTable("tblDocsIn", "DocsInID", "cb-CheckAll-DocsIn");
    CheckAllCheckbox("HeaderDeleteDocsInID");
}
// Asynchronous file upload process
function DocsIn_UploadFile() {
    debugger;
    constProductDocsInFilesPath = "/DocsInFiles//PurchaseItem//";
    //maxTotalSize = 10485760;//10MB total of uploaded files together
    maxTotalSize = 20971520;//20MB total of uploaded files together
    var formData = new FormData();
    var files = $("#inputFileUpload").get(0).files;
    var totalFilesSize = 0;
    if (files.length > 0) {
        //check files total size is less than 20MB
        for (i = 0; i < files.length; i++)
            totalFilesSize += files[i].size;
        if (totalFilesSize > maxTotalSize)
            swal(strSorry, "Total file(s) size can't exceed 20MBs at one upload.");
        else {
            // Add the uploaded files content to the form data collection
            if (files.length > 0) {
                FadePageCover(true);
                for (i = 0; i < files.length; i++)
                    formData.append("FileNames", files[i]);
            }
            formData.append("pFolderName", $("#txtUploadFolderName").val())
            formData.append("pStrFolderPath", "~/DocsInFiles/PurchaseItem/")
            // Make Ajax request with the contentType = false, and processDate = false
            var ajaxRequest = $.ajax({
                type: "POST",
                xhr: function () {  // Custom XMLHttpRequest
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) { // Check if upload property exists
                        myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // For handling the progress of the upload
                    }
                    return myXhr;
                },
                url: "/api/I_ItemsGroups/UploadFile",
                contentType: false,
                processData: false,
                data: formData,
                success: function (data) { //data[0]: The filenames returned
                    DocsIn_BindTableRows(JSON.parse(data[0]));
                    FadePageCover(false);
                    swal("Success", "File(s) uploaded successfully.");
                },
                error: function (jqXHR, exception) {
                    FadePageCover(false);
                    swal(strSorry, "An error occured, please try again.");
                }
            });
            ajaxRequest.done(function (xhr, textStatus) {
                // Do other operation
                debugger;
            });
        }//of else (correct file sizes)
    }//of if (files.length == 0)
}
function DocsIn_DeleteList() {
    debugger;
    var pStrFolderPath = "";
    constProductDocsInFilesPath = "/DocsInFiles//PurchaseItem//";
    pStrFolderPath = "~/DocsInFiles/PurchaseItem/";
    //Confirmation message to delete
    var pFileNames = GetAllSelectedIDsAsString('tblDocsIn', 'Delete');
    if (pFileNames != "")
        swal({
            title: "Are you sure?",
            text: "The selected files will be removed from server!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, remove!",
            closeOnConfirm: true
        },
        //callback function in case of confirm delete
        function () {
            FadePageCover(true);
            //CallGETFunctionWithParameters(pFunctionName, pParametersWithValues, callback, callback1)
            CallGETFunctionWithParameters("/api/I_ItemsGroups/DeleteUploadedFile"
            //CallGETFunctionWithParameters("/api/DocsIn/Delete"
                , { "pFolderName": $("#txtUploadFolderName").val(), "pFileNames": pFileNames, "pStrFolderPath": pStrFolderPath }
                , function (data) { //data[0]: pDocsInFileNames
                    DocsIn_BindTableRows(JSON.parse(data[0]));
                    FadePageCover(false);
                }
                , null);
        });
}
function DocsIn_OpenUploadedFile(pFileName, pFolderName) {
    debugger;
    window.open(constProductDocsInFilesPath + pFolderName + "\\" + pFileName, '_blank');
    //var myWindow = window.open("", "_blank");
    //myWindow.document.write("<p>I replaced the current window.</p>");
}
function progressHandlingFunction(e) {
    if (e.lengthComputable) {
        $('progress').attr({ value: e.loaded, max: e.total });
    }
}
//*********************************EOF Uploaded Docs***************************************//
$('input[type=checkbox][name=cbByExpireDate]').change(function () {
    debugger;
    if ($(this).prop('checked') == true) {
        $("#cbBySerialNo").prop("checked", false);
        $("#cbByVehicle").prop("checked", false);
    }
});
$('input[type=checkbox][name=cbByLotNo]').change(function () {
    debugger;
    if ($(this).prop('checked') == true) {
        $("#cbBySerialNo").prop("checked", false);
        $("#cbByVehicle").prop("checked", false);
    }
});
$('input[type=checkbox][name=cbBySerialNo]').change(function () {
    debugger;
    if ($(this).prop('checked') == true) {
        $("#cbByExpireDate").prop("checked", false);
        $("#cbByLotNo").prop("checked", false);
        $("#cbByVehicle").prop("checked", false);
    }
});
$('input[type=checkbox][name=cbByVehicle]').change(function () {
    debugger;
    if ($(this).prop('checked') == true) {
        $("#cbByExpireDate").prop("checked", false);
        $("#cbByLotNo").prop("checked", false);
        $("#cbBySerialNo").prop("checked", false);
    }
});
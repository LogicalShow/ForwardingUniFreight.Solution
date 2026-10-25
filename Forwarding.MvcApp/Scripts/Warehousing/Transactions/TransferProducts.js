var maxTransferProductsDetailsSerialIDInTable = 0; //used for when adding new row then make td control names unique
function ApplySelectListSearch() {
    debugger;
    $("#slWarehouseSearch").css({ "width": "100%" }).select2();
    $("#slWarehouseSearch").trigger("change");
    
    $("#slAreaSearch").css({ "width": "100%" }).select2();
    $("#slAreaSearch").trigger("change");

    $("#slLocationSearch").css({ "width": "100%" }).select2();
    $("#slLocationSearch").trigger("change");

    $("#slCustomerSearch").css({ "width": "100%" }).select2();
    $("#slCustomerSearch").trigger("change");

    $("#slPurchaseItemSearch").css({ "width": "100%" }).select2();
    $("#slPurchaseItemSearch").trigger("change");

    $("div[tabindex='-1']").removeAttr('tabindex');
}
function ApplySelectListSearch_OnlyChange() {
    $("#slWarehouseSearch").css({ "width": "100%" }).select2();
    $("#slAreaSearch").css({ "width": "100%" }).select2();
    $("#slLocationSearch").css({ "width": "100%" }).select2();
    $("#slCustomerSearch").css({ "width": "100%" }).select2();
    $("#slPurchaseItemSearch").css({ "width": "100%" }).select2();
}
function TransferProducts_Initialize() {
    debugger;
    //TransferLocation
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "TransferProducts_BindTableRows";
    strLoadWithPagingFunctionName = "/api/TransferProducts/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    //var pWhereClause = " WHERE (Quantity>FinalizedPickedQuantity) AND IsUsed=1 ";
    var pWhereClause = "";
    if (pDefaults.UnEditableCompanyName == "GBL")
        pWhereClause += " WHERE OperationVehicleID IS NOT NULL AND (Quantity>FinalizedPickedQuantity) ";
    else
        pWhereClause += " WHERE OperationVehicleID IS NULL AND (Quantity>FinalizedPickedQuantity) ";

    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/Transactions/TransferProducts", "div-content", function () {
        if (glbCallingControl == "TransferProducts") {
            $("#liGroupName").text("Vehicles");
            $("#liGroupName").attr("onclick", "LoadViews('VehicleModule')");
            $("#liTabName").text("Transactions");
            $("#liTabName").attr("onclick", "LoadViews('VehicleModule')");
            $("#liFormName").text("Transfer Vehicle");
            $("#h3Label").text("Transfer Vehicle");
        }
        else { //WH_MoveProduct
            $("#liGroupName").text("Warehousing");
            $("#liGroupName").attr("onclick", "LoadViews('WarehousingTransactions')");
            $("#liTabName").text("Trasactions");
            $("#liTabName").attr("onclick", "LoadViews('WarehousingTransactions')");
            $("#liFormName").text("Move Product");
            $("#h3Label").text("Move Product");
        }
        if (pDefaults.UnEditableCompanyName == "GBL")
            $(".classShowForGBL").removeClass("hide");
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                var pWarehouse = pData[2];
                var pArea = pData[3];
                FillListFromObject(null, 2, "<--Select-->", "slWarehouseSearch", pWarehouse, function () { $("#slWarehouse_To").html($("#slWarehouseSearch").html()); });
                FillListFromObject(null, 2, "<--Select-->", "slAreaSearch", pArea, null);
                $("#slCustomerSearch").html($("#hReadySlCustomers").html());
                TransferProducts_BindTableRows(JSON.parse(pData[0]));
            });
        CallGETFunctionWithParameters("/api/PurchaseItem/LoadAll"
                , { pWhereClause: "WHERE 1=1" }
                , function (pData) {
                    var pPurchaseItem = pData[0];
                    //FillListFromObject(null, 9, "<--Select-->", "slReceiveDetailsPurchaseItem", pPurchaseItem, function () { $("#slFilterPurchaseItem").html($("#slReceiveDetailsPurchaseItem").html()); ApplySelectListSearch(); });
                    Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pPurchaseItem, "ID", "Code,Name,PartNumber", " : ", "<--Select-->", "#slPurchaseItemSearch", null, "", function () { ApplySelectListSearch(); })
                }
                , null, true);
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { TransferProducts_ClearAllControls(); },
        function () { TransferProducts_DeleteList(); });
}
function TransferProducts_BindTableRows(pTransferProducts)
{
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblTransferProducts");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTransferProducts, function (i, item) {

        var cb = (IsNull(item.LocationID, "") == "" ? "<input name='Delete' type='checkbox' value='" + item.ID + "' />" : "") ;
        if (pDefaults.UnEditableCompanyName != "GBL")
            cb = "<input name='Delete' type='checkbox' value='" + item.ID + "' />"; // i dont know the reason for the condition do i just made adefault

        AppendRowtoTable("tblTransferProducts",
        //("<tr ID='" + item.ID + "' ondblclick='TransferProducts_FillAllControls(" + item.ID + ");' class='" + (item.IsFinalized ? "" : "") + "'>"
        ("<tr ID='" + item.ID + "' ondblclick='' class='" + (item.IsFinalized ? "" : "") + "'>"
            + "<td class='ID'> " + cb +" <span class='hide'>" + item.ID +"</span></td>"
            + "<td class='RecieveID hide'>" + item.ReceiveID + "</td>"
            + "<td class='CustomerID hide'>" + item.CustomerID + "</td>"
            + "<td class='WarehouseID hide'>" + item.WarehouseID + "</td>"
            + "<td class='LocationID hide'>" + item.LocationID + "</td>"
            + "<td class='Quantity hide'>" + item.Quantity + "</td>"
            + "<td class='FinalizedPickedQuantity hide'>" + item.FinalizedPickedQuantity + "</td>"
            + "<td class='CustomerName'>" + item.CustomerName + "</td>"
            + "<td class='ProductCode'>" + item.PurchaseItemCode + "</td>"
            + "<td class='ProductName'>" + item.PurchaseItemName + "</td>"
            //+ "<td class='LocationID'>" + "<select id='slLocation" + item.ID + "' class='form-control input-sm' onfocus='TransferProducts_FillSlLocation(" + item.ID + ");' onkeydown='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onblur='' style='width:100%;'><option value=" + item.LocationID + ">" + (item.LocationID == 0 ? "<--Select-->" : item.LocationCode) + "</option></select>" + "</td>"
            + "<td class='LocationID'><p id='cellLocation" + item.ID + "' style='width:100%;' ondblclick='TransferProducts_FillSlLocation(" + '"' + "Location" + '",' + item.ID + ");'>" + (item.LocationID == 0 ? "N/A" : item.LocationCode) + "</p><select hide id='slLocation" + item.ID + "' style='width:100%;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onblur='TransferProducts_SaveFromLine(" + item.ID + ");' data-required='false'>" + "<option value=" + (item.LocationID == 0 ? "" : item.LocationID) + "></option>" + "</select></td>"
            + "<td class='Location hide'>" + item.LocationCode + "</td>"
            + "<td class='AvailableQuantity " + (pDefaults.UnEditableCompanyName == "GBL" ? "" : " hide ") + "'>" + (parseFloat(item.Quantity) - parseFloat(item.FinalizedPickedQuantity)) + "</td>"
            + "<td class='MotorNumber " + (pDefaults.UnEditableCompanyName == "GBL" ? "" : " hide ") + "'>" + (item.MotorNumber == 0 ? "" : item.MotorNumber) + "</td>"
            + "<td class='Chassisnumber " + (pDefaults.UnEditableCompanyName == "GBL" ? "" : " hide ") + "'>" + (item.ChassisNumber == 0 ? "" : item.ChassisNumber) + "</td>"
            + "<td class='OCNCode " + (pDefaults.UnEditableCompanyName == "GBL" ? "" : " hide ") + "'>" + (item.OCNCode == 0 ? "" : item.OCNCode) + "</td>"
            + "<td class='HasMultiLocations " + (pDefaults.UnEditableCompanyName == "GBL" ? "" : " hide ") + "'> " + "<input type='checkbox'/>" + " <span class='hide'>" + item.ID + "</span></td>"
            + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblTransferProducts", "ID");
    CheckAllCheckbox("ID");
    /////HighlightText("#tblTransferProducts>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function TransferProducts_LoadingWithPaging() {
    debugger;
    var pWhereClause = TransferProducts_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { TransferProducts_BindTableRows(JSON.parse(pData[0])); });
    //HighlightText("#tblTransferProducts>tbody>tr", $("#txt-Search").val().trim());
}
function TransferProducts_GetWhereClause()
{
    debugger;
    var _WhereClause = "";

    if (pDefaults.UnEditableCompanyName == "GBL")
        _WhereClause += "WHERE OperationVehicleID IS NOT NULL AND (Quantity>FinalizedPickedQuantity)" + " \n";
    else
        _WhereClause += "WHERE OperationVehicleID IS NULL AND (Quantity>FinalizedPickedQuantity)" + " \n";

    if ($("#slWarehouseSearch").val() != "" && $("#slWarehouseSearch").val()!=null)
        _WhereClause += " and  WarehouseID=" + $("#slWarehouseSearch").val() + " ";
    if ($("#slAreaSearch").val() != "") {
        _WhereClause += " AND AreaName=N'" + $("#slAreaSearch option:selected").text() + "'" + " \n";
    }
    if ($("#slLocationSearch").val() != null && $("#slLocationSearch").val() != "") {
        _WhereClause += " and  LocationID=" + $("#slLocationSearch").val() + " \n";
    }
    if ($("#slCustomerSearch").val() != null && $("#slCustomerSearch").val() != "") {
        _WhereClause += " and  CustomerID=" + $("#slCustomerSearch").val() + " \n";
    }
    if ($("#slPurchaseItemSearch").val() != null && $("#slPurchaseItemSearch").val() != "" && $("#slPurchaseItemSearch").val() != 0) {
        _WhereClause += " and  PurchaseItemID=" + $("#slPurchaseItemSearch").val() + " \n";
    }
    if ($("#txtMotorNumberSearch").val().trim() != "") {
        _WhereClause += " and  EngineNumber=N'" + $("#txtMotorNumberSearch").val().trim() + "'" + " \n";
    }
    if ($("#txtChassisNoSearch").val().trim() != "") {
        _WhereClause += " and  ChassisNumber='" + $("#txtChassisNoSearch").val().trim() + "'" + " \n";
    }
    if ($("#txtOCNCodeSearch").val().trim() != "") {
        _WhereClause += " and  OCNCode='" + $("#txtOCNCodeSearch").val().trim() + "'" + " \n";
    }

    return _WhereClause;
}
function TransferProducts_ClearAllControls() {
    debugger;
    $("#tblTransferProductsDetails tbody").html("");
    //$("#lblTransferProductsMaxWeight").html("<span> : </span><span>" + 0 + "</span>");
    //$("#lblTransferProductsMaxVolume").html("<span> : </span><span>" + 0 + "</span>");
    ClearAll("#TransferProductsModal");

    $("#txtTransferProductsDate").val(getTodaysDateInddMMyyyyFormat());
    $(".classDisableForFinalized").removeAttr("disabled");

    $("#btnSave").attr("onclick", "TransferProducts_Save(false);");
    $("#btnSaveAndAddNew").attr("onclick", "TransferProducts_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
}
function TransferProducts_FillAllControls(pID) {
    debugger;
    FadePageCover(true);

    ClearAll("#TransferProductsModal");


    var pParametersWithValues = {
        pHeaderID: pID
    };
    CallGETFunctionWithParameters("/api/TransferProducts/LoadHeaderWithDetails", pParametersWithValues
        , function (pData) {
            var pTransferProductsDetails = JSON.parse(pData[0]);
            var _Location = pData[1];
            var _Area = pData[2];

            FillListFromObject(pTransferProductsDetails.AreaID, 2, "<--Select-->", 'slArea_To', _Area, null);

            FillListFromObject(null, 1, "<--Select-->", "slLocation_To", pData[1], null);

            $("#hID").val(pID);
            $("#lblShown").html(" : " + pTransferProductsDetails.PurchaseItemName);
            $("#txtFromLocation").val(pTransferProductsDetails.LocationCode);
            $("#slWarehouse_To").val(pTransferProductsDetails.WarehouseID);
            $("#hOldLocationID").val(pTransferProductsDetails.LocationID);
        }
        , function () { jQuery("#TransferProductsModal").modal("show"); FadePageCover(false); });
}
function TransferProducts_FillSlLocation(pControlSuffixID, pID) {
    debugger;
    FadePageCover(true);
    ClearAll("#TransferProductsModal");
    $("#sl" + pControlSuffixID + pID).html("");
    $("#sl" + pControlSuffixID + pID).removeClass("hide");
    $("#cell" + pControlSuffixID + pID).addClass("hide");
    var pParametersWithValues = {
        pHeaderID: pID
    };
    CallGETFunctionWithParameters("/api/TransferProducts/LoadHeaderWithDetails", pParametersWithValues
        , function (pData) {
            var pTransferProductsDetails = JSON.parse(pData[0]);
            var _Location = pData[1];
            var _Area = pData[2];

            //FillListFromObject(pTransferProductsDetails.AreaID, 2, "<--Select-->", 'slArea_To', _Area, null);

            //FillListFromObject(null, 1, "<--Select-->", "slLocation_To", pData[1], null);
            FillListFromObject(pTransferProductsDetails.LocationID, 1, "<--Select-->", "sl" + pControlSuffixID + pID, pData[1], null);

            $("#hID").val(pID);
            $("#lblShown").html(" : " + pTransferProductsDetails.PurchaseItemName);
            $("#txtFromLocation").val(pTransferProductsDetails.LocationCode);
            $("#slWarehouse_To").val(pTransferProductsDetails.WarehouseID);
            $("#hOldLocationID").val(pTransferProductsDetails.LocationID);
            FadePageCover(false);
        }
        , function () {
            //jQuery("#TransferProductsModal").modal("show"); 
            //FadePageCover(false);
        });
}


function TransferProducts_Save(pSaveAndNew) {
    debugger;
    FadePageCover(true);
    if (ValidateForm("form", "TransferProductsModal")) {
        var pParametersWithValues = {
            pReceiveDetailsID:$("#hID").val()
            , pLocationID: $("#slLocation_To").val() 
            , pOldLocationID: $("#hOldLocationID").val()
        };
        CallGETFunctionWithParameters("/api/TransferProducts/ReceiveDetails_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {

                    TransferProducts_LoadingWithPaging();
                   
                    ClearAll("#TransferProductsModal");
                      
                   
                    jQuery("#TransferProductsModal").modal("hide");
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
function TransferProducts_SaveFromLine(pID) {
    debugger;
    FadePageCover(true);
    var pParametersWithValues = {
        pReceiveDetailsID: $("#hID").val()
        , pLocationID: $("#slLocation" + pID).val() == "" ? 0 : $("#slLocation" + pID).val()
        , pOldLocationID: $("#hOldLocationID").val()
    };
    CallGETFunctionWithParameters("/api/TransferProducts/ReceiveDetails_Save", pParametersWithValues
        , function (pData) {
            if (pData[0]) {

                $("#slLocation" + pID).addClass("hide");
                $("#cellLocation" + pID).removeClass("hide");

                TransferProducts_LoadingWithPaging();

                ClearAll("#TransferProductsModal");


                jQuery("#TransferProductsModal").modal("hide");
                //swal("Success", "Saved successfully.");
            }
            else
                swal("Sorry", "Saving failed, please try again.");
            FadePageCover(false);
        }
        , null);
}

//*********************************Reading Excel Files***************************************//
function TransferProducts_Import() {
    debugger;
    if ($("#slCustomerSearch").val() == "" || $("#slCustomerSearch").val() == null ||$("#slCustomerSearch").val() == undefined)
        swal("Sorry", "Please, select customer.");
    else
        $("#btnAddFromExcel").click();
}
function onFileSelected(event) { //Must be saved as Excel 97-2003
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
                if (oJS.length > 0 && oJS[0].ProductCode != undefined) //if (sCSV != "")
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
    //let pCustomerNameList = "";
    let pPurchaseItemCodeList = "";
    let pFromLocationList = "";
    let pToLocationList = "";
    //let pQuantityList = "";
    //let pPalletIDList = "";
    for (var i = 0; i < pDataRows.length; i++) { //replace '\', ' ', ',' with space
        if (pDataRows[i].ProductCode == undefined || pDataRows[i].FromLocation == undefined || pDataRows[i].ToLocation == undefined) {
            FadePageCover(false);
            $("#btnAddFromExcel").val(""); //if removed the last selected file remains till unselected
            swal("Sorry", "Please, check row " + (i + 2));
            return;
        }
        else {
            //pCustomerNameList += (pCustomerNameList == "" ? (pDataRows[i].CustomerName == undefined || pDataRows[i].CustomerName.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].CustomerName.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].CustomerName == undefined || pDataRows[i].CustomerName.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].CustomerName.replace(/[\, ]/g, ' ').toUpperCase().trim())));
            pPurchaseItemCodeList += (pPurchaseItemCodeList == "" ? (pDataRows[i].ProductCode == undefined || pDataRows[i].ProductCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ProductCode.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].ProductCode == undefined || pDataRows[i].ProductCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ProductCode.replace(/[\, ]/g, ' ').toUpperCase().trim())));
            pFromLocationList += (pFromLocationList == "" ? (pDataRows[i].FromLocation == undefined || pDataRows[i].FromLocation.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].FromLocation.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].FromLocation == undefined || pDataRows[i].FromLocation.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].FromLocation.replace(/[\, ]/g, ' ').toUpperCase().trim())));
            pToLocationList += (pToLocationList == "" ? (pDataRows[i].ToLocation == undefined || pDataRows[i].ToLocation.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ToLocation.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].ToLocation == undefined || pDataRows[i].ToLocation.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ToLocation.replace(/[\, ]/g, ' ').toUpperCase().trim())));
            //pQuantityList += (pQuantityList == "" ? (pDataRows[i].Quantity == undefined || pDataRows[i].Quantity.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Quantity.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].Quantity == undefined || pDataRows[i].Quantity.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Quantity.replace(/[\, ]/g, ' ').toUpperCase().trim())));
            //pPalletIDList += (pPalletIDList == "" ? (pDataRows[i].PalletID == undefined || pDataRows[i].PalletID.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].PalletID.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].PalletID == undefined || pDataRows[i].PalletID.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].PalletID.replace(/[\, ]/g, ' ').toUpperCase().trim())));
        }
    }
    let pParametersWithValues = {
        //pCustomerNameList: pCustomerNameList
        pCustomerID: $("#slCustomerSearch").val()
        , pPurchaseItemCodeList: pPurchaseItemCodeList
        , pFromLocationList: pFromLocationList
        , pToLocationList: pToLocationList
    };
    //, pQuantityList: pQuantityList
    //, pPalletIDList: pPalletIDList
    CallPOSTFunctionWithParameters("/api/TransferProducts/TransferProducts_ImportFromExcel", pParametersWithValues
        , function (pData) {
            var _ReturnedMessage = pData[0];
            if (_ReturnedMessage == "") {
                swal("Success", "Saved Successfully.");
            }
            else {
                swal("Sorry", _ReturnedMessage);
            }
            TransferProducts_LoadingWithPaging();
            FadePageCover(false);
        }
        , null);
    $("#btnAddFromExcel").val(""); //if removed the last selected file remains till unselected
}
/****************************TransferProducts_Import*************************************/

function GetAreas(pWarehouseControlID, pAreaContolID, pLocationControlID)
{
    debugger;
    FadePageCover(true);
    $("#" + pAreaContolID).html("<option value=''><--Select--></option>");
    $("#" + pLocationControlID).html("<option value=''><--Select--></option>");
    var pParametersWithValues = {
        pWarehouseID: ($("#" + pWarehouseControlID).val() == "" ? 0 : $("#" + pWarehouseControlID).val())
    };
    CallGETFunctionWithParameters("/api/TransferProducts/GetAreas", pParametersWithValues
        , function (pData) {
            FillListFromObject(null, 2, "<--Select-->", pAreaContolID, pData[0], null);
            FadePageCover(false);
        }
        , null);
}

function GetLocation(pAreaContolID, pLocationControlID) {
    debugger;
    $("#" + pLocationControlID).html("<option value=''><--Select--></option>");
    if ($("#" + pAreaContolID).val() != "") {
        FadePageCover(true);
        var pWhereClauseLocations = "WHERE AreaID=" + $("#" + pAreaContolID).val() + "\n";
        if (pLocationControlID == "slLocation_To")
            pWhereClauseLocations += "AND IsUsed=0 AND ISNULL( StatusID , 0 ) <> 30 " + "\n";
        var pParametersWithValues = {
            pWhereClauseLocations: pWhereClauseLocations
        };
        CallGETFunctionWithParameters("/api/TransferProducts/GetLocations", pParametersWithValues
            , function (pData) {
                FillListFromObject(null, 1, "<--Select-->", pLocationControlID, pData[0], null);
                FadePageCover(false);
            }
            , null);
    }
}



function UpdateRecieveDetailsLocations()
{
    debugger
    if (IsNull($('#slArea').val(), "") == "") {

        swal("Excuse me !", "Please Select Area", "warning");

    }
    else if (IsNull(GetAllSelectedIDsAsString('tblTransferProducts'), "") == "") {

        swal("Excuse me !", "Please Select Vehicles", "warning");
    }
    else {

        FadePageCover(true);
        var pParametersWithValues = {
            pRecieveDetails: GetAllSelectedIDsAsString('tblTransferProducts') , pAreaID: $('#slArea').val()
        };
        CallGETFunctionWithParameters("/api/TransferProducts/UpdateLocationOfWH_ReceiveDetails", pParametersWithValues
            , function (pData) {
                var data = JSON.parse(pData);
                debugger
                if (IsNull(data , "") != "")
                    swal("Sorry !", pData[0], "warning");
                else
                    TransferProducts_LoadingWithPaging();



                FadePageCover(false);
            }
            , null);
    }





    //GetAllSelectedIDsAsString('tblTransferProducts')
    //
}

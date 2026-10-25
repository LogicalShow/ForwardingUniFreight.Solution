//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for AGENTS is 2
//PartnerTypeID for SHIPPING AGENTS is 3
//PartnerTypeID for CUSTOMS CLEARANCE AGENTS is 4
//PartnerTypeID for SHIPPINGLINES is 5
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8

// CustomersTemp Region ---------------------------------------------------------------
// Bind CustomersTemp Table Rows
var intPartnerTypeID = 2;
function CustomersTemp_Initialize() {
    debugger;
    strLoadWithPagingFunctionName = "/api/CustomersTemp/LoadWithPaging";
    LoadView("/MasterData/CustomersTemp", "div-content", function () {
        debugger;
        LoadView("/MasterData/ModalCustomersTemp", "div-content", function () {
            
        }
        , null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, 0, 10
            , function (pTabelRows) { CustomersTemp_BindTableRows(pTabelRows); });
    },
        function () { CustomersTemp_ClearAllControls(); },
        function () { CustomersTemp_DeleteList(); });
}
function CustomersTemp_BindTableRows(pCustomersTemp) {
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblCustomersTemp");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pCustomersTemp, function (i, item) {
        AppendRowtoTable("tblCustomersTemp",
            ("<tr ID='" + item.ID + "' ondblclick='CustomersTemp_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + (item.LocalName == "0" ? "" : item.LocalName) + "</td>"
                    + "<td class='CustomerTempEmail hide'>" + (item.Email == 0 ? "" : item.Email) + "</td>"
                    + "<td class='IsInactive hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='VATNumber hide'>" + item.VATNumber + "</td>"
                    + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                    + "<td class='TaxeTypeID hide' val='" + item.TaxeTypeID + "'>" + item.TaxeTypeCode + "</td>"
                    + "<td class='Notes hide'>" + item.Notes + "</td>"
                    + "<td class='Address hide'>" + item.Address + "</td>"
                    + "<td class='PhonesAndFaxes hide'>" + item.PhonesAndFaxes + "</td>"
                    + "<td class='IBANNumber hide'>" + item.IBANNumber + "</td>"

                    + "<td class='hide'><a href='#CustomerTempModal' data-toggle='modal' onclick='CustomersTemp_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblCustomersTemp", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblCustomersTemp>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function CustomersTemp_EditByDblClick(pID) {
    jQuery("#CustomerTempModal").modal("show");
    CustomersTemp_FillControls(pID);
}
function CustomersTemp_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/CustomersTemp/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { CustomersTemp_BindTableRows(pTabelRows); CustomersTemp_ClearAllControls(); });
    HighlightText("#tblCustomersTemp>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
function CustomersTemp_Insert(pSaveandAddNew, pDontReloadTable) {
    debugger;
    if (!pDontReloadTable)
        InsertUpdateFunction("form", "/api/CustomersTemp/Insert", {
            pCode: 0 /*generated automatically*/
            , pName: $("#txtCustomerTempName").val().trim()
            , pLocalName: $("#txtCustomerTempLocalName").val().trim()
            , pEmail: ($("#txtCustomerTempEmail").val() == null ? "" : $("#txtCustomerTempEmail").val().trim())
            , pIsInactive: $("#cbCustomerTempIsInactive").prop('checked')
            , pNotes: ($("#txtCustomerTempNotes").val() == null ? "" : $("#txtCustomerTempNotes").val().trim())
            , pAddress: ($("#txtCustomerTempAddress").val() == null ? "" : $("#txtCustomerTempAddress").val().trim())
            , pPhonesAndFaxes: ($("#txtCustomerTempPhonesAndFaxes").val() == null ? "" : $("#txtCustomerTempPhonesAndFaxes").val().trim())
            , pVATNumber: ($("#txtCustomerTempVATNumber").val() == null ? "" : $("#txtCustomerTempVATNumber").val().trim())
            , pIBANNumber: ($("#txtCustomerTempIBANNumber").val() == null ? "" : $("#txtCustomerTempIBANNumber").val().trim())
        }, pSaveandAddNew, "CustomerTempModal", function () { CustomersTemp_LoadingWithPaging(); });
    
    
}
function CustomersTemp_Update(pSaveandAddNew, pDontReloadTable) {
    if (!pDontReloadTable) //normal call from itself (not from Quotations or OperationsAdd or OperationPartners)
        InsertUpdateFunction("form", "/api/CustomersTemp/Update", {
            pID: $("#hCustomerTempID").val()
            , pCode: $("#txtCustomerTempCode").val().trim()
            , pName: $("#txtCustomerTempName").val().trim()
            , pLocalName: $("#txtCustomerTempLocalName").val().trim()
            , pEmail: ($("#txtCustomerTempEmail").val() == null ? "" : $("#txtCustomerTempEmail").val().trim())
            , pIsInactive: $("#cbCustomerTempIsInactive").prop('checked')
            , pNotes: ($("#txtCustomerTempNotes").val() == null ? "" : $("#txtCustomerTempNotes").val().trim())
            , pAddress: ($("#txtCustomerTempAddress").val() == null ? "" : $("#txtCustomerTempAddress").val().trim())
            , pPhonesAndFaxes: ($("#txtCustomerTempPhonesAndFaxes").val() == null ? "" : $("#txtCustomerTempPhonesAndFaxes").val().trim())
            , pVATNumber: ($("#txtCustomerTempVATNumber").val() == null ? "" : $("#txtCustomerTempVATNumber").val().trim())
            , pIBANNumber: ($("#txtCustomerTempIBANNumber").val() == null ? "" : $("#txtCustomerTempIBANNumber").val().trim())
        }, pSaveandAddNew, "CustomerTempModal", function () { CustomersTemp_LoadingWithPaging(); });
    
}
function CustomersTemp_UnlockRecord(pDontReloadTable) {
    debugger;
    if (!pDontReloadTable) //normal call from itself (not from Quotations or Operations Add or OperationPartners)
        UnlockFunction("/api/CustomersTemp/UnlockRecord",
            { pID: ($("#hCustomerTempID").val() == "" ? 0 : $("#hCustomerTempID").val()) },
            "CustomerTempModal",
            function () { CustomersTemp_LoadingWithPaging(); }); //the callback function
    else
        if (pDontReloadTable == 2) // Called from Add New Operation
            UnlockFunction("/api/CustomersTemp/UnlockRecord",
            { pID: ($("#hCustomerTempID").val() == "" ? 0 : $("#hCustomerTempID").val()) },
            "CustomerTempModal",
                    function () {
                        CustomersTemp_GetList($('#slCustomersTemp option:selected').val(), null);
                        CustomerTempContacts_GetList($('#slCustomerTempContacts option:selected').val(), $('#slCustomersTemp option:selected').val(), function () {/* OperationsEdit_CustomerTempContactChanged(); */ });
                    });
        else
            if (pDontReloadTable == 3) // Called from OperationPartners
                UnlockFunction("/api/CustomersTemp/UnlockRecord",
                { pID: ($("#hCustomerTempID").val() == "" ? 0 : $("#hCustomerTempID").val()) },
                "CustomerTempModal",
                function () {
                    PartnerNames_GetList($('#slPartners option:selected').val(), null);
                });
}
//function CustomersTemp_Delete(pID) {
//    DeleteListFunction("/api/CustomersTemp/DeleteByID", { "pID": pID }, function () { CustomersTemp_LoadingWithPaging(); });
//}
function CustomersTemp_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCustomersTemp') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
        //callback function in case of pressing "Yes, delete"
        function () {
            DeleteListFunction("/api/CustomersTemp/Delete", { "pCustomersTempIDs": GetAllSelectedIDsAsString('tblCustomersTemp') }, function () {
                CustomersTemp_LoadingWithPaging(
                    //this is callback in CustomersTemp_LoadingWithPaging
                    //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                    );
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
function CustomersTemp_FillControls(pID, pDontLoadTable) {
    //CustomersTemp_ClearAllControls(function () {
    //next line is to check if row is locked by another user
    //Check("/api/CustomersTemp/CheckRow", { 'pID': pID }, function () {
    // Fill All Modal Controls
    
    var tr = $("tr[ID='" + pID + "']");
    debugger;
    $("#hCustomerTempID").val(pID);

    
    debugger;
    $("#tblUploadedFiles_CustomersTemp tbody").html("");

    $("#lblCustomersTemphown").html(": " + $(tr).find("td.Name").text());
    $("#txtCustomerTempCode").val($(tr).find("td.Code").text());
    $("#txtCustomerTempName").val($(tr).find("td.Name").text());
    $("#txtCustomerTempLocalName").val($(tr).find("td.LocalName").text());
    $("#txtCustomerTempEmail").val($(tr).find("td.CustomerTempEmail").text());
    $("#cbCustomerTempIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));
    $("#txtCustomerTempNotes").val($(tr).find("td.Notes").text());
    $("#txtCustomerTempAddress").val($(tr).find("td.Address").text());
    $("#txtCustomerTempPhonesAndFaxes").val($(tr).find("td.PhonesAndFaxes").text());
    $("#txtCustomerTempVATNumber").val($(tr).find("td.VATNumber").text());
    $("#txtCustomerTempIBANNumber").val($(tr).find("td.IBANNumber").text());
    //this 2nd flag in Customers_Update is true when called from outside the form not to load the table
    //parameter in the next 2 lines are 1:Quotations call, 2:Operations call
    if (pDontLoadTable != null && pDontLoadTable != undefined) {
        $("#btnSaveCustomerTemp").attr("onclick", "CustomersTemp_Update(false, pDontLoadTable);");
        $("#btnSaveandNewCustomerTemp").attr("onclick", "CustomersTemp_Update(true, pDontLoadTable);");
    }
    else {
        $("#btnSaveCustomerTemp").attr("onclick", "CustomersTemp_Update(false);");
        $("#btnSaveandNewCustomerTemp").attr("onclick", "CustomersTemp_Update(true);");
    }

}
function CustomersTemp_ClearAllControls(pDontLoadTable, callback) {
    //ClearAllControls(new Array("hID", "txtCustomerTempCode", "txtCustomerTempName", "txtCustomerTempLocalName", "txtCustomerTempNotes", "txtCustomerTempVATNumber", "txtCustomerTempIBANNumber"),
    //    new Array("cbCustomerTempIsInactive"));//an alternative fn is with abdelmawgood
    debugger;
    $("#CustomerTempModal").removeClass("hide");//i added this line here to handle the case of trying to edit empty shipper or consignee from Quotations or other places; to remember search for keyword "$("#CustomerTempModal").addClass("hide");" in Quotations.js
    ClearAll("#CustomerTempModal", null);

    $("#txtCustomerTempName").removeAttr("disabled");
    $("#txtCustomerTempLocalName").removeAttr("disabled");

    
    debugger;

    //this 2nd flag in CustomersTemp_Insert is true when called from outside the form not to load the table
    //parameter in the next 2 lines are 1:Quotations call, 2:Operations call, 3:OperationPartners
    if (pDontLoadTable != null && pDontLoadTable != undefined) {
        $("#btnSaveCustomerTemp").attr("onclick", "CustomersTemp_Insert(false, " + pDontLoadTable + ");");
        $("#btnSaveandNewCustomerTemp").attr("onclick", "CustomersTemp_Insert(true, " + pDontLoadTable + ");");
    }
    else {
        $("#btnSaveCustomerTemp").attr("onclick", "CustomersTemp_Insert(false);");
        $("#btnSaveandNewCustomerTemp").attr("onclick", "CustomersTemp_Insert(true);");
    }
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}




//*********************************Reading Excel Files***************************************//
//Must be saved as Excel 97-2003
function CustomersTemp_onFileSelected(event, pBtnName) {
    debugger;
    var selectedFile = event.target.files[0];
    if (selectedFile != undefined) { //to handle the case of not choosing a file
        var sFilename = selectedFile.name;
        // Create A File Reader HTML5
        var reader = new FileReader();
        var result = document.getElementById("hExtractedData");
        reader.onload = function (e) {
            var data = e.target.result;
            var cfb = XLS.CFB.read(data, {
                type: 'binary'
            });
            var wb = XLS.parse_xlscfb(cfb);
            // Loop Over Each Sheet
            wb.SheetNames.forEach(function (sheetName) {
                //// Obtain The Current Row As CSV
                //var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
                var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
                //$("#hExtractedData").val(sCSV);
                if (oJS.length > 0 && oJS[0].Name != undefined) //if (sCSV != "")
                    CustomersTemp_ImportFromExcelFile(oJS, pBtnName);
                else {
                    swal("Sorry", "Please, revise data and version of the file.");
                    $("#" + pBtnName).val("");
                }
            });
        };
        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(selectedFile);
    }
}

function CustomersTemp_ImportFromExcelFile(pDataRows, pBtnName) {
    debugger;
    FadePageCover(true);
    // get Existing CustomersTemp Name List from DB
    var ExistingCustomersTempNameList;
    var ExistingCustomersTempNameArray;
    var IsNameEmpty = false; var NameEmptyRowNo = 0;
    var IsNameExistsInDB = false; var NameExistsInDBRowNo = 0;
    var IsNameExistsInExcel = false; var NameExistsInExcelRowNo = 0;

    CallGETFunctionWithParameters("/api/CustomersTemp/LoadAll", {
        pWhereClause: " WHERE 1=1 "
    }
            , function (pData) {
                ExistingCustomersTempNameList = JSON.parse(pData[0]);
                ExistingCustomersTempNameArray = ExistingCustomersTempNameList.map(item => item.Name);


                FadePageCover(true);
                var pNameList = "";
                var pNameArray = [];
                var pLocalNameList = "";
                var pAddressList = "";
                var pEmailList = "";
                var pPhonesAndFaxesList = "";
                var pVATNumberList = "";
                var pCommercialRegistrationList = "";
                var pCompanyList = "";
                for (var i = 0; i < pDataRows.length; i++) { //replace '\', ' ', ',' with space

                    pNameList += ((pNameList == "" ? "" : ",") +
                        (pDataRows[i].Name == undefined || pDataRows[i].Name.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );

                    if (pDataRows[i].Name == undefined || pDataRows[i].Name.replace(/[\, ]/g, ' ').trim() == "") {
                        IsNameEmpty = true;
                        NameEmptyRowNo = i + 1;
                    } else {

                        // Check if Name Exists in BD
                        if (ExistingCustomersTempNameArray.includes(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim())) {
                            IsNameExistsInDB = true;
                            NameExistsInDBRowNo = i + 1;
                        }

                        // Check if Name Exists in pNameList
                        if (pNameArray.includes(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim())) {
                            IsNameExistsInExcel = true;
                            NameExistsInExcelRowNo = i + 1;
                        }

                        pNameArray.push(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim());

                    }


                    pLocalNameList += ((pLocalNameList == "" ? "" : ",") +
                        (pDataRows[i].LocalName == undefined || pDataRows[i].LocalName.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].LocalName.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );
                    pAddressList += ((pAddressList == "" ? "" : ",") +
                        (pDataRows[i].Address == undefined || pDataRows[i].Address.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Address.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );
                    pEmailList += ((pEmailList == "" ? "" : ",") +
                        (pDataRows[i].Email == undefined || pDataRows[i].Email.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Email.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );
                    pPhonesAndFaxesList += ((pPhonesAndFaxesList == "" ? "" : ",") +
                        (pDataRows[i].PhonesAndFaxes == undefined || pDataRows[i].PhonesAndFaxes.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].PhonesAndFaxes.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );
                    pVATNumberList += ((pVATNumberList == "" ? "" : ",") +
                        (pDataRows[i].VATNumber == undefined || pDataRows[i].VATNumber.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].VATNumber.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );
                    pCommercialRegistrationList += ((pCommercialRegistrationList == "" ? "" : ",") +
                        (pDataRows[i].CommercialRegistration == undefined || pDataRows[i].CommercialRegistration.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].CommercialRegistration.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );
                    pCompanyList += ((pCompanyList == "" ? "" : ",") +
                        (pDataRows[i].Company == undefined || pDataRows[i].Company.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Company.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );

                }
                var pParametersWithValues = {
                    pNameList, pLocalNameList, pAddressList, pEmailList
                    , pPhonesAndFaxesList, pVATNumberList, pCommercialRegistrationList, pCompanyList
                };

                if (IsNameEmpty) {
                    swal(strSorry, " Name in Row No. " + NameEmptyRowNo + " is Empty ");
                    FadePageCover(false);
                } else if (IsNameExistsInDB) {
                    swal(strSorry, " Name in Row No. " + NameExistsInDBRowNo + " already exists in Temp Customers ");
                    FadePageCover(false);
                } else if (IsNameExistsInExcel) {
                    swal(strSorry, " Name in Row No. " + NameExistsInExcelRowNo + " is duplicate ");
                    FadePageCover(false);
                } else {
                    FadePageCover(true);
                    CallPOSTFunctionWithParameters("/api/CustomersTemp/InsertListFromExcel", pParametersWithValues, function (pData) {
                        let pReturnedMessage = pData[0];
                        if (pReturnedMessage == "")
                            swal("Success", "Saved Successfully.");
                        else
                            swal("", pReturnedMessage);
                        CustomersTemp_LoadingWithPaging();
                    }, null);


                }


                $("#" + pBtnName).val(""); //if removed the last selected file remains till unselected



                FadePageCover(false);
            }
            , null);





}
//******************************EOF Reading Excel Files***************************************//;
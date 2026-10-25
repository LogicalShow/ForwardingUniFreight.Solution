//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for AGENTS is 2
//PartnerTypeID for SHIPPING AGENTS is 3
//PartnerTypeID for CUSTOMS CLEARANCE AGENTS is 4
//PartnerTypeID for SHIPPINGLINES is 5
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8
//bind PartnersBanks




//[ID]
//    , [BankName]
//    , [Branch]
//    , [AccountName]
//    , [AccountNumber]
//    , [SwiftCode]
//    , [CurrencyID]
//    , [PartnerID]
//    , [PartnerTypeID]

var PartnerTypeID = 0;
var PartnerID = 0;
function PartnersBanks_DisplayPartnersBanks(pTabelRows) {
    var strPartnersBanks = "";
    console.log('table name : ' + pTabelRows);
    $.each(pTabelRows, function (i, item) {//the attr name ContactVal is used just in this div coz the ID might be repeated for other divs adresses,contcts
        //strPartnersBanks += ' <textarea class="PartnersBanksTextArea" disabled="disabled"> ';
        strPartnersBanks += ' <div contenteditable="false" class="textDiv col-sm-5" BankVal="' + item.ID + '" BankName="' + item.BankName + '" Branch="' + item.Branch + '" AccountName="' + item.AccountName + '" AccountNumber="' + item.AccountNumber + '" CurrencyID="' + item.CurrencyID + '" SwiftCode="' + item.SwiftCode + '"> ';
        strPartnersBanks += ' <a onclick="PartnersBanks_DeleteList(' + item.ID + ');" class="btn btn-xs btn-rounded btn-danger float-right"><i class="fa " style="padding-right:0px!Important;">X</i></a> ';
        strPartnersBanks += ' <a data-toggle="modal" data-target="#PartnersBanksModal" onclick="PartnersBanks_FillControls(' + item.ID + ');" class="btn btn-xs btn-rounded btn-primary float-right"><i class="fa fa-pencil"></i></a> ';
        strPartnersBanks += ' <span class = "static-text-primary"><b>Bank Name : ' + (item.BankName == '' ? '' : item.BankName + ' </b></span> </br> ');
        strPartnersBanks += '<b>Branch : </b>'+ (item.Branch == '0' ? '' : item.Branch) + ', </br> ';
        strPartnersBanks += '<b>Account Name : </b>' + (item.AccountName == '0' ? '' : item.AccountName) + ', </br> ';
        strPartnersBanks += '<b>Account No :</b>' + (item.AccountNumber == '0' ? '' : item.AccountNumber) + ', </br> ';
        strPartnersBanks += '<b>Swift Code / IBAN:</b>' + (item.SwiftCode == '0' ? '' : item.SwiftCode) + ', </br> ';
        strPartnersBanks += '<b>Currency :</b>' + (item.CurrencyCode == '0' ? '' : item.CurrencyCode);
        strPartnersBanks += ' </div> ';
    });
    //coz i changed the ID of div $("#bodyPartnersBanks") in the different Partner Modals for the ID to be unique coz they are called alltogether from OperationPartners
    if (PartnerTypeID == 1) //Customer
        $("#bodyPartnersBanks").html(strPartnersBanks);
    else if (PartnerTypeID == 2)
        $("#bodyAgentPartnersBanks").html(strPartnersBanks);
    else if (PartnerTypeID == 3)
        $("#bodyShippingAgentPartnersBanks").html(strPartnersBanks);
    else if (PartnerTypeID == 4)
        $("#bodyCustomsClearanceAgentPartnersBanks").html(strPartnersBanks);
    else if (PartnerTypeID == 5)
        $("#bodyShippingLinePartnersBanks").html(strPartnersBanks);
    else if (PartnerTypeID == 6)
        $("#bodyAirlinePartnersBanks").html(strPartnersBanks);
    else if (PartnerTypeID == 7)
        $("#bodyTruckerPartnersBanks").html(strPartnersBanks);
    else if (PartnerTypeID == 8)
        $("#bodySupplierPartnersBanks").html(strPartnersBanks);
    ApplyPermissions();
}
function PartnersBanks_GetPartnerID() {
    //coz i changed the name of $("#hID") in the different Partner Modals for the ID to be unique coz they are called alltogether from OperationPartners
    if (PartnerTypeID == 1)
        PartnerID = $("#hID").val();
    else if (PartnerTypeID == 2)
        PartnerID = $("#hAgentID").val();
    else if (PartnerTypeID == 3)
        PartnerID = $("#hShippingAgentID").val();
    else if (PartnerTypeID == 4)
        PartnerID = $("#hCustomsClearanceAgentID").val();
    else if (PartnerTypeID == 5)
        PartnerID = $("#hShippingLineID").val();
    else if (PartnerTypeID == 6)
        PartnerID = $("#hAirlineID").val();
    else if (PartnerTypeID == 7)
        PartnerID = $("#hTruckerID").val();
    else if (PartnerTypeID == 8)
        PartnerID = $("#hSupplierID").val();
    else PartnerID = 0;
    return PartnerID;
}
//sherif: getting PartnersBanks
function PartnersBanks_LoadWithPagingWithWhereClause(pPartnerTypeID) {
    //sets the PartnerTypeID according to who called... for values refer to NoAccessPartnerTypes table in DB
    if (pPartnerTypeID != null)//first time it wont be null so i set PartnerTypeID and keep working with it
        PartnerTypeID = pPartnerTypeID;
    var pWhereClause = "";
    pWhereClause = " WHERE PartnerID = " + PartnersBanks_GetPartnerID();
    pWhereClause += " AND PartnerTypeID = " + PartnerTypeID;
    LoadWithPagingWithWhereClause("div-Pager_PartnersBanks", "select-page-size_PartnersBanks", "spn-first-page-row_PartnersBanks", "spn-last-page-row_PartnersBanks", "spn-total-count_PartnersBanks", "div-Text-Total_PartnersBanks", "/api/PartnersBanks/LoadWithPaging", pWhereClause, 1/*$("#div-Pager li.active a").text()*/, 100/*$('#select-page-size').val().trim()*/, function (pTabelRows) { PartnersBanks_DisplayPartnersBanks(pTabelRows); PartnersBanks_ClearAllControls(); });
    //HighlightText("#tblSuppliers>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}

// calling web function to add new Address item.
function PartnersBanks_Insert(pSaveandAddNew) {
    debugger;//for pPartnerTypeID refer to NoAccessPartnerTypes table
    //[ID]
//    , [txtBankName]
//    , [txtBranch]
//    , [txtAccountName]
//    , [txtAccountNumber]
//    , [txtSwiftCode]
//    , [txtPartnerID]
    //    , [txtPartnerTypeID]
    console.log($('#txtPartnerBankName').val());
    InsertUpdateFunction("form", "/api/PartnersBanks/Insert",
        {
            pPartnerTypeID: PartnerTypeID,
            pPartnerID: PartnersBanks_GetPartnerID(),
            pBankName: $('#txtPartnerBankName').val().trim().toUpperCase(),
            pBranch: $('#txtBranch').val().trim().toUpperCase(),
            pAccountName: $('#txtAccountName').val().trim().toUpperCase(),
            pAccountNumber: ($("#txtAccountNumber").val() == null ? "" : $("#txtAccountNumber").val().trim().toUpperCase()),
            pCurrencyID: ($("#slAccountCurrency").val() == null ? 0 : $("#slAccountCurrency").val()),
            pSwiftCode: ($("#txtSwiftCode").val() == null ? "" : $("#txtSwiftCode").val().trim().toUpperCase())
        }, pSaveandAddNew, "PartnersBanksModal", function () { PartnersBanks_LoadWithPagingWithWhereClause(); });
}

//calling this function for update
function PartnersBanks_Update(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/PartnersBanks/Update", {
        pID: $("#hBankID").val(),
        pPartnerTypeID: PartnerTypeID,
        pPartnerID: PartnersBanks_GetPartnerID(),
        pBankName: $('#txtPartnerBankName').val(),
        pBranch: $('#txtBranch').val(),
        pAccountName: $('#txtAccountName').val(),
        pAccountNumber: ($("#txtAccountNumber").val() == null ? "" : $("#txtAccountNumber").val().trim()),
        pCurrencyID: ($("#slAccountCurrency").val() == null ? 0 : $("#slAccountCurrency").val()),
        pSwiftCode: ($("#txtSwiftCode").val() == null ? "" : $("#txtSwiftCode").val().trim())
    }, pSaveandAddNew, "PartnersBanksModal", function () { PartnersBanks_LoadWithPagingWithWhereClause(); });
}

//here this function always gets just 1 ID not a list
function PartnersBanks_DeleteList(pID) {
    //Confirmation message to delete
    if (pID != "")
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
            DeleteListFunction("/api/PartnersBanks/Delete", { "pPartnersBanksIDs": pID }, function () {
                PartnersBanks_LoadWithPagingWithWhereClause(
                    //this is callback in PartnersBanks_LoadingWithPaging
                    //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                    );
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}

//after pressing edit, this function fills the data
function PartnersBanks_FillControls(pID) {
    //PartnersBanks_ClearAllControls(function () {
        // Fill All Modal Controls

    if ($("#slAccountCurrency option").length == 0) {
        $("#slAccountCurrency").html($("#hReadySlCurrencies").html());
    }

    ClearAll("#PartnersBanksModal", null); //pID won't be cleared coz its a parameter
        $("#hBankID").val(pID);
    $("#txtPartnerBankName").val($("Div[BankVal=" + pID + "]").attr('BankName'));
    $("#txtBranch").val($("Div[BankVal=" + pID + "]").attr('Branch'));
    $("#txtAccountName").val($("Div[BankVal=" + pID + "]").attr('AccountName'));
    $("#txtAccountNumber").val($("Div[BankVal=" + pID + "]").attr('AccountNumber'));
    $("#slAccountCurrency").val($("Div[BankVal=" + pID + "]").attr('CurrencyID') == 0 ? pDefaults.CurrencyID : $("Div[BankVal=" + pID + "]").attr('CurrencyID'));
    $("#txtSwiftCode").val($("Div[BankVal=" + pID + "]").attr('SwiftCode'));

        $("#btnBankSave").attr("onclick", "PartnersBanks_Update(false);");
        $("#btnBankSaveandNew").attr("onclick", "PartnersBanks_Update(true);");
    //});
}

function PartnersBanks_ClearAllControls(callback) {
    ClearAll("#PartnersBanksModal", null);
    //$("#lblAddressShown").html($("#lblShown").html());// its edit coz no PartnersBanks are set with new partners
    //for PartnersBanksModal
    debugger;
    if ($("#slAccountCurrency option").length == 0) {
        $("#slAccountCurrency").html($("#hReadySlCurrencies").html());
    }
    $("#slAccountCurrency").val(pDefaults.CurrencyID);

    NoAccessAddressTypes_GetList(null, null);
    Cities_GetList(null, false);//the second parameter is pIsCopyFromMainAddress
    Countries_GetList(null, null);

    $("#btnBankSave").attr("onclick", "PartnersBanks_Insert(false);");
    $("#btnBankSaveandNew").attr("onclick", "PartnersBanks_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}

function PartnersBanks_CopyFromMainAddress() {
    debugger;
    if ($("Div[AddressType='MAIN ADDRESS']").attr('BankVal') == null)
        swal("Sorry", "No Main Address is specified for this Partner.", "warning");
    else {
        //the next 4 lines are to set the select boxes
        var pCountryID = $("Div[AddressType='MAIN ADDRESS']").attr('CountryID');
        Countries_GetList(pCountryID, null);
        var pCityID = $("Div[AddressType='MAIN ADDRESS']").attr('CityID');
        Cities_GetList(pCityID, true);//the second parameter is pIsCopyFromMainAddress
        
        $("#txtStreetLine1").val($("Div[AddressType='MAIN ADDRESS']").attr('StreetLine1'));
        $("#txtStreetLine2").val($("Div[AddressType='MAIN ADDRESS']").attr('StreetLine2'));
        $("#txtZipCode").val($("Div[AddressType='MAIN ADDRESS']").attr('ZipCode'));
    }
}


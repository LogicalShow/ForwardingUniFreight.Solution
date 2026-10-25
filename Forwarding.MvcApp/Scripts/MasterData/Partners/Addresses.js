//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for AGENTS is 2
//PartnerTypeID for SHIPPING AGENTS is 3
//PartnerTypeID for CUSTOMS CLEARANCE AGENTS is 4
//PartnerTypeID for SHIPPINGLINES is 5
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8

//bind Addresses
var PartnerTypeID = 0;
var PartnerID = 0;
function Addresses_DisplayAddresses(pTabelRows) {
    var strAddresses = "";
    $.each(pTabelRows, function (i, item) {//the attr name ContactVal is used just in this div coz the ID might be repeated for other divs adresses,contcts
        //strAddresses += ' <textarea class="addressesTextArea" disabled="disabled"> ';
        strAddresses += ' <div contenteditable="false" class="textDiv col-sm-5" AddressVal="' + item.ID + '" AddressTypeID="' + item.AddressTypeID + '" AddressType="' + item.AddressType + '" StreetLine1="' + item.StreetLine1 + '" StreetLine2="' + item.StreetLine2 + '" ZipCode="' + item.ZipCode + '" CityID="' + item.CityID + '" CountryID="' + item.CountryID + '" PrintedAs="' + item.PrintedAs + '" AdditionalAddress="' + item.AdditionalAddress + '"> ';
        strAddresses += ' <a onclick="Addresses_DeleteList(' + item.ID + ');" class="btn btn-xs btn-rounded btn-danger float-right"><i class="fa " style="padding-right:0px!Important;">X</i></a> ';
        strAddresses += ' <a data-toggle="modal" data-target="#AddressModal" onclick="Addresses_FillControls(' + item.ID + ');" class="btn btn-xs btn-rounded btn-primary float-right"><i class="fa fa-pencil"></i></a> ';
        strAddresses += ' <span class = "static-text-primary"><b> ' + (item.AddressType == '' ? '' : item.AddressType + ' </b></span> </br></br> ');
        strAddresses += (item.StreetLine1 == '0' ? '' : item.StreetLine1 + ', </br> ');
        //strAddresses += (item.StreetLine2 == '0' ? ' </br> ' : item.StreetLine2 + ', </br> ');
        strAddresses += (item.StreetLine2 == '0' ? '' : item.StreetLine2 + ', </br> ');
        strAddresses += (item.ZipCode == '0' ? '' : item.ZipCode + ', </br> ');
        strAddresses += (item.CityName == '0' ? '' : item.CityName + ', </br> ');
        strAddresses += (item.CountryName == '0' ? '' : item.CountryName);
        strAddresses += ' </div> ';
    });
    //coz i changed the ID of div $("#bodyAddresses") in the different Partner Modals for the ID to be unique coz they are called alltogether from OperationPartners
    if (PartnerTypeID == 1) //Customer
        $("#bodyAddresses").html(strAddresses);
    else if (PartnerTypeID == 2)
        $("#bodyAgentAddresses").html(strAddresses);
    else if (PartnerTypeID == 3)
        $("#bodyShippingAgentAddresses").html(strAddresses);
    else if (PartnerTypeID == 4)
        $("#bodyCustomsClearanceAgentAddresses").html(strAddresses);
    else if (PartnerTypeID == 5)
        $("#bodyShippingLineAddresses").html(strAddresses);
    else if (PartnerTypeID == 6)
        $("#bodyAirlineAddresses").html(strAddresses);
    else if (PartnerTypeID == 7)
        $("#bodyTruckerAddresses").html(strAddresses);
    else if (PartnerTypeID == 8)
        $("#bodySupplierAddresses").html(strAddresses);
    ApplyPermissions();
}
function Addresses_GetPartnerID() {
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
//sherif: getting addresses
function Addresses_LoadWithPagingWithWhereClause(pPartnerTypeID) {
    //sets the PartnerTypeID according to who called... for values refer to NoAccessPartnerTypes table in DB
    if (pPartnerTypeID != null)//first time it wont be null so i set PartnerTypeID and keep working with it
        PartnerTypeID = pPartnerTypeID;
    var pWhereClause = "";
    pWhereClause = " WHERE PartnerID = " + Addresses_GetPartnerID();
    pWhereClause += " AND PartnerTypeID = " + PartnerTypeID;
    LoadWithPagingWithWhereClause("div-Pager_Addresses", "select-page-size_Addresses", "spn-first-page-row_Addresses", "spn-last-page-row_Addresses", "spn-total-count_Addresses", "div-Text-Total_Addresses", "/api/Addresses/LoadWithPaging", pWhereClause, 1/*$("#div-Pager li.active a").text()*/, 100/*$('#select-page-size').val().trim()*/, function (pTabelRows) { Addresses_DisplayAddresses(pTabelRows); Addresses_ClearAllControls(); });
    //HighlightText("#tblSuppliers>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}

// calling web function to add new Address item.
function Addresses_Insert(pSaveandAddNew) {
    debugger;
    var ErrorMsg = "";
    if (IsMESCOCompany && glbCallingControl == 'Customers') {
        if ($('#slCountries option:selected').text() != 'EGYPT'
            && ($("#slCustomerCategories option:selected").text() == 'Company' || $("#slCustomerCategories option:selected").text() == 'Personal')
        )
        {
            ErrorMsg = "Country Must Be EGYPT.";
            swal("Sorry", ErrorMsg );

        }
        else if ($('#slCountries option:selected').text() == 'EGYPT' && ($("#slCustomerCategories option:selected").text() == 'External')
        ) {
            ErrorMsg = "Country EGYPT , And Customer Category Is External .";
            swal("Sorry", ErrorMsg);
        }
           
    }
    
    if (ErrorMsg == "") {
        debugger;//for pPartnerTypeID refer to NoAccessPartnerTypes table
        InsertUpdateFunction("form", "/api/Addresses/Insert", {
            pPartnerTypeID: PartnerTypeID, pPartnerID: Addresses_GetPartnerID(), pAddressTypeID: $('#slAddressTypes option:selected').val(), pCountryID: $('#slCountries option:selected').val(), pCityID: $('#slCities option:selected').val(), pStreetLine1: ($("#txtStreetLine1").val() == null ? "" : $("#txtStreetLine1").val().trim()), pStreetLine2: ($("#txtStreetLine2").val() == null ? "" : $("#txtStreetLine2").val().trim()), pZipCode: ($("#txtZipCode").val() == null ? "" : $("#txtZipCode").val().trim())
            , pPrintedAs: ($("#txtPrintedAs").val() == null ? "" : $("#txtPrintedAs").val().trim())
            , pAdditionalAddress: CheckValueIsValidInput("#txtAdditionalAddress") ? $("#txtAdditionalAddress").val() : 0
        }, pSaveandAddNew, "AddressModal", function () { Addresses_LoadWithPagingWithWhereClause(); });
    }


    
}

//calling this function for update
function Addresses_Update(pSaveandAddNew) {
    debugger;
    var ErrorMsg = "";
    if (IsMESCOCompany && glbCallingControl == 'Customers' ) {
        if ($('#slCountries option:selected').text() != 'EGYPT'
            && ($("#slCustomerCategories option:selected").text() == 'Company' || $("#slCustomerCategories option:selected").text() == 'Personal')
        )
        {
            ErrorMsg = "Country Must Be EGYPT.";
            swal("Sorry", ErrorMsg);
        }
        else if ($('#slCountries option:selected').text() == 'EGYPT' && ($("#slCustomerCategories option:selected").text() == 'External')
        ) {
            ErrorMsg = "Country EGYPT , And Customer Category Is External .";
            swal("Sorry", ErrorMsg);
        }
           
    }
    if (ErrorMsg == "") {
    debugger;
    InsertUpdateFunction("form", "/api/Addresses/Update", { pID: $("#hAddressID").val(), pPartnerTypeID: PartnerTypeID, pPartnerID: Addresses_GetPartnerID()
        , pAddressTypeID: $('#slAddressTypes option:selected').val(), pCountryID: $('#slCountries option:selected').val(), pCityID: $('#slCities option:selected').val(), pStreetLine1: ($("#txtStreetLine1").val() == null ? "" : $("#txtStreetLine1").val().trim()), pStreetLine2: ($("#txtStreetLine2").val() == null ? "" : $("#txtStreetLine2").val().trim()), pZipCode: ($("#txtZipCode").val() == null ? "" : $("#txtZipCode").val().trim())
        , pPrintedAs: ($("#txtPrintedAs").val() == null ? "" : $("#txtPrintedAs").val().trim())
        , pAdditionalAddress: CheckValueIsValidInput("#txtAdditionalAddress") ? $("#txtAdditionalAddress").val() : 0
        }, pSaveandAddNew, "AddressModal", function () { Addresses_LoadWithPagingWithWhereClause(); });
    }
}

//here this function always gets just 1 ID not a list
function Addresses_DeleteList(pID) {
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
            DeleteListFunction("/api/Addresses/Delete", { "pAddressesIDs": pID }, function () {
                Addresses_LoadWithPagingWithWhereClause(
                    //this is callback in Addresses_LoadingWithPaging
                    //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                    );
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}

//after pressing edit, this function fills the data
function Addresses_FillControls(pID) {
    //Addresses_ClearAllControls(function () {
        // Fill All Modal Controls
    ClearAll("#AddressModal", null); //pID won't be cleared coz its a parameter
        $("#hAddressID").val(pID);

        debugger;
        //the next 6 lines are to set the select boxes to the values entered before
        var pAddressTypeID = $("Div[AddressVal=" + pID + "]").attr('AddressTypeID'); //store the val in a var to be re-entered in the select box
        NoAccessAddressTypes_GetList(pAddressTypeID, null);
        var pCityID = $("Div[AddressVal=" + pID + "]").attr('CityID');
        Cities_GetList(pCityID, false);//the second parameter is pIsCopyFromMainAddress(just used in Addresses Modal)
        var pCountryID = $("Div[AddressVal=" + pID + "]").attr('CountryID');
        Countries_GetList(pCountryID, null);

        //$("#lblAddressShown").html($("#lblShown").html());
        $("#txtStreetLine1").val($("Div[AddressVal=" + pID + "]").attr('StreetLine1'));
        $("#txtStreetLine2").val($("Div[AddressVal=" + pID + "]").attr('StreetLine2') == 0 ? "" : $("Div[AddressVal=" + pID + "]").attr('StreetLine2'));
        $("#txtZipCode").val($("Div[AddressVal=" + pID + "]").attr('ZipCode') == 0 ? "" : $("Div[AddressVal=" + pID + "]").attr('ZipCode'));
        //$("#txtZipCode").val($("Div[AddressVal=" + pID + "]").attr('ZipCode'));
        $("#txtPrintedAs").val($("Div[AddressVal=" + pID + "]").attr('PrintedAs'));
        $("#txtAdditionalAddress").val($("Div[AddressVal=" + pID + "]").attr('AdditionalAddress'));

        $("#btnAddressSave").attr("onclick", "Addresses_Update(false);");
        $("#btnAddressSaveandNew").attr("onclick", "Addresses_Update(true);");
    //});
}

function Addresses_ClearAllControls(callback) {
    ClearAll("#AddressModal", null);
    //$("#lblAddressShown").html($("#lblShown").html());// its edit coz no addresses are set with new partners
    //for AddressModal
    debugger;
    NoAccessAddressTypes_GetList(null, null);
    Cities_GetList(null, false);//the second parameter is pIsCopyFromMainAddress
    Countries_GetList(null, null);

    $("#btnAddressSave").attr("onclick", "Addresses_Insert(false);");
    $("#btnAddressSaveandNew").attr("onclick", "Addresses_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}

function Addresses_CopyFromMainAddress() {
    debugger;
    if ($("Div[AddressType='MAIN ADDRESS']").attr('AddressVal') == null)
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

/////////////////////////////////////////////////////////////////////////////////////
// Fill the select boxes
function NoAccessAddressTypes_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    var pWhereClause = "";
    
    pWhereClause = " WHERE ID=6 OR (ID NOT IN (SELECT A.AddressTypeID From Addresses A  ";
    pWhereClause += " 					Where A.PartnerID = " + Addresses_GetPartnerID()
        + " AND A.PartnerTypeID=" + PartnerTypeID + ")) "; // PartnerTypeID=8 for a supplier(refer to NoAccessAddressTypes)
    if (pID != null) //this means editing an address
        pWhereClause += " OR ID = " + pID;
    pWhereClause += " ORDER BY ID ";
    GetListWithCodeAndWhereClause(pID, "/api/NoAccessAddressTypes/LoadAll", "Select Address Type", "slAddressTypes", pWhereClause);
}

//fill slCountries
function Countries_GetList(pID, callback) {//pID is used in case of editing to set the code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithName(pID, "/api/Countries/LoadAll", "Select Country", "slCountries");
}

//fill slCities
function Cities_GetList(pID, pIsCopyFromMainAddress) {//pID is used in case of editing to set the code or name
    //parameters: ID, strFnName, First Row in select list, select list name, pWhereClause
    var pWhereClause = "";
    if (pID != null) //this means editing an address and that we have a country OR CopyFromMainAddress
    {
        //pWhereClause = " where IsPort = 0 and CountryID = ";
        pWhereClause = " where CountryID = ";
        pWhereClause += (pIsCopyFromMainAddress == true //if true then CopyFromMainAddress
            ? $("Div[AddressType='MAIN ADDRESS']").attr('CountryID') : $("Div[AddressVal=" + $("#hAddressID").val() + "]").attr('CountryID'));
    }
    else //when changing the country
    {
        //pWhereClause = " where IsPort = 0 and CountryID = ";
        pWhereClause = " where CountryID = ";
        pWhereClause += ($('#slCountries option:selected').val() == null || $('#slCountries option:selected').val() == ""
            ? 0 : $('#slCountries option:selected').val());
    }
    pWhereClause += " order by Name ";
    GetListWithNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select City", "slCities", pWhereClause);
}

//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for AGENTS is 2
//PartnerTypeID for SHIPPING AGENTS is 3
//PartnerTypeID for CUSTOMS CLEARANCE AGENTS is 4
//PartnerTypeID for SHIPPINGLINES is 5
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8

//bind Contacts
var PartnerTypeID = 0;
var PartnerID = 0;
function Contacts_DisplayContacts(pTabelRows) {
    var strContacts = "";
    $.each(pTabelRows, function (i, item) {//the attr name ContactVal is used just in this div coz the ID might be repeated for other divs adresses,contcts
        //strContacts += ' <textarea class="ContactsTextArea" disabled="disabled"> ';
        strContacts += ' <div contenteditable="false" class="textDiv col-sm-5" ContactVal="' + item.ID + '" Name="' + item.Name + '" LocalName="' + item.LocalName + '" Phone1="' + item.Phone1 + '" Phone2="' + item.Phone2 + '" Mobile1="' + item.Mobile1 + '" Mobile2="' + item.Mobile2 + '" Fax="' + item.Fax + '" Email="' + item.Email + '"> ';
        strContacts += ' <a onclick="Contacts_DeleteList(' + item.ID + ');" class="btn btn-xs btn-rounded btn-danger float-right"><i class="fa " style="padding-right:0px!Important;">X</i></a> ';
        strContacts += ' <a data-toggle="modal" data-target="#ContactModal" onclick="Contacts_FillControls(' + item.ID + ');" class="btn btn-xs btn-rounded btn-primary float-right"><i class="fa fa-pencil"></i></a> ';
        strContacts += ' <span class = "static-text-primary"><b> ' + (item.Name == '' ? '' : 'Name: ' + item.Name + ' </b></span> </br> ');
        strContacts += (item.Phone1 == '' ? '' : ' Phone1: ' + item.Phone1 + ' </br> ');
        strContacts += (item.Phone2 == '' ? '' : ' Phone2: ' + item.Phone2 + ' </br> ');
        strContacts += (item.Mobile1 == '' ? '' : ' Mobile: ' + item.Mobile1 + ' </br> ');
        //strContacts += (item.Mobile2 == '' ? ' </br> ' : ' Mobile2: ' + item.Mobile2 + ', </br> ');
        strContacts += (item.Fax == '' ? ' </br> ' : ' Fax: ' + item.Fax + ' </br> ');
        strContacts += (item.Email == '' ? '' : ' Email: ' + item.Email + ' </br> ');
        strContacts += ' </div> ';
    });
    //coz i changed the ID of div $("#bodyContacts") in the different Partner Modals for the ID to be unique coz they are called alltogether from OperationPartners
    if (PartnerTypeID == 1) //Customer
        $("#bodyContacts").html(strContacts);
    else if (PartnerTypeID == 2)
        $("#bodyAgentContacts").html(strContacts);
    else if (PartnerTypeID == 3)
        $("#bodyShippingAgentContacts").html(strContacts);
    else if (PartnerTypeID == 4)
        $("#bodyCustomsClearanceAgentContacts").html(strContacts);
    else if (PartnerTypeID == 5)
        $("#bodyShippingLineContacts").html(strContacts);
    else if (PartnerTypeID == 6)
        $("#bodyAirlineContacts").html(strContacts);
    else if (PartnerTypeID == 7)
        $("#bodyTruckerContacts").html(strContacts);
    else if (PartnerTypeID == 8)
        $("#bodySupplierContacts").html(strContacts);
    ApplyPermissions();
}
function Contacts_GetPartnerID() {
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
//sherif: getting Contacts
function Contacts_LoadWithPagingWithWhereClause(pPartnerTypeID) {
    //sets the PartnerTypeID according to who called... for values refer to NoAccessPartnerTypes table in DB
    if (pPartnerTypeID != null)//first time it wont be null so i set PartnerTypeID and keep working with it
        PartnerTypeID = pPartnerTypeID;
    var pWhereClause = "";
    pWhereClause = " WHERE PartnerID = " + Contacts_GetPartnerID();
    pWhereClause += " AND PartnerTypeID = " + PartnerTypeID;
    LoadWithPagingWithWhereClause("div-Pager_Contacts", "select-page-size_Contacts", "spn-first-page-row_Contacts", "spn-last-page-row_Contacts", "spn-total-count_Contacts", "div-Text-Total_Contacts", "/api/Contacts/LoadWithPaging", pWhereClause, 1/*$("#div-Pager li.active a").text()*/, 100/*$('#select-page-size').val().trim()*/, function (pTabelRows) { Contacts_DisplayContacts(pTabelRows); Contacts_ClearAllControls(); });
    //HighlightText("#tblSuppliers>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}

// calling web function to add new Contact item.
function Contacts_Insert(pSaveandAddNew) {
    debugger;//for pPartnerTypeID refer to NoAccessPartnerTypes table
    InsertUpdateFunction("form", "/api/Contacts/Insert", { pPartnerTypeID: PartnerTypeID, pPartnerID: Contacts_GetPartnerID(), pName: ($("#txtContactName").val() == null ? "" : $("#txtContactName").val().trim()), pLocalName: ($("#txtContactLocalName").val() == null ? "" : $("#txtContactLocalName").val().trim()), pEmail: ($("#txtEmail").val() == null ? "" : $("#txtEmail").val().trim()), pPhone1: ($("#txtPhone1").val() == null ? "" : $("#txtPhone1").val().trim()), pPhone2: ($("#txtPhone2").val() == null ? "" : $("#txtPhone2").val().trim()), pMobile1: ($("#txtMobile1").val() == null ? "" : $("#txtMobile1").val().trim()), pMobile2: ($("#txtMobile2").val() == null ? "" : $("#txtMobile2").val().trim()), pFax: ($("#txtFax").val() == null ? "" : $("#txtFax").val().trim()), pNotes: ($("#txtContactNotes").val() == null ? "" : $("#txtContactNotes").val().trim()) }, pSaveandAddNew, "ContactModal", function () { Contacts_LoadWithPagingWithWhereClause(); });
}

//calling this function for update
function Contacts_Update(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/Contacts/Update", { pID: $("#hContactID").val(), pPartnerTypeID: PartnerTypeID, pPartnerID: Contacts_GetPartnerID(), pName: ($("#txtContactName").val() == null ? "" : $("#txtContactName").val().trim()), pLocalName: ($("#txtContactLocalName").val() == null ? "" : $("#txtContactLocalName").val().trim()), pEmail: ($("#txtEmail").val() == null ? "" : $("#txtEmail").val().trim()), pPhone1: ($("#txtPhone1").val() == null ? "" : $("#txtPhone1").val().trim()), pPhone2: ($("#txtPhone2").val() == null ? "" : $("#txtPhone2").val().trim()), pMobile1: ($("#txtMobile1").val() == null ? "" : $("#txtMobile1").val().trim()), pMobile2: ($("#txtMobile2").val() == null ? "" : $("#txtMobile2").val().trim()), pFax: ($("#txtFax").val() == null ? "" : $("#txtFax").val().trim()), pNotes: ($("#txtContactNotes").val() == null ? "" : $("#txtContactNotes").val().trim()) }, pSaveandAddNew, "ContactModal", function () { Contacts_LoadWithPagingWithWhereClause(); });
}

//here this function always gets just 1 ID not a list
function Contacts_DeleteList(pID) {
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
            DeleteListFunction("/api/Contacts/Delete", { "pContactsIDs": pID }, function () {
                Contacts_LoadWithPagingWithWhereClause(
                    //this is callback in Contacts_LoadingWithPaging
                    //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                    );
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}

//after pressing edit, this function fills the data
function Contacts_FillControls(pID) {
    //Contacts_ClearAllControls(function () {
    // Fill All Modal Controls
    ClearAll("#ContactModal", null); //pID won't be cleared coz its a parameter
    $("#hContactID").val(pID);

    debugger;
    //$("#lblContactShown").html($("#lblShown").html());
    $("#lblContactShown").html(" : " + $("Div[ContactVal=" + pID + "]").attr('Name'));

    $("#txtContactName").val($("Div[ContactVal=" + pID + "]").attr('Name'));
    $("#txtContactLocalName").val($("Div[ContactVal=" + pID + "]").attr('LocalName'));
    $("#txtPhone1").val($("Div[ContactVal=" + pID + "]").attr('Phone1'));
    $("#txtPhone2").val($("Div[ContactVal=" + pID + "]").attr('Phone2'));
    $("#txtMobile1").val($("Div[ContactVal=" + pID + "]").attr('Mobile1'));
    $("#txtMobile2").val($("Div[ContactVal=" + pID + "]").attr('Mobile2'));
    $("#txtFax").val($("Div[ContactVal=" + pID + "]").attr('Fax'));
    $("#txtEmail").val($("Div[ContactVal=" + pID + "]").attr('Email'));

    $("#btnContactSave").attr("onclick", "Contacts_Update(false);");
    $("#btnContactSaveandNew").attr("onclick", "Contacts_Update(true);");
    //});
}

function Contacts_ClearAllControls(callback) {
    debugger;
    ClearAll("#ContactModal", null);
    //$("#lblContactShown").html($("#lblShown").html());// its edit coz no contacts are set with new partners
    //for ContactModal

    $("#btnContactSave").attr("onclick", "Contacts_Insert(false);");
    $("#btnContactSaveandNew").attr("onclick", "Contacts_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}

//function Contacts_CheckValueIsInteger(id) {
//    debugger;
//    CheckValueIsInteger("#" + id);
//}

/////////////////////////////////////////////////////////////////////////////////////

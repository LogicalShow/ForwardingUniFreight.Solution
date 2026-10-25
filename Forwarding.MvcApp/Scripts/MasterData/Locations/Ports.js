// Ports Region ---------------------------------------------------------------
// Bind Ports Table Rows
function Ports_BindTableRows(pPorts) {
    debugger;
    if (glbCallingControl == "Ports")
        $("#hl-menu-MasterData").parent().addClass("active");
    else
        $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblPorts");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pPorts, function (i, item) {
        AppendRowtoTable("tblPorts",
        ("<tr ID='" + item.ID + "' class='" + (item.Code == "EG000" ? "hide" : "") + "' ondblclick='Ports_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName hide'>" + (item.LocalName == 0 ? "" : item.LocalName) + "</td>"
                    //+ "<td class='CountryID' val='" + item.CountryID + "'>" + item.CountryCode + "</td>"
                    + "<td class='CountryID' val='" + item.CountryID + "'>" + (item.CountryName == 0 ? "" : item.CountryName) + "</td>"
                    + "<td class='FactoryCityID hide'>" + item.FactoryCityID + "</td>"
                    + "<td class='Address hide' val='" + item.Address + "'>" + (item.Address == 0 ? "" : item.Address) + "</td>"
                    + "<td class='TelephoneNumber hide' val='" + item.TelephoneNumber + "'>" + (item.TelephoneNumber == 0 ? "" : item.TelephoneNumber) + "</td>"
                    + "<td class='Email hide' val='" + item.Email + "'>" + (item.Email == 0 ? "" : item.Email) + "</td>"
                    + "<td class='ContactPerson hide' val='" + item.ContactPerson + "'>" + (item.ContactPerson == 0 ? "" : item.ContactPerson) + "</td>"
                    + "<td class='IsFactories hide' val='" + item.IsFactories + "'>" + item.IsFactories + "</td>"
                    + "<td class='IsPort'> <input type='checkbox' disabled='disabled' val='" + (item.IsPort == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsOcean'> <input type='checkbox' disabled='disabled' val='" + (item.IsOcean == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsAir'> <input type='checkbox' disabled='disabled' val='" + (item.IsAir == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsInland'> <input type='checkbox' disabled='disabled' val='" + (item.IsInland == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsInactive'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='crmCode hide' val='" + item.crmCode + "'>" + item.crmCode + "</td>"
                    + "<td class='hide'><a href='#PortModal' data-toggle='modal' onclick='Ports_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        debugger;
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblPorts", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblPorts>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    if (IsMESCOCompany) {
        $("#txtcrmCode").parent().removeClass("hide");
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Ports_EditByDblClick(pID) {
    //EditByDblClick("PortModal", pID, 
    //    function (pID) { Ports_FillControls(pID); });
    jQuery("#PortModal").modal("show");
    Ports_FillControls(pID);
}
// Loading with data
function Ports_LoadingWithPaging() {
    debugger;
    var PortsLoadWithPaging = "";
    if (glbCallingControl == "Factories") {
        PortsLoadWithPaging = "/api/Ports/LoadWithPaging_Factories";
    }
    else
        PortsLoadWithPaging = "/api/Ports/LoadWithPaging";
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", PortsLoadWithPaging, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Ports_BindTableRows(pTabelRows); Ports_ClearAllControls(); });
    HighlightText("#tblPorts>tbody>tr", $("#txt-Search").val().trim());
}
////sherif: Loading with data and search key
//function Ports_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/Ports/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        Ports_BindTableRows(pTabelRows); Ports_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblPorts>tbody>tr", $("#txt-Search").val().trim());
//    });
//}

// calling web function to add new Port item.
function Ports_Insert(pSaveandAddNew) {
    debugger;
    //this condition is to check if cbIsPort is checked without specifying any port type
    if (glbCallingControl == "Factories")
    {
        if ($("#cbIsPort").prop('checked') && !$("#cbIsOcean").prop('checked') && !$("#cbIsAir").prop('checked') && !$("#cbIsInland").prop('checked'))
            swal(strSorry, strSelectPortMessage, "warning");
        else
            InsertUpdateFunction("form", "/api/Ports/Insert", {
                pCountryID: ($('#slCountry option:selected').val() == "" ? 0 : $('#slCountry option:selected').val())
                , pFactoryCityID: ($('#slFactoryCity option:selected').val() == "" ? 0 : $('#slFactoryCity option:selected').val())
                , pCode: ($("#txtCode").val().trim() == "" ? $("#txtName").val().trim() : $("#txtCode").val().trim())
                , pName: $("#txtName").val().trim()
                , pLocalName: $("#txtLocalName").val().trim()
                , pIsInactive: $("#cbIsInactive").prop('checked'), pIsPort: $("#cbIsPort").prop('checked'), pIsOcean: $("#cbIsOcean").prop('checked'), pIsAir: $("#cbIsAir").prop('checked'), pIsInland: $("#cbIsInland").prop('checked')
                     , pAddress: $("#txtAddress").val().trim(), pTelephoneNumber: $("#txtTelephoneNumber").val().trim(), pEmail: $("#txtEmail").val().trim(), pContactPerson: $("#txtContactPerson").val().trim(), pIsFactories: true
            }, pSaveandAddNew, "PortModal", function () { Ports_LoadingWithPaging(); });
    }
    else
    {
        if ($("#cbIsPort").prop('checked') && !$("#cbIsOcean").prop('checked') && !$("#cbIsAir").prop('checked') && !$("#cbIsInland").prop('checked'))
            swal(strSorry, strSelectPortMessage, "warning");
        else
            InsertUpdateFunction("form", "/api/Ports/Insert", {
                pCountryID: ($('#slCountry option:selected').val() == "" ? 0 : $('#slCountry option:selected').val())
                , pFactoryCityID: ($('#slFactoryCity option:selected').val() == "" ? 0 : $('#slFactoryCity option:selected').val())
                , pCode: ($("#txtCode").val().trim() == "" ? "0" : $("#txtCode").val().trim()), pName: $("#txtName").val().trim(),
                pLocalName: $("#txtLocalName").val().trim(), pIsInactive: $("#cbIsInactive").prop('checked'), pIsPort: $("#cbIsPort").prop('checked'),
                pIsOcean: $("#cbIsOcean").prop('checked'), pIsAir: $("#cbIsAir").prop('checked'), pIsInland: $("#cbIsInland").prop('checked')
               , pAddress: "0", pTelephoneNumber: "0", pEmail: "0", pContactPerson: "0", pIsFactories: false
            }, pSaveandAddNew, "PortModal", function () { Ports_LoadingWithPaging(); });
    }
   
}

//calling this function for update
function Ports_Update(pSaveandAddNew) {
    //if ($("#cbIsOcean").prop('checked'))
    //    $("#txtCode").attr("name","txtPortCode");
    //else
    //    $("#txtCode").removeAttr("name");
    ////this condition is to check if cbIsPort is checked without specifying any port type
    if (glbCallingControl == "Factories")
    {
        if ($("#cbIsPort").prop('checked') && !$("#cbIsOcean").prop('checked') && !$("#cbIsAir").prop('checked') && !$("#cbIsInland").prop('checked'))
            swal(strSorry, strSelectPortMessage, "warning");
        else
            InsertUpdateFunction("form", "/api/Ports/Update", {
                pID: $("#hID").val()
                , pCountryID: ($('#slCountry option:selected').val() == "" ? 0 : $('#slCountry option:selected').val())
                , pFactoryCityID: ($('#slFactoryCity option:selected').val() == "" ? 0 : $('#slFactoryCity option:selected').val())
                , pCode: ($("#txtCode").val().trim() == "" ? $("#txtName").val().trim() : $("#txtCode").val().trim())
                , pName: $("#txtName").val().trim()
                , pLocalName: $("#txtLocalName").val().trim(), pIsInactive: $("#cbIsInactive").prop('checked'), pIsPort: $("#cbIsPort").prop('checked'), pIsOcean: $("#cbIsOcean").prop('checked'), pIsAir: $("#cbIsAir").prop('checked'), pIsInland: $("#cbIsInland").prop('checked')
         , pAddress: $("#txtAddress").val().trim(), pTelephoneNumber: $("#txtTelephoneNumber").val().trim(), pEmail: $("#txtEmail").val().trim(), pContactPerson: $("#txtContactPerson").val().trim(), pIsFactories:true
            }, pSaveandAddNew, "PortModal", function () { Ports_LoadingWithPaging(); });
    }
    else
    {
        if ($("#cbIsPort").prop('checked') && !$("#cbIsOcean").prop('checked') && !$("#cbIsAir").prop('checked') && !$("#cbIsInland").prop('checked'))
            swal(strSorry, strSelectPortMessage, "warning");
        else
            InsertUpdateFunction("form", "/api/Ports/Update", {
                pID: $("#hID").val()
                , pCountryID: ($('#slCountry option:selected').val() == "" ? 0 : $('#slCountry option:selected').val())
                , pFactoryCityID: ($('#slFactoryCity option:selected').val() == "" ? 0 : $('#slFactoryCity option:selected').val())
                , pCode: ($("#txtCode").val().trim() == "" ? "0" : $("#txtCode").val().trim()), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pIsInactive: $("#cbIsInactive").prop('checked'), pIsPort: $("#cbIsPort").prop('checked'), pIsOcean: $("#cbIsOcean").prop('checked'), pIsAir: $("#cbIsAir").prop('checked'), pIsInland: $("#cbIsInland").prop('checked')
                     , pAddress: "0", pTelephoneNumber: "0", pEmail: "0", pContactPerson: "0", pIsFactories: false
            }, pSaveandAddNew, "PortModal", function () { Ports_LoadingWithPaging(); });
    }
   
}

function Ports_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPorts') != "")
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
            DeleteListFunction("/api/Ports/Delete", { "pPortsIDs": GetAllSelectedIDsAsString('tblPorts') }, function () { Ports_LoadingWithPaging(); });
        });
        //DeleteListFunction("/api/Ports/Delete", { "pPortsIDs": GetAllSelectedIDsAsString('tblPorts') }, function () { Ports_LoadingWithPaging(); });
}

//after pressing edit, this function fills the data
function Ports_FillControls(pID) {
    Ports_ClearAllControls(function () {
        //next line is to check if row is locked by another user
        //Check("/api/Ports/CheckRow", { 'pID': pID }, function () {
            // Fill All Modal Controls
            var tr = $("tr[ID='" + pID + "']");

            $("#hID").val(pID);
            
            debugger;
            //the next 2 lines are to set the slRegions to the value entered before
            var pCountryID = $(tr).find("td.CountryID").attr('val');
            var pFactoryCityID = $(tr).find("td.FactoryCityID").text();
        //Countries_GetList(pCountryID, null);
            if (glbCallingControl == "Factories")
                Ports_FillFactoryCity(pCountryID, pFactoryCityID);

            $("#lblShown").html(": " + $(tr).find("td.Code").text());
            $("#txtCode").val($(tr).find("td.Code").text());
            $("#txtName").val($(tr).find("td.Name").text());
            $("#txtLocalName").val($(tr).find("td.LocalName").text());
            $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));
            $("#cbIsPort").prop('checked', $(tr).find('td.IsPort').find('input').attr('val'));
            $("#cbIsAir").prop('checked', $(tr).find('td.IsAir').find('input').attr('val'));
            $("#cbIsOcean").prop('checked', $(tr).find('td.IsOcean').find('input').attr('val'));
            $("#cbIsInland").prop('checked', $(tr).find('td.IsInland').find('input').attr('val'));

            $("#txtAddress").val($(tr).find("td.Address").text());
            $("#txtTelephoneNumber").val($(tr).find("td.TelephoneNumber").text());
            $("#txtEmail").val($(tr).find("td.Email").text());
            $("#txtContactPerson").val($(tr).find("td.ContactPerson").text());

            if (IsMESCOCompany) {
                let crm = $(tr).find("td.crmCode").text();
                $("#txtcrmCode").val(crm == "0" ? "" : crm);
            }

            if ($("#cbIsPort").prop('checked') == true)
                $("input[name='cbPortType']").prop('disabled', false);
            else
                $("input[name='cbPortType']").prop('disabled', true);

            $("#slCountry").val(pCountryID);

            $("#btnSave").attr("onclick", "Ports_Update(false);");
            $("#btnSaveandNew").attr("onclick", "Ports_Update(true);");
        //});
    });
}

function Ports_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), new Array("cbIsInactive", "cbIsPort", "cbIsOcean", "cbIsAir", "cbIsInland"));//an alternative fn is with abdelmawgood
    ClearAll("#PortModal");
    //Ports_EnableDisablePortTypes();
    //Countries_GetList(null, null);

    $("#slFactoryCity").html("<option value=''><--Select--></option>");

    $("#btnSave").attr("onclick", "Ports_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Ports_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    $("input[name='cbPortType']").prop('disabled', false);
    $("#cbIsPort").prop('checked', true);
    $("#cbIsAir").prop('checked', true);
    $("#cbIsOcean").prop('checked', true);
    $("#cbIsInland").prop('checked', true);

    if (callback != null && callback != undefined)
        callback();
}

//Enable and disable the radio options in the add port modal 
function Ports_EnableDisablePortTypes()
{
    if ($("#cbIsPort").prop('checked') == true) {
        $("input[name='cbPortType']").prop('disabled', false);
        $("#cbIsOcean").prop('checked', true);
    }
    else {
        $("input[name='cbPortType']").prop('checked', false);
        $("input[name='cbPortType']").prop('disabled', true);
    }
}
//set the 1st 2 letters of the port code to the country code
function Ports_SetPortCodeFirstTwoLetters()
{
    debugger;
    
    //var element = $("#slCountry").find('option:selected'); // to get the selected row
    //var CountryCode = element.attr("CountryCode");
    var CountryCode = $("#slCountry").find('option:selected').attr('CountryCode');
    $('#txtCode').val(CountryCode);

}
// Ports Region ---------------------------------------------------------------
//to fill the select box
//i didn't use the functions in the mainapp.master.js coz i need here both the CountryCode and CountryName for setting the 1st 2 letters in port code
function Countries_GetList(pCountryID, callback) {//the first parameter is used in case of editing to set the country code or name
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/Countries/LoadAll",
        data: { pOrderBy: " Name " },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            ClearAllOptions("slCountry");
            var option = '<option value="">Select Country </option>';
            // Bind Data
            debugger;
            $.each(JSON.parse(data[0]), function (i, item) {
                if (pCountryID != null) //in case of editing
                    if (pCountryID == item.ID) // i added the country code as an attribute in the sl tag to be used in setting the 1st 2 letters of the port code
                        option += '<option value="' + item.ID + '" CountryCode="' + item.Code + '" selected >' + item.Name + '</option>';
                    else
                        option += '<option value="' + item.ID + '" CountryCode="' + item.Code + '">' + item.Name + '</option>';
                else
                    option += '<option value="' + item.ID + '" CountryCode="' + item.Code + '">' + item.Name + '</option>';
            });
            $('#slCountry').append(option);
            if (callback != null && callback != undefined)
                callback();
        },
        error: function (jqXHR, exception) {
            swal("Oops!", "Please, contact your technical support! This is Countries_GetList in ports.js", "error");
        }
    });
}
function Ports_FillFactoryCity(pCountryID, pPortID) {
    debugger;
    FadePageCover(true);
    $("#slFactoryCity").html("<option value=''><--Select--></option>");
    if (pCountryID == 0)
        pCountryID = ($("#slCountry").val() == "" ? 0 : $("#slCountry").val());
    CallGETFunctionWithParameters("/api/Ports/LoadAll", { pWhereClause: "WHERE CountryID=" + pCountryID + " AND IsFactories=0 ORDER BY Name" }
        , function (pData) {
            FillListFromObject(pPortID, 2, TranslateString("SelectFromMenu"), "slFactoryCity", pData[0], null);
            FadePageCover(false);
        }
        , null);
}
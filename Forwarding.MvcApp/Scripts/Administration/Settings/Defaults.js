// Defaults Region ---------------------------------------------------------------
// Bind Defaults Table Rows
$(document).ready(function () {
    $('#txtEmail_Footer').summernote();
});
function Defaults_BindTableRows(pData) {
    $("#hl-menu-Administration").parent().addClass("active");
    ClearAllTableRows("tblDefaults");
    var item = JSON.parse(pData[0]);

    //$.each(JSON.parse(pData[0]), function (i, item) {
    debugger;
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    AppendRowtoTable("tblDefaults",
        ("<tr ID='" + item.ID + "' ondblclick='Defaults_EditByDblClick(" + item.ID + ");'>"
            + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='CompanyName'>" + (item.CompanyName == 0 ? "" : item.CompanyName) + "</td>"
            + "<td class='CompanyLocalName'>" + (item.CompanyLocalName == 0 ? "" : item.CompanyLocalName) + "</td>"
            + "<td class='Branch' val='" + item.BranchID + "'>" + (item.BranchName == 0 ? "" : item.BranchName) + "</td>"
            + "<td class='Currency' val='" + item.CurrencyID + "'>" + (item.CurrencyCode == 0 ? "" : item.CurrencyCode) + "</td>"
            + "<td class='ForeignCurrency' val='" + item.ForeignCurrencyID + "'>" + (item.ForeignCurrencyCode == 0 ? "" : item.ForeignCurrencyCode) + "</td>"
            + "<td class='AddressLine1 hide'>" + (item.AddressLine1 == 0 ? "" : item.AddressLine1) + "</td>"
            + "<td class='AddressLine2 hide'>" + (item.AddressLine2 == 0 ? "" : item.AddressLine2) + "</td>"
            + "<td class='AddressLine3 hide'>" + (item.AddressLine3 == 0 ? "" : item.AddressLine3) + "</td>"
            + "<td class='AddressLine4 hide'>" + (item.AddressLine4 == 0 ? "" : item.AddressLine4) + "</td>"
            + "<td class='AddressLine5 hide'>" + (item.AddressLine5 == 0 ? "" : item.AddressLine5) + "</td>"
            + "<td class='Phones hide'>" + (item.Phones == 0 ? "" : item.Phones) + "</td>"
            + "<td class='Faxes hide'>" + (item.Faxes == 0 ? "" : item.Faxes) + "</td>"
            + "<td class='Email hide'>" + (item.Email == 0 ? "" : item.Email) + "</td>"
            + "<td class='Website'>" + (item.Website == 0 ? "" : item.Website) + "</td>"
            + "<td class='BankName hide'>" + (item.BankName == 0 ? "" : item.BankName) + "</td>"
            + "<td class='AccountName hide'>" + (item.AccountName == 0 ? "" : item.AccountName) + "</td>"
            + "<td class='BankAddress hide'>" + (item.BankAddress == 0 ? "" : item.BankAddress) + "</td>"
            + "<td class='SwiftCode hide'>" + (item.SwiftCode == 0 ? "" : item.SwiftCode) + "</td>"
            + "<td class='AccountNumber hide'>" + (item.AccountNumber == 0 ? "" : item.AccountNumber) + "</td>"

            + "<td class='InvoiceLeftPosition hide'>" + (item.InvoiceLeftPosition == 0 ? "" : item.InvoiceLeftPosition) + "</td>"
            + "<td class='InvoiceLeftSignature hide'>" + (item.InvoiceLeftSignature == 0 ? "" : item.InvoiceLeftSignature) + "</td>"
            + "<td class='InvoiceMiddlePosition hide'>" + (item.InvoiceMiddlePosition == 0 ? "" : item.InvoiceMiddlePosition) + "</td>"
            + "<td class='InvoiceMiddleSignature hide'>" + (item.InvoiceMiddleSignature == 0 ? "" : item.InvoiceMiddleSignature) + "</td>"
            + "<td class='InvoiceRightPosition hide'>" + (item.InvoiceRightPosition == 0 ? "" : item.InvoiceRightPosition) + "</td>"
            + "<td class='InvoiceRightSignature hide'>" + (item.InvoiceRightSignature == 0 ? "" : item.InvoiceRightSignature) + "</td>"

            + "<td class='TaxNumber hide'>" + (item.TaxNumber == 0 ? "" : item.TaxNumber) + "</td>"
            + "<td class='ImportOceanDays hide'>" + (item.ImportOceanDays == 0 ? "" : item.ImportOceanDays) + "</td>"
            + "<td class='ImportAirDays hide'>" + (item.ImportAirDays == 0 ? "" : item.ImportAirDays) + "</td>"
            + "<td class='ImportInlandDays hide'>" + (item.ImportInlandDays == 0 ? "" : item.ImportInlandDays) + "</td>"
            + "<td class='ExportOceanDays hide'>" + (item.ExportOceanDays == 0 ? "" : item.ExportOceanDays) + "</td>"
            + "<td class='ExportAirDays hide'>" + (item.ExportAirDays == 0 ? "" : item.ExportAirDays) + "</td>"
            + "<td class='ExportInlandDays hide'>" + (item.ExportInlandDays == 0 ? "" : item.ExportInlandDays) + "</td>"
            + "<td class='DomesticOceanDays hide'>" + (item.DomesticOceanDays == 0 ? "" : item.DomesticOceanDays) + "</td>"
            + "<td class='DomesticAirDays hide'>" + (item.DomesticAirDays == 0 ? "" : item.DomesticAirDays) + "</td>"
            + "<td class='DomesticInlandDays hide'>" + (item.DomesticInlandDays == 0 ? "" : item.DomesticInlandDays) + "</td>"

            + "<td class='SmallBusinessBelow hide'>" + (item.SmallBusinessBelow == 0 ? "" : item.SmallBusinessBelow) + "</td>"
            + "<td class='MediumBusinessBelow hide'>" + (item.MediumBusinessBelow == 0 ? "" : item.MediumBusinessBelow) + "</td>"

            + "<td class='VatIDNo hide'>" + (item.VatIDNo == 0 ? "" : item.VatIDNo) + "</td>"
            + "<td class='CommericalRegNo hide'>" + (item.CommericalRegNo == 0 ? "" : item.CommericalRegNo) + "</td>"
            + "<td class='SL_InvoicesComments hide'>" + (item.SL_InvoicesComments == 0 ? "" : item.SL_InvoicesComments) + "</td>"
            + "<td class='PurchaseInvoicesComments hide'>" + (item.PurchaseInvoicesComments == 0 ? "" : item.PurchaseInvoicesComments) + "</td>"

            + "<td class='Email_Password  hide'><input type='password' value='" + item.Email_Password + "' />" + "</td>"
            + "<td class='Email_DisplayName  hide'>" + item.Email_DisplayName + "</td>"
            + "<td class='Email_Host hide'>" + item.Email_Host + "</td>"
            + "<td class='Email_Port hide'>" + item.Email_Port + "</td>"
            + "<td class='ShowUserSalesmen hide'> <input type='checkbox' disabled='disabled' val='" + (item.ShowUserSalesmen == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='IsNewCRMCycle hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsNewCRMCycle == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='IsAddChargeAuto hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsAddChargeAuto == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='isShipp hide'> <input type='checkbox' disabled='disabled' val='" + (item.isShipp == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='GroupID hide' val='" + item.GroupID + "'>" + (item.GroupID == 0 ? "" : item.GroupID) + "</td>"


            + "<td class='Email_IsSSL hide'> <input type='checkbox' disabled='disabled' val='" + (item.Email_IsSSL == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td  val='" + item.Email_Footer + "' class='Email_Footer hide'>" + "" + "</td>"
            + "<td class=''><a href='#DefaultsModal' data-toggle='modal' onclick='Defaults_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    //});
    ApplyPermissions();
    BindAllCheckboxonTable("tblDefaults", "ID");
    CheckAllCheckbox("ID");
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
    //HighlightText("#tblDefaults>tbody>tr", $("#txt-Search").val().trim());
    //if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
    //    swal(strSorry, strDeleteFailMessage, "warning");
    //    showDeleteFailMessage = false;
    //}
}
function Defaults_EditByDblClick(pID) {
    jQuery("#DefaultsModal").modal("show");
    Defaults_FillControls(pID);
}
// Loading with data
function Defaults_LoadAll() {
    debugger;
    LoadAll("/api/Defaults/LoadAll", " WHERE ID=1  ", function (pTabelRows) { Defaults_BindTableRows(pTabelRows); Defaults_ClearAllControls(); });
    //HighlightText("#tblDefaults>tbody>tr", $("#txt-Search").val().trim());
}

// calling this function for update
function Defaults_Update(pSaveandAddNew) {
    PostInsertUpdateFunction("form", "/api/Defaults/Update"
        , {
            pID: $("#hID").val()
            , "pCompanyName": $("#txtCompanyName").val().trim()
            , "pCompanyLocalName": $("#txtCompanyLocalName").val().trim().toUpperCase()
            , "pBranchID": ($("#slBranches").val() == "" ? 0 : $("#slBranches").val())
            , "pAddressLine1": $("#txtAddressLine1").val().trim()
            , "pAddressLine2": $("#txtAddressLine2").val().trim()
            , "pAddressLine3": $("#txtAddressLine3").val().trim()
            , "pAddressLine4": $("#txtAddressLine4").val().trim()
            , "pAddressLine5": $("#txtAddressLine5").val().trim()
            , "pPhones": $("#txtPhones").val().trim().toUpperCase()
            , "pFaxes": $("#txtFaxes").val().trim().toUpperCase()
            , "pEmail": $("#txtEmail").val().trim()
            , "pWebsite": $("#txtWebsite").val()
            , "pBankName": $("#txtCompanyBankName").val().trim().toUpperCase()
            , "pAccountName": $("#txtCompanyAccountName").val().trim().toUpperCase()
            , "pBankAddress": $("#txtCompanyBankAddress").val().trim().toUpperCase()
            , "pSwiftCode": $("#txtCompanySwift").val().trim().toUpperCase()
            , "pAccountNumber": $("#txtCompanyAccountNumber").val().trim().toUpperCase()
            , "pTaxNumber": $("#txtCompanyTaxNumber").val().trim().toUpperCase()
            , "pCurrencyID": ($("#slCurrency").val() == "" ? 0 : $("#slCurrency").val())
            , "pForeignCurrencyID": ($("#slForeignCurrency").val() == "" ? 0 : $("#slForeignCurrency").val())
            , "pImportOceanDays": ($("#txtImportOceanDays").val().trim() < 1 ? 1 : $("#txtImportOceanDays").val().trim())
            , "pImportAirDays": ($("#txtImportAirDays").val().trim() < 1 ? 1 : $("#txtImportAirDays").val().trim())
            , "pImportInlandDays": ($("#txtImportInlandDays").val().trim() < 1 ? 1 : $("#txtImportInlandDays").val().trim())
            , "pExportOceanDays": ($("#txtExportOceanDays").val().trim() < 1 ? 1 : $("#txtExportOceanDays").val().trim())
            , "pExportAirDays": ($("#txtExportAirDays").val().trim() < 1 ? 1 : $("#txtExportAirDays").val().trim())
            , "pExportInlandDays": ($("#txtExportInlandDays").val().trim() < 1 ? 1 : $("#txtExportInlandDays").val().trim())
            , "pDomesticOceanDays": ($("#txtDomesticOceanDays").val().trim() < 1 ? 1 : $("#txtDomesticOceanDays").val().trim())
            , "pDomesticAirDays": ($("#txtDomesticAirDays").val().trim() < 1 ? 1 : $("#txtDomesticAirDays").val().trim())
            , "pDomesticInlandDays": ($("#txtDomesticInlandDays").val().trim() < 1 ? 1 : $("#txtDomesticInlandDays").val().trim())
            , "pSmallBusinessBelow": ($("#txtSmallBusinessBelow").val().trim() == "" ? 0 : $("#txtSmallBusinessBelow").val().trim())
            , "pMediumBusinessBelow": ($("#txtMediumBusinessBelow").val().trim() == "" ? 0 : $("#txtMediumBusinessBelow").val().trim())
            , "pCommericalRegNo": $("#txtCommericalRegNo").val().trim() == "" ? 0 : $("#txtCommericalRegNo").val().trim().toUpperCase()
            , "pVatIDNo": $("#txtVatIDNo").val().trim() == "" ? 0 : $("#txtVatIDNo").val().trim().toUpperCase()
            , "pSL_InvoicesComments": $("#txtSL_InvoicesComments").val().trim()
            , "pPurchaseInvoicesComments": $("#txtPurchaseInvoicesComments").val().trim()
            , "pInvoiceLeftPosition": $("#txtInvoiceLeftPosition").val().trim() == "" ? "0" : $("#txtInvoiceLeftPosition").val().trim().toUpperCase()
            , "pInvoiceLeftSignature": $("#txtInvoiceLeftSignature").val().trim() == "" ? "0" : $("#txtInvoiceLeftSignature").val().trim().toUpperCase()
            , "pInvoiceMiddlePosition": $("#txtInvoiceMiddlePosition").val().trim() == "" ? "0" : $("#txtInvoiceMiddlePosition").val().trim().toUpperCase()
            , "pInvoiceMiddleSignature": $("#txtInvoiceMiddleSignature").val().trim() == "" ? "0" : $("#txtInvoiceMiddleSignature").val().trim().toUpperCase()
            , "pInvoiceRightPosition": $("#txtInvoiceRightPosition").val().trim() == "" ? "0" : $("#txtInvoiceRightPosition").val().trim().toUpperCase()
            , "pInvoiceRightSignature": $("#txtInvoiceRightSignature").val().trim() == "" ? "0" : $("#txtInvoiceRightSignature").val().trim().toUpperCase()
            , "pEmail_Password": IsNull($("#txtEmail_Password").val(), "")
            , "pEmail_DisplayName": IsNull($("#txtEmail_DisplayName").val(), "")
            , "pEmail_Host": IsNull($("#txtEmail_Host").val(), "")
            , "pEmail_Port": IsNull($("#txtEmail_Port").val(), "0")
            , "pEmail_IsSSL": ($("#cbEmail_IsSSL").prop('checked') == true ? "1" : "0")
            , "pEmail_Header": ""
            , "pEmail_Footer": $('#txtEmail_Footer').summernote('code')
            , "pShowUserSalesmen": ($("#cbShowUserSalesmen").prop('checked') == true ? "1" : "0")
            , "pIsNewCRMCycle": ($("#cbIsNewCRMCycle").prop('checked') == true ? "1" : "0")
            , "pIsAddChargeAuto": $("#cbIsAddChargeAuto").prop("checked")
            , "pisShipp": ($("#cbisShipp").prop('checked') == true ? "1" : "0")
            , "pGroupID": ($("#slClientGroup").val() == "" ? 0 : $("#slClientGroup").val())


        }, pSaveandAddNew, "DefaultsModal", function () { Defaults_LoadAll(); LoadDefaults("/api/Defaults/LoadAll", " WHERE ID = 1 "); });
}


function SendTestEmail() {
    FadePageCover(true)
    $.ajax({
        type: "POST",
        url: "/api/Defaults/SendTestEmail",
        data: JSON.stringify({
            "pEmail": $("#txtEmail").val().trim()
            , "pEmail_Password": IsNull($("#txtEmail_Password").val(), "")
            , "pEmail_DisplayName": IsNull($("#txtEmail_DisplayName").val(), "")
            , "pEmail_Host": IsNull($("#txtEmail_Host").val(), "")
            , "pEmail_Port": IsNull($("#txtEmail_Port").val(), "0")
            , "pEmail_IsSSL": $("#cbEmail_IsSSL").prop('checked')
            , "pEmail_Header": ""
            , "pEmail_Footer": $('#txtEmail_Footer').summernote('code')
            , "pEmail_To": $("#txtEmail_To").val().trim()
            , "pEmail_Subject": $("#txtEmail_Subject").val().trim()
            , "pEmail_Body": $("#txtEmail_Body").val().trim()
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (d) {
            debugger
            if (d[0] == "") {
                swal("Great !", "Is Correct Setting Check Reciever Inbox", "success");
            }
            else {
                swal("Sorry !", "Is not Correct Setting", "warning");
            }
            FadePageCover(false);
        }
    });
}


//after pressing edit, this function fills the data
function Defaults_FillControls(pID) {

    ClearAll("#DefaultsModal", null);
    debugger;
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");
    //the next 4 lines are to set the select boxes to the values entered before
    var pBranchID = $(tr).find("td.Branch").attr('val');
    Defaults_Branches_GetList(pBranchID, "slBranches");//the second parameter is pIsCopyFromMainAddress(just used in Addresses Modal)

    var pGroupID = $(tr).find("td.GroupID").attr('val');

    Defaults_Group_GetList(pGroupID, "slClientGroup");

    var pCurrencyID = $(tr).find("td.Currency").attr('val');
    Defaults_Currency_GetList(pCurrencyID, "slCurrency");
    var pForeignCurrencyID = $(tr).find("td.ForeignCurrency").attr('val');
    Defaults_Currency_GetList(pForeignCurrencyID, "slForeignCurrency");

    //$("#lblShown").html(": " + $(tr).find("td.Name").text());
    $("#txtCompanyName").val($(tr).find("td.CompanyName").text());
    $("#txtCompanyLocalName").val($(tr).find("td.CompanyLocalName").text());
    $("#txtAddressLine1").val($(tr).find("td.AddressLine1").text());
    $("#txtAddressLine2").val($(tr).find("td.AddressLine2").text());
    $("#txtAddressLine3").val($(tr).find("td.AddressLine3").text());
    $("#txtAddressLine4").val($(tr).find("td.AddressLine4").text());
    $("#txtAddressLine5").val($(tr).find("td.AddressLine5").text());
    $("#txtPhones").val($(tr).find("td.Phones").text());
    $("#txtFaxes").val($(tr).find("td.Faxes").text());
    $("#txtEmail").val($(tr).find("td.Email").text());
    $("#txtWebsite").val($(tr).find("td.Website").text());
    $("#txtCompanyBankName").val($(tr).find("td.BankName").text());
    $("#txtCompanyAccountName").val($(tr).find("td.AccountName").text());
    $("#txtCompanyBankAddress").val($(tr).find("td.BankAddress").text());
    $("#txtCompanySwift").val($(tr).find("td.SwiftCode").text());
    $("#txtCompanyAccountNumber").val($(tr).find("td.AccountNumber").text());
    $("#txtCompanyTaxNumber").val($(tr).find("td.TaxNumber").text());
    $("#txtImportOceanDays").val($(tr).find("td.ImportOceanDays").text());
    $("#txtImportAirDays").val($(tr).find("td.ImportAirDays").text());
    $("#txtImportInlandDays").val($(tr).find("td.ImportInlandDays").text());
    $("#txtExportOceanDays").val($(tr).find("td.ExportOceanDays").text());
    $("#txtExportAirDays").val($(tr).find("td.ExportAirDays").text());
    $("#txtExportInlandDays").val($(tr).find("td.ExportInlandDays").text());
    $("#txtDomesticOceanDays").val($(tr).find("td.DomesticOceanDays").text());
    $("#txtDomesticAirDays").val($(tr).find("td.DomesticAirDays").text());
    $("#txtDomesticInlandDays").val($(tr).find("td.DomesticInlandDays").text());

    $("#txtSmallBusinessBelow").val($(tr).find("td.SmallBusinessBelow").text());
    $("#txtMediumBusinessBelow").val($(tr).find("td.MediumBusinessBelow").text());

    $("#txtPurchaseInvoicesComments").val($(tr).find("td.PurchaseInvoicesComments").text());
    $("#txtVatIDNo").val($(tr).find("td.VatIDNo").text());
    $("#txtCommericalRegNo").val($(tr).find("td.CommericalRegNo").text());
    $("#txtSL_InvoicesComments").val($(tr).find("td.SL_InvoicesComments").text());

    $("#txtInvoiceLeftPosition").val($(tr).find("td.InvoiceLeftPosition").text());
    $("#txtInvoiceLeftSignature").val($(tr).find("td.InvoiceLeftSignature").text());
    $("#txtInvoiceMiddlePosition").val($(tr).find("td.InvoiceMiddlePosition").text());
    $("#txtInvoiceMiddleSignature").val($(tr).find("td.InvoiceMiddleSignature").text());
    $("#txtInvoiceRightPosition").val($(tr).find("td.InvoiceRightPosition").text());
    $("#txtInvoiceRightSignature").val($(tr).find("td.InvoiceRightSignature").text());





    $("#txtEmail_Password").val(""/*IsNull($(tr).find("td.Email_Password").find("input[type='password']").attr("value"), "")*/);
    $("#txtEmail_DisplayName").val(IsNull($(tr).find("td.Email_DisplayName").text(), ""));
    $("#txtEmail_Host").val(IsNull($(tr).find("td.Email_Host").text(), ""));
    $("#txtEmail_Port").val($(tr).find("td.Email_Port").text());
    $("#cbEmail_IsSSL").prop('checked', $(tr).find('td.Email_IsSSL').find('input').attr('val'));
    
    $("#cbShowUserSalesmen").prop('checked', $(tr).find('td.ShowUserSalesmen').find('input').attr('val'));
    $("#cbIsNewCRMCycle").prop('checked', $(tr).find('td.IsNewCRMCycle').find('input').attr('val'));
    $("#cbIsAddChargeAuto").prop('checked', $(tr).find('td.IsAddChargeAuto').find('input').attr('val'));
    $("#cbisShipp").prop('checked', $(tr).find('td.isShipp').find('input').attr('val'));


    $('#txtEmail_Footer').summernote('code', IsNull($(tr).find("td.Email_Footer").attr('val'), "<p></p>"));
    $("#btnSave").attr("onclick", "Defaults_Update(false);");
    $("#btnSaveandNew").attr("onclick", "Defaults_Update(true);");
}

function Defaults_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slRegion"), null);
    ClearAll("#DefaultsModal", null);

    Defaults_Branches_GetList(null, "slBranches");
    Defaults_Currency_GetList(null, "slCurrency");
    Defaults_Currency_GetList(null, "slForeignCurrency");

    Defaults_Group_GetList(null, "slClientGroup");

    $("#txtEmail_Password").val("");
    $("#txtEmail_DisplayName").val("");
    $("#txtEmail_Host").val("");
    $("#txtEmail_Port").val("");
    $("#cbEmail_IsSSL").prop('checked', false);

    $("#cbShowUserSalesmen").prop('checked', false);
    $("#cbisShipp").prop('checked', false);

    $("#cbIsNewCRMCycle").prop('checked', false);
    $('#txtEmail_Footer').summernote('code', "<p></p>");


    $("#btnSave").attr("onclick", "Defaults_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Defaults_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}
// Defaults Region ---------------------------------------------------------------

////////////////////////Fill select boxes/////////////////////////////////////////////
//fill slCountries
function Defaults_Branches_GetList(pID, pSlName) {//pID is used in case of editing to set the code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithNameAndWhereClause(pID, "/api/Branches/LoadAll", "Select Branch", "slBranches", " ORDER BY Name ");
}

//fill slCities
function Defaults_Currency_GetList(pID, pSlName, callback) {//pID is used in case of editing to set the code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListCurrencyWithCodeAndExchangeRateAttr(pID, "/api/Currencies/LoadAll", "Select Currency", pSlName, " ORDER BY Code ");
}
function Defaults_Group_GetList(pID, pSlName, callback) {//pID is used in case of editing to set the code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithNameAndWhereClauseGroup(pID, "/api/Defaults/LoadAll", TranslateString("<--Select-->"), pSlName, " where1=1 ");
    //FillListFromObject_ERP(null, 2/*pCodeOrName*/, TranslateString("<--Select-->"), "slClientGroup", pClientsGroups, null);

}
function GetListWithNameAndWhereClauseGroup(pID, pStrFnName, pStrFirstRow, pSlName, pWhereClause, callback) {
    debugger;
    $.ajax({
        type: "GET",
        url: strServerURL + pStrFnName,
        data: { pWhereClause: "where 1=1" },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            debugger;
            ClearAllOptions(pSlName);
            var option = "";
            if (pStrFirstRow != "" && pStrFirstRow != null)
                option = '<option value="">' + pStrFirstRow + '</option>';
            // Bind Data
            $.each(JSON.parse(data[16]), function (i, item) {
                if (pID != null && pID != undefined) //in case of editing
                    if (pID == item.ID)
                        option += '<option value="' + item.ID + '" selected >' + item.Name + '</option>';
                    else
                        option += '<option value="' + item.ID + '">' + item.Name + '</option>';
                else
                    option += '<option value="' + item.ID + '">' + item.Name + '</option>';
            });

            $("#" + pSlName).append(option);

            if (callback != null && callback != undefined)
                callback();

        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Sorry", "Please, try again. GetListWithName in mainapp.master.js", "");
        }
    });
}


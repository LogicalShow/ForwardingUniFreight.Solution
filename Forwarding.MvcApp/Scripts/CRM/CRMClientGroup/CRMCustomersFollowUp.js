// City Country ---------------------------------------------------------------
// Bind CRM_Clients Table Rows
function CRM_Clients_BindTableRows(pCRM_Clients) {
    debugger;
    $("#hl-menu-CRM").parent().addClass("active");
    ClearAllTableRows("tblCRM_Clients");
    $.each(pCRM_Clients, function (i, item) {
        debugger;
       
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblCRM_Clients",
        ("<tr class='font-bold' ID='" + item.ID + "' ondblclick='CRM_Clients_EditByDblClick(" + item.ID + ");'>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
            + "<td class='NameEn' val='" + item.Name + "'>" + item.Name + "</td>"
            + "<td class='NameAr' val='" + item.LocalName + "'>" + item.LocalName + "</td>"
            + "<td class='SalesRep' val='" + item.SalesmanID + "'>" + item.Username + "</td>"
            + "<td class='SourceDate' val='" + GetDateFromServer(item.SourceDate) + "'>" + GetDateFromServer(item.SourceDate) + "</td>"
            + "<td class='EndUserName hide' val='" + item.EndUserName + "'>" + (item.EndUserName == 0 ? "" : item.EndUserName) + "</td>"
            + "<td class='LostReason hide' val='" + item.LostReason + "'>" + item.LostReason + "</td>"
            + "<td class='CountryID hide' val='" + item.CountryID + "'>" + item.CountryID + "</td>"
            + "<td class='PortID hide' val='" + item.PortID + "'>" + item.PortID + "</td>"
            + "<td class='PortName hide' val='" + item.PortName + "'>" + item.PortName + "</td>"
            + "<td class='Phone1 hide' val='" + item.Phone1 + "'>" + item.Phone1 + "</td>"
            + "<td class='Phone2 hide' val='" + item.Phone2 + "'>" + item.Phone2 + "</td>"
            + "<td class='CellPhone hide' val='" + item.CellPhone + "'>" + item.CellPhone + "</td>"
            + "<td class='Fax hide' val='" + item.Fax + "'>" + item.Fax + "</td>"
            + "<td class='Email hide' val='" + item.Email + "'>" + item.Email + "</td>"
            + "<td class='SourceID hide' val='" + item.SourceID + "'>" + item.SourceID + "</td>"
            + "<td class='SourceDescription hide' val='" + item.SourceDescription + "'>" + item.SourceDescription + "</td>"
            + "<td class='WebSite hide' val='" + item.WebSite + "'>" + item.WebSite + "</td>"
            + "<td style='text-align:left; white-space:pre-wrap; word-wrap:break-word;!important;' class='Note' val='" + item.Notes + "'>" + ((item.Notes).trim() == "0" ? "" : (item.Notes).toUpperCase()) + "</td>"
            + "<td class='IsAddedToCustomer hide' val='" + item.IsAddedToCustomer + "'>" + item.IsAddedToCustomer + "</td>"
            + "<td  style='text-align:left;'class='LastAction ' val='" + item.LastAction + "'>" + ((item.LastAction).trim() == '0' ? '-' : (item.LastAction).toUpperCase()) + "</td>"
            + "<td class='Address hide' val='" + item.Address + "'>" + item.Address + "</td>"
            + "<td class='CompanyView hide' val='" + item.CompanyView + "'>" + item.CompanyView + "</td>"
            + "<td class='CompanySize hide' val='" + item.CompanySize + "'>" + item.CompanySize + "</td>"
            + "<td class='CompanyType hide' val='" + item.CompanyType + "'>" + item.CompanyType + "</td>"
                + "<td class='ClientStatus hide' val='" + item.ClientStatus + "'>" + item.ClientStatus + "</td>"
                + "<td class='Status' val='" + item.ClientStatus + "'> " + $("input[name=ClientStatus][value="+ item.ClientStatus+"]").attr("inputname")  + "</td>"

                + "<td class='ClientIsInValid hide' val='" + item.ClientIsInValid + "'>" + item.ClientIsInValid + "</td>"
                + "<td class='DaysInValid hide' val='" + item.DaysInValid + "'>" + item.DaysInValid + "</td>"
                + "<td class='PipeLineStageUsersIDs hide' val='" + item.PipeLineStageUsersIDs + "'>" + item.PipeLineStageUsersIDs + "</td>"
                + "<td class='ClientUsersIDs hide' val='" + item.ClientUsersIDs + "'>" + item.ClientUsersIDs + "</td>"
            + "<td class='CommodityID hide'>" + (item.CommodityID == 0 ? "" : item.CommodityID) + "</td>"
            + "<td class='ActivityID hide'>" + (item.ActivityID == 0 ? "" : item.ActivityID) + "</td>"
            + "<td class='CurrencyID hide'>" + (item.CurrencyID == 0 ? "" : item.CurrencyID) + "</td>"
            + "<td class='Revenue hide'>" + item.Revenue.toFixed(2) + "</td>"
            + "<td class='Cost hide'>" + item.Cost.toFixed(2) + "</td>"
            //+ "<td class='GrossProfit hide'>" + item.GrossProfit + "</td>"
            //+ "<td class='ProfitMargin hide'>" + item.ProfitMargin + "</td>"
            + "<td class='StartingDate hide'>" + (GetDateFromServer(item.StartingDate) == "01/01/1900" ? "" : GetDateFromServer(item.StartingDate)) + "</td>"
            + "<td class='ClosingExpectedDate hide'>" + (GetDateFromServer(item.ClosingExpectedDate) == "01/01/1900" ? "" : GetDateFromServer(item.ClosingExpectedDate)) + "</td>"
            + "<td class='TradeLane hide'>" + (item.TradeLane == 0 ? "" : item.TradeLane) + "</td>"
            + "<td class='ContainerTypeID hide'>" + (item.ContainerTypeID == 0 ? "" : item.ContainerTypeID) + "</td>"
            + "<td class='BusinessVolume hide'>" + (item.BusinessVolume == 0 ? "" : item.BusinessVolume) + "</td>"
            + "<td class='Competitors hide'>" + (item.Competitors == 0 ? "" : item.Competitors) + "</td>"
            + "<td class='PaymentTermID hide'>" + (item.PaymentTermID == 0 ? "" : item.PaymentTermID) + "</td>"
            + "<td class='PipeLineStageID hide'>" + (item.PipeLineStageID == 0 ? "" : item.PipeLineStageID) + "</td>"
            + "<td class='Comment hide'>" + (item.Comment == 0 ? "" : item.Comment) + "</td>"
              + "<td class='IndustryTypeID hide'>" + (item.IndustryTypeID == 0 ? "" : item.IndustryTypeID) + "</td>"
              + "<td class='IndustryTypeName hide'>" + (item.IndustryTypeName == 0 ? "" : item.IndustryTypeName) + "</td>"
              + "<td class='LeadStatusID hide'  val='" + item.LeadStatusID + "'>" + (item.LeadStatusName == 0 ? "" : item.LeadStatusName) + "</td>"
              + "<td class='ClientTypeID hide'  val='" + item.ClientTypeID + "'>" + (item.ClientTypeName == 0 ? "" : item.ClientTypeName) + "</td>"

            + "<td class='EstablishDate hide' val='" + GetDateFromServer(item.EstablishDate) + "'>" + GetDateFromServer(item.EstablishDate) + "</td></tr>"
               ));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCRM_Clients", "ID");
    CheckAllCheckbox("ID");
    // HighlightText("#tblCRM_Clients>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function FillClientPort(tr) {
    debugger;
    // var tr = $("tr[ID='" + pID + "']");
    //setTimeout(function () {
    FillInputPort('#slCountries', '#slPorts');
    $('.non_basic').removeClass('hide');
    // $("#hID").val(pID);
    //}, 300);

    setTimeout(function () {
        console.log('port di : ' + $(tr).find("td.PortID").attr('val'));
        $("#slPorts").val($(tr).find("td.PortID").attr('val'));
        $('.non_basic').removeClass('hide');
        //   $("#hID").val(pID);
        $("#slPorts").val(parseInt($(tr).find("td.PortID").attr('val')));

    }, 500);
    $("#slPorts").val(parseInt($(tr).find("td.PortID").attr('val')));

}

function CRM_Clients_FillControls(pID, callback) {
    debugger;
    // Fill All Model Controls
  
    ClearAllTables();
    $("#hID").val(pID);
    $('.non_basic').removeClass('hide');
    var tr = $("#tblCRM_Clients tr[ID='" + pID + "']");

    CRM_Clients_FillClientData(function () {

        ClearAll("#CRM_ClientsModal", null);
        $("#hID").val(pID);
        //CRM_Clients_ClearAllControls();
        //i used the next line instead of the previous one to fix a problem of instability of the slCountry filling in case of editing
        //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
        //ClearAll("City-form", null);
        //PortID 
        $("#txtClientCode").val($(tr).find("td.Code").attr('val'));
        $("#txtCOEnName").val($(tr).find("td.NameEn").attr('val'));
        $("#txtCOArName").val($(tr).find("td.NameAr").attr('val'));
        $("#slSalesRep").val($(tr).find("td.SalesRep").attr('val'));
        $("#txtCode").val($(tr).find("td.SourceDate").attr('val'));
        $("#slCountries").val($(tr).find("td.CountryID").attr('val'));
        $("#slPorts").val($(tr).find("td.PortID").attr('val'));
        $("#txtNotes").val($(tr).find("td.Note").attr('val'));

        $('#InactiveString').text("")

        $('#txtAddress').val($(tr).find("td.Address").attr('val'));
        $("#txtPhone1").val($(tr).find("td.Phone1").attr('val'));
        $("#txtPhone2").val($(tr).find("td.Phone2").attr('val'));
        $("#txtMobile").val($(tr).find("td.CellPhone").attr('val'));
        $("#txtFax").val($(tr).find("td.Fax").attr('val'));
        $("#txtEmail").val($(tr).find("td.Email").attr('val'));
        $("#slSource").val($(tr).find("td.SourceID").attr('val'));
        $("#txtSourceDescription").val($(tr).find("td.SourceDescription").attr('val'));
        $("#txtEndUserName").val($(tr).find("td.EndUserName").attr('val'));
        $("#txtLostReason").val($(tr).find("td.LostReason").attr('val'));
        $("#txtWebSite").val($(tr).find("td.WebSite").attr('val'));
        $("#hIsAddedToCustomer").val($(tr).find("td.IsAddedToCustomer").attr('val'));
        
        $("#slCommodity").val($(tr).find("td.CommodityID").text());
        $("#slActivity").val($(tr).find("td.ActivityID").text());
        $("#slCurrency").val($(tr).find("td.CurrencyID").text() == 0 ? $("#hDefaultCurrencyID").val() : $(tr).find("td.CurrencyID").text());
        $("#txtRevenue").val($(tr).find("td.Revenue").text());
        $("#txtCost").val($(tr).find("td.Cost").text());
        $("#txtGrossProfit").val($(tr).find("td.GrossProfit").text());
        $("#txtProfitMargin").val($(tr).find("td.ProfitMargin").text());
        $("#txtStartingDate").val($(tr).find("td.StartingDate").text());
        $("#txtClosingExpectedDate").val($(tr).find("td.ClosingExpectedDate").text());
        $("#txtTradeLane").val($(tr).find("td.TradeLane").text());
        $("#slContainerType").val($(tr).find("td.ContainerTypeID").text());
        $("#txtBusinessVolume").val($(tr).find("td.BusinessVolume").text());
        $("#txtCompetitors").val($(tr).find("td.Competitors").text());
        $("#slPaymentTerm").val($(tr).find("td.PaymentTermID").text());
        $("#slPipeLineStage").val($(tr).find("td.PipeLineStageID").text());
        $("#txtComment").val($(tr).find("td.Comment").text());

        $("#slIndustryType").val($(tr).find("td.IndustryTypeID").text());
        $("#slLeadStatus").val($(tr).find("td.LeadStatusID").attr('val'));
        $("#slClientType").val($(tr).find("td.ClientTypeID").attr('val'));
        debugger;
        if ($(tr).find("td.ClientIsInValid").text() == "true")
            $("#InactiveString").text( "("+$(tr).find("td.NameEn").attr('val') + " is InActive for " + $(tr).find("td.DaysInValid").text() + " day )");
        else
            $("#InactiveString").text("")


        CRM_Clients_SetCompanyProfile();
        CRM_Clients_SetProfit();

        //if ($(tr).find("td.IsAddedToCustomer").attr('val') == "true")
        //    $("#btnTransferToActualCustomer").attr("disabled", "disabled");
        //else
        //    $("#btnTransferToActualCustomer").removeAttr("disabled");

        $("#txtSourceDate").val($(tr).find("td.SourceDate").attr('val'));
        $("#txtEstablishDate").val($(tr).find("td.EstablishDate").attr('val'));

        $("input[name=CompanyView][value=" + $(tr).find("td.CompanyView").attr('val') + "]").attr('checked', 'checked');
        $("input[name=CompanySize][value=" + $(tr).find("td.CompanySize").attr('val') + "]").attr('checked', 'checked');
        $("input[name=CompanyType][value=" + $(tr).find("td.CompanyType").attr('val') + "]").attr('checked', 'checked');
        $("input[name=ClientStatus][value=" + $(tr).find("td.ClientStatus").attr('val') + "]").attr('checked', 'checked');

        $("#btnSave").attr("onclick", "CRM_Clients_Update(false);");
        $("#btnSaveandNew").attr("onclick", "CRM_Clients_Update(true);");
        $('.non_basic').removeClass('hide');

        $('.TheClientName').html($(tr).find("td.NameEn").attr('val'));

        FillClientPort(tr);

        $('#Separatedline').html("")
        if ((parseFloat($('#slPipeLineStage option:selected').attr('actionpercent'))).toFixed(2) != "NaN")
            $('#Separatedline').html(' <div class="neapolitan" style="height:10px;width:' + (parseFloat($('#slPipeLineStage option:selected').attr('actionpercent'))).toFixed(2) + '%;position:relative;top:0;left:0;">' + $('#slPipeLineStage option:selected').text() + '  - Percent : ' + (parseFloat($('#slPipeLineStage option:selected').attr('actionpercent'))).toFixed(2) + '</div><div class="neapolitan m-t-md" style="background:green;height:6px;width:' + parseFloat($('#slPipeLineStage option:selected').attr('actionpercent')) + '%;position:relative;top:0;left:0;"></div>')

        $("#slPorts").val(parseInt($(tr).find("td.PortID").attr('val')));

        debugger;
        var _PipeLineStageUsersIDs = $(tr).find("td.PipeLineStageUsersIDs").attr('val').split(',');
        var _ClientUsersIDs = $(tr).find("td.ClientUsersIDs").attr('val').split(',');

        if (jQuery.inArray($("#hLoggedUserID").val(), _PipeLineStageUsersIDs) !== -1) {
            $('#slPipeLineStage').prop('disabled', false);
        }
        else {
            $('#slPipeLineStage').prop('disabled', true);
        }

        //if (jQuery.inArray($("#hLoggedUserID").val(), _ClientUsersIDs) !== -1) {
        //    $('#btnTransferToActualCustomer').prop('disabled', false);
        //}
        //else {
        //    $('#btnTransferToActualCustomer').prop('disabled', true);
        //}
    });
    //setTimeout(function () {
    //if (callback != null && callback != undefined) {
    //    callback(tr);//sherif: loads countries.js or any.js  
    //}
    //}, 500);
   

}

function CRM_Clients_EditByDblClick(pID) {
    jQuery("#CRM_ClientsModal").modal("show");
    CRM_Clients_FillSearchData();
    var tr = $("tr[ID='" + pID + "']");
    CRM_Clients_FillControls(pID, function () { FillClientPort(tr); });
    //var pParametersWithValues = {
    //    pID:pID
    //}
    //CallGETFunctionWithParameters("/api/CRM_Clients/GetDetailsWithPercent", pParametersWithValues
    //      , function (pData) {
    //          console.log(pData);
    //      }, null);
}
function AfterClickonStep(active_id) {
    //console.log("IDDD : " + $('#hID').val());
    //if ($('#hID').val().trim() == "") {
    //    // CRM_Clients_Insert('false');


    //    setTimeout(function () {

    //        $('#stepsContactPerson').removeClass('active');
    //        $('#ContactPerson').removeClass('active');
    //        $('#ContactPerson').css('display', 'none');


    //        $('#stepsFollowups').removeClass('active');
    //        $('#FollowUps').removeClass('active');
    //        $('#FollowUps').css('display', 'none');




    //        $('#stepsServices').removeClass('active');
    //        $('#Services').addClass('active');
    //        $('#Services').css('display', 'none');


    //        $('#stepsBasicData').addClass('active');
    //        $('#BasicDate').addClass('active');
    //        $('#BasicDate').css('display', 'block');





    //        //  AfterClickonStep();

    //    }, 300);

    //    //setTimeout(function () {

    //    //    console.log($('#hID').val());


    //    //  //  AfterClickonStep();

    //    //}, 500);

    //}
    //else
    //{
    //    setTimeout(function ()
    //    {
    //        $('#stepsBasicData').removeClass('active');
    //        $('#BasicDate').removeClass('active');
    //        $('#BasicDate').css('display', 'none');

    //        $('#' + 'steps' + active_id).addClass('active');
    //        $('#' + active_id).addClass('active');
    //        $('#' + active_id).css('display', 'block');

    //        //  AfterClickonStep();

    //    }, 300);

    //}
}

function AfterClickonStep1() {
    $('#BasicData').addClass('active');
    $('#BasicData').css('display', 'block');

    $('#ContactPerson').removeClass('active');
    $('#ContactPerson').css('display', 'none');

    $('#Followups').removeClass('active');
    $('#Followups').css('display', 'none');

    $('#Services').removeClass('active');
    $('#Services').css('display', 'none');

    $('#ProfitValue').removeClass('active');
    $('#ProfitValue').css('display', 'none');

}
function AfterClickonStep2() {
    $('#BasicData').removeClass('active');
    $('#BasicData').css('display', 'none');

    $('#ContactPerson').addClass('active');
    $('#ContactPerson').css('display', 'block');

    $('#Followups').removeClass('active');
    $('#Followups').css('display', 'none');

    $('#Services').removeClass('active');
    $('#Services').css('display', 'none');

    $('#ProfitValue').removeClass('active');
    $('#ProfitValue').css('display', 'none');
}
function AfterClickonStep3() {
    $('#BasicData').removeClass('active');
    $('#BasicData').css('display', 'none');

    $('#ContactPerson').removeClass('active');
    $('#ContactPerson').css('display', 'none');

    $('#Followups').addClass('active');
    $('#Followups').css('display', 'block');

    $('#Services').removeClass('active');
    $('#Services').css('display', 'none');


    $('#ProfitValue').removeClass('active');
    $('#ProfitValue').css('display', 'none');
}
function AfterClickonStep4() {
    $('#BasicData').removeClass('active');
    $('#BasicData').css('display', 'none');

    $('#ContactPerson').addClass('active');
    $('#ContactPerson').css('display', 'none');

    $('#Followups').removeClass('active');
    $('#Followups').css('display', 'none');

    $('#Services').removeClass('active');
    $('#Services').css('display', 'block');

    $('#ProfitValue').removeClass('active');
    $('#ProfitValue').css('display', 'none');
}

function AfterClickonStep5() {
    $('#BasicData').removeClass('active');
    $('#BasicData').css('display', 'none');

    $('#ContactPerson').addClass('active');
    $('#ContactPerson').css('display', 'none');

    $('#Followups').removeClass('active');
    $('#Followups').css('display', 'none');

    $('#Services').removeClass('active');
    $('#Services').css('display', 'none');

    $('#ProfitValue').removeClass('active');
    $('#ProfitValue').css('display', 'block');
}
//AfterClickonStep4()
//{
//    $('#ContactPerson').removeClass('active');
//    $('#ContactPerson').css('display', 'none');

function ClearAllTables() {
    $('#slPipeLineStage').prop('disabled', false);
    //$('#btnTransferToActualCustomer').prop('disabled', false);
  
    ClearAllTableRows("tblCRM_ContactPersons");
    ClearAllTableRows("tblCRM_FollowUp");
    $('#stepsBasicData').addClass('active');
    //$('#BasicDate').addClass('active');
    //$('#BasicDate').css('display', 'block');

    $('#Separatedline').html("")

    $('#BasicData').addClass('active');
    $('#BasicData').css('display', 'block');

    $('#ContactPerson').removeClass('active');
    $('#ContactPerson').css('display', 'none');

    $('#Followups').removeClass('active');
    $('#Followups').css('display', 'none');

    $('#Services').removeClass('active');
    $('#Services').css('display', 'none');

    $('#ProfitValue').removeClass('active');
    $('#ProfitValue').css('display', 'none');

    $('#stepsContactPerson').removeClass('active');
    //$('#ContactPerson').removeClass('active');
    //$('#ContactPerson').css('display', 'none');
    
    $('#stepsFollowups').removeClass('active');
    //$('#Followups').removeClass('active');
    //$('#Followups').css('display', 'none');
    
    $('#stepsProfitValue').removeClass('active');



    $('#stepsServices').removeClass('active');
    //$('#Services').removelass('active');
    //$('#Services').css('display', 'none');
}

//-----------------------------------------------------------------------------------------------------------
function CRM_Clients_FillSearchData() {

    var length = $('#slCountry_search > option').length;

    if (length <= 0) {
        FadePageCover(true);
        $.ajax({
            type: "POST",
            url: strServerURL + "/api/CRM_Clients/IntializeData",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (d) {
                debugger;
                Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', 'All Countries', '#slCountry_search', '');
                Fill_SelectInputAfterLoadData(d[2], 'ID', 'Name', 'All SalesRep', '#slSalesRep_search', '');
                Fill_SelectInputAfterLoadData(d[3], 'ID', 'Name', 'All Actions', '#slActionType_Search', '');
                Fill_SelectInputAfterLoadData(d[1], 'ID', 'Name', 'All Sources', '#slSource_search', '');
                Fill_SelectInputAfterLoadData(d[4], 'ID', 'Name', 'All Clients', '#slCOEnName_search', '');
                //  Fill_SelectInputAfterLoadData(JSON.parse(r.d[1]), 'ID', 'Name', 'All Sources', '#slSource_Search', '');
                FadePageCover(false);
            },
            error: function (jqXHR, exception) {
                debugger;
                swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
                FadePageCover(false);
            }
        });
    }
}

function CRM_Clients_FillClientData(callback) {
    $('.non_basic').addClass('hide');
    $('#txtSourceDate').val(getTodaysDateInddMMyyyyFormat());
    $('#txtEstablishDate').val(getTodaysDateInddMMyyyyFormat());
    var length = $('#slCountries > option').length;

    if (length <= 0) {
        FadePageCover(true);
        $.ajax({
            type: "POST",
            url: strServerURL + "/api/CRM_Clients/IntializeData",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (d) {
                debugger;
                Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', 'Select Country', '#slCountries', '');
                Fill_SelectInputAfterLoadData(d[2], 'ID', 'Name', 'Select SalesRep', '#slSalesRep', '');
                Fill_SelectInputAfterLoadData(d[1], 'ID', 'Name', 'Select Source', '#slSource', '');
                Fill_SelectInputAfterLoadData(d[2], 'ID', 'Name', 'Select SalesMan', '#slQuotationSalesman', '');
                Fill_SelectInputAfterLoadData(d[5], 'ID', 'Name', 'Select SalesLead', '#slSalesLead', '');
                

                $('#txtSourceDate').val(getTodaysDateInddMMyyyyFormat());
                $('#txtEstablishDate').val(getTodaysDateInddMMyyyyFormat());


                if (callback != null && callback != undefined) {
                    callback();//sherif: loads countries.js or any.js  
                }

                //  Fill_SelectInputAfterLoadData(JSON.parse(r.d[1]), 'ID', 'Name', 'All Sources', '#slSource_Search', '');
                FadePageCover(false);
            },
            error: function (jqXHR, exception) {
                debugger;
                swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
                FadePageCover(false);
            }
        });
    }
    else {
        if (callback != null && callback != undefined) {
            callback();//sherif: loads countries.js or any.js  
        }

    }

    //setTimeout(function () {



    //}, 500);



    //if (callback != null && callback != undefined) {
    //    callback();//sherif: loads countries.js or any.js  
    //}


}

//--------------------------------------------------------------------------------------------------------
function CRM_Clients_LoadingWithPaging() {
    debugger;

    var pWhereClause = $('#ClientSqlQuery').val();


    if (pWhereClause.trim() == "") {
        pWhereClause = "Where 1 = 1";

    }



    //LoadWithPagingWithWhereClause(pDivPagerName, pSelectPageSizeName, pSpnFirstPageRowName, pSpnLastPageRowName, pSpnTotalCountName, pDivTextTotalModal, "api/Quotations/LoadWithWhereClause", pWhereClause, pPageNo, $('#' + pSelectPageSizeName).val().trim(), function (pTabelRows) {
    //    var parm = [pTabelRows];
    //    var runFunction = window[strBindTableRowsFunctionName];
    //    if (typeof runFunction === "function") runFunction.apply(null, parm);
    //});


    var pOrderBy = " Name ";
    var pControllerParameters = { pPageNumber: 1, pPageSize: $("#select-page-size option:selected").text(), pWhereClause: pWhereClause }
    LoadWithPagingWithWhereClauseAndOrderBy("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "api/vwCRMCustomersFollowUp/LoadWithPagingWithWhereClause", pWhereClause, 'Name', 1, 10
        , function (pData) {
            //  console.log(pData[0]);
            CRM_Clients_BindTableRows(JSON.parse(pData[0]));



        });


    //  HighlightText("#tblOperations>tbody>tr", $("#txt-Search").val().trim());
}

////sherif: Loading with data and search key
//function CRM_Clients_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/CRM_Clients/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        CRM_Clients_BindTableRows(pTabelRows); CRM_Clients_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblCRM_Clients>tbody>tr", $("#txt-Search").val().trim());
//    });
//}


// calling web function to add new City item.
function CRM_Clients_Insert(pSaveandAddNew) {
    debugger;
    var ErrorMessage = "";
    if ($('#slCountries').val() == 0)
        ErrorMessage += " Country ..";
    if ($('#slPorts').val() == 0)
        ErrorMessage += " City ..";
    if ($('#txtAddress').val() == "")
        ErrorMessage += " Address ..";
    if ($('#txtPhone1').val() == "")
        ErrorMessage += " Phone1 ..";
    if ($('#txtMobile').val() == "")
        ErrorMessage += " Mobile ..";
    if ($('#txtEmail').val() == "")
        ErrorMessage += " Email ..";
    if ($('#txtSourceDate').val() == "")
        ErrorMessage += " Source Date ..";
    if (ErrorMessage.length > 2 )
        swal("Sorry", ("Please Enter These Fields..." + ErrorMessage));
    if (ErrorMessage.length < 2) {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var TodaysDate = (month < 10 ? '0' : '') + month + '/' +
            (day < 10 ? '0' : '') + day + '/' +
            d.getFullYear();
        if (TodaysDate.length > 2 && Date.prototype.compareDates(ConvertDateFormat($("#txtEstablishDate").val().trim()), TodaysDate) < 0) {
            swal(strSorry, "Please Enter Establish date in earlier dates.");
        }
        else {
            if ($("#txtClosingExpectedDate").val().length > 2 && Date.prototype.compareDates(ConvertDateFormat($("#txtStartingDate").val().trim()), ConvertDateFormat($("#txtClosingExpectedDate").val().trim())) < 0) {
                swal(strSorry, "Close date must be after open date.");
                FadePageCover(false);
            }
            else {
                
                InsertUpdateFunctionAndReturnID("form", "/api/CRM_Clients/Insert", {
                    pCOEnName: $("#txtCOEnName").val().trim().toUpperCase(),
                    pCOArName: $("#txtCOArName").val().trim().toUpperCase(),
                    pSalesRep: $("#slSalesRep").val(),
                    pCountry: $("#slCountries").val(),
                    pPort: $("#slPorts").val(),
                    //txtAddress
                    pPhone1: $("#txtPhone1").val(),
                    pPhone2: $("#txtPhone2").val(),
                    pMobile: $("#txtMobile").val(),
                    pFax: $("#txtFax").val(),
                    pEmail: $("#txtEmail").val(),
                    pWebSite: $("#txtWebSite").val(),
                    pEstablishDate: ConvertDateFormat($("#txtEstablishDate").val()),
                    pSource: $("#slSource").val(),
                    pSourceDate: ConvertDateFormat($("#txtSourceDate").val()),
                    pSourceDescription: $("#txtSourceDescription").val(),
                    pEndUserName: $("#txtEndUserName").val().trim() == "" ? "0" : $("#txtEndUserName").val().trim().toUpperCase(),
                    pLostReason: $("#txtLostReason").val().toUpperCase(),
                    pNotes: $("#txtNotes").val().trim(),
                    pCompanyView: $("input[name='CompanyView']:checked").val(),
                    pCompanySize: $("input[name='CompanySize']:checked").val(),
                    pCompanyType: $("input[name='CompanyType']:checked").val(),
                    pClientStatus: $("input[name='ClientStatus']:checked").val(),
                    pAddress: $('#txtAddress').val(),
                    pIsAddedToCustomer: $('#hIsAddedToCustomer').val()
                    , pCommodityID: $("#slCommodity").val() == "" ? 0 : $("#slCommodity").val()
                    , pActivityID: $("#slActivity").val() == "" ? 0 : $("#slActivity").val()
                    , pCurrencyID: $("#slCurrency").val() == "" ? 0 : $("#slCurrency").val()
                    , pRevenue: $("#txtRevenue").val() == "" ? 0 : $("#txtRevenue").val()
                    , pCost: $("#txtCost").val() == "" ? 0 : $("#txtCost").val()
                    //, pGrossProfit: $("#txtGrossProfit").val() == "" ? 0 : $("#txtGrossProfit").val()
                    //, pProfitMargin: $("#txtProfitMargin").val() == "" ? 0 : $("#txtProfitMargin").val()
                    , pStartingDate: $("#txtStartingDate").val().trim() == 0 ? "01/01/1900" : $("#txtStartingDate").val().trim()
                    , pClosingExpectedDate: $("#txtClosingExpectedDate").val().trim() == 0 ? "01/01/1900" : $("#txtClosingExpectedDate").val().trim()
                    , pTradeLane: $("#txtTradeLane").val().trim() == "" ? 0 : $("#txtTradeLane").val().trim().toUpperCase()
                    , pContainerTypeID: $("#slContainerType").val() == "" ? 0 : $("#slContainerType").val()
                    //, pBusinessVolume: $("#txtBusinessVolume").val() == "" ? 0 : $("#txtBusinessVolume").val()
                    //, pCompetitors: $("#txtCompetitors").val().trim() == "" ? 0 : $("#txtCompetitors").val().trim().toUpperCase()
                    //, pPaymentTermID: $("#slPaymentTerm").val() == "" ? 0 : $("#slPaymentTerm").val()
                    //, pPipeLineStageID: $("#slPipeLineStage").val() == "" ? 0 : $("#slPipeLineStage").val()
                    //, pComment: $("#txtComment").val().trim() == "" ? 0 : $("#txtComment").val().trim().toUpperCase()
                    , pIndustryTypeID: $("#slIndustryType").val() == "" ? 0 : $("#slIndustryType").val()
                    , pLeadStatusID: $("#slLeadStatus").val() == null || $("#slLeadStatus").val() == "" ? 0 : $("#slLeadStatus").val()
                    , pClientTypeID: $("#slClientType").val() == null || $("#slClientType").val() == "" ? 0 : $("#slClientType").val()
                }, pSaveandAddNew, 'CRM_ClientsModal', '#hID', function () {
                    swal("Success", "Saved Successfully")
                    CRM_Clients_LoadingWithPaging();
                    $("#btnSave").attr("onclick", "CRM_Clients_Update(false);");
                    $("#btnSaveandNew").attr("onclick", "CRM_Clients_Update(true);");
                    $('.non_basic').removeClass('hide');
                    //$('#CRM_ClientsModal').addClass('hide');
                    jQuery("#CRM_ClientsModal").modal("hide");
                });
            }

        }
    }
}
// calling this function for update
function CRM_Clients_Update(pSaveandAddNew) {
    debugger;
    var ErrorMessage = "";
    if ($('#slCountries').val() == 0)
        ErrorMessage += " Country ..";
    if ($('#slPorts').val() == 0)
        ErrorMessage += " City ..";
    if ($('#txtAddress').val() == "")
        ErrorMessage += " Address ..";
    if ($('#txtPhone1').val() == "")
        ErrorMessage += " Phone1 ..";
    if ($('#txtMobile').val() == "")
        ErrorMessage += " Mobile ..";
    if ($('#txtEmail').val() == "")
        ErrorMessage += " Email ..";
    if ($('#txtSourceDate').val() == "")
        ErrorMessage += " Source Date ..";
    if (ErrorMessage.length > 2 )
        swal("Sorry", ("Please Enter These Fields..." + ErrorMessage));
    if (ErrorMessage.length < 2) {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var TodaysDate = (month < 10 ? '0' : '') + month + '/' +
            (day < 10 ? '0' : '') + day + '/' +
            d.getFullYear();
        if (TodaysDate.length > 2 && Date.prototype.compareDates(ConvertDateFormat($("#txtEstablishDate").val().trim()), TodaysDate) < 0) {
            swal(strSorry, "Please Enter Establish date in earlier dates.");
        }
        else {
            if ($("#txtClosingExpectedDate").val().length > 2 && Date.prototype.compareDates(ConvertDateFormat($("#txtStartingDate").val().trim()), ConvertDateFormat($("#txtClosingExpectedDate").val().trim())) < 0) {
                swal(strSorry, "Close date must be after open date.");
                FadePageCover(false);
            }
            else
                InsertUpdateFunction("form", "/api/CRM_Clients/Update",
                    {
                        pID: $("#hID").val(),
                        pCOEnName: $("#txtCOEnName").val().trim().toUpperCase(),
                        pCOArName: $("#txtCOArName").val().trim().toUpperCase(),
                        pSalesRep: $("#slSalesRep").val(),
                        pCountry: $("#slCountries").val(),
                        pPort: $("#slPorts").val(),
                        //txtAddress
                        pPhone1: $("#txtPhone1").val(),
                        pPhone2: $("#txtPhone2").val(),
                        pMobile: $("#txtMobile").val(),
                        pFax: $("#txtFax").val(),
                        pEmail: $("#txtEmail").val(),
                        pWebSite: $("#txtWebSite").val(),
                        pEstablishDate: ConvertDateFormat($("#txtEstablishDate").val()),
                        pSource: $("#slSource").val(),
                        pSourceDate: ConvertDateFormat($("#txtSourceDate").val()),
                        pSourceDescription: $("#txtSourceDescription").val(),
                        pEndUserName: $("#txtEndUserName").val().trim() == "" ? "0" : $("#txtEndUserName").val().trim().toUpperCase(),
                        pLostReason: $("#txtLostReason").val().toUpperCase(),
                        pNotes: $("#txtNotes").val().trim(),
                        pCompanyView: $("input[name='CompanyView']:checked").val(),
                        pCompanySize: $("input[name='CompanySize']:checked").val(),
                        pCompanyType: $("input[name='CompanyType']:checked").val(),
                        pClientStatus: $("input[name='ClientStatus']:checked").val(),
                        pAddress: $('#txtAddress').val(),
                        pIsAddedToCustomer: $('#hIsAddedToCustomer').val()

                        , pCommodityID: $("#slCommodity").val() == "" ? 0 : $("#slCommodity").val()
                    , pActivityID: $("#slActivity").val() == "" ? 0 : $("#slActivity").val()
                    , pCurrencyID: $("#slCurrency").val() == "" ? 0 : $("#slCurrency").val()
                    , pRevenue: $("#txtRevenue").val() == "" ? 0 : $("#txtRevenue").val()
                    , pCost: $("#txtCost").val() == "" ? 0 : $("#txtCost").val()
                        //, pGrossProfit: $("#txtGrossProfit").val() == "" ? 0 : $("#txtGrossProfit").val()
                        //, pProfitMargin: $("#txtProfitMargin").val() == "" ? 0 : $("#txtProfitMargin").val()
                    , pStartingDate: $("#txtStartingDate").val().trim() == 0 ? "01/01/1900" : $("#txtStartingDate").val().trim()
                    , pClosingExpectedDate: $("#txtClosingExpectedDate").val().trim() == 0 ? "01/01/1900" : $("#txtClosingExpectedDate").val().trim()
                    , pTradeLane: $("#txtTradeLane").val().trim() == "" ? 0 : $("#txtTradeLane").val().trim().toUpperCase()
                    , pContainerTypeID: $("#slContainerType").val() == "" ? 0 : $("#slContainerType").val()
                    , pBusinessVolume: $("#txtBusinessVolume").val() == "" ? 0 : $("#txtBusinessVolume").val()
                    , pCompetitors: $("#txtCompetitors").val().trim() == "" ? 0 : $("#txtCompetitors").val().trim().toUpperCase()
                    , pPaymentTermID: $("#slPaymentTerm").val() == "" ? 0 : $("#slPaymentTerm").val()
                    , pPipeLineStageID: $("#slPipeLineStage").val() == "" ? 0 : $("#slPipeLineStage").val()
                    , pComment: $("#txtComment").val().trim() == "" ? 0 : $("#txtComment").val().trim().toUpperCase()
                    , pIndustryTypeID: $("#slIndustryType").val() == "" ? 0 : $("#slIndustryType").val()
                    , pLeadStatusID: $("#slLeadStatus").val() == null || $("#slLeadStatus").val() == "" ? 0 : $("#slLeadStatus").val()
                        , pClientTypeID: $("#slClientType").val() == null || $("#slClientType").val() == "" ? 0 : $("#slClientType").val()
                        , pDealCreationDate: ""
                        , pOppurtunityCreationDate: ""
                        , pNewCustomerCreationDate: ""
                    }, pSaveandAddNew, null, function (pData)
                    {
                        debugger;
                        swal("Success", "Saved Successfully")
                        CRM_Clients_LoadingWithPaging(); jQuery("#CRM_ClientsModal").modal("hide");
                    });

        }
    }
}
function CRM_TransferToCustomers() {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please, Save before transferring to clients.");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Customers/CRM_TransferToCustomers"
            , { pCRMSalesLeadID: $("#hID").val(), pQuotationID: 0 }
            , function (pData) {
                var _MessageReturned = pData[0];
                var _CustomerID = pData[1];
                var _ContactID = pData[2];
                var _ContactName = pData[3];
                if (_MessageReturned == "") {
                    swal("Success", "Please, add the customer's official data.");
                    //$("#btnTransferToActualCustomer").attr("disabled", "disabled");
                }
                else
                    swal("Sorry", _MessageReturned);
                FadePageCover(false);
            }
            , null);
    }
}
function CRM_Clients_Delete(pID) {
    DeleteListFunction("/api/CRM_Clients/DeleteByID", { "pID": pID }, function () { CRM_Clients_LoadingWithPaging(); });
}

function CRM_Clients_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCRM_Clients') != "")
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
            DeleteListFunction("/api/CRM_Clients/Delete", { "pCRM_ClientsIDs": GetAllSelectedIDsAsString('tblCRM_Clients') }, function () { CRM_Clients_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/CRM_Clients/Delete", { "pCRM_ClientsIDs": GetAllSelectedIDsAsString('tblCRM_Clients') }, function () { CRM_Clients_LoadingWithPaging(); });
}

function CRM_Clients_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#CRM_ClientsModal", null);
    //$('#CRM_ClientsModal').removeClass('hide');
    jQuery("#CRM_ClientsModal").modal("show");
    $("#btnSave").attr("onclick", "CRM_Clients_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "CRM_Clients_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
    //$("#btnTransferToActualCustomer").removeAttr("disabled");
    $('#txtSourceDate').val(getTodaysDateInddMMyyyyFormat());
    $('#txtEstablishDate').val(getTodaysDateInddMMyyyyFormat());

    $("#slCurrency").val($("#hDefaultCurrencyID").val());
    $("#txtStartingDate").val(getTodaysDateInddMMyyyyFormat());
    $("#txtClosingExpectedDate").val(getTodaysDateInddMMyyyyFormat());
}

function FillInputPort(CountryInputID, PortInputID) {
    console.log("pci_id" + CountryInputID + "p : " + PortInputID + "cID" + $(CountryInputID).val());
    Fill_SelectInput_WithDependedID('/api/CRM_Clients/FillInputPort', 'ID', 'Name', 'Select Port', PortInputID, '', $(CountryInputID).val());
}

function CRM_Clients_GetWhereClause(callback) {
    //ClientSqlQuery
    //ContactPersonsSqlQuery
    //FollowUpSqlQuery

    var WhereClause = "Where";
    var WhereClause_ContactPerson = "Where";
    var WhereClause_Followup = "Where";


    if ($('#txtClientCode_search').val().trim() != "") {
        WhereClause += " AND Code = " + $('#txtClientCode_search').val() + "";
    }
    if ($('#slCOEnName_search').val().trim() != "0") {
        // WhereClause += " AND Name LIKE N'%" + $('#slCOEnName_search').val() + "%'";
        WhereClause += " AND ID = " + $('#slCOEnName_search').val() + "";
    }
    if ($('#slSource_search').val().trim() != "0") {
        // WhereClause += " AND Name LIKE N'%" + $('#slCOEnName_search').val() + "%'";
        WhereClause += " AND SourceID = " + $('#slSource_search').val() + "";
    }
    //if ($('#txtCOARName_search').val().trim() != "") {
    //    WhereClause += " AND LocalName Like N'%" + $('#txtCOARName_search').val() + "%'";
    //}
    if ($('#slCountry_search').val().trim() != "0") {
        WhereClause += " AND CountryID = " + $('#slCountry_search').val() + "";
    }
    if ($('#slPorts_search').val() != null && $('#slPorts_search').val() != "0") {
        WhereClause += " AND PortID = " + $('#slPorts_search').val() + "";
    }
    if ($('#slSalesRep_search').val().trim() != "0") {
        WhereClause += " AND SalesmanID = " + $('#slSalesRep_search').val() + "";
    }
    if ($('#txtSourceDateFrom_Search').val().trim() != "") {
        WhereClause += " AND CONVERT(date , SourceDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtSourceDateFrom_Search').val()) + "')";
    }
    if ($('#txtSourceDateTo_Search').val().trim() != "") {
        WhereClause += " AND CONVERT(date , SourceDate ) <= CONVERT(date ,  '" + ConvertDateFormat($('#txtSourceDateTo_Search').val()) + "')";
    }

    if ($("input[name='ClientStatus_Search']:checked").val().trim() != "0") {
        WhereClause += " AND ClientStatus = " + $("input[name='ClientStatus_Search']:checked").val() + "";
    }

    if ($("input[name='CompanySize_Search']:checked").val().trim() != "0") {
        WhereClause += " AND CompanySize = " + $("input[name='CompanySize_Search']:checked").val() + "";
    }

    if ($("input[name='CompanyView_Search']:checked").val().trim() != "0") {
        WhereClause += " AND CompanyView = " + $("input[name='CompanyView_Search']:checked").val() + "";
    }
    
    //-------------------------------Contact Person Search -----------------------------------------------------------
    if ($('#txtContactPersonEnName_Search').val().trim() != "") {
        WhereClause += " AND ContactPersonEN LIKE '%" + $('#txtContactPersonEnName_Search').val() + "%'";
        WhereClause_ContactPerson += " AND NameEn LIKE = N'%" + $('#txtContactPersonEnName_Search').val() + "%'";
    }
    if ($('#txtContactPersonArName_Search').val().trim() != "") {
        WhereClause += " AND ContactPersonAr LIKE '%" + $('#txtContactPersonArName_Search').val() + "%'";
        WhereClause_ContactPerson += " AND NameAr LIKE N'%" + $('#txtContactPersonArName_Search').val() + "%'";
    }
    if ($('#cboIsKeyPerson_Search').prop('checked') == true) {
        WhereClause += " AND IsKeyPerson = " + 1 + "";
        WhereClause_ContactPerson += " AND IsKeyPerson = " + 1 + "";
    }

    //------------------------------- FollowUp Search   ------------------------------------------------------

    if ($('#slActionType_Search').val().trim() != "0") {
        WhereClause += " AND ActionTypeID = " + $('#slActionType_Search').val() + "";
        WhereClause_Followup += " AND ActionType_ID = " + $('#slActionType_Search').val() + "";
    }
    if ($('#txtActionDateFrom_Search').val().trim() != "") {
        WhereClause += " AND CONVERT(date , ActionDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtActionDateFrom_Search').val()) + "')";
        WhereClause_Followup += " AND CONVERT(date , ActionDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtActionDateFrom_Search').val()) + "')";
    }
    if ($('#txtActionDateTo_Search').val().trim() != "") {
        WhereClause += " AND CONVERT(date , ActionDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtActionDateTo_Search').val()) + "')";
        WhereClause_Followup += " AND CONVERT(date , ActionDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtActionDateTo_Search').val()) + "')";
    }


    //-------------------------------------------------------------------------------------------------

    if (WhereClause.trim() == "Where") {
        WhereClause = "Where 1 = 1";

    }
    else {

        WhereClause = WhereClause.replace("Where AND", "Where ");
    }

    $('#ClientSqlQuery').val(WhereClause);
    $('#ContactPersonsSqlQuery').val(WhereClause_ContactPerson);
    $('#FollowUpSqlQuery').val(WhereClause_Followup);


    jQuery("#FilterModal").modal("hide");

    if (typeof callback === "function") {
        // Execute the callback function and pass the parameters to it
        callback();
    }







}

function CRM_Clients_SetCompanyProfile() {
    debugger;
    if ($("#txtBusinessVolume").val() == "" || pDefaults.SmallBusinessBelow == 0 || pDefaults.MediumBusinessBelow == 0)
        $("#txtCompanyProfile").val("");
    else if ($("#txtBusinessVolume").val() < pDefaults.SmallBusinessBelow)
        $("#txtCompanyProfile").val("Small Business");
    else if ($("#txtBusinessVolume").val() < pDefaults.MediumBusinessBelow)
        $("#txtCompanyProfile").val("Medium Business");
    else
        $("#txtCompanyProfile").val("Large Business");
}
function CRM_Clients_SetProfit() {
    debugger;
    if ($("#txtRevenueProfitValue").val() == 0 || $("#txtCostProfitValue").val() == 0) {
        $("#txtGrossProfitProfitValue").val("");
        $("#txtProfitMarginProfitValue").val("");
    }
    else {
        $("#txtGrossProfitProfitValue").val($("#txtRevenueProfitValue").val() - $("#txtCostProfitValue").val());
        $("#txtProfitMarginProfitValue").val((($("#txtGrossProfitProfitValue").val() / $("#txtRevenueProfitValue").val()) * 100).toFixed(2));
    }
}
//######################################################     Contact Person        #############################################################################################################


function CRM_ContactPersons_LoadingWithPaging() {
    debugger;
    var ClientID = $('#hID').val();
    var pWhereClause = $('#ContactPersonsSqlQuery').val() + ' AND CRM_ClientsID = ' + ClientID;


    if (pWhereClause == ' AND CRM_ClientsID = ' + ClientID) {
        pWhereClause = "Where  CRM_ClientsID = " + ClientID;

    }
    else {

        pWhereClause = pWhereClause.replace("Where AND", "Where ");
    }


    console.log("Contact Person WHHHHHHH" + pWhereClause);
    //LoadWithPagingWithWhereClause(pDivPagerName, pSelectPageSizeName, pSpnFirstPageRowName, pSpnLastPageRowName, pSpnTotalCountName, pDivTextTotalModal, "api/Quotations/LoadWithWhereClause", pWhereClause, pPageNo, $('#' + pSelectPageSizeName).val().trim(), function (pTabelRows) {
    //    var parm = [pTabelRows];
    //    var runFunction = window[strBindTableRowsFunctionName];
    //    if (typeof runFunction === "function") runFunction.apply(null, parm);
    //});


    var pOrderBy = " ID DESC ";
    var pControllerParameters = { pPageNumber: 1, pPageSize: $("#select-page-size1 option:selected").text(), pWhereClause: pWhereClause }
    LoadWithPagingWithWhereClauseAndOrderBy("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", "api/CRM_ContactPersons/LoadWithPagingWithWhereClause", pWhereClause, 'ID', 1, 10
        , function (pData) {
            //  console.log(pData[0]);
            CRM_ContactPersons_BindTableRows(JSON.parse(pData[0]));



        });


    //  HighlightText("#tblOperations>tbody>tr", $("#txt-Search").val().trim());
}
function CRM_ContactPersons_ClearAllForm() {
    ClearAll("#CRM_ContactPersonsModal", null);
    $("#btnSave1").attr("onclick", "CRM_ContactPersons_Insert(false);");
    $("#btnSaveandNew1").attr("onclick", "CRM_ContactPersons_Insert(true);");
}
function CRM_ContactPersons_BindTableRows(CRM_ContactPersons) {
    debugger;
    $("#hl-menu-CRM").parent().addClass("active");
    ClearAllTableRows("tblCRM_ContactPersons");
    $.each(CRM_ContactPersons, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblCRM_ContactPersons",
            ("<tr ID='" + item.ID + "' ondblclick='CRM_ContactPersons_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID_CRM_ContactPersons'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='NameEn' val='" + item.NameEn + "'>" + item.NameEn + "</td>"
                + "<td class='NameAr' val='" + item.NameAr + "'>" + item.NameAr + "</td>"
                + "<td class='CellPhone' val='" + item.CellPhone + "'>" + item.CellPhone + "</td>"
                + "<td class='Telephone' val='" + item.Telephone + "'>" + item.Telephone + "</td>"
                + "<td class='ExtensionNo' val='" + item.ExtensionNo + "'>" + item.ExtensionNo + "</td>"
                + "<td class='Email' val='" + item.Email + "'>" + item.Email + "</td>"
                + "<td class='PersonalPhone' val='" + item.PersonalPhone + "'>" + item.PersonalPhone + "</td>"
                + "<td class='PersonalEmail' val='" + item.PersonalEmail + "'>" + item.PersonalEmail + "</td>"
                + "<td class='Position' val='" + item.Position + "'>" + item.Position + "</td>"
                + "<td class='IsKeyPerson'> <input type='checkbox' disabled='disabled' val='" + (item.IsKeyPerson == true ? "true' checked='checked'" : "'") + " /></td>"


                //+ "<td class='HasDetails'> <input type='checkbox' disabled='disabled' val='" + (item.HasDetails == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='hCRM_Clients'><a href='#CRM_ClientsModal' data-toggle='modal' onclick='CRM_ContactPersons_EditByDblClick(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCRM_ContactPersons", "ID_CRM_ContactPersons", "ID_CRM_ContactPersons");
    CheckAllCheckbox("ID_CRM_ContactPersons");
    // HighlightText("#tblCRM_ContactPersons>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function CRM_ContactPersons_EditByDblClick(pID) {
    jQuery("#CRM_ContactPersonsModal").modal("show");
    //  CRM_ContactPersons_FillSearchData();
    CRM_ContactPersons_FillControls(pID);
}
function CRM_ContactPersons_FillControls(pID) {
    debugger;

    ClearAll("#CRM_ContactPersonsModal", null);

    $("#hID1").val(pID);
    var tr = $("tr[ID='" + pID + "']");
    $("#txtNameEn").val($(tr).find("td.NameEn").attr('val'));
    $("#txtNameAr").val($(tr).find("td.NameAr").attr('val'));
    $("#txtCellPhone").val($(tr).find("td.CellPhone").attr('val'));
    $("#txtTelephone").val($(tr).find("td.Telephone").attr('val'));
    $("#txtExtensionNo").val($(tr).find("td.ExtensionNo").attr('val'));
    $("#txtContactPersonEmail").val($(tr).find("td.Email").attr('val'));
    $("#txtPersonalPhone").val($(tr).find("td.PersonalPhone").attr('val'));
    $('#txtPosition').val($(tr).find("td.Position").attr('val'));
    $('#txtPersonalEmail').val($(tr).find("td.PersonalEmail").attr('val'));
    $("#cboIsKeyPerson").prop('checked', $(tr).find('td.IsKeyPerson').find('input').attr('val'));

    $('.TheClientName').html($('.Main_TheClientName').html());
    $("#btnSave1").attr("onclick", "CRM_ContactPersons_Insert(false);");
    $("#btnSaveandNew1").attr("onclick", "CRM_ContactPersons_Insert(true);");
}
function CRM_ContactPersons_Insert(pSaveandAddNew) {
    debugger;
    if ($("#hID1").val() == "")
    InsertUpdateFunction("form", "/api/CRM_ContactPersons/Insert", {
       
        pNameEn: $("#txtNameEn").val(),
        pNameAr: $("#txtNameAr").val(),
        pCellPhone: $("#txtCellPhone").val(),
        pTelephone: $("#txtTelephone").val(),
        pExtensionNo: $("#txtExtensionNo").val(),
        //txtAddress
        pEmail: $("#txtContactPersonEmail").val(),
        pPersonalPhone: $("#txtPersonalPhone").val(),
        pPersonalEmail: $("#txtPersonalEmail").val(),
        pPosition: $("#txtPosition").val(),
        pIsKeyPerson: $("#cboIsKeyPerson").prop('checked'),
        pClientID: $('#hID').val()
    }, pSaveandAddNew, 'CRM_ContactPersonsModal', function () {
        CRM_ContactPersons_LoadingWithPaging();
        //   $("#btnSave1").attr("onclick", "CRM_ContactPersons_Update(false);");
        //   $("#btnSaveandNew1").attr("onclick", "CRM_ContactPersons_Update(true);");
        // $('.non_basic').removeClass('hide');
    });
    else
        InsertUpdateFunction("form", "/api/CRM_ContactPersons/Update", {
            pID: $("#hID1").val(),
            pNameEn: $("#txtNameEn").val(),
            pNameAr: $("#txtNameAr").val(),
            pCellPhone: $("#txtCellPhone").val(),
            pTelephone: $("#txtTelephone").val(),
            pExtensionNo: $("#txtExtensionNo").val(),
            //txtAddress
            pEmail: $("#txtContactPersonEmail").val(),
            pPersonalPhone: $("#txtPersonalPhone").val(),
            pPersonalEmail: $("#txtPersonalEmail").val(),
            pPosition: $("#txtPosition").val(),
            pIsKeyPerson: $("#cboIsKeyPerson").prop('checked'),
            pClientID: $('#hID').val()
        }, pSaveandAddNew, 'CRM_ContactPersonsModal', function () {
            CRM_ContactPersons_LoadingWithPaging();
            //   $("#btnSave1").attr("onclick", "CRM_ContactPersons_Update(false);");
            //   $("#btnSaveandNew1").attr("onclick", "CRM_ContactPersons_Update(true);");
            // $('.non_basic').removeClass('hide');
        });
}
// calling this function for update
function CRM_ContactPersons_Delete(pID) {
    DeleteListFunction("/api/CRM_ContactPersons/DeleteByID", { "pID": pID }, function () { CRM_ContactPersons_LoadingWithPaging(); });
}
function CRM_ContactPersons_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCRM_ContactPersons') != "")
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
                DeleteListFunction("/api/CRM_ContactPersons/Delete", { "pCRM_ContactPersonsIDs": GetAllSelectedIDsAsString('tblCRM_ContactPersons') }, function () { CRM_ContactPersons_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/CRM_Clients/Delete", { "pCRM_ClientsIDs": GetAllSelectedIDsAsString('tblCRM_Clients') }, function () { CRM_Clients_LoadingWithPaging(); });
}
//############################################################################ Follow Up #################################################################
function CRM_FollowUp_LoadingWithPaging() {
    debugger;
    var ClientID = $('#hID').val();
    console.log("Client ID : " + $('#hID').val());
    var pWhereClause = $('#FollowUpSqlQuery').val() + ' AND CRM_ClientID = ' + ClientID;


    if (pWhereClause == ' AND CRM_ClientID = ' + ClientID) {
        pWhereClause = "Where  CRM_ClientID = " + ClientID;

    }
    else {

        pWhereClause = pWhereClause.replace("Where AND", "Where ");


    }


    console.log("FollowUp WHHHHHHH" + pWhereClause);
    //LoadWithPagingWithWhereClause(pDivPagerName, pSelectPageSizeName, pSpnFirstPageRowName, pSpnLastPageRowName, pSpnTotalCountName, pDivTextTotalModal, "api/Quotations/LoadWithWhereClause", pWhereClause, pPageNo, $('#' + pSelectPageSizeName).val().trim(), function (pTabelRows) {
    //    var parm = [pTabelRows];
    //    var runFunction = window[strBindTableRowsFunctionName];
    //    if (typeof runFunction === "function") runFunction.apply(null, parm);
    //});

    var pOrderBy = " ID DESC ";
    var pControllerParameters = { pPageNumber: 1, pPageSize: $("#select-page-size1 option:selected").text(), pWhereClause: pWhereClause }
    LoadWithPagingWithWhereClauseAndOrderBy("div-Pager2", "select-page-size2", "spn-first-page-row2", "spn-last-page-row2", "spn-total-count2", "div-Text-Total2", "api/vwCRM_FollowUps/LoadWithPagingWithWhereClause", pWhereClause, 'ID', 1, 10
        , function (pData) {
            //  console.log(pData[0]);
            CRM_FollowUp_BindTableRows(JSON.parse(pData[0]));
            var i = 0;
            var j = 0;
            var Action_Percent = JSON.parse(pData[3]);
            var TotalAction_Percent = 0;

            var pHTML = "";
            pHTML += " <table style='width: 100%; table-layout: fixed;'>";
            
            pHTML += " <tr>";
            for (j = 0; j < Action_Percent.length; j++) {
                TotalAction_Percent += parseFloat(Action_Percent[j].ActionPercent);
                pHTML += " <th class='text-center' style='width:" + Action_Percent[j].ActionPercent + "%'>" + Action_Percent[j].Action + "</th>";
            }
            pHTML += " <th style='width:" + (100 - (TotalAction_Percent)) + "%'> </th>";
            pHTML += " </tr>";
            pHTML += " <tr>";
            for (j = 0; j < Action_Percent.length; j++) {
                pHTML += " <td style='width:" + Action_Percent[j].ActionPercent + "%'><div class='neapolitan m-t-md' style='background:" + Action_Percent[j].Color + ";height:6px; position:relative;top:0;left:0;'></div></td>";
            }
            pHTML += " <td style='width:" +(100 - (TotalAction_Percent)) + "%'> </td>";
            pHTML += " </tr>";
            pHTML += " </table>";



            //$('#Separatedline').html("")
            //for (i = 0; i < Action_Percent.length; i++)
            //{
            //    $('#Separatedline').html($('#Separatedline').html() + ' <div class="neapolitan" style="height:10px;width:' + (parseFloat(parseFloat(Action_Percent[i].ActionPercent) / parseFloat(TotalAction_Percent) * 100)).toFixed(2) + '%;position:relative;top:0;left:0;">' + Action_Percent[i].Action + '  - Percent : ' + (parseFloat(parseFloat(Action_Percent[i].ActionPercent) / parseFloat(TotalAction_Percent) * 100)).toFixed(2) + '</div><div class="neapolitan m-t-md" style="background:' + Action_Percent[i].Color + ';height:6px;width:' + parseFloat(parseFloat(Action_Percent[i].ActionPercent) / parseFloat(TotalAction_Percent) * 100) + '%;position:relative;top:0;left:0;"></div>')
            //}
            //$('#Separatedline').html(pHTML)

        });


    //  HighlightText("#tblOperations>tbody>tr", $("#txt-Search").val().trim());
}
function CRM_FollowUp_ClearAllForm() {
    ClearAll("#CRM_FollowUpModal", null);
    $('#txtActionDate').val(getTodaysDateInddMMyyyyFormat());
    $('#txtNextStepDate').val(getTodaysDateInddMMyyyyFormat());
    $("#btnSave2").attr("onclick", "CRM_FollowUp_Insert(false);");
    $("#btnSaveandNew2").attr("onclick", "CRM_FollowUp_Insert(true);");
    DblClicked = 0;
}
function CRM_FollowUp_BindTableRows(CRM_FollowUp) {
    // $('[data-toggle="tooltip"]').tooltip(); 
    // $('[data-toggle="popover"]').popover();
    debugger;
    var i = 0;
    for (i = 0; i < CRM_FollowUp.length; i++)
    {
        let map = CRM_FollowUp.reduce((prev, next) => {
            if (next.ActionType_ID in prev) {
                prev[next.ActionType_ID].ActionPercent += next.ActionPercent;
            } else {
                prev[next.ActionType_ID] = next;
            }
            return prev;
        }, {});

        let result = Object.keys(map).map(ActionType_ID => map[ActionType_ID]);

        console.log(result);
    }
    $("#hl-menu-CRM").parent().addClass("active");
    ClearAllTableRows("tblCRM_FollowUp");
    $.each(CRM_FollowUp, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        var Details = (item.ActionDetails).replace(/\<br>/g, '\r\n');
        var statue = "";
        let IDsWithGreenStatus = [2, 8, 10];
        let IDsWithRedStatus = [4, 9, 11];
        if (item.NextActionStatue_ID == 1) {
            statue = "<td class='NextActionStatue_ID hide' title='" + 'pre Code : ' + item.preCode + "' style='background-color:grey;color:white;' val='" + item.NextActionStatue_ID + "'><span class='fa fa-spinner'></span> " + item.Statue + "</td>";
        }
        else if (IDsWithGreenStatus.includes(item.NextActionStatue_ID)) {

            statue = "<td class='NextActionStatue_ID hide' title = '" + 'Next Code : ' + item.NextCode + '\r\n' + 'Pre Code : ' + item.preCode + "' style='background-color:green;color:white;' val='" + item.NextActionStatue_ID + "'><span class='fa fa-check'></span> " + item.Statue + "</td>";
        }
        else if (item.NextActionStatue_ID == 3) {

            statue = "<td class='NextActionStatue_ID hide' title = '" + 'pre Code : ' + item.preCode + '\r\n' + 'Cancel Reason : ' + item.CancelReason + "' style='background-color:brown;color:white;' val='" + item.NextActionStatue_ID + "'><span class='fa fa-times-circle'></span> " + item.Statue + "</td>";
        }
        else if (IDsWithRedStatus.includes(item.NextActionStatue_ID)) {

            statue = "<td class='NextActionStatue_ID hide' title='" + 'pre Code : ' + item.preCode + '\r\n' + 'Deny Reason : ' + item.CancelReason + "' style='background-color:red;color:white;' val='" + item.NextActionStatue_ID + "'><span class='fa fa-minus-circle'></span> " + item.Statue + "</td>";
        }
        else {
            statue = "<td class='NextActionStatue_ID hide' title='" + 'pre Code : ' + item.preCode + "' style='background-color:grey;color:white;' val='" + 1 + "'><span class='fa fa-spinner'></span> " + 'Waiting' + "</td>";
        }
        AppendRowtoTable("tblCRM_FollowUp",
            ("<tr ID='" + item.ID + "' ondblclick='CRM_FollowUp_EditByDblClick(" + item.ID + " ," + i + "  );'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code hide' val='" + item.ID + "'>" + item.ID + "</td>"
                + "<td class='SalesRep' val='" + item.SalesRep + "'>" + item.UserName + "</td>"
                + "<td class='SalesRepID2 hide' val='" + item.SalesRepID2 + "'>" + (item.SalesRepID2 == 0 ? "" : item.SalesRepID2) + "</td>"
                + "<td class='ActionType_ID'  val='" + item.ActionType_ID + "'>" + item.Action + "</td>"
                + "<td class='ActionPercentID hide' val='" + item.ActionPercentID + "'>" + item.ActionPercentID + "</td>"
                + "<td class='ActionDate' val='" + GetDateFromServer(item.ActionDate) + "'>" + GetDateFromServer(item.ActionDate) + "</td>"
                + "<td class='ActionDetails' onclick='CRM_ActionDetails_LoadingWithPaging(" + item.ID + ")' style='background-color:midnightblue; color:white;'  title='" + Details + "'>" + '<span class="fa fa-table"></span> Details' + "</td>"
                + "<td class='NextStepID' val='" + item.NextStepID + "'>" + (item.NextAction == 0 ? "-" : item.NextAction) + "</td>"
                + "<td class='NextActionPercentID hide' val='" + item.NextActionPercentID + "'>" + item.NextActionPercentID + "</td>"
                + "<td class='NextStepDate' val='" + (GetDateFromServer(item.NextStepDate) == '01/01/1900' ? '' : GetDateFromServer(item.NextStepDate)) + "'>" + (GetDateFromServer(item.NextStepDate) == '01/01/1900' ? '-' : GetDateFromServer(item.NextStepDate)) + "</td>"
                + "<td class='Notes' style='text-align:left; white-space:pre-wrap; word-wrap:break-word;!important;' val='" + item.Notes + "'>" + (item.Notes == '0' ? ' ' : (item.Notes).toUpperCase()) + "</td>"
                + statue
                + "<td class='PreCode hide' val='" + item.preCode + "'>" + item.preCode + "</td>"
                + "<td class='CancelReason hide' val='" + item.CancelReason + "'>" + item.CancelReason + "</td>"
                //+ "<td class='HasDetails'> <input type='checkbox' disabled='disabled' val='" + (item.HasDetails == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='hCRM_Clients'><a href='#CRM_FollowUpModal' data-toggle='modal' onclick='CRM_FollowUp_EditByDblClick(" + item.ID + " ," + i + ");' " + editControlsText + "</a></td></tr>"));

    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCRM_FollowUp", "ID_CRM_FollowUp", "ID_CRM_FollowUp");
    CheckAllCheckbox("ID_CRM_FollowUp");
    // HighlightText("#tblCRM_FollowUp>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
var DblClicked = 0;
var GlobalIndex = 0;
function CRM_FollowUp_EditByDblClick(pID,ind) {
    debugger;
    jQuery("#CRM_FollowUpModal").modal("show");
    //  CRM_FollowUp_FillSearchData();
    CRM_FollowUp_FillControls(pID);
    DblClicked = 1;
    GlobalIndex = ind;
}
function AfterChangeStatue() {
    if ($('#slstatue').val().trim() == '3' || $('#slstatue').val().trim() == '4') {


        $('#divreason').removeClass('hide');
    }
    else {
        $('#divreason').addClass('hide');
    }


    if ($("#hprestatue").val() == '2') {
        swal("warning", "If Action Statue changed from  [Done] to Other : Next Action Will be Deleted ", 'warning');
        $("#hprestatue").val($("#slstatue").val());

    }

}

function CRM_FollowUp_FillControls(pID) {
    debugger;
    setTimeout(function () {
        ClearAll("#CRM_FollowUpModal", function () {
            CRM_FollowUp_FillActions(function () {

                //$('#btnActionDetails').removeClass('hide');
                $('#divstatue').removeClass('hide');
                $('#divreason').addClass('hide');
                //setTimeout(function () {

                $("#hID2").val(pID);
                //$('#btnActionDetails').removeClass('hide');
                var tr = $("#tblCRM_FollowUp tr[ID='" + pID + "']");
                $("#slFollowUpSalesRep").val($(tr).find("td.SalesRep").attr('val'));
                $("#slFollowUpSalesRep2").val($(tr).find("td.SalesRepID2").text());
                $("#slActionType").val($(tr).find("td.ActionType_ID").attr('val'));
                $("#txtActionDate").val($(tr).find("td.ActionDate").attr('val'));
                $("#slNextStep").val($(tr).find("td.NextStepID").attr('val'));
                $("#txtNextStepDate").val($(tr).find("td.NextStepDate").attr('val'));
                $("#txtFollowUpNote").val(($(tr).find("td.Notes").attr('val') == '0' ? ' ' : $(tr).find("td.Notes").attr('val')));
                $("#slstatue").val($(tr).find("td.NextActionStatue_ID").attr('val'));
                $("#hPreCode").val($(tr).find("td.PreCode").attr('val'));
                $("#hprestatue").val($(tr).find("td.NextActionStatue_ID").attr('val'));
                if ($(tr).find("td.NextActionStatue_ID").attr('val').trim() == '3' || $(tr).find("td.NextActionStatue_ID").attr('val').trim() == '4') {

                    $('#divreason').removeClass('hide');
                    $("#txtReason").val($(tr).find("td.CancelReason").attr('val'));
                }
                $('.TheClientName').html($('.Main_TheClientName').html());
                $("#btnSave2").attr("onclick", "CRM_FollowUp_Update(false);");
                $("#btnSaveandNew2").attr("onclick", "CRM_FollowUp_Update(true);");




            });
        });
    }, 300);

    //} , 500);
}
function CRM_FollowUp_Insert(pSaveandAddNew) {
    debugger;
    var _result = true;
    $('#tblCRM_FollowUp > tbody  > tr').each(function (index, tr) {
        debugger;
        if ($("#txtActionDate").val().length > 2 && Date.prototype.compareDates(ConvertDateFormat($(tr).find("td.ActionDate").text().trim()), ConvertDateFormat($("#txtActionDate").val().trim())) < 0) {
            _result = false;
        }
        console.log(index);
        console.log(tr);
        //$(tr).find("td.PortID").text()
    });
    if (_result == true) {
        if ($("#txtNextStepDate").val().length > 2 && Date.prototype.compareDates(ConvertDateFormat($("#txtActionDate").val().trim()), ConvertDateFormat($("#txtNextStepDate").val().trim())) < 0) {
            swal(strSorry, "Next Step Date must be after Action Date.");
            FadePageCover(false);
        }
        else
            InsertUpdateFunction("form", "/api/CRM_FollowUp/Insert", {
                pSalesRep: $("#slFollowUpSalesRep").val() == "" ? 0 : $("#slFollowUpSalesRep").val(),
                pSalesRepID2: $("#slFollowUpSalesRep2").val() == "" ? 0 : $("#slFollowUpSalesRep2").val(),
                pActionType_ID: $("#slActionType").val(),
                pActionDate: ($("#txtActionDate").val() == "" ? "" : ConvertDateFormat($("#txtActionDate").val())),
                pNextStepID: $("#slNextStep").val(),
                pNextStepDate: ($("#txtNextStepDate").val() == "" ? "" : ConvertDateFormat($("#txtNextStepDate").val())),
                pNotes: $("#txtFollowUpNote").val(),
                pNextActionStatue_ID: $("#hstatue").val(),
                pClientID: $('#hID').val(),
                pPreCode: $('#hPreCode').val()
            }, pSaveandAddNew, 'CRM_FollowUpModal', function () {
                CRM_FollowUp_LoadingWithPaging();
                if ($("#slActionType option:selected").text().trim() == "SEND QUOTATION") {
                    Receptionists_GetAvailableUsers();
                    $("#btnCheckboxesListApply").attr("onclick", "CRM_FollowUp_SendQuotationAlarm();");
                    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Apply");
                    $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableUsers();");
                }
                //   $("#btnSave1").attr("onclick", "CRM_FollowUp_Update(false);");
                //   $("#btnSaveandNew1").attr("onclick", "CRM_FollowUp_Update(true);");
                // $('.non_basic').removeClass('hide');
            });
    }
    else
    {
        swal(strSorry, "There is conflict in Action Date.");
    }
}
function CRM_FollowUp_Update(pSaveandAddNew) {
    debugger;
    var _result = true;
    $('#tblCRM_FollowUp > tbody  > tr').each(function (index, tr) {
        debugger;
        if (index > GlobalIndex)
        if ($("#txtActionDate").val().length > 2 && Date.prototype.compareDates(ConvertDateFormat($(tr).find("td.ActionDate").text().trim()), ConvertDateFormat($("#txtActionDate").val().trim())) < 0) {
            _result = false;
        }
        console.log(index);
        console.log(tr);
        //$(tr).find("td.PortID").text()
    });
    if (_result == true) {
        if ($("#txtNextStepDate").val().length > 2 && Date.prototype.compareDates(ConvertDateFormat($("#txtActionDate").val().trim()), ConvertDateFormat($("#txtNextStepDate").val().trim())) < 0) {
            swal(strSorry, "Next Step Date must be after Action Date.");
            FadePageCover(false);
        }
        else
            InsertUpdateFunction("form", "/api/CRM_FollowUp/Update", {
                pID: $("#hID2").val(),
                pSalesRep: $("#slFollowUpSalesRep").val() == "" ? 0 : $("#slFollowUpSalesRep").val(),
                pSalesRepID2: $("#slFollowUpSalesRep2").val() == "" ? 0 : $("#slFollowUpSalesRep2").val(),
                pActionType_ID: $("#slActionType").val(),
                pActionDate: ($("#txtActionDate").val() == "" ? "" : ConvertDateFormat($("#txtActionDate").val())),
                pNextStepID: $("#slNextStep").val(),
                pNextStepDate: ($("#txtNextStepDate").val() == "" ? "" : ConvertDateFormat($("#txtNextStepDate").val())),
                pNotes: $("#txtFollowUpNote").val(),
                pNextActionStatue_ID: $("#slstatue").val(),
                pClientID: $('#hID').val(),
                pPreCode: $('#hPreCode').val(),
                pCancelReason: $('#txtReason').val()
            }, pSaveandAddNew, 'CRM_FollowUpModal', function () {
                CRM_FollowUp_LoadingWithPaging();
                if ($("#slActionType option:selected").text().trim().trim() == "SEND QUOTATION") {
                    Receptionists_GetAvailableUsers();
                    $("#btnCheckboxesListApply").attr("onclick", "CRM_FollowUp_SendQuotationAlarm();");
                    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Apply");
                    $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableUsers();");
                }
                //   $("#btnSave1").attr("onclick", "CRM_FollowUp_Update(false);");
                //   $("#btnSaveandNew1").attr("onclick", "CRM_FollowUp_Update(true);");
                // $('.non_basic').removeClass('hide');
            });
    }
    else {
        swal(strSorry, "There is conflict in Action Date.");
    }
}
function CRM_FollowUp_Delete(pID) {
    DeleteListFunction("/api/CRM_FollowUp/DeleteByID", { "pID": pID }, function () { CRM_FollowUp_LoadingWithPaging(); });
}
function CRM_FollowUp_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCRM_FollowUp') != "")
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
                DeleteListFunction("/api/CRM_FollowUp/Delete", { "pCRM_FollowUpIDs": GetAllSelectedIDsAsString('tblCRM_FollowUp') }, function () { CRM_FollowUp_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/CRM_Clients/Delete", { "pCRM_ClientsIDs": GetAllSelectedIDsAsString('tblCRM_Clients') }, function () { CRM_Clients_LoadingWithPaging(); });
}
function CRM_FollowUp_FillActions(callback) {
    //   $('.non_basic').addClass('hide');

    var length = $('#slActionType > option').length;
    //  slNextStep

    debugger;
    if (length <= 0) {
        FadePageCover(true);
        $.ajax({
            type: "POST",
            url: strServerURL + "/api/CRM_FollowUp/IntializeData",
            data: { 'pID': $("#hID").val() },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (d) {
                debugger;
               
                Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', 'Select Action', '#slActionType', 'ActionPercent');
                Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', 'Select Next Step', '#slNextStep', 'ActionPercent');
                //Fill_SelectInputAfterLoadData(d[1], 'ID', 'Name', 'Select Sales Rep', '#slFollowUpSalesRep', 'WHERE IsSalesman=1');
                Fill_SelectInputAfterLoadData(d[2], 'ID', 'Name', 'select statue', '#slstatue', '');
                $('#txtActionDate').val(getTodaysDateInddMMyyyyFormat());
                $('#txtNextStepDate').val(getTodaysDateInddMMyyyyFormat());
                //  Fill_SelectInputAfterLoadData(JSON.parse(r.d[1]), 'ID', 'Name', 'All Sources', '#slSource_Search', '');
                FadePageCover(false);
                if (DblClicked == 0)
                {
                    if ($('#tblCRM_FollowUp tbody tr').length == 0) {
                        $("#slActionType option[actionorder='1']").prop('selected', true);
                        $("#slNextStep option[actionorder='2']").prop('selected', true);
                    }
                    else {
                        $($('#tblCRM_FollowUp tbody tr')[0]).find('td.ActionPercent').attr('val')
                        var _ActionType_ID = $($('#tblCRM_FollowUp tbody tr')[0]).find('td.ActionPercentID').attr('val')
                        var _NextStepID = $($('#tblCRM_FollowUp tbody tr')[0]).find('td.NextActionPercentID').attr('val')

                        if (_NextStepID == "0") {
                            $("#slActionType option[actionorder='" + parseInt(parseInt(_ActionType_ID) + 1) + "']").attr("selected", "selected");
                            $("#slNextStep option[actionorder='" + parseInt(parseInt(_ActionType_ID) + 2) + "']").attr("selected", "selected");

                            $("#slActionType").val($("#slActionType option[actionorder='" + parseInt(parseInt(_ActionType_ID) + 1) + "']").attr('value'))
                            $("#slNextStep").val($("#slNextStep option[actionorder='" + parseInt(parseInt(_ActionType_ID) + 2) + "']").attr('value'))
                        }
                        else {
                            $("#slActionType option[actionorder='" + parseInt(parseInt(_ActionType_ID) + 1) + "']").attr("selected", "selected");
                            $("#slNextStep option[actionorder='" + parseInt(parseInt(_NextStepID) + 2) + "']").attr("selected", "selected");

                            $("#slActionType").val($("#slActionType option[actionorder='" + parseInt(parseInt(_ActionType_ID) + 1) + "']").attr('value'))
                            $("#slNextStep").val($("#slNextStep option[actionorder='" + parseInt(parseInt(_NextStepID) + 2) + "']").attr('value'))
                        }
                        if ($('#slActionType').val() == null)
                            $('#slActionType').val(0)
                        if ($('#slNextStep').val() == null)
                            $('#slNextStep').val(0)
                    }
                }
                if (callback != null && callback != undefined) {
                    callback();//sherif: loads countries.js or any.js  
                }
            },
            error: function (jqXHR, exception) {
                debugger;
                swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
                FadePageCover(false);
            }
        });
    }
    else
    {
        if (callback != null && callback != undefined)
        {
            callback();//sherif: loads countries.js or any.js  
        }
        if (DblClicked == 0)
        {
            if ($('#tblCRM_FollowUp tbody tr').length == 0) {
                $("#slActionType option[actionorder='1']").prop('selected', true);
                $("#slNextStep option[actionorder='2']").prop('selected', true);
            }
            else {
                $($('#tblCRM_FollowUp tbody tr')[0]).find('td.ActionPercent').attr('val')
                var _ActionType_ID = $($('#tblCRM_FollowUp tbody tr')[0]).find('td.ActionPercentID').attr('val')
                var _NextStepID = $($('#tblCRM_FollowUp tbody tr')[0]).find('td.NextActionPercentID').attr('val')

                if (_NextStepID == "0") {
                    $("#slActionType option[actionorder='" + parseInt(parseInt(_ActionType_ID) + 1) + "']").attr("selected", "selected");
                    $("#slNextStep option[actionorder='" + parseInt(parseInt(_ActionType_ID) + 2) + "']").attr("selected", "selected");

                    $("#slActionType").val($("#slActionType option[actionorder='" + parseInt(parseInt(_ActionType_ID) + 1) + "']").attr('value'))
                    $("#slNextStep").val($("#slNextStep option[actionorder='" + parseInt(parseInt(_ActionType_ID) + 2) + "']").attr('value'))
                }
                else {
                    $("#slActionType option[actionorder='" + parseInt(parseInt(_ActionType_ID) + 1) + "']").attr("selected", "selected");
                    $("#slNextStep option[actionorder='" + parseInt(parseInt(_NextStepID) + 2) + "']").attr("selected", "selected");

                    $("#slActionType").val($("#slActionType option[actionorder='" + parseInt(parseInt(_ActionType_ID) + 1) + "']").attr('value'))
                    $("#slNextStep").val($("#slNextStep option[actionorder='" + parseInt(parseInt(_NextStepID) + 2) + "']").attr('value'))
                }
                if ($('#slActionType').val() == null)
                    $('#slActionType').val(0)
                if ($('#slNextStep').val() == null)
                    $('#slNextStep').val(0)
            }
        }
    }

}
//########################################## Action Details ##########################################################################################################
function CRM_ActionDetails_LoadingWithPaging(ID) {
    debugger;
    jQuery("#CRM_ActionDetailstblModal").modal("show");
    var FollowUpID = ID;
    $('#hdetails').val(ID);
    //  var pWhereClause = $('#FollowUpSqlQuery').val() + ' AND CRM_ClientID = ' + ClientID;


    //  if (pWhereClause == ' AND CRM_ClientID = ' + ClientID) {
    var pWhereClause = "Where  CRM_FollowID = " + FollowUpID;

    //   }


    console.log("FollowUp WHHHHHHH" + pWhereClause);
    //LoadWithPagingWithWhereClause(pDivPagerName, pSelectPageSizeName, pSpnFirstPageRowName, pSpnLastPageRowName, pSpnTotalCountName, pDivTextTotalModal, "api/Quotations/LoadWithWhereClause", pWhereClause, pPageNo, $('#' + pSelectPageSizeName).val().trim(), function (pTabelRows) {
    //    var parm = [pTabelRows];
    //    var runFunction = window[strBindTableRowsFunctionName];
    //    if (typeof runFunction === "function") runFunction.apply(null, parm);
    //});


    var pOrderBy = " ID DESC ";
    var pControllerParameters = { pPageNumber: 1, pPageSize: $("#select-page-size1 option:selected").text(), pWhereClause: pWhereClause }
    LoadWithPagingWithWhereClauseAndOrderBy("div-Pager3", "select-page-size3", "spn-first-page-row3", "spn-last-page-row3", "spn-total-count3", "div-Text-Total3", "api/CRM_ActionDetails/LoadWithPagingWithWhereClause", pWhereClause, 'ID', 1, 10
        , function (pData) {
            //  console.log(pData[0]);
            CRM_ActionDetails_BindTableRows(JSON.parse(pData[0]));



        });


    //  HighlightText("#tblOperations>tbody>tr", $("#txt-Search").val().trim());
}
function CRM_ActionDetails_ClearAllForm() {
    ClearAll("#CRM_ActionDetailsModal", null);
    $("#btnSave3").attr("onclick", "CRM_ActionDetails_Insert(false);");
    $("#btnSaveandNew3").attr("onclick", "CRM_ActionDetails_Insert(true);");
}
function CRM_ActionDetails_BindTableRows(CRM_ActionDetails) {
    debugger;
    $("#hl-menu-CRM").parent().addClass("active");
    ClearAllTableRows("tblCRM_ActionDetails");
    $.each(CRM_ActionDetails, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblCRM_ActionDetails",
            ("<tr ID='" + item.ID + "' ondblclick='CRM_ActionDetails_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Location' val='" + item.Location + "'>" + item.Location + "</td>"
                + "<td class='About' val='" + item.About + "'>" + item.About + "</td>"
                + "<td class='Results' val='" + item.Results + "'>" + item.Results + "</td>"
                + "<td style='text-align:left; white-space:pre-wrap; word-wrap:break-word;!important;' class='ActionDetailsNotes' val='" + item.Note + "'>" + item.Note + "</td>"
                //+ "<td class='HasDetails'> <input type='checkbox' disabled='disabled' val='" + (item.HasDetails == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='hCRM_Clients3'><a href='#CRM_ClientsModal' data-toggle='modal' onclick='CRM_ActionDetails_EditByDblClick(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));

    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCRM_ActionDetails", "ID_CRM_ActionDetails", "ID_CRM_ActionDetails");
    CheckAllCheckbox("ID_CRM_ActionDetails");
    // HighlightText("#tblCRM_ActionDetails>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function CRM_ActionDetails_EditByDblClick(pID) {
    jQuery("#CRM_ActionDetailsModal").modal("show");
    //  CRM_ActionDetails_FillSearchData();
    CRM_ActionDetails_FillControls(pID);
}
function CRM_ActionDetails_FillControls(pID) {
    debugger;

    ClearAll("#CRM_ActionDetailsModal", null);

    $("#hID3").val(pID);
    var tr = $("tr[ID='" + pID + "']");
    $("#txtLocation").val($(tr).find("td.Location").attr('val'));
    $("#txtAbout").val($(tr).find("td.About").attr('val'));
    $("#txtResults").val($(tr).find("td.Results").attr('val'));
    $("#txtActionDetailsNotes").val($(tr).find("td.ActionDetailsNotes").attr('val'));

    $("#btnSave3").attr("onclick", "CRM_ActionDetails_Update(false);");
    $("#btnSaveandNew3").attr("onclick", "CRM_ActionDetails_Update(true);");
}
function CRM_ActionDetails_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/CRM_ActionDetails/Insert", {
        pAbout: $("#txtAbout").val(),
        pLocation: $("#txtLocation").val(),
        pResults: $("#txtResults").val(),
        pNote: $("#txtActionDetailsNotes").val(),
        pFollowUpID: $('#hdetails').val()
    }, pSaveandAddNew, 'CRM_ActionDetailsModal', function () {
        CRM_ActionDetails_LoadingWithPaging($('#hdetails').val());
        //   $("#btnSave1").attr("onclick", "CRM_ActionDetails_Update(false);");
        //   $("#btnSaveandNew1").attr("onclick", "CRM_ActionDetails_Update(true);");
        // $('.non_basic').removeClass('hide');
    });
}
// calling this function for update
function CRM_ActionDetails_Update(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/CRM_ActionDetails/Update", {
        pID: $("#hID3").val(),
        pAbout: $("#txtAbout").val(),
        pLocation: $("#txtLocation").val(),
        pResults: $("#txtResults").val(),
        pNote: $("#txtActionDetailsNotes").val(),
        pFollowUpID: $('#hdetails').val()
    }, pSaveandAddNew, 'CRM_ActionDetailsModal', function () {
        CRM_ActionDetails_LoadingWithPaging($('#hdetails').val());
        //   $("#btnSave1").attr("onclick", "CRM_ActionDetails_Update(false);");
        //   $("#btnSaveandNew1").attr("onclick", "CRM_ActionDetails_Update(true);");
        // $('.non_basic').removeClass('hide');
    });
}
function CRM_ActionDetails_Delete(pID) {
    DeleteListFunction("/api/CRM_ActionDetails/DeleteByID", { "pID": pID }, function () { CRM_ActionDetails_LoadingWithPaging($('#hdetails').val()) });
}
function CRM_ActionDetails_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCRM_ActionDetails') != "")
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
                DeleteListFunction("/api/CRM_ActionDetails/Delete", { "pCRM_ActionDetailsIDs": GetAllSelectedIDsAsString('tblCRM_ActionDetails') }, function () { CRM_ActionDetails_LoadingWithPaging($('#hdetails').val()); });
            });
    //DeleteListFunction("/api/CRM_Clients/Delete", { "pCRM_ClientsIDs": GetAllSelectedIDsAsString('tblCRM_Clients') }, function () { CRM_Clients_LoadingWithPaging(); });
}
/**********************************Send Alarm**************************************/
function CRM_FollowUp_SendQuotationAlarm() {
    debugger;
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pSelectedItemsIDs == "")
        swal("Sorry", "You have to select at least one receptionist.");
    else { //send
        FadePageCover(true);
        var pParametersWithValues = {
            pUserIDs: pSelectedItemsIDs
            , pSubject: "Send Quotation to " + $("#txtCOEnName").val()
            , pBody: "Please, Send quotation to Sales Lead (" + $("#txtCOEnName").val() + " on " + $("#txtActionDate").val() + ").\n" + "Notes: " + $("#txtFollowUpNote").val().toUpperCase()
            , pQuotationRouteID: 0
            , pPricingID: 0
            , pRequestOrReply: 0
            , pIsAlarm: true
            , pParentID: 0
            , pEmailSource: 0
            , pIsSendNormalEmail: false
            //LoadWithPaging parameters
            , pWhereClauseForLoadWithPaging: "WHERE 1=0"
            , pPageSize: 10 //$("#select-page-size").val()
            //pPageNumber is 1 coz its insert so it will be on the top
            , pPageNumber: 1 //$("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text() 
            , pOrderBy: "ID DESC"
            , pSenderUserID: pLoggedUser.ID
        };
        CallGETFunctionWithParameters("/api/LocalEmails/SendEmail", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    jQuery("#CheckboxesListModal").modal("hide");
                    jQuery("#LocalEmailsModal").modal("hide");
                    swal("Success", "Sent Successfully.");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}

/**********************************Add Service**************************************/

function CRM_Services_LoadingWithPaging() {
    debugger;
    var ClientID = $('#hID').val();
    var pWhereClause = ' Where ClientsID = ' + ClientID;

    if (pWhereClause == ' AND CRM_ClientsID = ' + ClientID) {
        pWhereClause = "Where  CRM_ClientsID = " + ClientID;
    }
    else {
        pWhereClause = pWhereClause.replace("Where AND", "Where ");
    }

    console.log("Contact Person WHHHHHHH" + pWhereClause);
    var pOrderBy = " ID DESC ";
    var pControllerParameters = { pPageNumber: 1, pPageSize: $("#select-page-size1 option:selected").text(), pWhereClause: pWhereClause }
    LoadWithPagingWithWhereClauseAndOrderBy("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", "api/CRM_Services/LoadWithPagingWithWhereClause", pWhereClause, 'ID', 1, 10
        , function (pData) {
            CRM_Services_BindTableRows(JSON.parse(pData[0]));
        });

}
function CRM_Services_ClearAllForm() {
    ClearAll("#CRM_ServicesModal", null);
    $("#btnSave1").attr("onclick", "CRM_Services_Save(false);");
    $("#btnSaveandNew1").attr("onclick", "CRM_Services_Save(true);");
}
function CRM_Services_BindTableRows(CRM_Services) {
    debugger;
    $("#hl-menu-CRM").parent().addClass("active");
    ClearAllTableRows("tblCRM_Services");
    $.each(CRM_Services, function (i, item) {
        debugger;
        AppendRowtoTable("tblCRM_Services",
            ("<tr ID='" + item.ID + "' ondblclick='CRM_Services_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID_CRM_Services'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='CommodityID' val='" + item.CommodityID + "'>" + item.CommodityName + "</td>"
                + "<td class='ActivityID' val='" + item.ActivityID + "'>" + item.ActivityName + "</td>"
                + "<td class='EquipmentID' val='" + item.EquipmentID + "'>" + item.EquipmentName + "</td>"
                + "<td class='PickUpCountryID' val='" + item.PickUpCountryID + "'>" + item.PickUpCountryName + "</td>"
                + "<td class='PickUpPortID hide' val='" + item.PickUpPortID + "'>" + item.PickUpPortName + "</td>"
                + "<td class='PickUpAddress hide' val='" + item.PickUpAddress + "'>" + item.PickUpAddress + "</td>"
                + "<td class='DeliveryCountryID' val='" + item.DeliveryCountryID + "'>" + item.DeliveryCountryName + "</td>"
                + "<td class='DeliveryPortID hide' val='" + item.DeliveryPortID + "'>" + item.DeliveryPortName + "</td>"
                + "<td class='DeliveryAddress hide' val='" + item.DeliveryAddress + "'>" + item.DeliveryAddress + "</td>"
                + "<td class='ShipmentWeight hide' val='" + item.ShipmentWeight + "'>" + item.ShipmentWeight + "</td>"
                + "<td class='ShipmentCBM hide' val='" + item.ShipmentCBM + "'>" + item.ShipmentCBM + "</td>"
                + "<td class='ClientsID hide' val='" + item.ClientsID + "'>" + item.ClientName + "</td>"
                + "</tr>"));
                //+ "<td class='hCRM_Clients'><a href='#CRM_ServicesModal' data-toggle='modal' onclick='CRM_Services_EditByDblClick(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        //CommodityID, CommodityName, ActivityID, ActivityName, EquipmentID, EquipmentName, PickUpCountryID, PickUpCountryName, PickUpPortID, PickUpPortName, PickUpAddress,
        //       DeliveryCountryID, DeliveryCountryName, DeliveryPortID, DeliveryPortName, DeliveryAddress, ClientsID, ClientName
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCRM_Services", "ID_CRM_Services", "ID_CRM_Services");
    CheckAllCheckbox("ID_CRM_Services");
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function CRM_Services_EditByDblClick(pID) {
    $('#slFromPort').html($('#slPorts').html());
    $('#slToPort').html($('#slPorts').html());
    jQuery("#CRM_ServicesModal").modal("show");
    CRM_Services_FillControls(pID);
}
function CRM_Services_FillControls(pID) {
    debugger;
    ClearAll("#CRM_ServicesModal", null);
    $("#hIDService").val(pID);
    var tr = $("tr[ID='" + pID + "']");
    $("#slCommodity").val(parseInt($(tr).find("td.CommodityID").attr('val')) == 0 ? "" : parseInt($(tr).find("td.CommodityID").attr('val')));
    $("#slContainerType").val(parseInt($(tr).find("td.EquipmentID").attr('val')) == 0 ? "" : parseInt($(tr).find("td.EquipmentID").attr('val')));
    $("#slActivity").val(parseInt($(tr).find("td.ActivityID").attr('val')) == 0 ? "" : parseInt($(tr).find("td.ActivityID").attr('val')));
    //GetPickupPorts();
    //GetDeliveryPorts();
    $("#slFromCountry").val(parseInt($(tr).find("td.PickUpCountryID").attr('val')) == 0 ? "" : parseInt($(tr).find("td.PickUpCountryID").attr('val')));
    $("#slFromPort").val(parseInt($(tr).find("td.PickUpPortID").attr('val')) == 0 ? "" : parseInt($(tr).find("td.PickUpPortID").attr('val')));
    $("#txtPickUpAddress").val($(tr).find("td.PickUpAddress").attr('val'));
    $("#slToCountry").val(parseInt($(tr).find("td.DeliveryCountryID").attr('val')) == 0 ? "" : parseInt($(tr).find("td.DeliveryCountryID").attr('val')));
    $('#slToPort').val(parseInt($(tr).find("td.DeliveryPortID").attr('val')) == 0 ? "" : parseInt($(tr).find("td.DeliveryPortID").attr('val')));
    $('#txtDeliveryAddress').val($(tr).find("td.DeliveryAddress").attr('val'));
    $('#txtShipmentWeight').val($(tr).find("td.ShipmentWeight").attr('val'));
    $('#txtShipmentCBM').val($(tr).find("td.ShipmentCBM").attr('val'));

    //$("#btnSave1").attr("onclick", "CRM_Services_Update(false);");
    //$("#btnSaveandNew1").attr("onclick", "CRM_Services_Update(true);");
}
function CRM_Services_Save(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/CRM_Services/SaveService", {
        pCommodityID: $('#slCommodity').val() == "" ? 0 : $('#slCommodity').val(),
        pActivityID: $('#slActivity').val() == "" ? 0 : $('#slActivity').val(),
        pEquipmentID: $('#slContainerType').val() == "" ? 0 : $('#slContainerType').val(),
        pPickUpCountryID: $('#slFromCountry').val() == "" ? 0 : $('#slFromCountry').val(),
        pPickUpPortID: $('#slFromPort').val() == "" ? 0 : $('#slFromPort').val(),
        pPickUpAddress: $('#txtPickUpAddress').val() == "" ? 0 : $('#txtPickUpAddress').val(),
        pDeliveryCountryID: $('#slToCountry').val() == "" ? 0 : $('#slToCountry').val(),
        pDeliveryPortID: $('#slToPort').val() == "" ? 0 : $('#slToPort').val(),
        pDeliveryAddress: $('#txtDeliveryAddress').val() == "" ? 0 : $('#txtDeliveryAddress').val(),
        pShipmentWeight: $('#txtShipmentWeight').val() == "" ? 0 : $('#txtShipmentWeight').val(),
        pShipmentCBM: $('#txtShipmentCBM').val() == "" ? 0 : $('#txtShipmentCBM').val(),
        pServiceID: $('#hIDService').val() == "" ? 0 : $('#hIDService').val(),
        pClientID: $('#hID').val()
    }, pSaveandAddNew, 'CRM_ServicesModal', function () {
        CRM_Services_LoadingWithPaging();
    });
}
function CRM_Services_Delete(pID) {
    DeleteListFunction("/api/CRM_Services/DeleteByID", { "pID": pID }, function () { CRM_Services_LoadingWithPaging(); });
}
function CRM_Services_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCRM_Services') != "")
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
                DeleteListFunction("/api/CRM_Services/Delete", { "pCRM_ServicesIDs": GetAllSelectedIDsAsString('tblCRM_Services') }, function () { CRM_Services_LoadingWithPaging(); });
            });
}
function GetPickupPorts()
{
    debugger;
    var pParametersWithValues = {
        pCountryID: $('#slFromCountry').val()
    }
    CallGETFunctionWithParameters("/api/CRM_Services/GetPorts", pParametersWithValues
          , function (pData) {
              FillListFromObject(null, 2, "<--Select-->", "slFromPort", pData[0], null);
          }, null);
}
function GetDeliveryPorts() {
    debugger;
    var pParametersWithValues = {
        pCountryID: $('#slToCountry').val()
    }
    CallGETFunctionWithParameters("/api/CRM_Services/GetPorts", pParametersWithValues
          , function (pData) {
              FillListFromObject(null, 2, "<--Select-->", "slToPort", pData[0], null);
          }, null);
}
function Operations_InsertFromOperations(pControlID) {
    debugger;
    ClearAll("#InsertFromServicesModal");
    //$("#btnSaveMasterDataFromOperations").attr("onclick", "Operations_SaveMasterDataFromOperations('" + pControlID + "');");
    jQuery("#InsertFromServicesModal").modal("show");
}

function SaveServicePort(pControlID) {
    debugger;
    if (ValidateForm("form", "InsertFromServicesModal")) {
        FadePageCover(true);
        var pParameters = {};
        var pStrFunctionName = "";
        if (true)
        {//pControlID == "slPOL" || pControlID == "slPOD") {
            pStrFunctionName = "/api/Ports/InsertFromServices";
            pParameters = {
                pCodeFromOperations: $("#txtCodeFromServices").val().trim() == "" ? 0 : $("#txtCodeFromServices").val().trim().toUpperCase()
                , pNameFromOperations: $("#txtNameFromServices").val().trim() == "" ? 0 : $("#txtNameFromServices").val().trim().toUpperCase()
                , pLocalNameFromOperations: $("#txtLocalNameFromServices").val().trim() == "" ? 0 : $("#txtLocalNameFromServices").val().trim().toUpperCase()
                , pCountryIDFromOperations: $("#slCountryServices").val() == "" ? 0 : $("#slCountryServices").val()
            };
        }
        else
            pParameters = {
                pCodeFromOperations: $("#txtCodeFromOperations").val().trim() == "" ? 0 : $("#txtCodeFromOperations").val().trim().toUpperCase()
                , pNameFromOperations: $("#txtNameFromOperations").val().trim() == "" ? 0 : $("#txtNameFromOperations").val().trim().toUpperCase()
                , pLocalNameFromOperations: $("#txtLocalNameFromOperations").val().trim() == "" ? 0 : $("#txtLocalNameFromOperations").val().trim().toUpperCase()
            };
        //if (pControlID == "slOperationVessels")
        //    pStrFunctionName = "/api/Vessels/InsertFromServices";
       
        pStrFunctionName = "/api/Ports/InsertFromOpertions";
        CallGETFunctionWithParameters(pStrFunctionName, pParameters
            , function (pData) {
                var _MessageReturned = pData[0];
                var _InsertedID = pData[1];
                var _ReturnedList = pData[2];
                if (_MessageReturned != "")
                    swal("Sorry", _MessageReturned);
                else {
                    if (pControlID == "slPOL" || pControlID == "slPOD") {
                        $("#" + pControlID + "Countries").val($("#slCountryServices").val());
                        FillListFromObject(_InsertedID, 4, "<--Select-->", pControlID, _ReturnedList, null);
                    }
                    else
                        FillListFromObject(_InsertedID, 2, "<--Select-->", pControlID, _ReturnedList, null);
                    jQuery("#InsertFromServicesModal").modal("hide");
                }
                FadePageCover(false);
            }
            , null);
    }
}
/**********************************Add Profit Value**************************************/

function CRM_ProfitValue_LoadingWithPaging() {
    debugger;
    var ClientID = $('#hID').val();
    var pWhereClause = ' Where ClientID = ' + ClientID;

    if (pWhereClause == ' AND CRM_ClientID = ' + ClientID) {
        pWhereClause = "Where  CRM_ClientID = " + ClientID;
    }
    else {
        pWhereClause = pWhereClause.replace("Where AND", "Where ");
    }

    console.log("Contact Person WHHHHHHH" + pWhereClause);
    var pOrderBy = " ID DESC ";
    var pControllerParameters = { pPageNumber: 1, pPageSize: $("#select-page-size1 option:selected").text(), pWhereClause: pWhereClause }
    LoadWithPagingWithWhereClauseAndOrderBy("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", "api/CRM_ProfitValue/LoadWithPagingWithWhereClause", pWhereClause, 'ID', 1, 10
        , function (pData) {
            CRM_ProfitValue_BindTableRows(JSON.parse(pData[0]));
        });

}
function CRM_ProfitValue_ClearAllForm() {
    ClearAll("#CRM_ProfitValueModal", null);
    
    $('#slCurrencyProfitValue').val(pDefaults.CurrencyID);
    $('#slCostCurrency').val(pDefaults.CurrencyID);
    $('#slRevenueCurrency').val(pDefaults.CurrencyID);
    $('#slMarginAmountCurrency').val(pDefaults.CurrencyID);
    $('#slGrossMarginCurrency').val(pDefaults.CurrencyID);

    $("#btnSave1").attr("onclick", "CRM_ProfitValue_Save(false);");
    $("#btnSaveandNew1").attr("onclick", "CRM_ProfitValue_Save(true);");
}
function CRM_ProfitValue_BindTableRows(CRM_ProfitValue) {
    debugger;
    $("#hl-menu-CRM").parent().addClass("active");
    ClearAllTableRows("tblCRM_ProfitValue");
    $.each(CRM_ProfitValue, function (i, item) {
        debugger;
        AppendRowtoTable("tblCRM_ProfitValue",
            ("<tr ID='" + item.ID + "' ondblclick='CRM_ProfitValue_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID_CRM_ProfitValue'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='PaymentTermID' val='" + item.PaymentTermID + "'>" + item.PaymentTermName + "</td>"
                + "<td class='StartingDate' >" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.StartingDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.StartingDate))) + "</td>"
                + "<td class='ExpectedClosingDate' >" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpectedClosingDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedClosingDate))) + "</td>"
                + "<td class='TradeLane' val='" + (item.TradeLane == 0 ? "" : item.TradeLane) + "'>" + (item.TradeLane == 0 ? "" : item.TradeLane) + "</td>"
                + "<td class='Competitors hide' val='" + item.Competitors + "'>" + item.Competitors + "</td>"
                + "<td class='BusinessVol' val='" + (item.BusinessVol == 0 ? "" : item.BusinessVol) + "'>" + (item.BusinessVol == 0 ? "" : item.BusinessVol) + "</td>"
                + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + item.CurrencyName + "</td>"

                + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + item.CurrencyName + "</td>" //for BusinessVol/CalVal
                + "<td class='CostCurrencyID hide' val='" + item.CostCurrencyID + "'>" + item.CostCurrencyCode + "</td>"
                + "<td class='RevenueCurrencyID hide' val='" + item.RevenueCurrencyID + "'>" + item.RevenueCurrencyCode + "</td>"
                + "<td class='MarginAmountCurrencyID hide' val='" + item.MarginAmountCurrencyID + "'>" + item.MarginAmountCurrencyCode + "</td>"
                + "<td class='GrossMarginCurrencyID hide' val='" + item.GrossMarginCurrencyID + "'>" + item.GrossMarginCurrencyCode + "</td>"


                + "<td class='Cost hide' val='" + item.Cost + "'>" + (item.Cost == 0 ?"":item.Cost) + "</td>"
                + "<td class='Revenue hide' val='" + item.Revenue + "'>" + (item.Revenue == 0 ? "" : item.Revenue) + "</td>"
                + "<td class='MarginAmount hide' val='" + item.MarginAmount + "'>" + (item.MarginAmount == 0 ? "" : item.MarginAmount) + "</td>"
                + "<td class='ClientID hide' val='" + item.ClientID + "'>" + item.ClientName + "</td>"

                + "<td class='GrossProfit hide' val='" + item.GrossProfit + "'>" + item.GrossProfit + "</td>"
                + "<td class='ProfitMargin hide' val='" + item.ProfitMargin + "'>" + item.ProfitMargin + "</td>"
                + "<td class='PipeLineStageID hide' val='" + item.PipeLineStageID + "'>" + item.PipeLineStageID + "</td>"
                + "<td class='QuotationRouteID hide' val='" + item.QuotationRouteID + "'>" + item.QuotationRouteID + "</td>"
                + "<td class='Comment hide' val='" + item.Comment + "'>" + item.Comment + "</td>"
                + "</tr>"));
        });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCRM_ProfitValue", "ID_CRM_ProfitValue", "ID_CRM_ProfitValue");
    CheckAllCheckbox("ID_CRM_ProfitValue");
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function CRM_ProfitValue_EditByDblClick(pID) {
    $('#slFromPort').html($('#slPorts').html());
    $('#slToPort').html($('#slPorts').html());
    jQuery("#CRM_ProfitValueModal").modal("show");
    CRM_ProfitValue_FillControls(pID);
}
function CRM_ProfitValue_FillControls(pID) {
    debugger;
    ClearAll("#CRM_ProfitValueModal", null);
    $("#hIDProfitValue").val(pID);
    var tr = $("tr[ID='" + pID + "']");
    
    $('#slPaymentTermProfitValue').val($(tr).find("td.PaymentTermID").attr('val'))
    if ($(tr).find("td.StartingDate").text().length > 13)
        $('#txtStartingDateProfitValue').val($(tr).find("td.StartingDate").text().substring(0, 10))
    else
        $('#txtStartingDateProfitValue').val($(tr).find("td.StartingDate").text())

    $('#txtExpectedClosingDateProfitValue').val($(tr).find("td.ExpectedClosingDate").text())
    $('#txtTradeLaneProfitValue').val($(tr).find("td.TradeLane").attr('val'))
    $('#txtCompetitorsProfitValue').val($(tr).find("td.Competitors").attr('val'))
    $('#txtBusinessVolProfitValue').val($(tr).find("td.BusinessVol").attr('val'))

    $('#slCurrencyProfitValue').val($(tr).find("td.CurrencyID").attr('val'))
    $('#slCostCurrency').val($(tr).find("td.CostCurrencyID").attr('val'))
    $('#slRevenueCurrency').val($(tr).find("td.RevenueCurrencyID").attr('val'))
    $('#slMarginAmountCurrency').val($(tr).find("td.MarginAmountCurrencyID").attr('val'))
    $('#slGrossMarginCurrency').val($(tr).find("td.GrossMarginCurrencyID").attr('val'))

    $('#txtCostProfitValue').val($(tr).find("td.Cost").attr('val'))
    $('#txtRevenueProfitValue').val($(tr).find("td.Revenue").attr('val'))
    $('#txtMarginAmount').val($(tr).find("td.MarginAmount").attr('val'))

    $('#txtGrossProfitProfitValue').val($(tr).find("td.GrossProfit").attr('val'))
    $('#txtProfitMarginProfitValue').val($(tr).find("td.ProfitMargin").attr('val'))
    $('#slPipeLineStageProfitValue').val(parseInt($(tr).find("td.PipeLineStageID").attr('val')) == 0 ? "" : parseInt($(tr).find("td.PipeLineStageID").attr('val')))
    $('#slQuotationRoute').val(parseInt($(tr).find("td.QuotationRouteID").attr('val')) == 0 ? "" : parseInt($(tr).find("td.QuotationRouteID").attr('val')))
    $('#txtCommentProfitValue').val($(tr).find("td.Comment").attr('val'))
}
function CRM_ProfitValue_Save(pSaveandAddNew) {
    debugger;
    if ($("#txtExpectedClosingDateProfitValue").val().length > 2 && Date.prototype.compareDates(ConvertDateFormat($("#txtStartingDateProfitValue").val().trim()), ConvertDateFormat($("#txtExpectedClosingDateProfitValue").val().trim())) < 0) {
        swal(strSorry, "Close date must be after start date.");
        FadePageCover(false);
    }
    else
    InsertUpdateFunction("form", "/api/CRM_ProfitValue/SaveProfitValue", {
        pID: $('#hIDProfitValue').val() == "" ? 0 : $('#hIDProfitValue').val(),
        pClientID: $("#hID").val(),
        pPaymentTermID: $('#slPaymentTermProfitValue').val() == "" ? 0 : $('#slPaymentTermProfitValue').val(),
        pStartingDate: $('#txtStartingDateProfitValue').val() == "" ? "01/01/1900" : ConvertDateFormat($('#txtStartingDateProfitValue').val()),
        pExpectedClosingDate: $('#txtExpectedClosingDateProfitValue').val() == "" ? "01/01/1900" : ConvertDateFormat($('#txtExpectedClosingDateProfitValue').val()),
        pTradeLane: $('#txtTradeLaneProfitValue').val() == "" ? 0 : $('#txtTradeLaneProfitValue').val(),
        pCompetitors: $('#txtCompetitorsProfitValue').val() == "" ? 0 : $('#txtCompetitorsProfitValue').val(),
        pBusinessVol: $('#txtBusinessVolProfitValue').val() == "" ? 0 : $('#txtBusinessVolProfitValue').val(),

        pCurrencyID: $('#slCurrencyProfitValue').val() == "" ? 0 : $('#slCurrencyProfitValue').val(),
        pCostCurrencyID: $('#slCostCurrency').val() == "" ? 0 : $('#slCostCurrency').val(),
        pRevenueCurrencyID: $('#slCostCurrency').val() == "" ? 0 : $('#slCostCurrency').val(),
        pMarginAmountCurrencyID: $('#slMarginAmountCurrency').val() == "" ? 0 : $('#slMarginAmountCurrency').val(),
        pGrossMarginCurrencyID: $('#slGrossMarginCurrency').val() == "" ? 0 : $('#slGrossMarginCurrency').val(),

        pCost: $('#txtCostProfitValue').val() == "" ? 0 : $('#txtCostProfitValue').val(),
        pRevenue: $('#txtRevenueProfitValue').val() == "" ? 0 : $('#txtRevenueProfitValue').val(),
        pMarginAmount: $('#txtMarginAmount').val() == "" ? 0 : $('#txtMarginAmount').val(),
        pGrossProfit: $('#txtGrossProfitProfitValue').val() == "" ? 0 : $('#txtGrossProfitProfitValue').val(),
        pProfitMargin: $('#txtProfitMarginProfitValue').val() == "" ? 0 : $('#txtProfitMarginProfitValue').val(),
        pPipeLineStage: $('#slPipeLineStageProfitValue').val() == "" ? 0 : $('#slPipeLineStageProfitValue').val(),
        pComment: $('#txtCommentProfitValue').val() == "" ? 0 : $('#txtCommentProfitValue').val()//,
    //    pContainerTypeID: $('#slContainerTypeProfitValue').val() == "" || $('#slContainerTypeProfitValue').val() == null ? 0 : $('#slContainerTypeProfitValue').val(),
    //pPerPeriodID: $('#slPerPeriodProfitValue').val() == "" ? 0 : $('#slPerPeriodProfitValue').val(), 
    //pQuotationRouteID: $('#slQuotationRoute').val() == "" || $('#slQuotationRoute').val() == null ? 0 : $('#slQuotationRoute').val()        

    }, pSaveandAddNew, 'CRM_ProfitValueModal', function () {
        CRM_ProfitValue_LoadingWithPaging();
    });
}
function CRM_ProfitValue_Delete(pID) {
    DeleteListFunction("/api/CRM_ProfitValue/Delete", { "pID": pID }, function () { CRM_ProfitValue_LoadingWithPaging(); });
}
function CRM_ProfitValue_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCRM_ProfitValue') != "")
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
                DeleteListFunction("/api/CRM_ProfitValue/Delete", { "pCRM_ProfitValueIDs": GetAllSelectedIDsAsString('tblCRM_ProfitValue') }, function () { CRM_ProfitValue_LoadingWithPaging(); });
            });
}
function GetPickupPorts() {
    debugger;
    var pParametersWithValues = {
        pCountryID: $('#slFromCountry').val()
    }
    CallGETFunctionWithParameters("/api/CRM_ProfitValue/GetPorts", pParametersWithValues
          , function (pData) {
              FillListFromObject(null, 2, "<--Select-->", "slFromPort", pData[0], null);
          }, null);
}
function GetDeliveryPorts() {
    debugger;
    var pParametersWithValues = {
        pCountryID: $('#slToCountry').val()
    }
    CallGETFunctionWithParameters("/api/CRM_ProfitValue/GetPorts", pParametersWithValues
          , function (pData) {
              FillListFromObject(null, 2, "<--Select-->", "slToPort", pData[0], null);
          }, null);
}

function GetEquipmentsByActivity()
{
    debugger;
    var pParametersWithValues = {
        pActivityID: $('#slActivity').val()
    }
    CallGETFunctionWithParameters("/api/CRM_Clients/GetEquipmentsByActivity", pParametersWithValues
          , function (pData) {
              debugger;
              var ActivityID = $('#slActivity').val()
              if(ActivityID == 10)//Air Freight
              {
                  FillListFromObject(null, 2, "<--Select-->", "slContainerType", pData[1], null);
              }
              else if (ActivityID == 60) {//Break Bulk
                  FillListFromObject(null, 2, "<--Select-->", "slContainerType", pData[0], null);
              }
              else if (ActivityID == 40) {//Customs Clearance
                  FillListFromObject(null, 2, "<--Select-->", "slContainerType", pData[0], null);
              }
              else if (ActivityID == 70) {//Distribution
                  FillListFromObject(null, 2, "<--Select-->", "slContainerType", pData[0], null);
              }
              else if (ActivityID == 20) {//Ocean Freight
                  FillListFromObject(null, 2, "<--Select-->", "slContainerType", pData[0], null);
              }
              else if (ActivityID == 50) {//RORO
                  FillListFromObject(null, 2, "<--Select-->", "slContainerType", pData[0], null);
              }
              else if (ActivityID == 30) {//Trucking    
                  FillListFromObject(null, 2, "<--Select-->", "slContainerType", pData[2], null);
              }
              else if (ActivityID == 80) {//Warehousing 
                  FillListFromObject(null, 2, "<--Select-->", "slContainerType", pData[0], null);
              }

          }, null);
}

function FillQuotationData()
{
    debugger;
    //$("#slSalesLead").html($("#slSalesLead").html())
    //$("#slQuotationSalesman").html($("#slSalesRep").html())
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var TodaysDate =
        (day < 10 ? '0' : '') + day + '/' +
        (month < 10 ? '0' : '') + month + '/' +
        d.getFullYear();
    $("#txtOpenDate").val(TodaysDate)
    $("#slSalesLead").val($("#hID").val())
    $('#slQuotationSalesman').val($("#slSalesRep").val())
    
}

function Quotations_Insert(pSaveandAddNew) {
    debugger;
    var TodaysDate = new Date();
    $("#slShippers").removeClass("validation-error");
    $("#slAgents").removeClass("validation-error");
    $("#slConsignees").removeClass("validation-error");
    var CurrentYear = TodaysDate.getUTCFullYear();
    if ($("#slSalesLead").val() != "") {
        $("#slShippers").attr("data-required", "false");
        $("#slAgents").attr("data-required", "false");
        $("#slConsignees").attr("data-required", "false");
    }
    else
        DirectionType_SetIconNameAndStyle();
    var data = {
        "pCodeSerial": 0 /*generated automatically*/,
        "pCode": "Q" + (CurrentYear - 2000) + GetDirectionType($('input[name=cbDirectionType]:checked').val()).substring(0, 3)
                     + GetTransportType($('input[name=cbTransportType]:checked').val()).substring(0, 2),
        "pBranchID": $('#slQuotationBranch').val(),
        "pSalesmanID": $('#slQuotationSalesman').val(),//$('#slSalesRep').val(),
        "pDirectionType": $('input[name=cbDirectionType]:checked').val(),
        "pDirectionIconName": $("#hDirectionIconName").val(),
        "pDirectionIconStyle": $("#hDirectionIconStyle").val(),
        "pTransportType": $('input[name=cbTransportType]:checked').val(),
        "pTransportIconName": $("#hTransportIconName").val(),
        "pTransportIconStyle": $("#hTransportIconStyle").val(),
        "pShipmentType": ($('input[name=cbTransportType]:checked').val() == 2 ? 0 : $('input[name=cbShipmentType]:checked').val()),
        "pShipperID": 0,//($('#slShippers').val() == "" ? 0 : $('#slShippers').val()),
        "pShipperAddressID": 0,
        "pShipperContactID": 0,
        "pConsigneeID": 0,//($('#slConsignees').val() == "" ? 0 : $('#slConsignees').val()),
        "pConsigneeAddressID": 0,
        "pConsigneeContactID": 0,
        "pAgentID": ($('#slAgents').val() == "" ? 0 : $('#slAgents').val()),
        "pAgentAddressID": 0,
        "pAgentContactID": 0,
        "pCustomerID": 0, //($('#slShippers').val() == "" ? 0 : $('#slShippers').val()),
        "pCustomerContactID": 0,
        "pIncotermID": 0,
        "pCommodityID": 0,
        "pTransientTime": 0,
        "pValidity": 0,
        "pFreeTime": 0,
        "pOpenDate": ($("#txtOpenDate").val() == ""? "01/01/1900":ConvertDateFormat($("#txtOpenDate").val().trim())),
        "pCloseDate": "01/01/1900",
        //"pExpirationDate": varExpirationDate,
        "pExpirationDate": "01-01-1900", //ConvertDateFormat(varExpirationDate),
        "pIncludePickup": false,
        "pPickupCityID": 0,
        "pPickupAddressID": 0,
        "pPOLCountryID": 0, //$('#slPOLCountries option:selected').val(),
        "pPOL": 0, //$('#slPOL option:selected').val(),
        "pPODCountryID": 0, //$('#slPODCountries option:selected').val(),
        "pPOD": 0, //$('#slPOD option:selected').val(),
        "pShippingLineID": 0, //($('input[name=cbTransportType]:checked').val() == 1 ? ($('#slLines option:selected').val() == "" ? 0 : $('#slLines option:selected').val()) : 0),
        "pAirlineID": 0, //($('input[name=cbTransportType]:checked').val() == 2 ? ($('#slLines option:selected').val() == "" ? 0 : $('#slLines option:selected').val()) : 0),
        "pTruckerID": 0, //($('input[name=cbTransportType]:checked').val() == 3 ? ($('#slLines option:selected').val() == "" ? 0 : $('#slLines option:selected').val()) : 0),
        "pIncludeDelivery": false,
        "pDeliveryZipCode": 0,
        "pDeliveryCityID": 0,
        "pDeliveryCountryID": 0,
        "pGrossWeight": 0,
        "pVolume": 0,
        "pChargeableWeight": 0,
        "pNumberOfPackages": 0,
        "pIsDangerousGoods": $("#cbDangerousGoods").prop("checked"),
        "pDescriptionOfGoods": $("#divGoodsDescription").val().trim().toUpperCase(),
        "pNotes": "",
        "pQuotationStageID": 1, //this means Created
        "pSalesLeadID": $("#slSalesLead").val() == "" ? 0 : $("#slSalesLead").val(),
        "pIsWarehousing": false,//$("#cbIsWarehousing").prop("checked"),
        "pMainCriteriaID": 0,
        "pSubCriteriaID": 0,
        "pIsFleet": false,
        "pTemplateID": 0,
        "pSubject": 0,
        "pTermsAndConditions": 0
    };
    PostInsertUpdateFunction("form", "/api/Quotations/Insert", data, pSaveandAddNew, "QuotationModal",
        function (data) {
            //SwitchToQuotationsEditView(data[1]); /*data[1] is the pID*/
        });
    //}
}


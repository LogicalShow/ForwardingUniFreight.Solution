let salesmenIDs = "";
let ReportType = "";
function CRM_Statistics_Initialize() {
    CallGETFunctionWithParameters("/api/CRMStatistics/FillFilter",null,function(d){
        Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', '<-- All -->', '#slSource', '');
        let users = JSON.parse(d[1]);
        $(users).each(function (i, user) {
            $('#ul_Salesman').append("<li><input checked class='cbItem' type='checkbox' ID='" + user.ID + "' /><b>&nbsp;" + user.Name + "</b></li>");
        })
        },()=>{
            FadePageCover(false);
            $("#hl-menu-CRM").parent().addClass("active");
            $("#txtFromDate").val(getTodaysDateInddMMyyyyFormat());
            $("#txtToDate").val(getTodaysDateInddMMyyyyFormat());
        }
    );
}

function CRMStatistics_Print(pOutputTo) 
{
    debugger;
    let pWhereClause = CRMStatistics_GetFilterWhereClause();
    if (validationCheck()) {
        switch ($("#slReportName").val()) {
            case "1":
                FastReport_Print("Rep_CRM_StagesPerSalesPerson", pWhereClause, pOutputTo);
                break;
            case "2":
                FastReport_Print("Rep_CRM_StagesReport", pWhereClause, pOutputTo);
                break;
            case "3":
                FastReport_Print("Rep_CRM_PipelineReport", pWhereClause, pOutputTo);
                break;
            case "4":
                FastReport_Print("Rep_CRM_StageStatusReport", pWhereClause, pOutputTo);
                break;
            case "5":
                FastReport_Print("Rep_CRM_SourceReport", pWhereClause, pOutputTo);
                break;
            case "6":
                FastReport_Print("Rep_CRM_SalesStagesReport", pWhereClause, pOutputTo);
                break;
            case "7":
                FastReport_Print("Rep_CRM_SalesReport", pWhereClause, pOutputTo);
                break;
        }
    }

}

function validationCheck() {
    if (salesmenIDs == "") {
        swal("Filter Error", "You must select at least one saleman!");
        return false;
    }
    else if (ReportType == "1" || ReportType == "4") {
        if (ConvertDateFormat($("#txtToDate").val()) == "" || ConvertDateFormat($("#txtFromDate").val()) == "") {
            swal("Filter Error","Choose a valid date!");
            return false;
        }
    }
    return true;
}
function CRMStatistics_GetFilterWhereClause() {
    debugger;
    var WhereClause = " Where";
    ReportType = $("#slReportName").val();
    salesmenIDs = "";
    let checkedItems = $(".cbItem:checked");
    $(checkedItems).each((i, item) => {
        salesmenIDs += item.id + (i == checkedItems.length - 1 ? "" : ",");
    });
    
     
    if (ReportType == "1")
        WhereClause += " AND C.CreationDate <= ''" + ConvertDateFormat($("#txtToDate").val()) + " 23:59:59'' ";

    if (ReportType == "4") {
        switch ($("#slCRMStage").val()) {
            case "1":
                WhereClause += ` AND C.CreationDate <= ''${ConvertDateFormat($("#txtToDate").val())} 23:59:59'' AND (C.DealCreationDate > ''${ConvertDateFormat($("#txtToDate").val())} 23:59:59'' OR C.DealCreationDate IS NULL) `
                break;
            case "2":
                WhereClause += ` AND C.DealCreationDate <= ''${ConvertDateFormat($("#txtToDate").val())} 23:59:59'' AND (C.OppurtunityCreationDate > ''${ConvertDateFormat($("#txtToDate").val())} 23:59:59'' OR C.OppurtunityCreationDate IS NULL) `;
                break;
            case "3":
                WhereClause += ` AND C.OppurtunityCreationDate <= ''${ConvertDateFormat($("#txtToDate").val())} 23:59:59'' AND (C.NewCustomerCreationDate > ''${ConvertDateFormat($("#txtToDate").val())} 23:59:59'' OR C.NewCustomerCreationDate IS NULL)`;
                break;
            case "4":
                WhereClause += ` AND C.NewCustomerCreationDate <= ''${ConvertDateFormat($("#txtToDate").val()) } 23:59:59''`;
                break;       
        }
    }
        

    if (ReportType == "2") {
        switch ($("#slCRMStage").val()) {
            case "1": //lead
                WhereClause += " AND IsSalesDeal = 0 AND IsSalesOppurtunity = 0 AND IsAddedToCustomer = 0 ";
                break;
            case "2": //deal
                WhereClause += " AND IsSalesDeal = 1 ";
                break;
            case "3": //oppurtunity
                WhereClause += " AND IsSalesOppurtunity = 1 ";
                break;
            case "4": //NewCustomer
                WhereClause += " AND IsSalesDeal = 0 AND IsSalesOppurtunity = 0 AND IsAddedToCustomer = 1 ";
                break;
        }
    }

    if (ReportType == "3" || ReportType == "7") {
        if ($("#cbIsLead").prop("checked"))
            WhereClause += " OR (IsSalesDeal = 0 AND IsSalesOppurtunity = 0 AND IsAddedToCustomer = 0) ";
        if ($("#cbIsDeal").prop("checked"))
            WhereClause += " OR (IsSalesDeal = 1) ";
        if ($("#cbIsOppurtunity").prop("checked"))
            WhereClause += " OR (IsSalesOppurtunity = 1) ";
        if ($("#cbIsCustomer").prop("checked"))
            WhereClause += " OR (IsSalesDeal = 0 AND IsSalesOppurtunity = 0 AND IsAddedToCustomer = 1) ";
    }

    if (ReportType == "5") {
        WhereClause += $("#slSource").val() == 0 ? "" : ` AND C.SourceID = ${$("#slSource").val()} `;
    }

    //Filter by selected salesmen
    WhereClause += ` AND C.SalesmanID IN (${salesmenIDs})`;

    if (WhereClause.trim() == "Where") {
        WhereClause = "Where 1 = 1 ";
    }
    else {
        WhereClause = WhereClause.replace("Where AND", "Where ");
        WhereClause = WhereClause.replace("Where OR", "Where ");
    }
    if (ReportType != 1)
        WhereClause += " Order By C.Name "
    return WhereClause;
}

function FastReport_Print(ReportName, pWhereClause, pOutputTo) {
    debugger;
    CallGETFunctionWithParameters("/api/Reports/GetLogoPath", { pLogoSubPath: "Content/Images/CompanyHeader.jpg" }, function (paths) {
        debugger;
        var ReportType = $("#slReportName").val();

        var arr_Keys = new Array();
        var arr_Values = new Array();
        let query = `${ReportName} ' ${pWhereClause}'`;

       

        arr_Keys.push("Logo");
        if (pDefaults.UnEditableCompanyName != 'MAN')
            arr_Values.push(paths.logoPath);
        else
            const manPath = paths.logoPath.replace(/[^\\]+\.jpg$/, `YLMLogoFinalConv-01.svg`);
            arr_Values.push(manPath);

        if (ReportType == "1") {
            arr_Keys.push("FromDate");
            arr_Values.push($("#txtFromDate").val());
            arr_Keys.push("ToDate");
            arr_Values.push($("#txtToDate").val());
        }
        
        if (ReportType == "2") {
            arr_Keys.push("Title");
            switch ($("#slCRMStage").val()) {
                case "1":
                    arr_Values.push("Lead report");
                    break;
                case "2":
                    arr_Values.push("Deal report");
                    break;
                case "3":
                    arr_Values.push("Oppurtunity report");
                    break;
                case "4":
                    arr_Values.push("New customers report");
                    break;
            }  
        }

        if (ReportType == "4") {
            let Title = "";
            switch ($("#slCRMStage").val()) {
                case "1": Title += "Leads"; break;
                case "2": Title += "Deals"; break;
                case "3": Title += "Oppurtunities"; break;
                case "4": Title += "Customers"; break;       
            }
            Title += ` Report (from ${$("#txtFromDate").val()} to ${$("#txtToDate").val()})`;
            arr_Keys.push("Title");
            arr_Values.push(Title);
        }

        var pParametersWithValues =
        {
            query: query
            , arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: "CRM Statistics"
            , pReportName: (pOutputTo == "Print" ? ReportName : ReportName + "_Excel")
            , pReportType: pOutputTo
        };
        var win = window.open("", "_blank");
        var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
            + '&query=' + pParametersWithValues.query + ''
            + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
            + '&arr_Values=' + pParametersWithValues.arr_Values + ''
            + '&pReportName=' + pParametersWithValues.pReportName + ''
            + '&pReportType=' + pParametersWithValues.pReportType + '';

        win.location = url;
    })
}

$("#slReportName").change(() => {
    debugger;
    switch ($("#slReportName").val()) {
        case "1": //StagesPerSalesPerson
            $("#txtFromDate").parent().removeClass("hide");
            $("#txtToDate").parent().removeClass("hide");
            $("#slCRMStage").parent().parent().addClass("hide");
            $("#slMultipleStages").addClass("hide");
            $("#slSource").parent().parent().addClass("hide");
            break;
        case "2": //StagesReport
            $("#txtFromDate").parent().addClass("hide");
            $("#txtToDate").parent().addClass("hide");
            $("#slCRMStage").parent().parent().removeClass("hide");
            $("#slMultipleStages").addClass("hide");
            $("#slSource").parent().parent().addClass("hide");
            break;
        case "3": //PipelineReport
        case "7": //SalesReport
            $("#txtFromDate").parent().addClass("hide");
            $("#txtToDate").parent().addClass("hide");
            $("#slCRMStage").parent().parent().addClass("hide");
            $("#slMultipleStages").removeClass("hide");
            $("#slSource").parent().parent().addClass("hide");
            break;
        case "4": //StageStatusReport
            $("#txtFromDate").parent().removeClass("hide");
            $("#txtToDate").parent().removeClass("hide");
            $("#slCRMStage").parent().parent().removeClass("hide");
            $("#slMultipleStages").addClass("hide");
            $("#slSource").parent().parent().addClass("hide");
            break;
        case "5": //SourceReport
            $("#txtFromDate").parent().addClass("hide");
            $("#txtToDate").parent().addClass("hide");
            $("#slCRMStage").parent().parent().addClass("hide");
            $("#slMultipleStages").addClass("hide");
            $("#slSource").parent().parent().removeClass("hide");
            break;
        case "6": //SalesStagesReport
            $("#txtFromDate").parent().addClass("hide");
            $("#txtToDate").parent().addClass("hide");
            $("#slCRMStage").parent().parent().addClass("hide");
            $("#slMultipleStages").addClass("hide");
            $("#slSource").parent().parent().addClass("hide");
            break;
    }
})

$("#cbSelectAll").change(() => {
    debugger;
    $(".cbItem").prop("checked", $("#cbSelectAll").prop("checked"));
})
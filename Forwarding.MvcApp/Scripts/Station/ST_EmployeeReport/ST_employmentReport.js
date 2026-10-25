function TrialBalance_cbCheckAllAccountsChanged() {
    debugger;
    if ($("#cbCheckAllAccounts").prop("checked"))
        $("#divCbEmployee input[name=nameCbEmployee]").prop("checked", true);
    else
        $("#divCbEmployee input[name=nameCbEmployee]").prop("checked", false);
}
function TrialBalance_cbCheckAllCostCentersChanged() {
    debugger;
    if ($("#cbCheckAllCostCenters").prop("checked"))
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", true);
    else
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", false);
}
function TrialBalance_cbCheckAllJobChanged() {
    debugger;
    if ($("#cbCheckAllJobs").prop("checked"))
        $("#divCbJob input[name=nameCbJob]").prop("checked", true);
    else
        $("#divCbJob input[name=nameCbJob]").prop("checked", false);
}
function TrialBalance_ReportType_Changed() {
    debugger;
    if ($("#cbIsByCostCenter").prop("checked"))
        $("#secCostCenter").removeClass("hide");
    else
        $("#secCostCenter").addClass("hide");
}
function TrialBalance_Print(pOutputTo) {
    debugger;
    var pAccountIDList = ($("#cbCheckAllAccounts").prop("checked") == true ? "-1" : GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbEmployee"));
    var pFromDate = ConvertDateFormat($("#txtFromDate").val());
    var pToDate = ConvertDateFormat($("#txtToDate").val());
    var pcategory = $("#slcategory").val();
    var pshiftEmp = $("#slShift").val();

    var pSection = $("#slSection").val();
    var pmaritalstatus = $("#slmilitarystatus").val();
    var pNumberofChildren = $("#slType").val();
    var pGender = $("#slGender").val();





    if (pAccountIDList == "0")
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            swal("Sorry", "Please, select at least one Employee." , "warning");
        }
        else {
            swal("إعتذار", "من فضلك، برجاء إختيار موظف واحد علي الأقل.", "warning");
        }
    //else if (pCurrency == "0")
    //    swal("Sorry", "Please, select at least one Client.", "warning");
  //  else if (//*$("#cbIsByCostCenter").prop("checked")*// && pMainAccount == "")
    //else if (pMainAccount == "")

    //    swal("Sorry", "Please, select at least one cost center.");
    else {
        if ($("#cbIsSummarized").prop("checked")) {
            var arr_Keys = new Array();
            var arr_Values = new Array();
            arr_Keys.push("IDs");
            arr_Keys.push("From_Date");
            arr_Keys.push("ToDate");

            arr_Values.push(pAccountIDList);
            arr_Values.push(pFromDate);
            arr_Values.push(pToDate);


            var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Values: arr_Values
                , pTitle: "تقرير العمالة"
                , pReportName: "ST_EmployeeTotals"
            };
            var win = window.open("", "_blank");
            var url = '/ReportMainClass/PrintWithIDs?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '&pReportName=' + pParametersWithValues.pReportName + '';

            win.location = url;
        }
        else {
            var arr_Keys = new Array();
            var arr_Values = new Array();
            arr_Keys.push("IDs");
            arr_Keys.push("From_Date");
            arr_Keys.push("ToDate");
            arr_Keys.push("category");
            arr_Keys.push("shiftEmp");

            arr_Keys.push("Section");
            arr_Keys.push("maritalstatus");
            arr_Keys.push("NumberofChildren");
            arr_Keys.push("Gender");





            arr_Values.push(pAccountIDList);
            arr_Values.push(pFromDate);
            arr_Values.push(pToDate);
            arr_Values.push(pcategory);
            arr_Values.push(pshiftEmp);

            arr_Values.push(pSection);
            arr_Values.push(pmaritalstatus);
            arr_Values.push(pNumberofChildren);
            arr_Values.push(pGender);






            var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Values: arr_Values
                , pTitle: "تقرير العمالة"
                , pReportName: "RepST_EmployeesTransaction"
            };
            var win = window.open("", "_blank");
            var url = '/ReportMainClass/PrintWithIDs?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '&pReportName=' + pParametersWithValues.pReportName + '';

            win.location = url;
        }
       

          
        
    }
}



function Details_FillCheckboxList() {
    debugger;
    FadePageCover(true);
    var pAccountID = $("#slAccountsGroup").val();
    var pAccountRealCode = $("#slAccountsGroup option:selected").attr("RealAccountCode");

    CallGETFunctionWithParameters("/api/SL_ClientAccountStatementReport/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
        , {
            pIsLoadArrayOfObjects: true
        , pLanguage: $("[id$='hf_ChangeLanguage']").val()
        , pPageNumber: 1
        , pPageSize: 9999
        , pWhereClause: "4"
        , pWhereClause2: (pAccountID == 0 ? "-1" : pAccountID)

            //, pWhereClause: (pAccountID == 0 ? "WHERE IsMain=0" : "WHERE IsMain=0 AND Parent_ID=" + pAccountID)
        , pOrderBy: "ID"
        }
        , function (pData) {

            FillDivWithCheckboxes("divCbEmployee", pData[1], "nameCbEmployee", 5/*NameAndCode*/, null);
           


            FadePageCover(false);
        }
        , null);
}

//not used(i left it just to make it easy if requested)

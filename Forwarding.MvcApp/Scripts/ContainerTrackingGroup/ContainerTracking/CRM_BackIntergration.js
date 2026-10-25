

function SetOperationStage_Initialize() {
    debugger;
    LoadView("/ContainerTrackingGroup/ContainerTrackingTab/CRM_BackIntergration", "div-content", function () {
        var _TodaysDate = getTodaysDateInddMMyyyyFormat();

        if (!IsMESCOCompany && !["BED", "MED"].includes(pDefaults.UnEditableCompanyName)) {
            $("#slServices").parent().addClass("hide");
            $("#slSalesman").parent().addClass("hide");
            $("#cbIsCreateJV").parent().parent().addClass("hide");
            $("#ContainerTrackingGroup").parent().remove();
            $("#btn-SearchItems").attr("onclick", "SearchOperationsNotMESCO();");
            $("#btn-SetOperationStage").attr("onclick", "SetOperationStageNotMESCO();");
        }

        CallGETFunctionWithParameters("/api/SetOperationStage/LoadWithObjectArrayReturned",
            {}
            , function (pData) {


                FillListFromObject(null, 2, "<--Select-->", "slServices", pData[0], null);
                FillListFromObject(null, 2, "<--Select-->", "slDirections", pData[1], null);
                FillListFromObject(null, 2, "<--Select-->", "slSalesman", pData[2], null);
                FillListFromObject(null, 2, "<--Select-->", "slOperationMan", pData[3], null);

                var allOption = '<option value="0">All</option>';
                $('#slDirections option[value=""]').remove();
                $('#slDirections').prepend(allOption);
                $('#slDirections').val(0);

                $('#slBranches').html($('#hReadySlBranches').html());
                $('#slBranches').prepend(allOption);
                $('#slBranches').val(0);

                if ($("#hf_CanDelete").val() == 1)
                    $('.OpenOperationClass').removeClass('hide');
                else
                    $('.OpenOperationClass').addClass('hide');

                FadePageCover(false);
            });

        //$("#txtFromDateSelectOperations").val(_TodaysDate);
        //$("#txtToDateSelectOperations").val(_TodaysDate);

        $("#txtCloseDate").val("01/01/2030");

        var today = new Date();
        var yyyy = today.getFullYear().toString();
        $('#txtYear').val(yyyy);
        FadePageCover(false);
    });
}

function OperationsStatistics_SelectAllOperations() {
    debugger;
    $('input[name="cbAddedItemID"]').each(function () {
        if (!$(this).prop('disabled')) {
            $(this).prop('checked', true);
        }
    });

}

function OperationsStatistics_ClearAllOperations() {
    debugger;
    $('input[name="cbAddedItemID"]').prop("checked", false);
}

function OperationsStatistics_FilterOperationsModal() {
    debugger;
    if (!IsMESCOCompany) {
        return;
    }
    if ($('#slServices').val() == '')
        swal('Warning', 'Choose Service');
    else if ($('#slDirections').val() == '')
        swal('Warning', 'Choose Direction');
    else if ($('#slMonths').val() == '0')
        swal('Warning', 'Choose Month');
    else {
        FadePageCover(true);
        var pWhereClause = "WHERE BLType<>2 \n";

        // 3	--AIR    // 1 --FCL    // 3	--AIR
        pWhereClause += " And (case WHEN TransportType = 2 THEN 3	  WHEN TransportType = 1 AND ShipmentType = 1 THEN 1  WHEN TransportType = 1 AND ShipmentType IN(2, 5) THEN 2 end ) = " + $('#slServices').val();

        if ($('#slDirections').val() != 0)
            pWhereClause += " And DirectionType = " + $('#slDirections').val();

        if ($('#slBranches').val() != 0)
            pWhereClause += " And BranchID = " + $('#slBranches').val();


        if ($('#slServices').val() == 2) {

            if ($('#slDirections').val() == 0) {
                pWhereClause += " And( (  DirectionType =1  and  year(closedate) = " + $('#txtYear').val() + ") or (  DirectionType =2 and year(closedate) = " + $('#txtYear').val() + " ) )";
                if ($('#slMonths').val() != 0)
                    pWhereClause += " And( (  DirectionType =1 and  Month(closedate) = " + $('#slMonths').val() + ") or (  DirectionType =2 and Month(closedate) = " + $('#slMonths').val() + " ) ) ";
            }
            else if ($('#slDirections').val() == 1)     //  ExpectedArrival ETA IMPORT
            {
                pWhereClause += " And year(closedate) = " + $('#txtYear').val();
                if ($('#slMonths').val() != 0)
                    pWhereClause += " And Month(closedate) = " + $('#slMonths').val();
            }
            else if ($('#slDirections').val() == 2)          // ExpectedDeparture ETD EXPORT
            {
                pWhereClause += " And year(closedate) = " + $('#txtYear').val();
                if ($('#slMonths').val() != 0)
                    pWhereClause += " And Month(closedate) = " + $('#slMonths').val();
            }

        }
        else {
            pWhereClause += " And year(OpenDate) <= " + $('#txtYear').val();
            if ($('#slMonths').val() != 0)
                pWhereClause += " And Month(OpenDate) <= " + $('#slMonths').val();
       
            if ($('#slSalesman').val() != '')
                pWhereClause += " And SalesmanID =  " + $('#slSalesman').val();

        }

        if ($('#slOperationMan').val() != '')
            pWhereClause += " And OperationManID =  " + $('#slOperationMan').val();

        //if ($('#cbIsCreateJV').prop('checked'))
        //    pWhereClause += " And OperationStageID = 120  And IsClosedJV = 0 ";


        if ($("#txtSearchItems").val().trim() != "")
            pWhereClause += "AND SUBSTRING(Code,12,10)='" + $("#txtSearchItems").val().trim() + "' \n";



        pWhereClause += " And OperationStageID  in ( 120 ) ";

        if ($('#slServices').val() == 2) {


            pWhereClause += `
                          and  ID not IN (
                                      SELECT o1.MasterOperationID
                                      FROM Operations o1
                                      WHERE o1.MasterOperationID IS NOT NULL
                                        AND o1.ID IN (
                                            SELECT OperationID
                                            FROM CRMQuotationCloseLog q
                                            WHERE q.ID IN (
                                                SELECT MAX(ID)
                                                FROM CRMQuotationCloseLog
                                                GROUP BY QuotationCode
                                            )
                                            AND q.IsFinalized = 1
                                        )
                                      GROUP BY o1.MasterOperationID
                                      HAVING COUNT(*) = (
                                          SELECT COUNT(*)
                                          FROM Operations o2
                                          WHERE o2.MasterOperationID = o1.MasterOperationID and o2.QuotationRouteID is not null
                                      )
                                  )
                                  
                                  
                        `;



           

        }
        else {


        pWhereClause += `
                            AND id NOT IN (
                                SELECT LogTable.operationid
                                FROM CRMQuotationCloseLog AS LogTable
                                INNER JOIN (
                                    SELECT QuotationCode, MAX(ID) AS MaxID
                                    FROM CRMQuotationCloseLog
                                    GROUP BY QuotationCode
                                ) AS LatestLog ON LogTable.ID = LatestLog.MaxID
                                WHERE LogTable.IsFinalized = 1
                            )
                        `;

        }



        //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
        //if (isValidDate($("#txtFromDateSelectOperations").val().trim(), 1) && $("#txtFromDateSelectOperations").val().trim() != "") {
        //    pWhereClause += " AND OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDateSelectOperations").val().trim()) + "'";
        //}
        //if (isValidDate($("#txtToDateSelectOperations").val().trim(), 1) && $("#txtToDateSelectOperations").val().trim() != "") {
        //    pWhereClause += " AND CAST(OpenDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDateSelectOperations").val().trim()) + "'";
        //}
        //if ($('#cbIsInvoiced').is(':checked')) {
        //    pWhereClause += " and (OperationStageID=60 and ID in (select OperationID from vwInvoices where IsValidPortal=1))";
        //}
        GetListAsCheckboxesWithVariousParameters_Mesco("/api/SetOperationStage/LoadAll"
            , { pWhereClause: pWhereClause }
            , "divCheckboxesList"
            , "cbAddedItemID"
            , function () { FadePageCover(false); }
            , 2
            , "col-sm-2");
    }

}

function SetOperationStage(pIsJvClose) {
    debugger;
    if (!IsMESCOCompany) {
        return;
    }

    if ($('#slOperationStages').val() != 120 && pIsJvClose)
        swal('Warning', 'Choose Closed Operation To Create The JV')
    else {
        var pCheckboxNameAttr = "cbAddedItemID";
        var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
        if (pSelectedItemsIDs == "")
            swal("Sorry", "Please, select at least 1 operation.");
        else
            swal({
                title: "Are you sure?",
                text: pIsJvClose ? "Close jv will be created " : ("The stage will be changed to '" + $('#slOperationStages option:selected').text()) + "' for selected operations.",
                //type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Apply!",
                closeOnConfirm: false
            },
                //callback function in case of confirm
                function () {
                    FadePageCover(true);
                    CallPOSTFunctionWithParameters("/api/SetOperationStage/SetOperationStage_ByDates",
                        {
                            pOperationIDs_ToSet: pSelectedItemsIDs
                            , pOperationStageID: $('#slOperationStages').val()
                            , pCloseDate: GetDateWithFormatyyyyMMdd($('#txtCloseDate').val())/*Dummy Date not used in this case*/
                            , pIsJvClose: pIsJvClose == undefined ? 0 : pIsJvClose
                            , pYear: $('#txtYear').val()
                            , pMonth: $('#slMonths').val()
                        }
                        , function (pData) {
                            let pReturnedMessage = pData[0];
                            if (pData[0] != "") {

                                var pMessageFromSP = pData[0];
                                var word = "Transaction";
                                var index = pMessageFromSP.indexOf(word);
                                if (index !== -1) {
                                    pMessageFromSP = pMessageFromSP.substring(0, index + word.length - 12);
                                    swal("Sorry", pMessageFromSP);
                                }
                                else
                                    swal("Sorry", pReturnedMessage);

                                FadePageCover(false);
                            }
                            else {
                                swal("Success", "Done successfully.");
                                FadePageCover(false);
                            }
                        });
                });
    }

}

function CreateJVs() {
    swal({
        title: "Are you sure?",
        text: "Close jv will be created",
        //type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Apply!",
        closeOnConfirm: false
    },
        //callback function in case of confirm
        function () {
            FadePageCover(true);
            CallPOSTFunctionWithParameters("/api/SetOperationStage/CreateJVs",
                {
                }
                , function (pData) {
                    let pReturnedMessage = pData[0];
                    if (pData[0] != "") {

                        var pMessageFromSP = pData[0];
                        var word = "Transaction";
                        var index = pMessageFromSP.indexOf(word);
                        if (index !== -1) {
                            pMessageFromSP = pMessageFromSP.substring(0, index + word.length - 12);
                            swal("Sorry", pMessageFromSP);
                        }
                        else
                            swal("Sorry", pReturnedMessage);

                        FadePageCover(false);
                    }
                    else {
                        swal("Success", "Done successfully.");
                        FadePageCover(false);
                    }
                });
        });
}
function SetAllClosedOperationsStage(pWhereClause) {
    debugger;




    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);

    pWhereClause = "where id in (" + pSelectedItemsIDs + ")";

    if (pSelectedItemsIDs == "")
        swal("Sorry", "Please, select at least 1 operation.");
    else
        swal({
            title: "Are you sure?",
            text:  "Dynamic Quote/s Will Be Updated" + " for selected operations.",
            //type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Apply!",
            closeOnConfirm: false
        },
            //callback function in case of confirm
            function () {
                FadePageCover(true);

                CallPOSTFunctionWithParameters("/api/SetOperationStage/UpdateClosedOperationsInDynamic",
                    {
                        pWhereClause: pWhereClause
                    }
                    , function (pData) {
                        let pReturnedMessage = pData[0];
                        if (pData[0] != "") {

                            var pMessageFromSP = pData[0];
                            var word = "Transaction";
                            var index = pMessageFromSP.indexOf(word);
                            if (index !== -1) {
                                pMessageFromSP = pMessageFromSP.substring(0, index + word.length - 12);
                                swal("Sorry", pMessageFromSP);
                            }
                            else
                                swal("Sorry", pReturnedMessage);

                            FadePageCover(false);
                        }
                        else {
                            swal("Success", "Done successfully.");
                            FadePageCover(false);
                        }
                        OperationsStatistics_FilterOperationsModal();
                    });

            });


}

function OpenOperation() {
    if ($('#txtOperationCode').val() == '')
        swal('Warning', 'Enter Operation Code');
    else {
        swal({
            title: "Are you sure?",
            text: "The stage will be changed to open '" + "' and close jv will be deleted .",
            //type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Apply!",
            closeOnConfirm: false
        },
            //callback function in case of confirm
            function () {
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/SetOperationStage/OpenOperation",
                    {
                        pOperationID: 0
                        , pOperationCode: $('#txtOperationCode').val()
                    }
                    , function (pData) {
                        let pReturnedMessage = pData[0];
                        if (pData[0] != "") {

                            var pMessageFromSP = pData[0];
                            var word = "Transaction";
                            var index = pMessageFromSP.indexOf(word);
                            if (index !== -1) {
                                pMessageFromSP = pMessageFromSP.substring(0, index + word.length - 12);
                                swal("Sorry", pMessageFromSP);
                            }
                            else
                                swal("Sorry", pReturnedMessage);

                            FadePageCover(false);
                        }
                        else {
                            swal("Success", "Done successfully.");
                            FadePageCover(false);
                        }
                    });
            });
    }
}

function ShowHideJV() {
    $("#divCheckboxesList").html("");
    if ($('#cbIsCreateJV').prop('checked')) {
        $('#btn-SetOperationCloseJV').removeClass('hide');
        $('#slOperationStages').parent().addClass('hide');
        $('#btn-SetOperationStage').addClass('hide');
    }
    else {
        $('#btn-SetOperationCloseJV').addClass('hide');
        $('#slOperationStages').parent().removeClass('hide');
        $('#btn-SetOperationStage').removeClass('hide');

    }
}
function ShowHideSalesman() {
    if ($('#slServices').val() == 2) {
        $('#slSalesman').attr("disabled", "disabled");
        $('#slSalesman').val('');
    }
    else

        $('#slSalesman').removeAttr("disabled");
}
function PrintOperationStage(pOption) {
    debugger;

    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("dummy");
    arr_Values.push("0");

    var ReportName = "OperationStage";

    var whereClause = "where IsNull(Code,'')<>''";
    if ($('#slOperationStages').val() > 0) {
        whereClause += " and OperationStageID=" + $('#slOperationStages').val() + "";
    }
    if ($('#txtFromDateSelectOperations').val() != '') {
        whereClause += " and OpenDate>='" + GetDateWithFormatyyyyMMdd($('#txtFromDateSelectOperations').val()) + "'";
    }
    if ($('#txtToDateSelectOperations').val() != '') {
        whereClause += " and cast(OpenDate as date)<='" + GetDateWithFormatyyyyMMdd($('#txtToDateSelectOperations').val()) + "'";
    }
    if ($('#txtSearchItems').val() != '') {
        whereClause += " and Code='" + $('#txtSearchItems').val() + "'";
    }
    if ($('#cbIsInvoiced').is(':checked')) {
        pWhereClause += " and (OperationStageID=60 and ID in (select OperationID from vwInvoices where IsValidPortal=1))";
    }
    var query = `select * from vwOperations ${whereClause}`;

    debugger;

    query = query.replace(/[\n\t]/g, '');
    debugger;

    var pParametersWithValues =
    {
        query: query
        , arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: ReportName
        , pReportName: ReportName
        , pReportType: pOption
    };

    var win = window.open("", "_blank");

    url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
        + '&query=' + pParametersWithValues.query + ''
        + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
        + '&arr_Values=' + pParametersWithValues.arr_Values + ''
        + '&pReportName=' + pParametersWithValues.pReportName + ''
        + '&pReportType=' + pParametersWithValues.pReportType + '';

    win.location = url;

}
function SearchOperationsNotMESCO() {
    debugger;
    FadePageCover(true);
    var pWhereClause = "WHERE BLType<>2 \n"; // Not Houses


    if ($('#slDirections').val() != 0 && $('#slDirections').val() != "")
        pWhereClause += " And DirectionType = " + $('#slDirections').val();

    if ($('#slBranches').val() != 0 && $('#slBranches').val() != "")
        pWhereClause += " And BranchID = " + $('#slBranches').val();


    pWhereClause += " And year(OpenDate) = " + $('#txtYear').val();
    if ($('#slMonths').val() != 0)
        pWhereClause += " And Month(OpenDate) = " + $('#slMonths').val();

    pWhereClause += " And OperationStageID = 60 "; // to get OPEN Operations only

    if ($("#txtSearchItems").val().trim() != "")
        pWhereClause += "AND SUBSTRING(Code,12,10)='" + $("#txtSearchItems").val().trim() + "' \n";


    GetListAsCheckboxesWithVariousParameters("/api/SetOperationStage/LoadAll"
        , { pWhereClause: pWhereClause }
        , "divCheckboxesList"
        , "cbAddedItemID"
        , function () { FadePageCover(false); }
        , 2
        , "col-sm-2");

}
function SetOperationStageNotMESCO() {
    debugger;


    if ($('#slOperationStages').val() != 120)
        swal('Warning', 'Choose Closed Stage');
    else {
        var pCheckboxNameAttr = "cbAddedItemID";
        var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
        if (pSelectedItemsIDs == "")
            swal("Sorry", "Please, select at least 1 operation.");
        else
            swal({
                title: "Are you sure?",
                text: "The stage will be changed to '" + $('#slOperationStages option:selected').text() + "' for selected operations.",
                //type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Apply!",
                closeOnConfirm: false
            },
                //callback function in case of confirm
                function () {
                    FadePageCover(true);
                    CallGETFunctionWithParameters("/api/Operations/CloseMultipleOperations",
                        {
                            pOperationsIDs: pSelectedItemsIDs
                            , pOperationStageID: $('#slOperationStages').val()
                            , pDummy: true
                        }
                        , function (pData) {
                            let pReturnedMessage = pData[0];
                            if (pData[0] != "") {

                                var pMessageFromSP = pData[0];
                                var word = "Transaction";
                                var index = pMessageFromSP.indexOf(word);
                                if (index !== -1) {
                                    pMessageFromSP = pMessageFromSP.substring(0, index + word.length - 12);
                                    swal("Sorry", pMessageFromSP);
                                }
                                else
                                    swal("Sorry", pReturnedMessage);

                                FadePageCover(false);
                            }
                            else {
                                swal("Success", "Done successfully.");
                                SearchOperationsNotMESCO();
                                FadePageCover(false);
                            }
                        });
                });
    }

}

function GetListAsCheckboxesWithVariousParameters_Mesco(pStrFnName, pControllerParameters, pDivName, pCheckboxNameAttr, callback, pCodeOrName, pCol_sm_size) { //pCodeOrName=1:Name, 2:Code, 3:NameAndCode,4:ContainerTypeCode,5:Email
    $.ajax({
        type: "GET",
        url: strServerURL + pStrFnName,
        data: pControllerParameters,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            //Clear the div
            $("#" + pDivName).html("");
            var option = "";
            // Bind Data
            //option = '<section class="panel panel-default">';
            //option += '<header class="panel-heading">';
            //option += '</header>';
            $.each(JSON.parse(data[0]), function (i, item) {
                debugger;
                //option += '<div class="col-sm-3"> <label> ';
                option += '<div class="' + (pCol_sm_size == undefined ? "col-sm-3" : pCol_sm_size) + '"><label> ';
                option += '<input type="checkbox" id="' + pCheckboxNameAttr + item.ID + '" name="' + pCheckboxNameAttr + '" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" value="' + item.ID + '"' + (item.OperationStageID == 65 ? ' disabled' : '') + '>';
                //option += item.Code + ' (' + item.Name + ')';
                if (pCodeOrName == null || pCodeOrName == undefined || pCodeOrName == 1)
                    option += '<span>' + item.Name + (item.IsReceipt ? ("-Receipt") : "") + '</span>';
                else if (pCodeOrName == 2 && pDefaults.UnEditableCompanyName == "NEW") //2:Code
                    option += '<span>' + item.Code + ' / ' + item.VesselName + ' </span>';
                else if (pCodeOrName == 2) //2:Code
                    option += '<span>' + item.Code + '</span>';
                else if (pCodeOrName == 3) //3:NameAndCode
                    option += '<span>' + item.Name + (item.Code == 0 ? "" : (" (" + item.Code + ")")) + '</span>';
                else if (pCodeOrName == 4) //4:ContainerTypeCode
                    option += '<span>' + item.ContainerTypeCode + '</span>';
                else if (pCodeOrName == 5) //5:Email
                    option += '<span>' + item.Email + '</span>';
                else if (pCodeOrName == 6) //6:House with MasterOperationID
                    option += '<span MasterOperationID = ' + item.MasterOperationID + '>' + item.Code + '</span>';
                option += '</label></div>';
            });
            //option += '<footer class="panel-footer">';
            //option += "</footer>";
            //option += "</section>";
            $("#" + pDivName).append(option);

            if (callback != null && callback != undefined)
                callback();
        },
        error: function (jqXHR, exception) {

            FadePageCover(false);
            swal("Sorry", "Please, try again. GetListAsCheckboxes in mainapp.master.js", "");
        }
    });
}

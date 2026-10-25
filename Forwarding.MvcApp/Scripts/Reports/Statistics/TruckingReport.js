//1: Excel File
//2: Excel File Without Formatting
//3: PDF File
//4: Rich Text Format Document
//5: Word Document

$(document).ready(function () {

    $("#slClient").css({ "width": "100%" }).select2();
    $("#slPOL").css({ "width": "100%" }).select2();
    $("#slPOD").css({ "width": "100%" }).select2();
    $("#slOperations").css({ "width": "100%" }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');
});

function TruckingReport_GetFilterWhereClause(pFilterType) {
    debugger;
    var pWhereClause = "WHERE 1=1 ";

    var pFromOpenDateFilter = "";
    var pToOpenDateFilter = "";

    if (pFilterType == "Yesterday")
        pWhereClause += " AND cast(LoadingDate as date) = cast( dateadd(dd,-1,getdate()) as date) "
    else if (pFilterType == "Today")
        pWhereClause += " AND cast(LoadingDate as date) = cast(getdate() as date) "
    else if (pFilterType == "Tomorrow")
        pWhereClause += " AND cast(LoadingDate as date) = cast(dateadd(dd,1,getdate()) as date) "
    else {
        if (isValidDate($("#txtFromDate").val().trim(), 1) && $("#txtFromDate").val().trim() != "") {
            pFromOpenDateFilter = " OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'";
            pWhereClause += " AND " + pFromOpenDateFilter;
        }
        if (isValidDate($("#txtToDate").val().trim(), 1) && $("#txtToDate").val().trim() != "") {
            pToOpenDateFilter = " CAST(OpenDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + "'";
            pWhereClause += " AND " + pToOpenDateFilter;
        }
    }
     
    var pFromETDPOLDateFilter = "";
    var pToETDPOLDateFilter = "";
    if (isValidDate($("#txtFromDateETDPOL").val().trim(), 1) && $("#txtFromDateETDPOL").val().trim() != "") {
        pFromETDPOLDateFilter = " ExpectedDeparture >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDateETDPOL").val().trim()) + "'";
        pWhereClause += " AND " + pFromETDPOLDateFilter;
    }
    if (isValidDate($("#txtToDateETDPOL").val().trim(), 1) && $("#txtToDateETDPOL").val().trim() != "") {
        pToETDPOLDateFilter = " CAST(ExpectedDeparture AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDateETDPOL").val().trim()) + "'";
        pWhereClause += " AND " + pToETDPOLDateFilter;
    }

    var pFromStuffingDateFilter = "";
    var pToStuffingDateFilter = "";
    if (isValidDate($("#txtFromDateStuffing").val().trim(), 1) && $("#txtFromDateStuffing").val().trim() != "") {
        pFromStuffingDateFilter = " LoadingDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDateStuffing").val().trim()) + "'";
        pWhereClause += " AND " + pFromStuffingDateFilter;
    }
    if (isValidDate($("#txtToDateStuffing").val().trim(), 1) && $("#txtToDateStuffing").val().trim() != "") {
        pToStuffingDateFilter = " CAST(LoadingDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDateStuffing").val().trim()) + "'";
        pWhereClause += " AND " + pToStuffingDateFilter;
    }

    if ($("#slOperations").val() != "") {
        pWhereClause += " AND OperationID =" + $("#slOperations").val();
    }

    if ($("#slClient").val() != "") {
        pWhereClause += " AND ClientID =" + $("#slClient").val();
    }

    if ($("#slPOL").val() != "") {
        pWhereClause += " AND POL =" + $("#slPOL").val();
    }

    if ($("#slPOD").val() != "") {
        pWhereClause += " AND POD =" + $("#slPOD").val();
    }

    pWhereClause += " Order By LoadingDate ";

    return pWhereClause;
}

function TruckingReport_Print(pOption, pFilterType) {
    debugger;

    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("dummy");
    arr_Values.push("0");

    var ReportName = pOption == "Print" ? "TruckingReport" : "TruckingReportExcel";

    var query = `select * 
    from vwTruckingReport
    ${TruckingReport_GetFilterWhereClause(pFilterType)}`;
    //LEFT(Code, 3) DESC, CodeSerial DESC 

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
function TruckingReport_GetData(pFilterType) {
    $('#tblTruckingData tbody').html('');
    var whereClause = TruckingReport_GetFilterWhereClause(pFilterType);
    CallGETFunctionWithParameters("/api/TruckingReport/GetTruckingData", { pWhereClause: whereClause }, (pData) => {
        var data = JSON.parse(pData);
        $.each(data, function (i, item) {
            $('#tblTruckingData tbody').append(`
<tr>
                                        <td class='OperationID hide'>`+ item.OperationID+`</td>
                                        <td class='RoutingID hide'>`+ item.RoutingID+`</td>
                                        <td class='TrNotes'><input type='text' class='form-control' style='width:auto;' value='`+ item.TrNotes +`' readonly ondblClick='$(this).removeAttr("readonly");' onfocusOut='$(this).attr("readonly","readonly");'></td>
                                        <td class='OpNotes'><input type='text' class='form-control' style='width:auto;' value='`+ item.OpNotes +`' readonly ondblClick='$(this).removeAttr("readonly");' onfocusOut='$(this).attr("readonly","readonly");'></td>
                                        <td>`+ item.ClientName+`</td>
                                        <td>`+ item.BookingNumber+`</td>
                                        <td>`+ item.POLName+`</td>
                                        <td>`+ item.PODName+`</td>
                                        <td>`+ item.TrNumberOfContainers+`</td>
                                        <td>`+ item.OpNumberOfContainers+`</td>
                                        <td>`+ item.NumberOfLCL+`</td>
                                        <td>`+ item.LineName + `</td>
                                        <td class='LoadingDate'><input value="`+ (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.LoadingDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.LoadingDate))) +`" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" style="background-color:white; cursor:text;width:auto;" class="input-sm datepicker-input form-control" data-date-format="dd/mm/yyyy"/></td>
                                        <td class='CutOffDate'><input value="`+ (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CutOffDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate))) +`" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" style="background-color:white; cursor:text;width:auto;" class="input-sm datepicker-input form-control" data-date-format="dd/mm/yyyy"/></td>
                                        <td class='ExpectedDeparture'><input value="`+ (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpectedDeparture)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedDeparture))) +`" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" style="background-color:white; cursor:text;width:auto;" class="input-sm datepicker-input form-control" data-date-format="dd/mm/yyyy"/></td>
                                        <td>`+ (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpectedDeparture)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedDeparture)))+`</td>
                                        <td>`+ item.VoyageOrTruckNumber+`</td>
                                        <td>`+ item.PickupAddress+`</td>
                                        <td>`+ item.TruckerName+`</td>
                                        <td>`+ item.Bosla+`</td>
                                        <td class="IsLoaded"><input type="checkbox" `+ (item.IsLoaded ? "checked" : "") +`></td>
                                        <td>`+ item.Code + `</td>
                                        <td>`+ item.CustomerReference +`</td>
</tr>
            `);
        });
        $('#tblTruckingData tbody input.datepicker-input').datepicker();
    });
}

function SaveTruckingData() {
    var lst = [];
    $('#tblTruckingData tbody tr').each(function () {
        lst.push({
            OperationID:$(this).find('td.OperationID').text(),
            RoutingID: $(this).find('td.RoutingID').text(),
            LoadingDate: ConvertDateFormat(IsNull($(this).find('td.LoadingDate input').val(), '01/01/1900')),
            CutOffDate: ConvertDateFormat(IsNull($(this).find('td.CutOffDate input').val(),'01/01/1900')),
            ExpectedDeparture: ConvertDateFormat(IsNull($(this).find('td.ExpectedDeparture input').val(),'01/01/1900')),
            OperationNotes: IsNull($(this).find('td.OpNotes input').val(),''),
            TruckingNotes: IsNull($(this).find('td.TrNotes input').val(),''),
            IsLoaded: $(this).find('td.IsLoaded input[type=checkbox]').is(':checked')?1:0,
        });
    });
    debugger;
    if (lst.length == 0)
        return;

    CallPOSTFunctionWithParameters("/api/TruckingReport/SaveTruckingData",  lst , (pData) => {
        if (pData == true) {
            swal("Success", "Data updated successfully!");
        }
        else {
            swal("Error", "Sorry, data update faild!");
        }
    });
}
//Old

   //if ($("#txtFilterBookingNumbers").val().trim() != "" && pWhereClause !== "") {
    //    //if (pDefaults.UnEditableCompanyName == "ELI" || pDefaults.UnEditableCompanyName == "OAO")
    //    //    pWhereClause += " AND (OperationBookingNumber like '%" + $("#txtFilterBookingNumbers").val().trim().toUpperCase() + "%') ";
    //    //else
    //        pWhereClause += " AND (OperationBookingNumber = '" + $("#txtFilterBookingNumbers").val().trim().toUpperCase() + "') ";
    //}

    //if ($("#txtFilterMasterBL").val().trim() != "" && pWhereClause !== "") {
    //    //pWhereClause += " AND OperationMasterBL LIKE N'%" + $("#txtFilterMasterBL").val().trim().toUpperCase() + "%' ";
    //    pWhereClause += " AND OperationMasterBL = N'" + $("#txtFilterMasterBL").val().trim().toUpperCase() + "' ";
    //}

    //if ($("#txtFilterHouseBLs").val().trim() != "" && pWhereClause !== "") {
    //    //if (pDefaults.UnEditableCompanyName == "NIS") {
    //    //    pWhereClause += " AND (" + " \n";
    //    //    pWhereClause += "       OperationHouseBLs LIKE N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%' ";
    //    //    pWhereClause += "       OR ID IN (SELECT MasterOperationID FROM Operations WHERE HouseNumber LIKE N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%')"
    //    //    //pWhereClause += "       OR ((ISNULL((SELECT COUNT(op.ID) FROM dbo.Operations AS op WHERE dbo.vwOperations.ID = op.MasterOperationID AND op.HouseNumber = N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%'), 0)) > 0)";
    //    //    pWhereClause += "     ) \n ";
    //    //} else if (pDefaults.UnEditableCompanyName == "ALF" || pDefaults.UnEditableCompanyName == "DGL" || pDefaults.UnEditableCompanyName == "ELI" || pDefaults.UnEditableCompanyName == "DYN" || pDefaults.UnEditableCompanyName == "TEU" || pDefaults.UnEditableCompanyName == "SWI") {
    //    //    pWhereClause += " AND (" + " \n";
    //    //    pWhereClause += "       OperationHouseBLs LIKE N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%' ";
    //    //    pWhereClause += "       OR ((ISNULL((SELECT COUNT(op.ID) FROM dbo.Operations AS op WHERE dbo.vwOperations.ID = op.MasterOperationID AND op.HouseNumber = N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%'), 0)) > 0)";
    //    //    pWhereClause += "     ) \n ";
    //    //}
    //    //else {
    //        pWhereClause += " AND (";
    //        pWhereClause += "       OperationHouseBLs=N'" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "' ";
    //    pWhereClause += "       OR ((ISNULL((SELECT COUNT(op.ID) FROM dbo.Operations AS op WHERE dbo.vwChargesWithoutInvoices.OperationID = op.MasterOperationID AND op.HouseNumber = N'" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "'), 0)) > 0)";
    //        pWhereClause += "     ) ";
    //    //}
    //}

//var query = `SELECT O.ID,O.Code,O.CustomerReference,O.ClientName,ISNULL(O.BookingNumber,'') BookingNumber,O.POLName,O.PODName
//	,O.LineName
//	,(SELECT TOP 1 StuffingDate FROM Routings WHERE OperationID=O.ID AND RoutingTypeID=60) LoadingDate
//	,(SELECT TOP 1 LoadingTime FROM Routings WHERE OperationID=O.ID AND RoutingTypeID=60) LoadingTime
//	,O.CutOffDate
//	,(SELECT TOP 1 ActualDeparture FROM Routings WHERE OperationID=O.ID AND RoutingTypeID=30) ActualDeparture
//    ,(SELECT TOP 1 ExpectedDeparture FROM Routings WHERE OperationID=O.ID AND RoutingTypeID=60) ExpectedDeparture
//	,O.VoyageOrTruckNumber
//	,(SELECT TOP 1 PickupAddress FROM Routings WHERE OperationID=O.ID AND RoutingTypeID=60) PickupAddress
//	,(SELECT TOP 1 TruckerName FROM vwRoutings WHERE OperationID=O.ID AND RoutingTypeID=60) TruckerName
//    ,CASE WHEN O.IsBosla = 1 THEN 'BOSLA'
//		ELSE ''
//		END AS Bosla
//	,CASE WHEN (SELECT TOP 1 IsLoaded FROM Routings WHERE OperationID=O.ID AND RoutingTypeID=60) = 1 THEN 'LOADED'
//		ELSE 'NOT LOADED'
//		END AS IsLoaded
//	,O.ExpectedDeparture ETDPOL
//	,(SELECT COUNT(ID) FROM OperationContainersAndPackages AS ocap WHERE ocap.OperationID=O.ID AND ocap.ContainerTypeID=2) NumberOf20DCContainers
//	,(SELECT COUNT(ID) FROM OperationContainersAndPackages AS ocap WHERE ocap.OperationID=O.ID AND ocap.ContainerTypeID=3) NumberOf40DCContainers
//	,(SELECT COUNT(ID) FROM OperationContainersAndPackages AS ocap WHERE ocap.OperationID=O.ID AND ocap.ContainerTypeID=9) NumberOf40HCContainers
//	,(SELECT COUNT(ID) FROM OperationContainersAndPackages AS ocap WHERE ocap.OperationID=O.ID AND ocap.ContainerTypeID=13) NumberOf20RFContainers
//	,(SELECT COUNT(ID) FROM OperationContainersAndPackages AS ocap WHERE ocap.OperationID=O.ID AND ocap.ContainerTypeID=14) NumberOf40RFContainers
//	,(SELECT COUNT(ID) FROM OperationContainersAndPackages AS ocap WHERE ocap.OperationID=O.ID AND ocap.ContainerTypeID=11) NumberOf40OTContainers
//	,O.PackageTypes NumberOfLCL 
	
//    FROM vwOperations O ${TruckingReport_GetFilterWhereClause(pFilterType)}
//    Order By LEFT(Code, 3) DESC, CodeSerial DESC `;
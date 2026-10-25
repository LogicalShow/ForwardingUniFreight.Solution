
function MESReports_Initialize() {
    debugger;
    LoadView("/Reports/MESReports", "div-content", function () {
        LoadAllReports()
        FadePageCover(false);
    });
}


function LoadAllReports() {
    debugger;

    CallGETFunctionWithParameters("/api/WH_CFS_ReleaseVouchers/LoadAll_SecCustomizedUserPrivilegesMescoReports",
        {}
        , function (pData) {

            if (pData[0] == 1)
            {
                BindTableRows(JSON.parse(pData[1]))
            }
            else 
                swal("Sorry", "Error");

            FadePageCover(false);
        });

}

function BindTableRows(pTableRows) {
    debugger;
   

    ClearAllTableRows("tblTruckers");
    $.each(pTableRows, function (i, item) {
        debugger;
        if (item.ID == 7336) { //For BookingControlReport
            AppendRowtoTable("tblTruckers",
                ("<tr ID='" + item.ID + "'>"

                    + "<td class='Name' val='" + item.TabCode + "'>" + item.TabCode + "</td>"

                    + "<td >"
                    //+ "<a href='" + item.F_Path + "' class='btn btn-success btn-sm' target='_blank'><i class='fa fa-download'></i> Download</a>"
                    + "<button id='btnBookingControlReport' class='btn btn-success btn-sm m-t-n-xs' data-toggle='modal' data-target='#bookingControlReport'><i class='fa fa-download'></i>&nbsp;Download</button>"


                    + "</td>"

                    + "</tr>"));

        } else {
        AppendRowtoTable("tblTruckers",
            ("<tr ID='" + item.ID + "'>"

                + "<td class='Name' val='" + item.TabCode + "'>" + item.TabCode + "</td>"

                + "<td >"
                + "<a href='" + item.F_Path + "' class='btn btn-success btn-sm' target='_blank'><i class='fa fa-download'></i> Download</a>"

                + "</td>"

                + "</tr>"));

        }
    });
}

function print_BookingControlReport() {
    debugger;
    if (!CheckValueIsValidInput('#txtBookingReportfromDate')) {
        swal('Sorry', 'Please Choose From Date');
        return;
    } else if (!CheckValueIsValidInput('#txtBookingReportToDate')) {
        swal('Sorry', 'Please Choose To Date');
        return;
    }
    const [day, month, year] = $('#txtBookingReportfromDate').val().split('/');
    const fromDate = `${year}-${month}-${day}`;

    const [day2, month2, year2] = $('#txtBookingReportToDate').val().split('/');
    const toDate = `${year2}-${month2}-${day2}`;

    var arr_Keys = new Array();
    var arr_Values = new Array();
    var ReportName = "BookingControlReport";
    let ReportType;

    arr_Keys.push("i1");
    arr_Values.push($('#bookingReportOption1').prop('checked') ? 1 : 0);
    arr_Keys.push("i2");
    arr_Values.push($('#bookingReportOption2').prop('checked') ? 1 : 0);
    arr_Keys.push("i3");
    arr_Values.push($('#bookingReportOption3').prop('checked') ? 1 : 0);
    arr_Keys.push("i4");
    arr_Values.push($('#bookingReportOption4').prop('checked') ? 1 : 0);
    arr_Keys.push("i5");
    arr_Values.push($('#bookingReportOption5').prop('checked') ? 1 : 0);
    arr_Keys.push("i6");
    arr_Values.push($('#bookingReportOption6').prop('checked') ? 1 : 0);
    arr_Keys.push("from");
    arr_Values.push(fromDate);
    arr_Keys.push("to");
    arr_Values.push(toDate);

    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "Booking Control Report"
        , pReportName: ReportName
        , pReportType: ReportType
    };

    var win = window.open("", "_blank");

    url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '' + '&pReportName=' + pParametersWithValues.pReportName + '' + '&pReportType=' + pParametersWithValues.pReportType + '';

    win.location = url;
}

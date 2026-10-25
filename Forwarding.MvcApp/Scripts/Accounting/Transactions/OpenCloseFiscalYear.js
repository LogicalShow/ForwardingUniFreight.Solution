
//--------------------------------------
function ClearItems() {
    $('#slFiscalYears').html('');


    $('#btnName').html("<b>" + $("input[name='OpenClose']:checked").attr('Tag') + "</b>");
}
//---------------------------------------
var whereclause = "";
var IsCloseYears = 0;
function Fill_FiscalYears() {
    FadePageCover(true);

    ClearItems();
    IsCloseYears = parseInt($("input[name='OpenClose']:checked").val());
    if ($('#txt-Search').val().trim() == '') {
        whereclause = "where Closed = " + IsCloseYears;
    }
    else {
        //Fiscal_Year_Name
        whereclause = "where Fiscal_Year_Name = " + $('#txt-Search').val() + " AND Closed = " + IsCloseYears;
    }
    console.log(whereclause);
    $.ajax({
        type: "GET",
        url: "/api/OpenCloseFiscalYear/LoadAll",
        data: { pWhereClause: whereclause },
        dataType: "json",
        success: function (r) {
            // var Items = JSON.parse(r[0]);

            Fill_SelectInputAfterLoadData(r[0], "ID", "Fiscal_Year_Name", "Select Fiscal Year", '#slFiscalYears', null);
            Fill_SelectInputAfterLoadData(r[1], "ID", "Account_Name", "Select Account", '#slAccount', null);
            FadePageCover(false);
        }
    });
}
//---------------------------------------

function ApplyOpenClose() {
    debugger;
    FadePageCover(true);
    if ($('#slFiscalYears').val() == '0') {

        swal('Excuse me', 'Select Fiscal Year', 'warning');
        FadePageCover(false);

    }
    else if ($('#slAccount').val() == '0' && $("input[name='OpenClose']:checked").val() == "0") {
        swal('Excuse me', 'Select Profit Account', 'warning');
        FadePageCover(false);

    }
    else {
        $.ajax({
            type: "GET",
            url: "/api/OpenCloseFiscalYear/ApplyOpenCloseFiscalYear",
            data: { pID: $('#slFiscalYears').val(), pIsClosed: $("input[name='OpenClose']:checked").val(), pAccountID: $('#slAccount').val() },
            dataType: "json",
            success: function (r) {
                var result = JSON.parse(r[0]);
                FadePageCover(false);
                if (result == true || result == 'true') {
                    FadePageCover(false);
                    swal("Done!", $("input[name='OpenClose']:checked").attr('Tag').trim() + "ed is successfully.");
                    console.log("true");

                    Fill_FiscalYears();
                }
                else {
                    FadePageCover(false);
                    swal("Oops!", "Please, contact your technical support! !", "error");
                    console.log("false");
                }

                FadePageCover(false);

            }
        });
    }
}


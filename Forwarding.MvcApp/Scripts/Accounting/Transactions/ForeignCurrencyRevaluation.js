/// <reference path="D:\Web App\Shipping.Solution\Forwarding.MvcApp\Views/Accounting/Transactions/_ForeignCurrencyRevaluation.cshtml" />
/// <reference path="D:\Web App\Shipping.Solution\Forwarding.MvcApp\Views/Accounting/Transactions/_ForeignCurrencyRevaluation.cshtml" />
/// <reference path="D:\Web App\Shipping.Solution\Forwarding.MvcApp\Views/Accounting/Transactions/_ForeignCurrencyRevaluation.cshtml" />
var whereclause = "";
var ItemTypeNO = 0;
var Accounts = "";
var AccountsIDs = ",";
var CurrencyAccountID = 0;
//--------------------------------------
function AccountLedger_cbCheckAllAccountsChanged() {
    debugger;
    if ($("#cbCheckAllAccounts").prop("checked"))
        $("#div_Accounts input[name=nameCbAccount]").prop("checked", true);
    else
        $("#div_Accounts input[name=nameCbAccount]").prop("checked", false);
}
function ClearItems()
{

    $('#ul_Accounts').html('');
    $('#ul_Accounts').html('');
     whereclause = "";
     Accounts = "";
     AccountsIDs = ",";
     CurrencyAccountID = 0;
     $("#slSubaccount").html('');
     $('#cbCheckAllAccounts').prop('checked', false);
}
//---------------------------------------
function Fill_Accounts()
{
    FadePageCover(true);

    ClearItems();
  
        $.ajax({
            type: "GET",
            url: "/api/ForeignCurrencyRevaluation/LoadAll",
            data: { } ,
            dataType: "json",
            success: function (r)
            {
                var Items = JSON.parse(r[0]);
                debugger;
                Fill_SelectInputAfterLoadData(r[2], "ID", "Account_Name", "Select Foreign Currency Account", '#slForeignCurrencyAccountID', r[1]);
      

                $(Items).each(function (i, item)
                {
                    $('#ul_Accounts').append("<li><input  class='cbItem' name='nameCbAccount' onchange='Details_AccountChanged(" + item.ID + ");' type='checkbox' ID='" + item.ID + "' /><b>&nbsp;" + item.Account_Name + "</b></li>");

                    if (i == (Items.length - 1))
                    {
                        FadePageCover(false);
                    }
                });

                if (Items == null || Items.length == 0)
                {
                    FadePageCover(false);
                }
            }
        });
}
function Details_AccountChanged(pAccountID) {
    debugger;
    $("#slSubaccount").html('');
    $("#slSubaccount").val(0);
    
    var Chk = $('#div_Accounts ul li ').find("input[ID='" + pAccountID   +"'] ").prop('checked');
    if (Chk)
    Details_FillSlSubAccount("slSubaccount", 0, pAccountID);
}
function Details_FillSlSubAccount(pSlName, pSubAccountID, pAccountID) {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
        , {
            pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + pAccountID
            , pOrderBy: "Name"
        }
        , function (pData) {
            FillListFromObject_ERP(pSubAccountID, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), pSlName, pData[0], null);
            if ($("#hDefaultUnEditableCompanyName").val() == "ERP") {
                //Start Auto Filter
                $("#" + pSlName).css({ "width": "80%" }).select2();
                $("div[tabindex='-1']").removeAttr('tabindex');
                $("#" + pSlName).trigger("change");
                //End Auto Filter
            }
            FadePageCover(false);
        }
        , null);
}
//---------------------------------------
function GetSelectedNames(checkedItems)
{
    var items = '';
    $(checkedItems).each(function (i, item) {
        items +=  " - " + "["+$(item).next().text()+"]" ;
    });
    items = (items.trim() + "\r\n\r\n" + " will evaluated to account " + "\r\n\r\n[" + $('#slForeignCurrencyAccountID option:selected').text()) + "]";
    return items.substring(1, (items.length))
}
//---------------------------------------
function CreateJV()
{
  
    // 1- get checked items
    var checkedItems = $('.cbItem:checked');
    //FadePageCover(true);
    if ($(checkedItems).length == 0) {
        swal('Excuse me', 'Select at least one from accounts list', 'warning');
        FadePageCover(false);

    }
    else if ($('#slForeignCurrencyAccountID').val() == '0') {

        swal('Excuse me', 'Select foreign currency account ', 'warning');
        FadePageCover(false);

    }
    else {

        swal({
            title: "Are you sure  ?",
            text: "You will create jv for accounts " ,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "OK , Create !",
            cancelButtonText: "NO",
            closeOnConfirm: true
        },
            function (isConfirm) {
                if (isConfirm) {
                 
                    // loop in checked items
                    FadePageCover(true);
                    $(checkedItems).each(function (i, item) {

                        if ($('#slForeignCurrencyAccountID').val() != $(item).attr('ID')) // Ignore ( duplicate == destination )
                        {

                           // DuplicateItems = DuplicateItems + "-" + $(item).attr('id');

                            AccountsIDs = AccountsIDs + ($(item).attr('ID').trim() == '0' ? "" : ( $(item).attr('ID') + "," ));
                         
                        }

                        if (i == (checkedItems.length - 1)) {
                            debugger;
                           // setTimeout(function () {


                                CurrencyAccountID = $('#slForeignCurrencyAccountID option:selected').val();
                               
                                debugger;
                                var pFromDate = ConvertDateFormat($("#txtDateFrom").val());
                                var pToDate = ConvertDateFormat($("#txtDateTo").val());
                                var pJvRevalueteDate = ConvertDateFormat($("#txtJVDate").val());
                                var pSubAccountsIDs = ($("#slSubaccount").val() == null || $("#slSubaccount").val() == 0) ? -1 : $("#slSubaccount").val()

                                var pParametersWithValues = {
                                    pAccountIDs: AccountsIDs,
                                    pRevaluteAccount: CurrencyAccountID,
                                    pSubAccountsIDs: pSubAccountsIDs,//0,
                                    pExRate: $("#txtExchangeRate").val(),
                                    pCurrencyID: $("#slCurrency").val(),
                                    pFromDate: pFromDate,
                                    pToDate: pToDate,
                                    pJvRevalueteDate: pJvRevalueteDate,
                                    pUserID: 0
                                }

                            //  CallPOSTFunctionWithParameters CallGETFunctionWithParameters
                                CallGETFunctionWithParameters("/api/ForeignCurrencyRevaluation/CreateJV", pParametersWithValues,
                                           function (r) {
                                            var result = JSON.parse(r[0]);

                                            if (result == true || result == 'true') {

                                                swal("Done!", "JV Created  Successfully.");
                                                console.log("true");
                                               // DuplicateItems = "";
                                                Fill_Accounts();
                                            }
                                            else {

                                                swal("Oops!", "Please, contact your technical support! !", "error");
                                                console.log("false");
                                            }

                                            FadePageCover(false);

                                        }
                                    ,null);
             



                           // }, 300);
                        }

                    });





                }
                else {
                    console.log('refuse merge');
                }
            }

        );
    }

  //  console.log(checkedItems);
}
//---------------------------------------
function Fill_SelectInputAfterLoadData_ForCustomers(data, ID_Name , Account_ID, Item_Name, Title, SelectInput_ID, Selected_ID) {

    debugger;

    var option = "";
    option = '<option value="0">' + Title + '</option>';
    $.each(JSON.parse(data), function (i, item) {
        // console.log(item[ID_Name]);


        if (item[ID_Name] == Selected_ID) {

            option += '<option AccountID = "' + item[ID] +'" value="' + item[ID_Name] + '" selected "> ' + (item[Item_Name]).trim() + '</option>';

        }
        else
        {
            if (item[ID] != 0 && item[ID] != '0' && item[ID] != null && item[ID] != 'null')
            {
                option += '<option AccountID = "' + item[ID] + '"  value="' + item[ID_Name] + '"> ' + (item[Item_Name]).trim() + '</option>';
            }
        }
    });


    $(SelectInput_ID).html("");
    $(SelectInput_ID).append(option);





}
//---------------------------------------
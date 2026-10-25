
var whereclause = "";
var ItemTypeNO = 0;
var DuplicateItems = "";
var SubAccountsIDs_ForDuplicateItems = "";
var SubAccountsID_ForDestination = 0;
//--------------------------------------
function ClearItems()
{

    $('#ul_DuplicatedItems').html('');
    $('#slDestinationItems').html('');
    ItemTypeNO = 0;
    whereclause = "";
     DuplicateItems = "";
     SubAccountsIDs_ForDuplicateItems = "";
     SubAccountsID_ForDestination = 0;
}
//---------------------------------------
function Fill_Items()
{
    debugger
    FadePageCover(true);

    ClearItems();
        ItemTypeNO = parseInt($("input[name='ItemType']:checked").val());
        if ($('#txt-Search').val().trim() == '')
        {

            if (ItemTypeNO == 10) // SubAccount
            {
                whereclause = "where IsMain = 0";
                whereclause += " order by SubAccount_Name"
            }
            else
            {

                whereclause = "where 1 = 1";
                whereclause += " order by Name"
            }
        }
        else
        {
            if (ItemTypeNO == 10) // SubAccount
            {
                whereclause = "where IsMain = 0 AND  SubAccount_Name Like N'%" + $('#txt-Search').val() + "%'";
                whereclause += " order by SubAccount_Name"
            }
            else
            {
                whereclause = "where Name Like N'%" + $('#txt-Search').val() + "%'";
                whereclause += " order by Name"
            }
            
        }
         console.log(whereclause);
        $.ajax({
            type: "GET",
            url: "/api/MergeDuplicate/LoadAll",
            data: { pItemType: ItemTypeNO , pWhereClause: whereclause } ,
            dataType: "json",
            success: function (r)
            {
                var Items = JSON.parse(r[0]);
                if (ItemTypeNO == 10) // [SubAccount
                {
                    if (pDefaults.UnEditableCompanyName == "NEW")
                        Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(r[0], "ID", "SubAccount_Number,SubAccount_Name", ' ', "<--Select-->", "#slDestinationItems", null, "", null);
                    else
                        Fill_SelectInputAfterLoadData(r[0], "ID", "SubAccount_Name", "Select [ merge destination ] Item", '#slDestinationItems', null);
                }
                else if (ItemTypeNO == 1) //CUSTOMER
                {
                    Fill_SelectInputAfterLoadData_WithSubAccounyAttr(r[0], "ID", "SubAccountID", "Name", "Select [ merge destination ] Item", '#slDestinationItems', null,true);

                   // Fill_SelectInputAfterLoadData(r[0], "ID", "Name", "Select [ merge destination ] Item", '#slDestinationItems', null);
                }
                else if (ItemTypeNO == 12) //CRM
                {
                    Fill_SelectInputAfterLoadData(r[0], "ID", "Name", "Select [ merge destination ] Item", '#slDestinationItems', null);
                }
                else
                {
                    Fill_SelectInputAfterLoadData_WithSubAccounyAttr(r[0], "ID", "SubAccountID" , "Name", "Select [ merge destination ] Item", '#slDestinationItems', null,false);
                }
                $(Items).each(function (i, item)
                {
                    if (ItemTypeNO == 10)// [SubAccount
                    {
                        if (pDefaults.UnEditableCompanyName == "NEW")
                            $('#ul_DuplicatedItems').append("<li><input onchange='' class='cbItem' type='checkbox' ID='" + item.ID + "' /><b>&nbsp;" + item.SubAccount_Number  + " - " + item.SubAccount_Name + "</b></li>");
                        else
                            $('#ul_DuplicatedItems').append("<li><input onchange='' class='cbItem' type='checkbox' ID='" + item.ID + "' /><b>&nbsp;" + item.SubAccount_Name + "</b></li>");

                    }
                    else
                    {
                        $('#ul_DuplicatedItems').append("<li><input class='cbItem' SubAccountID='" + item.SubAccountID +"' type='checkbox' ID='" + item.ID + "' /><b>&nbsp;" + item.Name + "</b></li>");

                    }
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
//---------------------------------------
function GetSelectedNames(checkedItems)
{
    var items = '';
    $(checkedItems).each(function (i, item) {
        items +=  " - " + "["+$(item).next().text()+"]" ;
    });
    items = (items.trim() + "\r\n\r\n" + "TO" + "\r\n\r\n[" + $('#slDestinationItems option:selected').text()) + "]";
    return items.substring(1, (items.length))
}
//---------------------------------------
function Merge()
{
    // 1- get checked items
    var checkedItems = $('.cbItem:checked');
    //FadePageCover(true);
    if ($(checkedItems).length == 0) {
        swal('Excuse me', 'Select at least one from duplicate Items list', 'warning');
        FadePageCover(false);

    }
    else if ($('#slDestinationItems').val() == '0') {

        swal('Excuse me', 'Select destination item for merge', 'warning');
        FadePageCover(false);

    }
    else {

        swal({
            title: "Are you sure  ?",
            text: "You will merge " + GetSelectedNames($('.cbItem:checked'))  ,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "OK , Merge !",
            cancelButtonText: "NO",
            closeOnConfirm: true
        },
            function (isConfirm) {
                //swal("Poof! Your imaginary file has been deleted!", {
                //    icon: "success",
                //});

                if (isConfirm) {

                    // loop in checked items
                    FadePageCover(true);
                    $(checkedItems).each(function (i, item) {

                        if ($('#slDestinationItems').val() != $(item).attr('id')) // Ignore ( duplicate == destination )
                        {

                            DuplicateItems = DuplicateItems + "-" + $(item).attr('id');

                            if (ItemTypeNO == 12) {
                                SubAccountsIDs_ForDuplicateItems = "";
                            }
                           else if (ItemTypeNO != 10) {
                                SubAccountsIDs_ForDuplicateItems = SubAccountsIDs_ForDuplicateItems + ($(item).attr('SubAccountID').trim() == '0' ? "" : ("-" + $(item).attr('SubAccountID')));
                            }
                        }

                        if (i == (checkedItems.length - 1)) {



                            setTimeout(function () {

                                if (ItemTypeNO == 12) {
                                    SubAccountsID_ForDestination = "";
                                }
                               else if (ItemTypeNO != 10) {
                                    SubAccountsID_ForDestination = $('#slDestinationItems option:selected').attr('SubAccountID');
                                }



                                if (DuplicateItems.trim() == "" || DuplicateItems.trim() == "-") {
                                    swal('Sorry', 'It is illogical to merge same item by itself', 'warning');
                                    FadePageCover(false);
                                }
                                else {
                                    debugger;
                                    console.log(DuplicateItems);

                                    if (SubAccountsID_ForDestination == "" || SubAccountsID_ForDestination == undefined)
                                        SubAccountsID_ForDestination = 0;

                                    //Merge ? pItemType = 1 & pDuplicateItemsIDs=-28618 - 28865 & pDestinationItemID=28818 & pSubAccountsIDs_ForDuplicateItems=-1499 - 1500 & _=1735809060327
                                    $.ajax({
                                        type: "GET",
                                        url: "/api/MergeDuplicate/Merge",
                                        data: {
                                            pItemType: ItemTypeNO, pDuplicateItemsIDs: DuplicateItems
                                            , pDestinationItemID: $('#slDestinationItems').val()
                                            , pSubAccountsIDs_ForDuplicateItems: SubAccountsIDs_ForDuplicateItems
                                            ,  pSubAccountFor_DestinationItemID: SubAccountsID_ForDestination ,
                                        },
                                        dataType: "json",
                                        success: function (r) {
                                            var result = JSON.parse(r[0]);

                                            if (result == true || result == 'true') {

                                                swal("Done!", "Merged is successfully.");
                                                console.log("true");
                                                DuplicateItems = "";
                                                Fill_Items();
                                            }
                                            else {
                                                if (r[1] != '')
                                                    swal("Oops!", r[1], "error");
                                              else
                                                swal("Oops!", "Please, contact your technical support! !", "error");
                                            }

                                            FadePageCover(false);

                                        }
                                    });
                                }




                            }, 300);
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
function Fill_SelectInputAfterLoadData_WithSubAccounyAttr(data, ID_Name , SubAccount_ID, Item_Name, Title, SelectInput_ID, Selected_ID,pWithoutSubAccount) {



    var option = "";
    option = '<option value="0">' + Title + '</option>';
    $.each(JSON.parse(data), function (i, item) {
        // console.log(item[ID_Name]);


        if (item[ID_Name] == Selected_ID) {

            option += '<option SubAccountID = "' + item[SubAccount_ID] +'" value="' + item[ID_Name] + '" selected "> ' + (item[Item_Name]).trim() + '</option>';

        }
        else
        {
            if (pWithoutSubAccount ||
                (item[SubAccount_ID] != 0 && item[SubAccount_ID] != '0' && item[SubAccount_ID] != null && item[SubAccount_ID] != 'null'))
            {
                option += '<option SubAccountID = "' + item[SubAccount_ID] + '"  value="' + item[ID_Name] + '"> ' + (item[Item_Name]).trim() + '</option>';
            }
        }
    });


    $(SelectInput_ID).html("");
    $(SelectInput_ID).append(option);





}
//---------------------------------------
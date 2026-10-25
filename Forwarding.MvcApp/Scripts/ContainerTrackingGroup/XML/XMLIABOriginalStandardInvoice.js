
function XMLIABOriginalStandardInvoice_Initialize() {
    debugger;

    

    var TodaysDate = new Date();
    var CurrentYear = TodaysDate.getUTCFullYear();
    var CurrentMonth = (TodaysDate.getMonth() + 1).toString().padStart(2, 0);
    $("#hl-menu-ContainerTrackingGroup").parent().siblings().removeClass("active");
    $("#hl-menu-ContainerTrackingGroup").parent().addClass("active");
    strBindTableRowsFunctionName = "XMLIABOriginalStandardInvoice_BindTableRows";
    strLoadWithPagingFunctionName = "/api/XMLIABOriginalStandardInvoice/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    var pWhereClause = "WHERE 1=1";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/ContainerTrackingGroup/XMLTab/XMLIABOriginalStandardInvoice", "div-content", function () {
            LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                , function (pData) {
                    var pOperations = pData[0];
                    
                    FillListFromObject(null, 1, TranslateString("SelectFromMenu"), "slMasterOperations", pOperations, function () {  });

                    $("#slMasterOperations").css({ "width": "100%" }).select2();
                    $("div[tabindex='-1']").removeAttr('tabindex');

                });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { XMLIABOriginalStandardInvoice_ClearAllControls(); },
        function () { XMLIABOriginalStandardInvoice_DeleteList(); });
}

function GenerateXML_IABOriginalStandardInvoice() {
    debugger;
    var OperationID = $("#slMasterOperations").val();

    if (OperationID == "") {
        swal(strSorry, "Please Select an Operation First");
    } else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/XMLIABOriginalStandardInvoice/GenerateXML_IABOriginalStandardInvoice"
        , { pOperationID: OperationID }
        , function (pData) {
            debugger;
            var XMLData = prettifyXml(pData[0]);

            //// SaveTextToFile(type, filename, data);
            //SaveTextToFile('text/xml', 'test', XMLData);


            // Open to a new tab
            OpenXMLInNewTab(XMLData);

            FadePageCover(false);

        });
    }
    
}


function ReadFromXML_IABOriginalStandardInvoice(event, pBtnName) {
    debugger;
    var selectedFile = event.target.files[0];
    if (selectedFile != undefined) { //to handle the case of not choosing a file
        var sFilename = selectedFile.name;
        // Create A File Reader HTML5
        var reader = new FileReader();

        var result = document.getElementById("hExtractedData");
        reader.onload = function (e) {
            var XMLData = e.target.result;

            debugger;


            // Remove All & if exist
            XMLData = XMLData.replaceAll('&', ' and ');

            // Remove new lines and tabs
            // Remove Spaces between tags   e.g.    <tag1>some text</tag1>   <tag2>some text</tag2>     >>>>   <tag1>some text</tag1><tag2>some text</tag2>
            XMLData = XMLData.replaceAll('\r\n', '').replaceAll('\t', '').replace(new RegExp('\>[ ]+\<', 'g'), '><')

            XMLData = XMLData.replace('"xmlns:xsi=', '" xmlns:xsi=');


            /****** IABOriginalStandardInvoice Start ******/
            if (XMLData.includes('<Invoice')) {
                // ChargeDetails
                XMLData = XMLData.replaceAll('</InvoicePartnerDetails><ChargeDetails>', '</InvoicePartnerDetails><ChargeDetailsAll><ChargeDetails>');
                XMLData = XMLData.replaceAll('</ChargeDetails><TotalAmountDetails>', '</ChargeDetails></ChargeDetailsAll><TotalAmountDetails>');

                // CargoDetails
                XMLData = XMLData.replaceAll('</TotalAmountDetails><CargoDetails>', '</TotalAmountDetails><CargoDetailsAll><CargoDetails>');
                XMLData = XMLData.replaceAll('</CargoDetails><InvoiceDocumentation>', '</CargoDetails></CargoDetailsAll><InvoiceDocumentation>');

            }

            /****** IABOriginalStandardInvoice End ******/




            console.log(XMLData);
            debugger;
            var pParametersWithValues = {
                pXMLData: XMLData
            };
            CallPOSTFunctionWithParameters("/api/XMLIABOriginalStandardInvoice/InsertFromXML", pParametersWithValues
                , function (pData) {
                    var _ReturnedMessage = pData[0];
                    if (_ReturnedMessage == "")
                        swal("Success", "Saved successfully.");
                    else
                        swal("Sorry", _ReturnedMessage);
                    FadePageCover(false);
                    console.log(pData[1]);
                    console.log(pData[2]);
                }
                , null);


        };
        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(selectedFile);
    }
}
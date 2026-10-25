
function XMLFileBL_Initialize() {
    debugger;

    var TodaysDate = new Date();
    var CurrentYear = TodaysDate.getUTCFullYear();
    var CurrentMonth = (TodaysDate.getMonth() + 1).toString().padStart(2, 0);
    $("#hl-menu-ContainerTrackingGroup").parent().siblings().removeClass("active");
    $("#hl-menu-ContainerTrackingGroup").parent().addClass("active");
    strBindTableRowsFunctionName = "XMLFileBL_BindTableRows";
    strLoadWithPagingFunctionName = "/api/XMLFileBL/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    var pWhereClause = "WHERE 1=1";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/ContainerTrackingGroup/XMLTab/XMLFileBL", "div-content", function () {

        IntializeOperationAutoCompleteSearch();
        ConfigureAfterOperationChangeEvent();

            LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                , function (pData) {
                    var pOperations = pData[0];
                    
                    //FillListFromObject(null, 1, TranslateString("SelectFromMenu"), "slMasterOperations", pOperations, function () {  });

                    //$("#slMasterOperations").css({ "width": "100%" }).select2();
                    $("div[tabindex='-1']").removeAttr('tabindex');

                });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
   
    },
        function () { XMLFileBL_ClearAllControls(); },
        function () { XMLFileBL_DeleteList(); });
}
function IntializeOperationAutoCompleteSearch()
{
    var allParams = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: 1, pPageSize: 10, pWhereClause: " where 1=1 ", pOrderBy: " ID " };
    $("#slMasterOperations").css({ 'width': '100%' }).select2({
        minimumInputLength: 1,
        tags: [],
        ajax: {
            url: strServerURL + "/api/XMLFileBL/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
            dataType: 'json',
            type: "GET",
            contentType: "application/json; charset=utf-8",
            quietMillis: 50,
            data: function (params) {
                allParams.pWhereClause = " where BLType = 3 and CodeSerial = " + params.term+" ";
                return allParams;
            },
            processResults: function (data) {

                var d = JSON.parse(data[0]);
                return {

                    results: $.map(d, function (item) {
                        return {
                            text: item.Code + " / " + IsNull(item.ClientName, "0"),
                            clientid: item.ClientID,
                            id: item.ID,
                            value: item.ID
                        };
                    })
                };
            }
        }
    });
}
function ConfigureAfterOperationChangeEvent()
{
    $("#slMasterOperations").off('change').on('change', function ()
    {
        if ($("#slMasterOperations").val() == $("#slMasterOperations option:selected").text())
        {
            swal('اختيار عملية خاطئء - Is Not Correct Selected Operation');
        }
    });
}

function GenerateXML() {
    debugger;
    var type = $('#slXmlTypes').val();
    if (IsNull(type, '') == '')
    {
        swal(strSorry, "Please Select XML File Type");
        return;
    }

    var OperationID = $("#slMasterOperations").val();
    if (OperationID == "") {
        swal(strSorry, "Please Select an Operation First");
        return;
    }
   
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/XMLFileBL/GenerateXML"
    , { pOperationID: OperationID, pXmlFileType: type }
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


function ReadFromXML_FileBL(event, pBtnName) {
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

            ///****** Schedule Start ******/
            //if (XMLData.includes('<RoutingDetails>')) {
            //    XMLData = XMLData.replace('<RoutingDetails>', '<RoutingDetailsAll><RoutingDetails>');
            //    XMLData = XMLData.replace('</ScheduleDetails>', '</RoutingDetailsAll></ScheduleDetails>');
            //}
            ///****** Schedule End ******/


            ///****** ShipmentStatus Start ******/

            ///****** ShipmentStatus End ******/

            ///****** IABOriginalStandardInvoice Start ******/
            //if (XMLData.includes('<Invoice')) {
            //    // ChargeDetails
            //    XMLData = XMLData.replaceAll('</InvoicePartnerDetails><ChargeDetails>', '</InvoicePartnerDetails><ChargeDetailsAll><ChargeDetails>');
            //    XMLData = XMLData.replaceAll('</ChargeDetails><TotalAmountDetails>', '</ChargeDetails></ChargeDetailsAll><TotalAmountDetails>');

            //    // CargoDetails
            //    XMLData = XMLData.replaceAll('</TotalAmountDetails><CargoDetails>', '</TotalAmountDetails><CargoDetailsAll><CargoDetails>');
            //    XMLData = XMLData.replaceAll('</CargoDetails><InvoiceDocumentation>', '</CargoDetails></CargoDetailsAll><InvoiceDocumentation>');

            //}

            ///****** IABOriginalStandardInvoice End ******/


            /****** FileBL Start ******/
            if (XMLData.includes('<FileBL')) {

                // Container Details of Master Operation and Bill of Lading Details
                XMLData = XMLData.replaceAll('</DestinationName></RoutingDetails><ContainerDetails>', '</DestinationName></RoutingDetails><ContainerDetailsAllMaster><ContainerDetailsMaster>');  // in case DestinationName is not Self Closing Tag
                XMLData = XMLData.replaceAll('<DestinationName/></RoutingDetails><ContainerDetails>', '<DestinationName/></RoutingDetails><ContainerDetailsAllMaster><ContainerDetailsMaster>');  // in case DestinationName is a Self Closing Tag
                XMLData = XMLData.replaceAll('</ContainerDetails><BillOfLadingDetails>', '</ContainerDetailsMaster></ContainerDetailsAllMaster><BillOfLadingDetails>');
                // Replace </ContainerDetails> tags in Master Operation
                XMLData = XMLData.replaceAll('</UOM></ContainerDetails>', '</UOM></ContainerDetailsMaster>');   // in case UOM is not Self Closing Tag
                XMLData = XMLData.replaceAll('<UOM/></ContainerDetails>', '<UOM/></ContainerDetailsMaster>');   // in case UOM is a Self Closing Tag
                XMLData = XMLData.replaceAll('</ContainerDetailsMaster><ContainerDetails>', '</ContainerDetailsMaster><ContainerDetailsMaster>');


                // Container Details of Bill of Lading Details
                XMLData = XMLData.replaceAll('</EtaDestination></RoutingDetails><ContainerDetails>', '</EtaDestination></RoutingDetails><ContainerDetailsAll><ContainerDetails>');          // in case EtaDestination is not Self Closing Tag
                XMLData = XMLData.replaceAll('<EtaDestination/></RoutingDetails><ContainerDetails>', '<EtaDestination/></RoutingDetails><ContainerDetailsAll><ContainerDetails>');          // in case EtaDestination is a Self Closing Tag
                XMLData = XMLData.replaceAll('</ContainerDetails><GeneralBlDetails>', '</ContainerDetails></ContainerDetailsAll><GeneralBlDetails>');

                // in the above two blocks of code, to differentiate between </RoutingDetails><ContainerDetails> in the master operation and the child operations,
                // we used DestinationName and EtaDestination as the differentiator



                // BillOfLadingDetails
                XMLData = XMLData.replace('</ContainerDetailsAllMaster><BillOfLadingDetails>', '</ContainerDetailsAllMaster><BillOfLadingDetailsAll><BillOfLadingDetails>');
                XMLData = XMLData.replace('</BillOfLadingDetails></FileBLDetails>', '</BillOfLadingDetails></BillOfLadingDetailsAll></FileBLDetails>');

                // AddressDetails
                XMLData = XMLData.replaceAll('</ACIDDetails><AddressDetails>', '</ACIDDetails><AddressDetailsAll><AddressDetails>');
                XMLData = XMLData.replaceAll('</AddressDetails><RoutingDetails>', '</AddressDetails></AddressDetailsAll><RoutingDetails>');

                // Commodity
                XMLData = XMLData.replaceAll('</Packaging><Commodity', '</Packaging><CommodityAll><Commodity');     // in case Packaging is not Self Closing Tag
                XMLData = XMLData.replaceAll('<Packaging/><Commodity', '<Packaging/><CommodityAll><Commodity');     // in case Packaging is a Self Closing Tag

                XMLData = XMLData.replaceAll('</Commodity><HSCode', '</Commodity></CommodityAll><HSCode');          // in case Commodity is not Self Closing Tag
                XMLData = XMLData.replaceAll('<Commodity/><HSCode', '<Commodity/></CommodityAll><HSCode');          // in case Commodity is a Self Closing Tag

                XMLData = XMLData.replaceAll('<Commodity>', '<Commodity><Commodity_Name>');
                XMLData = XMLData.replaceAll('</Commodity>', '</Commodity_Name></Commodity>');


                // Marks
                XMLData = XMLData.replaceAll('</UOM><Marks', '</UOM><MarksAll><Marks');                             // in case UOM is not Self Closing Tag
                XMLData = XMLData.replaceAll('<UOM/><Marks', '<UOM/><MarksAll><Marks');                             // in case UOM is a Self Closing Tag

                XMLData = XMLData.replaceAll('</Marks><CargoImageURL', '</Marks></MarksAll><CargoImageURL');        // in case Marks is not Self Closing Tag
                XMLData = XMLData.replaceAll('<Marks/><CargoImageURL', '<Marks/></MarksAll><CargoImageURL');        // in case Marks is a Self Closing Tag

                XMLData = XMLData.replaceAll('<Marks>', '<Marks><Marks_Name>');
                XMLData = XMLData.replaceAll('</Marks>', '</Marks_Name></Marks>');


                // Marks in <GeneralBlDetails>
                XMLData = XMLData.replaceAll('<GeneralBlDetails><Marks', '<GeneralBlDetails><MarksAll><Marks');

                XMLData = XMLData.replaceAll('</Marks><Description', '</Marks></MarksAll><Description');            // in case Marks is not Self Closing Tag
                XMLData = XMLData.replaceAll('<Marks/><Description', '<Marks/></MarksAll><Description');            // in case Marks is a Self Closing Tag

                //XMLData = XMLData.replaceAll('<Marks>', '<Marks><Marks_Name>');
                //XMLData = XMLData.replaceAll('</Marks>', '</Marks_Name></Marks>');

                // Description
                XMLData = XMLData.replaceAll('</MarksAll><Description', '</MarksAll><DescriptionAll><Description');

                XMLData = XMLData.replaceAll('</Description><TaxID', '</Description></DescriptionAll><TaxID');      // in case Description is not Self Closing Tag
                XMLData = XMLData.replaceAll('<Description/><TaxID', '<Description/></DescriptionAll><TaxID');      // in case Description is a Self Closing Tag

                XMLData = XMLData.replaceAll('<Description>', '<Description><Description_Name>');
                XMLData = XMLData.replaceAll('</Description>', '</Description_Name></Description>');

            }
            /****** FileBL End ******/


            ///****** OBLInstruction Start ******/
            //if (XMLData.includes('<OBLInstruction')) {
            //    // BLRemarks
            //    XMLData = XMLData.replace('</CustomerEmail>', '</CustomerEmail><BLRemarksAll>');
            //    XMLData = XMLData.replace('<Instruction>', '</BLRemarksAll><Instruction>');
            //    XMLData = XMLData.replaceAll('<BLRemarks>', '<BLRemarks><BLRemarks_Name>');
            //    XMLData = XMLData.replaceAll('</BLRemarks>', '</BLRemarks_Name></BLRemarks>');

            //    // Address
            //    XMLData = XMLData.replace('</Instruction>', '</Instruction><AddressAll>');
            //    XMLData = XMLData.replace('<Routing>', '</AddressAll><Routing>');

            //    // CargoDescription
            //    XMLData = XMLData.replace('</TerminalOperatorSeal>', '</TerminalOperatorSeal><CargoDescriptionAll>');
            //    XMLData = XMLData.replace('</OBLInstructionDetails>', '</CargoDescriptionAll></OBLInstructionDetails>');

            //    // HSCode
            //    XMLData = XMLData.replaceAll('</PackageType>', '</PackageType><HSCodeAll>');
            //    XMLData = XMLData.replaceAll('<UOM>', '</HSCodeAll><UOM>');
            //    XMLData = XMLData.replaceAll('<HSCode>', '<HSCode><HSCode_Name>');
            //    XMLData = XMLData.replaceAll('</HSCode>', '</HSCode_Name></HSCode>');

            //    // Commodity
            //    // ...

            //    // Marks
            //    // ...

            //}
            ///****** OBLInstruction End ******/

            console.log(XMLData);
            debugger;
            var pParametersWithValues = {
                pXMLData: XMLData
            };
            CallPOSTFunctionWithParameters("/api/XMLFileBL/InsertFromXML", pParametersWithValues
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

function XmlTypeChanged()
{
    var type = $('#slXmlTypes').val();
    switch (type) {
        case "SailingSchedule":
        case "ShipmentStatus":
        case "InvoiceAcknowledgement":
            $('#btnGenerateXML').removeClass('hide');
            $('#btnReadFromXML').addClass('hide');
            break;
        case "FileBl": ;
        case "InterAllianceBilling": 
            $('#btnGenerateXML,#btnReadFromXML').removeClass('hide');
            break;
        default:
            $('#btnGenerateXML,#btnReadFromXML').addClass('hide');
            break;
    }
}
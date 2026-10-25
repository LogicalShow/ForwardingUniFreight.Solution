var pOperationHeader_Global = null;
var TodaysDate = new Date();
var FormattedTodaysDate = TodaysDate.toLocaleDateString();
function DebitAndCreditClose_Initialize() {
   // $.getScript(strServerURL + '/Scripts/ContainerTrackingGroup/ContainerTracking/ContainerTracking.js', null);
   // $.getScript(strServerURL + '/Scripts/Operations/Operations/Payables.js', null);
   // $.getScript(strServerURL + '/Scripts/Operations/Operations/Receivables.js', null);
    ////$.getScript(strServerURL + '/Scripts/Operations/Operations/DocsOut.js', null);
    
    strLoadWithPagingFunctionName = "/api/Operations/LoadAll";
    LoadView("/ReceiptsAndPayments/Transactions/DebitAndCreditClose", "div-content", function () {

      //  LoadView("/MasterData/ModalSelectCharges", "div-content", function () { $("#slPayableBillTo").parent().addClass("hide"); $("#btn-SetDefaultNote").parent().addClass("hide"); }, null, null, true);//sherif: calling a partial view with only modal called from different places
       // LoadView("/Quotations/QuotationsEdit", "divHidden", function () { $("#divHidden").children().addClass("hide"); }, null, null, true);

        //CallGETFunctionWithParameters(strLoadWithPagingFunctionName
        //    , {
        //        pWhereClause: "WHERE (BLType <> 2 AND OperationStageID = 120) OR id IN (SELECT id FROM operations op WHERE op.BLType <> 2 AND (EXISTS (SELECT 1 FROM invoices inv INNER JOIN InvoiceApprovedJVs jv ON inv.id = jv.invoiceid WHERE inv.OperationID = op.id AND jv.ApprovedDate < DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1)) OR EXISTS (SELECT 1 FROM operations op_master INNER JOIN invoices inv ON op_master.id = inv.OperationID INNER JOIN InvoiceApprovedJVs jv ON inv.id = jv.invoiceid WHERE op_master.masteroperationid = op.id AND jv.ApprovedDate < DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1))))"

        //    }



        //    , function (pData) {
        //        var _Operation = pData[0];
        //        FillListFromObject(null, 1, "<--Select-->", "slFilterOperation", _Operation, null);
        //        FadePageCover(false);
        //    }
        //    , null);



        Select2OnlineSearch("slFilterOperation", strLoadWithPagingFunctionName, function (params) {
            let opSerial = parseInt(params.term);
            var query = {
                pWhereClause: "WHERE Code LIKE  N'%-" + opSerial + "%' and ((BLType <> 2 AND OperationStageID = 120) OR id IN (SELECT id FROM operations op WHERE op.BLType <> 2 AND (EXISTS (SELECT 1 FROM invoices inv INNER JOIN InvoiceApprovedJVs jv ON inv.id = jv.invoiceid WHERE inv.OperationID = op.id AND jv.ApprovedDate < DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1)) OR EXISTS (SELECT 1 FROM operations op_master INNER JOIN invoices inv ON op_master.id = inv.OperationID INNER JOIN InvoiceApprovedJVs jv ON inv.id = jv.invoiceid WHERE op_master.masteroperationid = op.id AND jv.ApprovedDate < DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1)))))"

            }
            return query;
        }, function (data) {
            var Operations = JSON.parse(data[0]);
            return {

                results: $.map(Operations, function (item) {
                    return {
                        text: item.Code,
                        id: item.ID,
                        value: item.ID
                    };
                })
            };
        }, 2, 2000);


        CallGETFunctionWithParameters("/api/ChargeTypeGroup/LoadAll"
            , { pWhereClause: "WHERE 1=1 " }
            , function (pData) {
                var Categories = pData[0];
                FillListFromObject(null, 2, "<--Select-->", "slReceivableCategory", Categories, null);
                FillListFromObject(null, 2, "<--Select-->", "slPayableCategory", Categories, null);

                FadePageCover(false);
            }
            , null);



        $("#slAccNoteCurrency").html($("#hReadySlCurrencies").html());

        if (pDefaults.IsTaxOnItems)
            $(".classShowForTaxOnItems").removeClass("hide");
        else
            $(".classShowForTaxOnHeader").removeClass("hide");

        if (IsMESCOCompany) {
            $(".ShowForMescoCompaniesOnly").removeClass("hide");
            $(".classShowForMesco").removeClass("hide");
        } else {
            $(".ShowForMescoCompaniesOnly").addClass("hide");
        }

   

        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        null);



}

/****************************************OperationCharges Fns**********************************************/
function DebitAndCreditClose_FillModal() {
    debugger;
    if (glbFormCalled == "DebitAndCreditClose") {
        $("#OperationChargeModal").removeClass("hide");
    }
    if ($("#slFilterOperation").val() == "")
        swal("Sorry", "Please, select an operation.");
    else {
        jQuery("#OperationChargeModal").modal("show");
        $('#hOperationID').val($("#slFilterOperation").val());
        FadePageCover(true);
        $("#tblPayables tbody").html("");
        $("#tblReceivables tbody").html("");
        $("#lblOperationChargeShown").html(": " + $("#slFilterOperation option:selected").text());

        if (pDefaults.UnEditableCompanyName == "MED") {

            $("#btn-DeleteReceivable").addClass("hide");
            $("#btn-DeletePayable").addClass("hide");
        }

        CallGETFunctionWithParameters("api/QuotationCharges/GetOperationPayablesAndReceivables"
            , {
                pOperationID: $("#slFilterOperation").val()
                , pQuotationRouteID: 0
                , pOperationVehicleID: 0
                , pTruckingOrderID: 0
                , pCodeSearch: 0
                , pIsClosedOperation: true
            }
            , function (pData) {
                if (pData[0]) {
                    var pPayables = JSON.parse(pData[1]);
                    var pReceivables = JSON.parse(pData[2]);
                    if (pDefaults.UnEditableCompanyName == "MED") {
                        let receivablesIDs = pReceivables.map(item => item.ID);
                        receivablesIDs = receivablesIDs.join(",");
                        let payablesIDs = pPayables.map(item => item.ID);
                        payablesIDs = payablesIDs.join(",");
                        let hasError = true;
                        CallGETFunctionWithParameters("api/ReceivablesDraft/InsertDraftReceivableFromReceivable", { pReceivablesIDs: receivablesIDs, pT: false }, function (data) {

                            if (data[0] == true) {
                                hasError = false;
                            } else {
                                hasError = true;
                                swal("Sorry", "Error Happened.");
                            }

                        }, null, false);
                        //hasError = true;
                        if (hasError == false) {
                            CallGETFunctionWithParameters("api/PayablesDraft/InsertDraftPayableFromPayable", { pPayablesIDs: payablesIDs, pT: false }, function (data) {

                                if (data[0] == true) {
                                    hasError = false;
                                } else {
                                    hasError = true;
                                    swal("Sorry", "Error Happened.");
                                }

                            }, null, false);
                        }

                        if (hasError == false) {
                            CallGETFunctionWithParameters("api/ReceivablesDraft/GetOperationDraftPayablesAndReceivables", {
                                pOperationID: $("#slFilterOperation").val()
                                , pQuotationRouteID: 0
                                , pOperationVehicleID: 0
                                , pTruckingOrderID: 0
                                , pCodeSearch: 0
                                , pIsClosedOperation: true
                            }, function (pData) {
                                var pPayables = JSON.parse(pData[1]);
                                var pReceivables = JSON.parse(pData[2]);
                                PayablesDraft_BindTableRows(pPayables);
                                ReceivablesDraft_BindTableRows(pReceivables);
                            }, null);
                        }
                        debugger;
                    } else {
                        Payables_BindTableRows(pPayables);
                        Receivables_BindTableRows(pReceivables);
                    }
                } else
                    swal("Sorry", "Connection failed, please try again later.");
                FadePageCover(false);
            }
            , null);




        if ($("#hf_CanAdd").val() == '0') {
            $("#divPayBtns").addClass('hide');
            $("#divRecBtns").addClass('hide');


        } else {

            $("#divPayBtns").removeClass('hide');
            $("#divRecBtns").removeClass('hide');


        }
    }
}

function DebitAndCreditClose_Payables_GetAvailableCharges() {
    debugger;
    $("#divSelectCharges").html("");
    FadePageCover(true);
    var pStrFnName = "/api/ChargeTypes/LoadAll";
    var pDivName = "divSelectCharges";
    var ptblModalName = "tblModalPayables";
    var pCheckboxNameAttr = "cbSelectCharges";
    var pWhereClause = "";
    pWhereClause += " WHERE IsUsedInPayable = 1 AND IsInactive = 0 AND IsOperationChargeType=1 ";
    pWhereClause += ($("#cbIsOcean").prop('checked') == true ? " AND IsOcean = 1 " : "");
    pWhereClause += ($("#cbIsAir").prop('checked') == true ? " AND IsAir = 1 " : "");
    pWhereClause += ($("#cbIsInland").prop('checked') == true ? " AND IsInland = 1 " : "");
    pWhereClause += " AND ( Code LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR Name LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
            $("#btnSelectChargesApply").attr("onclick", "DebitAndCreditClose_Payables_InsertListWithoutValues(false);");
            FadePageCover(false);
        }
        , 1/*pCodeOrName*/);

    $("#btn-SearchCharges").attr("onclick", "DebitAndCreditClose_Payables_GetAvailableCharges();");
}
function DebitAndCreditClose_Payables_InsertListWithoutValues(pSaveandAddNew) {
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectCharges");//returns string array of IDs
    debugger;
    if (pSelectedIDs.includes("16410")) {

        swal(strSorry, '');
    }

    else if (pSelectedIDs != "") {
        FadePageCover(true);
        InsertSelectedCheckboxItems("/api/Payables/InsertListWithoutValues"
            , {
                pOperationID: $("#slFilterOperation").val(), pSelectedIDs: pSelectedIDs, pQuotationRouteID: 0
                , pOperationContainersAndPackagesID: 0, pOperationVehicleID: 0, pTruckingOrderID: 0
                , pQuotationChargeIDs: null, pIsClosedOperation: true
            }
            , pSaveandAddNew
            , "SelectChargesModal" //pModalID
            , null //function () { Payables_GetAvailableCharges(); }
            , function () {
                if (pSelectedIDs.includes("16410")) {

                    InsertSelectedCheckboxItems("/api/Receivables/InsertListWithoutValues"
                        , {
                            pOperationID: $("#slFilterOperation").val(), pSelectedIDs: "16410", pQuotationRouteID: 0
                            , pOperationContainersAndPackagesID: 0, pOperationVehicleID: 0, pTruckingOrderID: 0
                            , pIsClosedOperation: true
                        }
                        , pSaveandAddNew
                        , "SelectChargesModal" //pModalID
                        , null //function () { Receivables_GetAvailableCharges(); }
                        , function () {
                            DebitAndCreditClose__FillPayablesAndReceivables($("#slFilterOperation").val(), $("#hID").val());
                            //FadePageCover(false); //will be done in binding Pay&Rec rows
                        });



                }
                else
                DebitAndCreditClose__FillPayablesAndReceivables($("#slFilterOperation").val(), $("#hID").val());
                //FadePageCover(false); //will be done in binding Pay&Rec rows
            });
    }
}

function DebitAndCreditClose_Receivables_GetAvailableCharges() {
    $("#divSelectCharges").html("");
    FadePageCover(true);
    var pStrFnName = "/api/ChargeTypes/LoadAll";
    var pDivName = "divSelectCharges";
    var ptblModalName = "tblModalReceivables";
    var pCheckboxNameAttr = "cbSelectCharges";
    var pWhereClause = "";
    pWhereClause += " WHERE IsUsedInReceivable = 1 AND IsInactive = 0 AND IsOperationChargeType=1 ";
    pWhereClause += ($("#cbIsOcean").prop('checked') == true ? " AND IsOcean = 1 " : "");
    pWhereClause += ($("#cbIsAir").prop('checked') == true ? " AND IsAir = 1 " : "");
    pWhereClause += ($("#cbIsInland").prop('checked') == true ? " AND IsInland = 1 " : "");
    pWhereClause += " AND ( Code LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR Name LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    //pWhereClause += " AND ID NOT IN (SELECT ChargeTypeID from Receivables ";
    //pWhereClause += "                WHERE OperationID = " + $("#hOperationID").val() + ") ";
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
            FadePageCover(false);
        }, 1/*pCodeOrName*/);
    $("#btn-SearchCharges").attr("onclick", "DebitAndCreditClose_Receivables_GetAvailableCharges();");
    $("#btnSelectChargesApply").attr("onclick", "DebitAndCreditClose_Receivables_InsertListWithoutValues(false);");

}
function DebitAndCreditClose_Receivables_InsertListWithoutValues(pSaveandAddNew) {
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectCharges");//returns string array of IDs
    debugger;

    if (pSelectedIDs.includes("16410")) {

        swal(strSorry, '');
    }

    else if (pSelectedIDs != "") {
        FadePageCover(true);
        InsertSelectedCheckboxItems("/api/Receivables/InsertListWithoutValues"
            , {
                pOperationID: $("#slFilterOperation").val(), pSelectedIDs: pSelectedIDs, pQuotationRouteID: 0
                , pOperationContainersAndPackagesID: 0, pOperationVehicleID: 0, pTruckingOrderID: 0
                , pIsClosedOperation: true
            }
            , pSaveandAddNew
            , "SelectChargesModal" //pModalID
            , null //function () { Receivables_GetAvailableCharges(); }
            , function () {
                if (pSelectedIDs.includes("16410")) {

                    InsertSelectedCheckboxItems("/api/Payables/InsertListWithoutValues"
                        , {
                            pOperationID: $("#slFilterOperation").val(), pSelectedIDs: "16410", pQuotationRouteID: 0
                            , pOperationContainersAndPackagesID: 0, pOperationVehicleID: 0, pTruckingOrderID: 0
                            , pIsClosedOperation: true
                        }
                        , pSaveandAddNew
                        , "SelectChargesModal" //pModalID
                        , null //function () { Receivables_GetAvailableCharges(); }
                        , function () {
                            DebitAndCreditClose__FillPayablesAndReceivables($("#slFilterOperation").val(), $("#hID").val());
                            //FadePageCover(false); //will be done in binding Pay&Rec rows
                        });



                }
                else
                    DebitAndCreditClose__FillPayablesAndReceivables($("#slFilterOperation").val(), $("#hID").val());
                //FadePageCover(false); //will be done in binding Pay&Rec rows
            });
    }
}
function DebitAndCreditClose__FillPayablesAndReceivables(pOperationID, pOperationContainerAndPackagesID) {
    debugger;
    jQuery("#AccNoteModal").modal("hide");

    FadePageCover(true);
    CallGETFunctionWithParameters("api/QuotationCharges/GetOperationPayablesAndReceivables"
        , {
            pOperationID: $("#slFilterOperation").val()
            , pQuotationRouteID: 0
            , pOperationVehicleID: 0
            , pTruckingOrderID: 0
            , pCodeSearch: 0
            , pIsClosedOperation: true
        }
        , function (pData) {
            if (pData[0]) {
                var pPayables = JSON.parse(pData[1]);
                var pReceivables = JSON.parse(pData[2]);
                if (pDefaults.UnEditableCompanyName == "MED") {
                    let receivablesIDs = pReceivables.map(item => item.ID);
                    receivablesIDs = receivablesIDs.join(",");
                    let payablesIDs = pPayables.map(item => item.ID);
                    payablesIDs = payablesIDs.join(",");
                    let hasError = true;
                    CallGETFunctionWithParameters("api/ReceivablesDraft/InsertDraftReceivableFromReceivable", { pReceivablesIDs: receivablesIDs, pT: false }, function (data) {

                        if (data[0] == true) {
                            hasError = false;
                        } else {
                            hasError = true;
                            swal("Sorry", "Error Happened.");
                        }

                    }, null, false);
                    //hasError = true;
                    if (hasError == false) {
                        CallGETFunctionWithParameters("api/PayablesDraft/InsertDraftPayableFromPayable", { pPayablesIDs: payablesIDs, pT: false }, function (data) {

                            if (data[0] == true) {
                                hasError = false;
                            } else {
                                hasError = true;
                                swal("Sorry", "Error Happened.");
                            }

                        }, null, false);
                    }

                    if (hasError == false) {
                        CallGETFunctionWithParameters("api/ReceivablesDraft/GetOperationDraftPayablesAndReceivables", {
                            pOperationID: $("#slFilterOperation").val()
                            , pQuotationRouteID: 0
                            , pOperationVehicleID: 0
                            , pTruckingOrderID: 0
                            , pCodeSearch: 0
                            , pIsClosedOperation: true
                        }, function (pData) {
                            var pPayables = JSON.parse(pData[1]);
                            var pReceivables = JSON.parse(pData[2]);
                            PayablesDraft_BindTableRows(pPayables);
                            ReceivablesDraft_BindTableRows(pReceivables);
                        }, null);
                    }
                    debugger;
                } else {
                    Payables_BindTableRows(pPayables);
                    Receivables_BindTableRows(pReceivables);
                }
            } else
                swal("Sorry", "Connection failed, please try again later.");
            FadePageCover(false);
        }
        , null);
}
function DebitAndCreditClose_Payables_DeleteList(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPayables') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            //callback function in case of confirm delete
            function () {
                DeleteListFunction("/api/Payables/Delete"
                    , { pPayablesIDs: GetAllSelectedIDsAsString('tblPayables'), pOperationID: $("#slFilterOperation").val() }
                    , function () {
                        DebitAndCreditClose__FillPayablesAndReceivables($("#slFilterOperation").val(), $("#hID").val());
                    });
            });
    //DeleteListFunction("/api/Payables/Delete", { "pPayablesIDs": GetAllSelectedIDsAsString('tblPayables') }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
}

//---------------------------Receivables--------------------------------------------------------
//function Receivables_BindTableRows(pReceivables) {
//    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
//    ClearAllTableRows("tblReceivables");
//    debugger;
//    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
//    $.each(pReceivables, function (i, item) {
//        AppendRowtoTable("tblReceivables",
//            //("<tr ID='" + item.ID + "' " + (item.InvoiceID == 0 && OERec && $("#hIsOperationDisabled").val() == false ? "ondblclick='Receivables_EditByDblClick(" + item.ID + ");'>" : ">")
//            ("<tr ID='" + item.ID + "' " + (item.InvoiceID == 0 && item.AccNoteID == 0 && OERec ? "ondblclick='Receivables_EditByDblClick(" + item.ID + ");'>" : ">")
//                + "<td class='ReceivableID'> <input " + (item.InvoiceID == 0 && item.AccNoteID == 0 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "' /></td>"
//                //+ "<td class='Receivable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeCode + " (" + item.ChargeTypeName + ")" + "</td>"
//                + "<td class='Receivable' val='" + item.ChargeTypeID + "'>" + (pDefaults.UnEditableCompanyName == "GBL" ? (item.ChargeTypeName + " (" + item.ChargeTypeCode + ")") : item.ChargeTypeName) + "</td>"
//                + "<td class='ReceivablePOrC hide' val='" + item.POrC + "'>" + (item.POrC == 0 ? "" : item.POrCCode) + "</td>"
//                //+ "<td class='ReceivableSupplier hide' val='" + item.SupplierID + "'>" + (item.SupplierID == 0 ? "" : item.SupplierName) + "</td>"
//                //+ ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') ? ("<td class='ReceivableUOM' val='" + item.ContainerTypeID + "'>" + (item.ContainerTypeCode == 0 ? "" : item.ContainerTypeCode) + "</td>") : "")
//                //+ ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='ReceivableUOM' val='" + item.PackageTypeID + "'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>") : "")
//                + "<td class='ReceivableUOM hide' val='" + item.MeasurementID + "'>" + (item.MeasurementID == 0 ? "" : item.MeasurementCode) + "</td>"
//                + "<td class='ReceivableQuantity'>" + item.Quantity + "</td>"
//                + "<td class='ReceivableCostPrice hide'>" + (item.CostPrice).toFixed(4) + "</td>"
//                + "<td class='ReceivableCostAmount hide'>" + (item.CostAmount).toFixed(4) + "</td>"
//                + "<td class='ReceivableSalePrice'>" + (item.SalePrice).toFixed(4) + "</td>"

//                + "<td class='ReceivableAmountWithoutVAT hide'>" + item.AmountWithoutVAT.toFixed(4) + "</td>"
//                + "<td class='ReceivableTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
//                + "<td class='ReceivableTaxPercentage hide'>" + item.TaxPercentage.toFixed(4) + "</td>"
//                + "<td class='ReceivableTaxAmount '>" + item.TaxAmount.toFixed(4) + "</td>"
//                + "<td class='ReceivableDiscountAmount '>" + item.DiscountAmount.toFixed(4) + "</td>"
//                + "<td class='ReceivableSaleAmount'>" + (item.SaleAmount).toFixed(4) + "</td>"
//                + "<td class='ReceivableExchangeRate'>" + item.ExchangeRate.toFixed(4) + "</td>"
//                + "<td class='ReceivableCurrency' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
//                + "<td class='ReceivableInvoice hide' val='" + item.InvoiceID + "'>" + (item.InvoiceID == 0 ? "" : (item.InvoiceNumber + " / " + item.InvoiceTypeName)) + "</td>"
//                + "<td class='ReceivableAccNote hide' val='" + item.AccNoteID + "'>" + (item.AccNoteID == 0 ? "" : item.Code) + "</td>"
//                + "<td class='ReceivableOperation hide' val='" + item.OperationID + "'>" + (item.OperationID == 0 ? "" : item.OperationCode) + "</td>"
//                + "<td class='ReceivableNotes hide'>" + (item.Notes == "0" ? "" : item.Notes) + "</td>"

//                + "<td class='ReceivableIssueDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.IssueDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate)) : "") + "</td>"
//                + "<td class='ReceivableOperationContainersAndPackagesID hide'>" + item.OperationContainersAndPackagesID + "</td>"
//                + "<td class='ReceivableTrailerID hide'>" + item.TrailerID + "</td>"

//                + "<td class='ReceivableCreatorName hide'>" + item.CreatorName + "</td>"
//                //+ "<td class='ReceivableCreationDate hide'>" + item.CreationDate + "</td>"
//                + "<td class='ReceivableCreationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
//                + " <i class='fa fa-calendar'></i>"
//                //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
//                + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.CreationDate)) + "</small>"
//                + "</span>"
//                + "</td>"
//                + "<td class='ReceivableModificatorName hide'>" + item.ModificatorName + "</td>"
//                //+ "<td class='ReceivableModificationDate hide'>" + item.ModificationDate + "</td>"
//                + "<td class='ReceivableModificationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
//                + " <i class='fa fa-calendar'></i>"
//                //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
//                + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
//                + "</span>"
//                + "</td>"
//                + "<td class='hide'><a href='#EditReceivableModal' data-toggle='modal' onclick='Receivables_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
//        //+ "<td class='hide'><a href='#EditReceivableModal' data-toggle='modal' onclick='Receivables_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
//        //+ "</tr>"));
//    });
//    ////ApplyPermissions();
//    //if (OARec && $("#hIsOperationDisabled").val() == false) { $("#btn-AddReceivables").removeClass("hide"); $("#btn-GenerateDefaultReceivables").removeClass("hide"); $("#btn-GenerateReceivablesFromQuotation").removeClass("hide"); $("#btn-GenerateReceivablesFromPayables").removeClass("hide"); $("#btn-ApplyInvoiceTypeDefaults").removeClass("hide"); $("#slReceivableInvoiceTypes").removeClass("hide"); }
//    //else { $("#btn-AddReceivables").addClass("hide"); $("#btn-GenerateDefaultReceivables").addClass("hide"); $("#btn-GenerateReceivablesFromQuotation").addClass("hide"); $("#btn-GenerateReceivablesFromPayables").addClass("hide"); $("#btn-ApplyInvoiceTypeDefaults").addClass("hide"); $("#slReceivableInvoiceTypes").addClass("hide"); }
//    //if (ODRec && $("#hIsOperationDisabled").val() == false) $("#btn-DeleteReceivable").removeClass("hide"); else $("#btn-DeleteReceivable").addClass("hide");
//    //if (OERec && $("#hIsOperationDisabled").val() == false) $("#btn-MultiRowEditReceivables").removeClass("hide"); else $("#btn-MultiRowEditReceivables").addClass("hide");

//    BindAllCheckboxonTable("tblReceivables", "ReceivableID", "cb-CheckAll-Receivables");
//    CheckAllCheckbox("HeaderDeleteReceivableID");
//    //HighlightText("#tblReceivables>tbody>tr", $("#txt-Search").val().trim());
//    //if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
//    //    swal(strSorry, strDeleteFailMessage, "warning");
//    //    showDeleteFailMessage = false;
//    //}
//    //PayablesAndReceivables_CalculateSummary();
//    //Receivables_CalculateSubtotals();
//}
function Receivables_BindTableRows(pReceivables) {
    debugger;
    ClearAllTableRows("tblReceivables");
    if (pDefaults.UnEditableCompanyName == "TRM") {
        $("#slInvoiceTitle").removeClass("hide");
    }


    //var editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>";
    $.each(pReceivables, function (i, item) {
        AppendRowtoTable("tblReceivables",
            ("<tr ID='" + item.ID + "' " + (item.InvoiceID == 0 && item.DraftInvoiceID == 0 && item.AccNoteID == 0 && OERec && item.IsLocked == 0 && $("#hf_CanEdit").val() == '1' ? "ondblclick='Receivables_EditByDblClick(" + item.ID + ");'>" : ">")
                + "<td class='ReceivableID'> <input " + (item.InvoiceID == 0 && item.DraftInvoiceID == 0 && item.AccNoteID == 0 && item.IsLocked == 0 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "' /></td>"
                //+ "<td class='Receivable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeCode + " (" + item.ChargeTypeName + ")" + "</td>"
                + "<td class='Receivable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeName + ((pDefaults.IsRepeatChargeTypeName ? "(" + item.ChargeTypeCode + ")" : "")) + "</td>"
                + "<td class='ReceivablePOrC hide' val='" + item.POrC + "'>" + (item.POrC == 0 ? "" : item.POrCCode) + "</td>"
                //+ "<td class='ReceivableSupplier hide' val='" + item.SupplierID + "'>" + (item.SupplierID == 0 ? "" : item.SupplierName) + "</td>"
                //+ ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') ? ("<td class='ReceivableUOM' val='" + item.ContainerTypeID + "'>" + (item.ContainerTypeCode == 0 ? "" : item.ContainerTypeCode) + "</td>") : "")
                //+ ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='ReceivableUOM' val='" + item.PackageTypeID + "'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>") : "")
                + "<td class='ReceivableUOM hide' val='" + item.MeasurementID + "'>" + (item.MeasurementID == 0 ? "" : item.MeasurementCode) + "</td>"

                + "<td class='ReceivableQuantity'>" + (pDefaults.UnEditableCompanyName == "AGR" ? item.PackingQuantity : item.Quantity) + "</td>"
                + "<td class='ReceivableCostPrice hide'>" + (item.CostPrice).toFixed(4) + "</td>"
                + "<td class='ReceivableCostAmount hide'>" + (item.CostAmount).toFixed(4) + "</td>"
                + "<td class='ReceivableSalePrice'>" + (item.SalePrice).toFixed(4) + "</td>"

                + "<td class='ReceivableAmountWithoutVAT hide'>" + item.AmountWithoutVAT.toFixed(4) + "</td>"
                + "<td class='ReceivableTaxTypeID' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
                + "<td class='ReceivableTaxPercentage hide'>" + item.TaxPercentage.toFixed(4) + "</td>"
                + "<td class='ReceivableTaxAmount hide'>" + item.TaxAmount.toFixed(4) + "</td>"
                + "<td class='ReceivableDiscountTypeID' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : (item.DiscountPercentage + '%')) + "</td>"
                + "<td class='ReceivableDiscountPercentage hide'>" + item.DiscountPercentage.toFixed(4) + "</td>"
                + "<td class='ReceivableDiscountAmount hide'>" + item.DiscountAmount.toFixed(4) + "</td>"

                + "<td class='ReceivableSaleAmount'>" + (item.SaleAmount).toFixed(4) + "</td>"
                + "<td class='ReceivableExchangeRate'>" + item.ExchangeRate.toFixed(4) + "</td>"
                + "<td class='ReceivableCurrency' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                + "<td class='ReceivableCategory  hide" + (IsMESCOCompany ? "" : "hide") + "' val='" + item.CategoryID + "'>" + (item.CategoryID == 0 ? "" : item.CategoryName) + "</td>"
                + "<td class='ReceivableForeignRate " + (["FIV", "SUS"].includes(pDefaults.UnEditableCompanyName) ? "" : " hide ") + "'>" + (item./*SalePrice*/SalePrice_Foreign + " " + item.CurrencyCode_Foreign + "/Unit") + "</td>"

                + "<td class='ReceivableTruckingOrderID hide'>" + (item.TruckingOrderID == "0" ? "" : item.TruckingOrderID) + "</td>"
                + "<td class='ReceivableOperationVehicleID hide'>" + (item.OperationVehicleID == "0" ? "" : item.OperationVehicleID) + "</td>"
                + "<td class='ReceivableChassisNumber " + (pDefaults.UnEditableCompanyName == "GBL" ? "" : " hide ") + "'>" + (item.ChassisNumber == "0" ? "" : item.ChassisNumber) + "</td>"
                + "<td class='ReceivableTruckID hide'>" + item.TruckID + "</td>"
                + "<td class='ReceivableTruckNumber " + (pDefaults.UnEditableCompanyName == "GBL" ? "" : " hide ") + "'>" + (item.TruckNumber == "0" ? "" : item.TruckNumber) + "</td>"
                + "<td class='ReceivableOperationContainersAndPackagesID hide'>" + item.OperationContainersAndPackagesID + "</td>"
                + "<td class='ReceivableTankOrFlexiNumber hide" + (/*$("#cbIsTank").prop('checked')*/1 == 1 ? "" : " hide ") + "'>" + (item.TankOrFlexiNumber == "0" ? (item.ContainerNumber == "0" ? "" : item.ContainerNumber) : item.TankOrFlexiNumber) + "</td>"
                + "<td class='ReceivableInvoice hide' val='" + item.InvoiceID + "'>" + (item.InvoiceID == 0 ? "" : (item.InvoiceNumber + " / " + item.InvoiceTypeName)) + "</td>"
                + "<td class='ReceivableAccNote hide' val='" + item.AccNoteID + "'>" + (item.AccNoteID == 0 ? "" : item.AccNoteCode) + "</td>"
                + "<td class='ReceivableShownInvoiceOrAccNote '>" + (item.AccNoteID == 0
                    ? (item.InvoiceID == 0 && item.DraftInvoiceID == 0 ? "" : (item.InvoiceNumber + " / " + item.InvoiceTypeName))
                    : item.AccNoteCode)
                + "</td>"
                + "<td class='ReceivableOperation hide' val='" + item.OperationID + "'>" + (item.OperationID == 0 ? "" : item.OperationCode) + "</td>"
                + "<td class='ReceivableNotes hide'>" + (item.Notes == "0" ? "" : item.Notes) + "</td>"
                + "<td class='ReceivableManualChargeType hide'>" + (item.ManualChargeType == "0" ? "" : item.ManualChargeType) + "</td>"

                + "<td class='ReceivableIssueDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.IssueDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate)) : "") + "</td>"

                + "<td class='ReceivableCreatorName hide'>" + item.CreatorName + "</td>"
                //+ "<td class='ReceivableCreationDate hide'>" + item.CreationDate + "</td>"
                + "<td class='ReceivableCreationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                + " <i class='fa fa-calendar'></i>"
                //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                + "</span>"
                + "</td>"
                + "<td class='ReceivableModificatorName hide'>" + item.ModificatorName + "</td>"
                //+ "<td class='ReceivableModificationDate hide'>" + item.ModificationDate + "</td>"
                + "<td class='ReceivableModificationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                + " <i class='fa fa-calendar'></i>"
                //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                + "</span>"
                + "</td>"
                + "<td class='ReceivableBillTo hide' val='" + item.BillTo + "'>" + (item.BillTo == 0 ? "" : item.BillToName) + "</td>"
                + "<td class='ReceivableHouseNumber hide' val='" + item.HouseBillID + "'>" + (item.HouseNumber == 0 && pDefaults.UnEditableCompanyName == "COS" ? "" : item.HouseNumber) + (item.PayableCertificateNumber == 0 ? "" : (" / " + item.PayableCertificateNumber)) + "</td>"
                + "<td class='IsReceipt hide'> <input id='cbIsReceipt" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.IsReceipt == true ? "true' checked='checked'" : "'") + " /></td>"

                + "<td class='ReceivableSalePrice_Foreign hide'>" + (item.SalePrice_Foreign).toFixed(4) + "</td>"
                + "<td class='ReceivableCurrency_Foreign hide' val='" + item.CurrencyID_Foreign + "'>" + (item.CurrencyID_Foreign == 0 ? "" : item.CurrencyCode_Foreign) + "</td>"
                + "<td class='ReceivableExchangeRate_Foreign hide'>" + item.ExchangeRate_Foreign.toFixed(4) + "</td>"

                + "<td class='ReceivableBillID hide'>" + item.HouseBillID + "</td>"
                + "<td class='IsOfficialReceivable hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsOfficialReceivable == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='crmCode hide'>" + (item.crmCode == null || item.crmCode == undefined ? "" : item.crmCode) + "</td>"
                + "<td class='ReceivableIDToExcludePurchase hide'> <input name='nameExcludePurchase'  type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='hide '><a href='#' data-toggle='modal' onclick='Receivables_Print(" + item.ID + ");' " + printControlsText + "</a></td>"
                + "<td class='hide '>"
                + "<a " + (OARec && $("#hIsOperationDisabled").val() == false ? "" : " disabled='disabled' ") + " href='#CopyChargeModal' data-toggle='modal' " + 'onclick="Receivables_OpenCopyChargeModal(' + item.ID + ",'" + item.ChargeTypeName + "'" + ');" ' + copyControlsText + "</a>"
                //+ "<a href='#EditReceivableModal' data-toggle='modal' onclick='Receivables_FillControls(" + item.ID + ");' " + editControlsText + "</a>"
                + "</td>"
                + "</tr>"));
    });
    //ApplyPermissions();


 
    if (pDefaults.UnEditableCompanyName == "KDS" || pDefaults.UnEditableCompanyName == "NEW") $(".classKDS").removeClass("hide"); else $(".classKDS").addClass("hide");
    BindAllCheckboxonTable("tblReceivables", "ReceivableID", "cb-CheckAll-Receivables");
    CheckAllCheckbox("HeaderDeleteReceivableID");
    //HighlightText("#tblReceivables>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    //if (OERec) {
    //    PayablesAndReceivables_CalculateSummary();
    //    Receivables_CalculateSubtotals();
    //}
}
function Receivables_GetAvailableCharges() {
    $("#divSelectCharges").html("");
    FadePageCover(true);
    var pStrFnName = "/api/ChargeTypes/LoadAll";
    var pDivName = "divSelectCharges";
    var ptblModalName = "tblModalReceivables";
    var pCheckboxNameAttr = "cbSelectCharges";
    var pWhereClause = "";
    pWhereClause += " WHERE IsUsedInReceivable = 1 AND IsInactive = 0 AND IsOperationChargeType=1 ";
    pWhereClause += ($("#cbIsOcean").prop('checked') == true ? " AND IsOcean = 1 " : "");
    pWhereClause += ($("#cbIsAir").prop('checked') == true ? " AND IsAir = 1 " : "");
    pWhereClause += ($("#cbIsInland").prop('checked') == true ? " AND IsInland = 1 " : "");
    pWhereClause += " AND ( Code LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR Name LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    //pWhereClause += " AND ID NOT IN (SELECT ChargeTypeID from Receivables ";
    //pWhereClause += "                WHERE OperationID = " + $("#hOperationID").val() + ") ";
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
            FadePageCover(false);
        }, 1/*pCodeOrName*/);
    $("#btn-SearchCharges").attr("onclick", "Receivables_GetAvailableCharges();");
    $("#btnSelectChargesApply").attr("onclick", "Receivables_InsertListWithoutValues(false);");
    //FillReceivablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, true //pIsInsert
    //    , false /*pIsEditInvoice*/, function () {
    //        HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
    //        $("#btnSelectChargesApply").attr("onclick", "Receivables_InsertListWithValues(false);");
    //    });
    //$("#btn-SearchCharges").attr("onclick", "Receivables_GetAvailableCharges();");
}
function Receivables_EditByDblClick(pID) {
    debugger;
    debugger;
    ClearAll("#EditReceivableModal");
    jQuery("#EditReceivableModal").modal("show");
    if (pDefaults.UnEditableCompanyName == "COS" || IsMESCOCompany || pDefaults.UnEditableCompanyName == "UNF") {
        $("#slBill").parent().removeClass("hide");
        $("#ReceivableBillTo").addClass("hide");
    }
    if (IsMESCOCompany) {
        $("#cbIsOfficialReceivable").parent().parent().removeClass("hide");
        $('#slReceivableCategory').attr('data-required', true);
        //if (pOperationHeader_Global.QuotationID != 0) {
        //    /*$("#btnSaveReceivable").attr("disabled", "disabled");*/
        //    $('#txtReceivableUnitPrice').prop('disabled', true);
        //}
    }
    if (pDefaults.UnEditableCompanyName == "AGR") {
        $("#txtReceivableQuantity").prop("disabled", true);
    }

    $("#hReceivableID").val(pID);
    FadePageCover(true);
    var tr = $("#tblReceivables tr[ID='" + pID + "']");
    var pPOrCID = $(tr).find("td.ReceivablePOrC").attr('val');
    var pSupplierID = $(tr).find("td.ReceivableSupplier").attr('val');
    var pUOMID = $(tr).find("td.ReceivableUOM").attr('val');
    var pCurrencyID = $(tr).find("td.ReceivableCurrency").attr('val');
    var pCurrencyID_Foreign = $(tr).find("td.ReceivableCurrency_Foreign").attr('val');
    var pTaxTypeID = $(tr).find("td.ReceivableTaxTypeID").attr('val');
    var pDiscountTypeID = $(tr).find("td.ReceivableDiscountTypeID").attr('val');
    var pDiscountTypeID = $(tr).find("td.ReceivableDiscountTypeID").attr('val');
    var pBillID = $(tr).find("td.ReceivableBillID").text();
    var pReceivableCategoryID = $(tr).find("td.ReceivableCategory").attr('val');
    var pOperationID = $(tr).find("td.ReceivableOperation").attr('val');

    var pOperationContainersAndPackagesID = $(tr).find("td.ReceivableOperationContainersAndPackagesID").text();



    CallGETFunctionWithParameters("/api/OperationContainersAndPackages/LoadAllTanks"
        , {
            pPageNumber: 1
            , pPageSize: 999999
            , pWhereClauseForTank: "WHERE OperationID=" + $("#hOperationID").val() + (false ? " AND TankOrFlexiNumber IS NOT NULL AND TankOrFlexiNumber<>'' " : " AND ContainerNumber IS NOT NULL AND ContainerNumber<>'' ")
            , pOrderBy: "TankOrFlexiNumber"
        }
        , function (pData_Tank) {
            debugger;
            var pTank = pData_Tank[0];
            FillListFromObject(pOperationContainersAndPackagesID, 11, "<--Select Container-->", "slReceivableTank", pTank
                , function () {
                    //$("#slSearchTankInReceivables").html($("#slPayableTank").html());
                });
        }
        , null);



    //$("#slReceivableTank").html($("#slSearchTankInReceivables").html()); $("#slReceivableTank").val(pOperationContainersAndPackagesID == 0 ? "" : pOperationContainersAndPackagesID);
        $("#slReceivableTank").parent().removeClass("hide");

    if ($("#hDefaultCurrencyID").val() == pCurrencyID || pDefaults.UnEditableCompanyName == "ICS")
        $("#txtReceivableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtReceivableExchangeRate").removeAttr("disabled");

    $("#cbIsReceipt").prop("checked", $("#cbIsReceipt" + pID).prop("checked"));
    $("#cbIsOfficialReceivable").prop('checked', $(tr).find('td.IsOfficialReceivable').find('input').attr('val'));
    $("#cbIsCRMReceivable").prop('checked', $(tr).find('td.crmCode').text() != "");
    if (IsMESCOCompany) {
        let IsOfficial = $(tr).find('td.IsOfficialReceivable').find('input').attr('val');
        let IsCRMReceivable = $(tr).find('td.crmCode').text() != "";
        if (IsCRMReceivable) {
            $("#txtReceivableUnitPrice").attr("disabled", true);
            $("#cbIsOfficialReceivable").attr("disabled", true);
        }
        else {
            $("#cbIsOfficialReceivable").attr("disabled", false);
            if (IsOfficial)
                $("#txtReceivableUnitPrice").attr("disabled", false);
        }
    }
    //ReceivablePOrC_GetList(pPOrCID, "slReceivablePOrC");
    $("#slReceivablePOrC").html($("#slOperationPOrC").html()); $("#slReceivablePOrC").val(pPOrCID == 0 ? "" : pPOrCID);
    //$("#slReceivableCategory").html($("#hReadyCategories").html());
    $("#slReceivableCategory").val(pReceivableCategoryID == 0 ? "" : pReceivableCategoryID);
    //ReceivableSuppliers_GetList(pSupplierID, "slReceivableSupplier");
    ReceivableCurrency_GetList(pCurrencyID, "slReceivableCurrency", null);
    $("#slReceivableCurrency_Foreign").val(pCurrencyID_Foreign == 0 ? pDefaults.CurrencyID : pCurrencyID_Foreign);
    ReceivableUOM_GetList(pUOMID, "slReceivableUOM");

    $("#lblReceivableShown").html(": " + $(tr).find("td.Receivable").text());
    $("#lblReceivableCreatedBy").html(" : " + $(tr).find("td.ReceivableCreatorName").text())
    $("#lblReceivableCreationDate").html(" : " + $(tr).find("td.ReceivableCreationDate").text())
    $("#lblReceivableUpdatedBy").html(": " + $(tr).find("td.ReceivableModificatorName").text())
    $("#lblReceivableModificationDate").html(" : " + $(tr).find("td.ReceivableModificationDate").text())
    //$("#slBill").html(": " + $(tr).find("td.ReceivableHouseNumber").text());

    CallGETFunctionWithParameters("/api/Receivables/GetHouses", { pMasterOperationID: $("#hOperationID").val() }, function (pData) {
        debugger;
        pHouseList = pData[0];
        FillListFromObject($(tr).find("td.ReceivableHouseNumber").attr("val"), 2, "<--Select-->", "slBill", pHouseList, null);

    });
    //$("#txtReceivableType").val($(tr).find("td.Receivable").text());
    //$("#txtReceivableType").attr("ChargeTypeID", $(tr).find("td.Receivable").attr("val"));
    CallGETFunctionWithParameters("/api/ChargeTypes/LoadAllWithMinimalColumns"
        , { pWhereClauseWithMinimalColumns: "WHERE 1=1" }
        , function (pData) {

            FillListFromObject($(tr).find("td.Receivable").attr("val"), (pDefaults.IsRepeatChargeTypeName ? 4 : 2), "<--Select-->", "slReceivableChargeType", pData[0], null);
            FadePageCover(false);
        }
        , null);
    if ($("#slReceivableTax option").length < 2 || $("#slReceivableDiscount option").length < 2)
        GetListTaxTypeWithNameAndPercAttr(pTaxTypeID, "/api/TaxeTypes/LoadAllWithWhereClause"
            , "<--Select-->", "slReceivableTax", "WHERE IsInactive=0 ORDER BY Name"
            , function () {
                $("#slReceivableDiscount").html($("#slReceivableTax").html());
                $("#slReceivableDiscount").val(pDiscountTypeID == 0 ? "" : pDiscountTypeID);
                $("#slReceivableTax option[IsDiscount='true']").addClass('hide');
                $("#slReceivableDiscount option[IsDiscount='false']").addClass('hide');
            });
    else {
        $("#slReceivableTax").val(pTaxTypeID == 0 ? "" : pTaxTypeID);
        $("#slReceivableDiscount").val(pDiscountTypeID == 0 ? "" : pDiscountTypeID);
    }
    $("#txtReceivableQuantity").val($(tr).find("td.ReceivableQuantity").text());
    //$("#txtReceivableUnitPrice").val($(tr).find("td.ReceivableCostPrice").text());
    //$("#txtReceivableAmount").val($(tr).find("td.ReceivableCostAmount").text());
    $("#txtReceivableUnitPrice").val(parseInt($(tr).find("td.ReceivableSalePrice").text()) == 0 ? "" : $(tr).find("td.ReceivableSalePrice").text());
    $("#txtReceivableUnitPrice_Foreign").val(parseInt($(tr).find("td.ReceivableSalePrice_Foreign").text()) == 0 ? "" : $(tr).find("td.ReceivableSalePrice_Foreign").text());

    $("#txtReceivableAmountWithoutVAT").val(parseInt($(tr).find("td.ReceivableAmountWithoutVAT").text()) == 0 ? "" : $(tr).find("td.ReceivableAmountWithoutVAT").text());
    $("#txtReceivableTaxPercentage").val($(tr).find("td.ReceivableTaxPercentage").text());
    $("#txtReceivableTaxAmount").val($(tr).find("td.ReceivableTaxAmount").text());
    $("#txtReceivableDiscountPercentage").val($(tr).find("td.ReceivableDiscountPercentage").text());
    $("#txtReceivableDiscountAmount").val($(tr).find("td.ReceivableDiscountAmount").text());

    $("#txtReceivableAmount").val(parseInt($(tr).find("td.ReceivableSaleAmount").text()) == 0 ? "" : $(tr).find("td.ReceivableSaleAmount").text());
    $("#txtReceivableExchangeRate").val($(tr).find("td.ReceivableExchangeRate").text());
    $("#txtReceivableExchangeRate_Foreign").val($(tr).find("td.ReceivableExchangeRate_Foreign").text() == 0 ? 1 : $(tr).find("td.ReceivableExchangeRate_Foreign").text());

    $("#txtReceivableNotes").val($(tr).find("td.ReceivableNotes").text());
    $("#txtReceivableManualChargeType").val($(tr).find("td.ReceivableManualChargeType").text());
    $("#txtReceivableIssueDate").val($(tr).find("td.ReceivableIssueDate").text());
    $("#txtReceivableBillTo").val($(tr).find("td.ReceivableBillTo").text());

    if (pDefaults.UnEditableCompanyName == "DGL")
        CallGETFunctionWithParameters("/api/Operations/LoadAll"
            , { pWhereClause: " WHERE MasterOperationID=" + pOperationID }
            , function (pData) {
                var pOperationList = pData[0];
                Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pOperationList, "ID", "HouseNumber,CertificateNumber", ' / ', TranslateString("SelectFromMenu"), "#slReceivableBill", pBillID, "", function () { /*ApplySelectListSearch();*/ FadePageCover(false); });
            });

    $("#slReceivableUOM").attr("onchange", "Receivables_UOMChanged();");
    $("#btnSaveReceivable").attr("onclick", "Receivables_Update(false);");
}
function Receivables_Update(pSaveandAddNew) {
    debugger;
    if (["FIV", "SUS"].includes(pDefaults.UnEditableCompanyName) && $("#txtReceivableExchangeRate_Foreign").val() == 0)
        swal("Sorry", "Please, add exchange rate to currencies in the master data.");
    else if (!isValidDate($("#txtReceivableIssueDate").val().trim(), 1) && $("#txtReceivableIssueDate").val().trim() != "")
        swal(strSorry, strCheckDates);
    else if ($("#txtReceivableExchangeRate").val() == "" || parseFloat($("#txtReceivableExchangeRate").val()) == 0
        || (parseFloat($("#txtReceivableExchangeRate").val()) == 1 && pDefaults.CurrencyID != ($("#slReceivableCurrency").val())))
        swal("Sorry", "Please, check exchange rate.");
    else if ($("#slReceivableCategory").val() == '6')
        swal("Sorry", "Cannot use this Category After Operation Close");
    else {

        InsertUpdateFunction("form", "/api/Receivables/Update", {
            pSavedFrom: 10 //pSavedFrom=10 : saved from Operations
            , pOperationContainersAndPackagesID: $("#slReceivableTank").val() == "" ? 0 : $("#slReceivableTank").val()
            , pIsReceipt: $("#cbIsReceipt").prop("checked")
            , pHouseBillID: (pDefaults.UnEditableCompanyName == "COS" || IsMESCOCompany || pDefaults.UnEditableCompanyName == "UNF" ? ($("#slBill").val() == "" ? 0 : $("#slBill").val()) : ($('#slReceivableBill option:selected').val() == "" ? 0 : $('#slReceivableBill option:selected').val()))

            , pID: $("#hReceivableID").val()
            //, pMeasurementID: $("#txtCalculationType").attr("MeasurementID")
            , pOperationID: $("#hOperationID").val()
            , pChargeTypeID: $("#slReceivableChargeType").val() == "" ? 0 : $("#slReceivableChargeType").val() //$("#txtReceivableType").attr("ChargeTypeID")
            , pMeasurementID: $('#slReceivableUOM option:selected').val() != ""
                ? $('#slReceivableUOM option:selected').val()
                : 0
            //, pContainerTypeID: ((($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked')) && $('#slReceivableUOM option:selected').val() != "")
            //    ? $('#slReceivableUOM option:selected').val()
            //    : 0)
            , pContainerTypeID: 0
            //, pPackageTypeID: ((($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) && $('#slReceivableUOM option:selected').val() != "")
            //    ? $('#slReceivableUOM option:selected').val()
            //    : 0)
            , pPOrC: ($('#slReceivablePOrC option:selected').val() == "" ? 0 : $('#slReceivablePOrC option:selected').val())
            , pSupplierID: 0//($('#slReceivableSupplier option:selected').val() == "" ? 0 : $('#slReceivableSupplier option:selected').val())
            , pQuantity: ($("#txtReceivableQuantity").val().trim() == "" ? 0 : $("#txtReceivableQuantity").val().trim())
            , pCostPrice: ($("#txtReceivableUnitPrice").val().trim() == "" ? 0 : $("#txtReceivableUnitPrice").val().trim())
            , pCostAmount: ($("#txtReceivableAmount").val().trim() == "" ? 0 : $("#txtReceivableAmount").val().trim())
            , pSalePrice: ($("#txtReceivableUnitPrice").val().trim() == "" ? 0 : $("#txtReceivableUnitPrice").val().trim())

            , pAmountWithoutVAT: $("#txtReceivableAmountWithoutVAT").val() == "" ? 0 : $("#txtReceivableAmountWithoutVAT").val()
            , pTaxTypeID: $("#slReceivableTax").val() == "" ? 0 : $("#slReceivableTax").val()
            , pTaxPercentage: $("#txtReceivableTaxPercentage").val() == "" ? 0 : $("#txtReceivableTaxPercentage").val()
            , pTaxAmount: $("#txtReceivableTaxAmount").val() == "" ? 0 : $("#txtReceivableTaxAmount").val()
            , pDiscountTypeID: $("#slReceivableDiscount").val() == "" ? 0 : $("#slReceivableDiscount").val()
            , pDiscountPercentage: $("#txtReceivableDiscountPercentage").val() == "" ? 0 : $("#txtReceivableDiscountPercentage").val()
            , pDiscountAmount: $("#txtReceivableDiscountAmount").val() == "" ? 0 : $("#txtReceivableDiscountAmount").val()

            , pSaleAmount: ($("#txtReceivableAmount").val().trim() == "" ? 0 : $("#txtReceivableAmount").val().trim())
            , pExchangeRate: ($("#txtReceivableExchangeRate").val().trim() == "" ? 0 : $("#txtReceivableExchangeRate").val().trim())
            , pCurrencyID: ($('#slReceivableCurrency option:selected').val() == "" ? 0 : $('#slReceivableCurrency option:selected').val())
            , pCategoryID: ($('#slReceivableCategory option:selected').val() == "" ? 0 : $('#slReceivableCategory option:selected').val())
            , pNotes: $("#txtReceivableNotes").val().toUpperCase().trim()

            , pIssueDate: ($("#txtReceivableIssueDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtReceivableIssueDate").val().trim()))

            , pSalePrice_Foreign: ($("#txtReceivableUnitPrice_Foreign").val().trim() == "" ? 0 : $("#txtReceivableUnitPrice_Foreign").val().trim())
            , pExchangeRate_Foreign: ($("#txtReceivableExchangeRate_Foreign").val().trim() == "" ? 0 : $("#txtReceivableExchangeRate_Foreign").val().trim())
            , pCurrencyID_Foreign: ($("#slReceivableCurrency_Foreign").val() == "" || $("#slReceivableCurrency_Foreign").val() == null ? 0 : $("#slReceivableCurrency_Foreign").val())
            , pManualChargeType: ($("#txtReceivableManualChargeType").val() == "" ? "0" : $("#txtReceivableManualChargeType").val().trim())
            , pIsOfficialReceivable: $("#cbIsOfficialReceivable").prop("checked")
            , pReceiptNumber: "0" //no change
            , pReceiptDate: "01/01/1900" //no change

        }, pSaveandAddNew, "EditReceivableModal", function () {
            DebitAndCreditClose__FillPayablesAndReceivables($("#slFilterOperation").val(), $("#hID").val());
        }
        );
    }
    //}
    //else
    //    swal(strSorry, strCheckEntries, "warning");
}
function Receivables_DeleteList(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblReceivables') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            //callback function in case of confirm delete
            function () {
                CallPOSTFunctionWithParameters("/api/Receivables/Delete", { pReceivablesIDs: GetAllSelectedIDsAsString('tblReceivables'), pOperationID: $("#slFilterOperation").val() }, function (pData) {

                    if (pData)
                        swal("Success", "Saved Successfully.");
                    else
                        swal("Sorry", " Delete Error");


                    DebitAndCreditClose__FillPayablesAndReceivables($("#slFilterOperation").val(), $("#hID").val());

                }, null //function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); }
                );
            });
    //DeleteListFunction("/api/Receivables/Delete", { "pReceivablesIDs": GetAllSelectedIDsAsString('tblReceivables') }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
}
function ReceivableCurrency_GetList(pID, pSlName, callback) {
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListCurrencyWithCodeAndExchangeRateAttr(pID, "/api/Currencies/LoadAll", "Select Currency", pSlName, " WHERE 1=1 ORDER BY Code "
        , function () { //this callback is used to set the InitialSalePrice in case of generating from payables
            if (callback != null && callback != undefined)
                callback();
        });
}
function ReceivableUOM_GetList(pID, pSlName) {
    var pWhereClause = "";
    //pWhereClause += " Where OperationID = " + $("#hOperationID").val();
    if ($("#hShipmentType").val() == constFCLShipmentType)
        pWhereClause += " WHERE IsUsedInFCl = 1 ";
    else
        if ($("#hShipmentType").val() == constLCLShipmentType)
            pWhereClause += " WHERE IsUsedInLCL = 1 ";
        else
            if ($("#hShipmentType").val() == constFTLShipmentType)
                pWhereClause += " WHERE IsUsedInFTL = 1 ";
            else
                if ($("#hShipmentType").val() == constLTLShipmentType)
                    pWhereClause += " WHERE IsUsedInLTL = 1 ";
                else
                    if ($("#hShipmentType").val() == constConsolidationShipmentType)
                        pWhereClause += " WHERE IsUsedInConsolidation = 1 ";
                    else
                        if ($("#hShipmentType").val() == "0")
                            pWhereClause += " WHERE IsUsedInAir = 1 ";
    pWhereClause += " OR ID = " + pID; //for the case that settings changed for a UOM at the time it is taken 
    pWhereClause += " ORDER BY Code ";
    //GetListWithCodeAndNameAndWhereClause(pID, "/api/NoAccessMeasurements/LoadAll", "Select UOM", pSlName, pWhereClause);
    GetListWithNameAndWhereClause(pID, "/api/NoAccessMeasurements/LoadAll", "Select UOM", pSlName, pWhereClause);
}
function CalculateReceivablesAmount() {
    debugger;
    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0; var decTaxPercentage = 0.0;
    var decDiscountAmount = 0; var decDiscountPercentage = 0.0;

    decAmountWithoutVAT = $("#txtReceivableQuantity").val() * $("#txtReceivableUnitPrice").val();
    $("#txtReceivableAmountWithoutVAT").val(decAmountWithoutVAT);
    decTaxPercentage = $("#slReceivableTax option:selected").attr("CurrentPercentage");
    decTaxAmount = (Math.round((decAmountWithoutVAT * decTaxPercentage / 100) * 100) / 100).toFixed(2);
    decDiscountPercentage = $("#slReceivableDiscount option:selected").attr("CurrentPercentage");
    decDiscountAmount = (Math.round((decAmountWithoutVAT * decDiscountPercentage / 100) * 100) / 100).toFixed(2);

    $("#txtReceivableTaxPercentage").val(decTaxPercentage);
    $("#txtReceivableTaxAmount").val(decTaxAmount);
    $("#txtReceivableDiscountPercentage").val(decDiscountPercentage);
    $("#txtReceivableDiscountAmount").val(decDiscountAmount);
    $("#txtReceivableAmount").val((Math.round(((parseFloat(decAmountWithoutVAT) + parseFloat(decTaxAmount) - parseFloat(decDiscountAmount))) * 100) / 100).toFixed(2));
}
function CalculateReceivablesAmount_Foreign() {
    debugger;
    if (["FIV", "SUS"].includes(pDefaults.UnEditableCompanyName)) {
        $("#txtReceivableExchangeRate_Foreign").val($("#slReceivableCurrency_Foreign option:selected").attr("MasterDataExchangeRate"));
        let decExchangeRate_Foreign = $("#slReceivableCurrency_Foreign option:selected").attr("MasterDataExchangeRate");
        let decUnitPrice_Foreign = $("#txtReceivableUnitPrice_Foreign").val();
        $("#txtReceivableUnitPrice").val((decUnitPrice_Foreign * decExchangeRate_Foreign).toFixed(2));
    }

    let decAmountWithoutVAT = 0;
    let decTaxAmount = 0; let decTaxPercentage = 0.0;
    let decDiscountAmount = 0; let decDiscountPercentage = 0.0;

    decAmountWithoutVAT = $("#txtReceivableQuantity").val() * $("#txtReceivableUnitPrice").val();
    $("#txtReceivableAmountWithoutVAT").val(decAmountWithoutVAT);
    decTaxPercentage = $("#slReceivableTax option:selected").attr("CurrentPercentage");
    decTaxAmount = (Math.round((decAmountWithoutVAT * decTaxPercentage / 100) * 100) / 100).toFixed(2);
    decDiscountPercentage = $("#slReceivableDiscount option:selected").attr("CurrentPercentage");
    decDiscountAmount = (Math.round((decAmountWithoutVAT * decDiscountPercentage / 100) * 100) / 100).toFixed(2);

    $("#txtReceivableTaxPercentage").val(decTaxPercentage);
    $("#txtReceivableTaxAmount").val(decTaxAmount);
    $("#txtReceivableDiscountPercentage").val(decDiscountPercentage);
    $("#txtReceivableDiscountAmount").val(decDiscountAmount);
    $("#txtReceivableAmount").val((Math.round(((parseFloat(decAmountWithoutVAT) + parseFloat(decTaxAmount) - parseFloat(decDiscountAmount))) * 100) / 100).toFixed(2));
}
function Invoices_CheckSameCurrency(pTblName, pClassOfCurrencyTd) {
    debugger;
    var isSameCurrency = true;
    //get the currencyID of the first item checked and then compare it to currencies of other items
    var firstCurrencyIDChecked = $('#' + pTblName).find('input[name="Delete"]:checked:first').parent().parent().find("td." + pClassOfCurrencyTd).attr('val');
    $('#' + pTblName + ' td').find('input[name="Delete"]:checked').each(function () {
        if (firstCurrencyIDChecked != $("#" + pTblName + " tr[id=" + $(this).attr('value') + "]").find("td." + pClassOfCurrencyTd).attr('val'))
            isSameCurrency = false;
    });
    return isSameCurrency;
}
function InvoiceOperations_GetList(pOperationID, pSlName, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    debugger;
    //parameters: ID, strFnName, First Row in select list, select list name
    var pWhereClause = " WHERE ID = " + pOperationID + " OR MasterOperationID = " + pOperationID;
    //GetListWithOpCodeAndHouseNoAndClientEmailAttr(pOperationID, "/api/Operations/LoadAll", null, pSlName, pWhereClause);
    GetListWithOpCodeAndHouseNoAndClientEmailAttr(pOperationID, "/api/Operations/LoadWithParameters", null, pSlName, { pPageNumber: 1, pPageSize: 99999, pWhereClause: pWhereClause, pOrderBy: "HouseNumber" }
        , callback);
}
//-------------------------Payables----------------------------------------------------------
function Payables_BindTableRows(pPayables) {
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    ClearAllTableRows("tblPayables");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pPayables, function (i, item) {

        AppendRowtoTable("tblPayables",
            //("<tr ID='" + item.ID + "' " + (OEPay && $("#hIsOperationDisabled").val() == false ? ("ondblclick='Payables_EditByDblClick(" + item.ID + ");'") : "") + ">"
            ("<tr ID='" + item.ID + "' " + (OEPay && item.AccNoteID == 0 && item.IsApproved == 0 && $("#hf_CanEdit").val()=='1' ? ("ondblclick='Payables_EditByDblClick(" + item.ID + ");'") : "") + (item.IsApproved ? " class='text-primary' " : "") + ">"
                + "<td class='PayableID'> <input " + (item.IsApproved == 0 && item.AccNoteID == 0 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                //+ "<td class='Payable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeCode + " (" + item.ChargeTypeName + ")" + "</td>"
                + "<td class='Payable' val='" + item.ChargeTypeID + "'>" + (pDefaults.UnEditableCompanyName == "GBL" ? (item.ChargeTypeName + " (" + item.ChargeTypeCode + ")") : item.ChargeTypeName) + "</td>"
                + "<td class='PayablePOrC hide' val='" + item.POrC + "'>" + (item.POrC == 0 ? "" : item.POrCCode) + "</td>"
                //the next line its PartnerSupplierID comes from table OperationPartners
                + "<td class='PayableSupplier hide'[' val='" + item.SupplierOperationPartnerID + "'>" + (item.PartnerSupplierID == 0 ? "" : item.PartnerSupplierName) + "</td>"
                + "<td class='SupplierSiteID hide'>" + item.SupplierSiteID + "</td>"
                //+ ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') ? ("<td class='PayableUOM' val='" + item.ContainerTypeID + "'>" + (item.ContainerTypeCode == 0 ? "" : item.ContainerTypeCode) + "</td>") : "")
                //+ ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='PayableUOM' val='" + item.PackageTypeID + "'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>") : "")
                + "<td class='PayableUOM hide' val='" + item.MeasurementID + "'>" + (item.MeasurementID == 0 ? "" : item.MeasurementCode) + "</td>"
                + "<td class='PayableQuantity'>" + item.Quantity + "</td>"
                + "<td class='PayableCostPrice'>" + item.CostPrice.toFixed(4) + "</td>"

                + "<td class='PayableAmountWithoutVAT hide'>" + (item.AmountWithoutVAT == 0 ? "" : item.AmountWithoutVAT) + "</td>"
                + "<td class='PayableTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
                + "<td class='PayableTaxPercentage hide'>" + item.TaxPercentage + "</td>"
                + "<td class='PayableTaxAmount hide'>" + item.TaxAmount + "</td>"
                + "<td class='PayableDiscountTypeID hide' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeName) + "</td>"
                + "<td class='PayableDiscountPercentage hide'>" + item.DiscountPercentage + "</td>"
                + "<td class='PayableDiscountAmount hide'>" + item.DiscountAmount + "</td>"
                + "<td class='PayableCategory hide' val='" + item.CategoryID + "'>" + (item.CategoryID == 0 ? "" : item.CategoryID) + "</td>"

                + "<td class='PayableCostAmount'>" + item.CostAmount.toFixed(4) + "</td>"
                + "<td class='PayableInitialSalePrice hide'>" + (item.InitialSalePrice == 0 ? "" : item.InitialSalePrice.toFixed(2)) + "</td>"
                + "<td class='PayableSupplierInvoiceNo hide'>" + (item.SupplierInvoiceNo == 0 ? "" : item.SupplierInvoiceNo) + "</td>"
                + "<td class='PayableSupplierReceiptNo hide'>" + (item.SupplierReceiptNo == 0 ? "" : item.SupplierReceiptNo) + "</td>"
                + "<td class='PayableEntryDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.EntryDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.EntryDate)) : "") + "</td>"
                + "<td class='PayableBillID hide'>" + item.BillID + "</td>"

                + "<td class='PayableIssueDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.IssueDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate)) : "") + "</td>"
                + "<td class='PayableOperationContainersAndPackagesID hide'>" + item.OperationContainersAndPackagesID + "</td>"
                + "<td class='PayableTrailerID hide'>" + item.TrailerID + "</td>"

                + "<td class='PayableExchangeRate'>" + item.ExchangeRate.toFixed(4) + "</td>"
                + "<td class='PayableCurrency' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                + "<td class='PayableAccNote hide' val='" + item.AccNoteID + "'>" + (item.AccNoteID == 0 ? "" : item.Code) + "</td>"
                + "<td class='PayableOperation hide' val='" + item.OperationID + "'>" + (item.OperationID == 0 ? "" : item.OperationCode) + "</td>"
                + "<td class='PayableNotes hide'>" + item.Notes + "</td>"
                + "<td class='PayableCreatorName hide'>" + item.CreatorName + "</td>"
                //+ "<td class='PayableCreationDate hide'>" + item.CreationDate + "</td>"
                + "<td class='PayableCreationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                + " <i class='fa fa-calendar'></i>"
                //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                + "</span>"
                + "</td>"
                + "<td class='PayableModificatorName hide'>" + item.ModificatorName + "</td>"
                //+ "<td class='PayableModificationDate hide'>" + item.ModificationDate + "</td>"
                + "<td class='PayableModificationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                + " <i class='fa fa-calendar'></i>"
                //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                + "</span>"
                + "</td>"
                + "<td class='hide'><a href='#EditPayableModal' data-toggle='modal' onclick='Payables_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ////ApplyPermissions();
    //if (OAPay && $("#hIsOperationDisabled").val() == false) { $("#btn-AddPayables").removeClass("hide"); $("#btn-GenerateDefaultPayables").removeClass("hide"); $("#btn-GeneratePayablesFromQuotation").removeClass("hide"); }
    //else { $("#btn-AddPayables").addClass("hide"); $("#btn-GenerateDefaultPayables").addClass("hide"); $("#btn-GeneratePayablesFromQuotation").addClass("hide"); }
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    //if (OEPay && $("#hIsOperationDisabled").val() == false) $("#btn-MultiRowEditPayables").removeClass("hide"); else $("#btn-MultiRowEditPayables").addClass("hide");
    BindAllCheckboxonTable("tblPayables", "PayableID", "cb-CheckAll-Payables");
    CheckAllCheckbox("HeaderDeletePayableID");
    //HighlightText("#tblPayables>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    //Payables_CalculateSubtotals();
    //PayablesAndReceivables_CalculateSummary();
}
function Payables_GetAvailableCharges() {
    debugger;
    $("#divSelectCharges").html("");
    FadePageCover(true);
    var pStrFnName = "/api/ChargeTypes/LoadAll";
    var pDivName = "divSelectCharges";
    var ptblModalName = "tblModalPayables";
    var pCheckboxNameAttr = "cbSelectCharges";
    var pWhereClause = "";
    pWhereClause += " WHERE IsUsedInPayable = 1 AND IsInactive = 0 AND IsOperationChargeType=1 ";
    pWhereClause += ($("#cbIsOcean").prop('checked') == true ? " AND IsOcean = 1 " : "");
    pWhereClause += ($("#cbIsAir").prop('checked') == true ? " AND IsAir = 1 " : "");
    pWhereClause += ($("#cbIsInland").prop('checked') == true ? " AND IsInland = 1 " : "");
    pWhereClause += " AND ( Code LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR Name LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    //pWhereClause += " AND ID NOT IN (SELECT ChargeTypeID from Payables ";
    //pWhereClause += "                WHERE OperationID = " + $("#hOperationID").val() + ") ";
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
            $("#btnSelectChargesApply").attr("onclick", "Payables_InsertListWithoutValues(false);");
            FadePageCover(false);
        }
        , 1/*pCodeOrName*/);
    //FillPayablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, true //pIsInsert
    //    , function () {
    //        HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
    //        $("#btnSelectChargesApply").attr("onclick", "Payables_InsertListWithValues(false);");
    //    });
    $("#btn-SearchCharges").attr("onclick", "Payables_GetAvailableCharges();");
}
function Payables_Update(pSaveandAddNew) {
    debugger;
    if (
        (!isValidDate($("#txtPayableEntryDate").val().trim(), 1) && $("#txtPayableEntryDate").val().trim() != "")
        || (!isValidDate($("#txtPayableIssueDate").val().trim(), 1) && $("#txtPayableIssueDate").val().trim() != "")
    )
        swal(strSorry, strCheckDates);
    //else if ($("#hDefaultUnEditableCompanyName").val() == "GBL" && $("#slSites").val() == '')
    //    swal("Sorry", "Please, select site.");
    else if ($("#txtPayableExchangeRate").val() == "" || parseFloat($("#txtPayableExchangeRate").val()) == 0)
        swal("Sorry", "Exchange rate can not be 0;");
    else if ($("#slPayableCategory").val() == '6')
        swal("Sorry", "Cannot use this Category After Operation Close");
    else {
        InsertUpdateFunction("form", "/api/Payables/Update", {
            pSavedFrom: 10 //pSavedFrom=10 : saved from Operations
            , pOperationContainersAndPackagesID: ($('#slPayableTank option:selected').val() == "" ? 0 : $('#slPayableTank option:selected').val())
            , pID: $("#hPayableID").val()
            //, pMeasurementID: $("#txtCalculationType").attr("MeasurementID")
            , pOperationID: $("#slFilterOperation").val()
            , pChargeTypeID: $("#slPayableChargeType").val() == "" ? 0 : $("#slPayableChargeType").val() //$("#txtPayableType").attr("ChargeTypeID")
            , pMeasurementID: $('#slPayableUOM option:selected').val() != ""
                ? $('#slPayableUOM option:selected').val()
                : 0
            //, pContainerTypeID: ((($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked')) && $('#slPayableUOM option:selected').val() != "")
            //    ? $('#slPayableUOM option:selected').val()
            //    : 0)
            , pContainerTypeID: 0
            //, pPackageTypeID: ((($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) && $('#slPayableUOM option:selected').val() != "")
            //    ? $('#slPayableUOM option:selected').val()
            //    : 0)
            , pPOrC: ($('#slPayablePOrC option:selected').val() == "" ? 0 : $('#slPayablePOrC option:selected').val())
            , pSupplierOperationPartnerID: ($('#slPayableSupplier option:selected').val() == "" ? 0 : $('#slPayableSupplier option:selected').val())
            , pQuantity: ($("#txtPayableQuantity").val().trim() == "" ? 0 : $("#txtPayableQuantity").val().trim())
            , pCostPrice: ($("#txtPayableUnitPrice").val().trim() == "" ? 0 : $("#txtPayableUnitPrice").val().trim())

            , pAmountWithoutVAT: $("#txtPayableAmountWithoutVAT").val()
            , pTaxTypeID: $("#slPayableTax").val() == "" ? 0 : $("#slPayableTax").val()
            , pTaxPercentage: $("#txtPayableTaxPercentage").val() == "" ? 0 : $("#txtPayableTaxPercentage").val()
            , pTaxAmount: $("#txtPayableTaxAmount").val() == "" ? 0 : $("#txtPayableTaxAmount").val()
            , pDiscountTypeID: $("#slPayableDiscount").val() == "" ? 0 : $("#slPayableDiscount").val()
            , pDiscountPercentage: $("#txtPayableDiscountPercentage").val() == "" ? 0 : $("#txtPayableDiscountPercentage").val()
            , pDiscountAmount: $("#txtPayableDiscountAmount").val() == "" ? 0 : $("#txtPayableDiscountAmount").val()

            , pCostAmount: ($("#txtPayableAmount").val().trim() == "" ? 0 : $("#txtPayableAmount").val().trim())
            , pInitialSalePrice: ($("#txtPayableInitialSalePrice").val().trim() == "" ? 0 : $("#txtPayableInitialSalePrice").val().trim())
            , pSupplierInvoiceNo: ($("#txtPayableSupplierInvoiceNo").val().trim() == "" ? 0 : $("#txtPayableSupplierInvoiceNo").val().trim().toUpperCase())
            , pSupplierReceiptNo: ($("#txtPayableSupplierReceiptNo").val().trim() == "" ? 0 : $("#txtPayableSupplierReceiptNo").val().trim().toUpperCase())
            , pEntryDate: ($("#txtPayableEntryDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtPayableEntryDate").val().trim()))
            , pBillID: ($('#slPayableBill option:selected').val() == "" ? 0 : $('#slPayableBill option:selected').val())

            , pIssueDate: ($("#txtPayableIssueDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtPayableIssueDate").val().trim()))

            , pExchangeRate: ($("#txtPayableExchangeRate").val().trim() == "" ? 0 : $("#txtPayableExchangeRate").val().trim())
            , pCurrencyID: ($('#slPayableCurrency option:selected').val() == "" ? 0 : $('#slPayableCurrency option:selected').val())
            , pNotes: $("#txtPayableNotes").val().toUpperCase().trim()
            //the next 2 parameters are to check uniqueness of supplier invoice No. in the controller
            , pPartnerTypeID: $('#slPayableSupplier option:selected').attr("PartnerTypeID") == "" ? 0 : $('#slPayableSupplier option:selected').attr("PartnerTypeID")
            , pPartnerID: $('#slPayableSupplier option:selected').attr("PartnerID") == "" ? 0 : $('#slPayableSupplier option:selected').attr("PartnerID")
            , pPayableBillTo: 0
            , pSupplierSiteID: ($('#slSites option:selected').val() == "" ? 0 : $('#slSites option:selected').val())
            , pTruckingOrderID: 0
            , pCategoryID: ($('#slPayableCategory option:selected').val() == "" ? 0 : $('#slPayableCategory option:selected').val())
            , pIsCredit: true
            , pOperationVehicleID: 0

        }, pSaveandAddNew, "EditPayableModal"
            , function (data) {
                       DebitAndCreditClose__FillPayablesAndReceivables($("#slFilterOperation").val(), $("#hID").val()); //Payables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                if (data[1] != "") //supplier invoice number uniqueness violated
                    swal(strSorry, data[1]);
            });
    }
}
function Payables_EditByDblClick(pID) {
    debugger;
    if ($("#hDefaultUnEditableCompanyName").val() == "GBL") {
        $(".classShowForGBL").removeClass("hide");
        $("#txtPayableSupplierInvoiceNo").attr("data-required", "true");
    }
    jQuery("#EditPayableModal").modal("show");
    ClearAll("#EditPayableModal");

    $("#hPayableID").val(pID);
    FadePageCover(true);
    var tr = $("#tblPayables tr[ID='" + pID + "']");
    var pPOrCID = $(tr).find("td.PayablePOrC").attr('val');
    var pPartnerSupplierID = $(tr).find("td.PayableSupplier").attr('val');
    var pUOMID = $(tr).find("td.PayableUOM").attr('val');
    var pCurrencyID = $(tr).find("td.PayableCurrency").attr('val');
    var pOperationID = $(tr).find("td.PayableOperation").attr('val');
    var pBillID = $(tr).find("td.PayableBillID").text();
    var pSupplierSiteID = $(tr).find("td.SupplierSiteID").text();
    var pContainerID = $(tr).find("td.PayableOperationContainersAndPackagesID").text();

    var pTaxTypeID = $(tr).find("td.PayableTaxTypeID").attr('val');
    var pDiscountTypeID = $(tr).find("td.PayableDiscountTypeID").attr('val');

    $('#slPayableTank').parent().removeClass('hide');



    GetListWithOpCodeAndHouseNoAndClientEmailAttr(pBillID, "/api/Operations/LoadWithParameters", "<--Select-->", "slPayableBill"
        , { pPageNumber: 1, pPageSize: 99999, pWhereClause: " WHERE MasterOperationID = " + pOperationID, pOrderBy: "HouseNumber" }
        , function () {
            CallGETFunctionWithParameters("/api/OperationContainersAndPackages/LoadAllTanks"
                , {
                    pPageNumber: 1
                    , pPageSize: 999999
                    , pWhereClauseForTank: pBillID > 0 ? "where id in (SELECT OperationContainersAndPackagesID FROM OperationContainersAndPackagesPlacedOn WHERE OperationID = " + pBillID + ")" : "WHERE OperationID=" + $("#hOperationID").val() + (false ? " AND TankOrFlexiNumber IS NOT NULL AND TankOrFlexiNumber<>'' " : " AND ContainerNumber IS NOT NULL AND ContainerNumber<>'' ")
                    , pOrderBy: "TankOrFlexiNumber"
                }
                , function (pData_Tank) {
                    debugger;
                    var pTank = pData_Tank[0];
                    FillListFromObject(pContainerID, 11, "<--Select Container-->", "slPayableTank", pTank
                        , function () {
                            //$("#slSearchTankInReceivables").html($("#slPayableTank").html());
                        });
                }
                , null);
 FadePageCover(false); });






    if ($("#hDefaultCurrencyID").val() == pCurrencyID)
        $("#txtPayableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtPayableExchangeRate").removeAttr("disabled");

    debugger;

    //if (pPartnerSupplierID == 0) {
    //    $("#txtPayableSupplierInvoiceNo").attr("disabled", "disabled");
    //    //$("#txtPayableSupplierReceiptNo").attr("disabled", "disabled");
    //}
    //else {
    //    $("#txtPayableSupplierInvoiceNo").removeAttr("disabled");
    //    $("#txtPayableSupplierReceiptNo").removeAttr("disabled");
    //}
    //if ($(tr).find("td.PayableSupplierInvoiceNo").text() == "" && $(tr).find("td.PayableSupplierReceiptNo").text() == "")
    //if ($(tr).find("td.PayableSupplierInvoiceNo").text())
    //    $("#slPayableSupplier").removeAttr("disabled");
    //else
    //    $("#slPayableSupplier").attr("disabled", "disabled");

    GetListWithCodeAndWhereClause(pID, "/api/NoAccessFreightTypes/LoadAll", "P/C", "slPayablePOrC" /*pSlName*/, " WHERE 1=1 ");  //PayablePOrC_GetList(pPOrCID, "slPayablePOrC");
    PayableSuppliers_GetList(pPartnerSupplierID, "slPayableSupplier", function () {
        if (pDefaults.UnEditableCompanyName == "GBL")
            FillSupplierSites(pSupplierSiteID);
    });
    $("#slPayableCurrency").html($("#hReadySlCurrencies").html()); $("#slPayableCurrency").val(pCurrencyID); //PayableCurrency_GetList(pCurrencyID, "slPayableCurrency");
    PayableUOM_GetList(pUOMID, "slPayableUOM");
    GetListTaxTypeWithNameAndPercAttr(pTaxTypeID, "api/TaxeTypes/LoadAllWithWhereClause"
        , "<--Select-->", "slPayableTax", "WHERE IsInactive=0 ORDER BY Name"
        , function () {
            $("#slPayableDiscount").html($("#slPayableTax").html());
            $("#slPayableDiscount").val(pDiscountTypeID == 0 ? "" : pDiscountTypeID);
            $("#slPayableTax option[IsDiscount='true']").addClass('hide');
            $("#slPayableDiscount option[IsDiscount='false']").addClass('hide');
        });
    $("#slPayableCategory").val($(tr).find("td.PayableCategory").text());

    $("#lblPayableShown").html(": " + $(tr).find("td.Payable").text());
    $("#lblPayableCreatedBy").html(" : " + $(tr).find("td.PayableCreatorName").text())
    $("#lblPayableCreationDate").html(" : " + $(tr).find("td.PayableCreationDate").text())
    $("#lblPayableUpdatedBy").html(": " + $(tr).find("td.PayableModificatorName").text())
    $("#lblPayableModificationDate").html(" : " + $(tr).find("td.PayableModificationDate").text())

    //$("#txtPayableType").val($(tr).find("td.Payable").text());
    //$("#txtPayableType").attr("ChargeTypeID", $(tr).find("td.Payable").attr("val"));
    CallGETFunctionWithParameters("/api/ChargeTypes/LoadAllWithMinimalColumns"
        , { pWhereClauseWithMinimalColumns: "WHERE 1=1" }
        , function (pData) {
            FillListFromObject($(tr).find("td.Payable").attr("val"), (pDefaults.IsRepeatChargeTypeName ? 4 : 2), "<--Select-->", "slPayableChargeType", pData[0], null);
        }
        , null);


    $("#txtPayableQuantity").val($(tr).find("td.PayableQuantity").text());
    $("#txtPayableUnitPrice").val(parseInt($(tr).find("td.PayableCostPrice").text()) == 0 ? "" : $(tr).find("td.PayableCostPrice").text());
    $("#txtPayableAmountWithoutVAT").val(parseInt($(tr).find("td.PayableAmountWithoutVAT").text()) == 0 ? "" : $(tr).find("td.PayableAmountWithoutVAT").text());

    $("#txtPayableTaxPercentage").val($(tr).find("td.PayableTaxPercentage").text());
    $("#txtPayableTaxAmount").val($(tr).find("td.PayableTaxAmount").text());
    $("#txtPayableDiscountPercentage").val($(tr).find("td.PayableDiscountPercentage").text());
    $("#txtPayableDiscountAmount").val($(tr).find("td.PayableDiscountAmount").text());

    $("#txtPayableAmount").val(parseInt($(tr).find("td.PayableCostAmount").text()) == 0 ? "" : $(tr).find("td.PayableCostAmount").text());
    $("#txtPayableInitialSalePrice").val($(tr).find("td.PayableInitialSalePrice").text());
    $("#txtPayableExchangeRate").val($(tr).find("td.PayableExchangeRate").text());
    $("#txtPayableSupplierInvoiceNo").val($(tr).find("td.PayableSupplierInvoiceNo").text());
    $("#txtPayableSupplierReceiptNo").val($(tr).find("td.PayableSupplierReceiptNo").text());
    $("#txtPayableEntryDate").val($(tr).find("td.PayableEntryDate").text());
    $("#txtPayableIssueDate").val($(tr).find("td.PayableIssueDate").text());
    $("#txtPayableNotes").val($(tr).find("td.PayableNotes").text());

    $("#slPayableUOM").attr("onchange", "Payables_UOMChanged();");
    $("#btnSavePayable").attr("onclick", "Payables_Update(false);");



    if ($('#txtPayableSupplierInvoiceNo').val() == '') {

        $('#slPayableSupplier').removeAttr("disabled");
    } else {

        $('#slPayableSupplier').attr("disabled", "disabled");



    }
    $("#slPayableBill").attr("onchange", 'LoadBillContainers(this.value);');

}

function LoadBillContainers(pBillID) {


    CallGETFunctionWithParameters("/api/OperationContainersAndPackages/LoadAllTanks"
        , {
            pPageNumber: 1
            , pPageSize: 999999
            , pWhereClauseForTank: "where id in (SELECT OperationContainersAndPackagesID FROM OperationContainersAndPackagesPlacedOn WHERE OperationID = " + pBillID +")"
            , pOrderBy: "TankOrFlexiNumber"
        }
        , function (pData_Tank) {
            debugger;
            var pTank = pData_Tank[0];
            FillListFromObject(null, 11, "<--Select Container-->", "slPayableTank", pTank
                , function () {
                    //$("#slSearchTankInReceivables").html($("#slPayableTank").html());
                });
        }
        , null);





}


function PayableSuppliers_GetList(pID, pSlName, pCallback) {
    var pWhereClause = " WHERE OperationID = " + $("#slFilterOperation").val();
    pWhereClause += " AND PartnerID IS NOT NULL ";
    //pWhereClause += " AND PartnerTypeID != " + constCustomerPartnerTypeID;
    pWhereClause += " ORDER BY PartnerTypeName ";
    //parameters: ID, strFnName, First Row in select list, select list name, whereClause, callback
    //GetListWithCodeAndNameAndWhereClause(pID, "/api/OperationPartners/LoadAll", "Select Supplier", pSlName, pWhereClause);
    GetListOperationPartnersWithPartnerTypeIDAndPartnerIDAttrAndWhereClause(pID, "/api/OperationPartners/LoadAll", "Select Supplier", pSlName, pWhereClause, pCallback);
}
function PayableUOM_GetList(pID, pSlName) {
    var pWhereClause = "";
    //pWhereClause += " Where OperationID = " + $("#hOperationID").val();
    //if ($("#hShipmentType").val() == constFCLShipmentType)
    //    pWhereClause += " WHERE IsUsedInFCl = 1 ";
    //else
    //    if ($("#hShipmentType").val() == constLCLShipmentType)
    //        pWhereClause += " WHERE IsUsedInLCL = 1 ";
    //    else
    //        if ($("#hShipmentType").val() == constFTLShipmentType)
    //            pWhereClause += " WHERE IsUsedInFTL = 1 ";
    //        else
    //            if ($("#hShipmentType").val() == constLTLShipmentType)
    //                pWhereClause += " WHERE IsUsedInLTL = 1 ";
    //            else
    //                if ($("#hShipmentType").val() == constConsolidationShipmentType)
    //                    pWhereClause += " WHERE IsUsedInConsolidation = 1 ";
    //                else
    //                    if ($("#hShipmentType").val() == "0")
    //                        pWhereClause += " WHERE IsUsedInAir = 1 ";
    //pWhereClause += " OR ID = " + pID; //for the case that settings changed for a UOM at the time it is taken 
    pWhereClause += " ORDER BY Code ";
    //GetListWithCodeAndNameAndWhereClause(pID, "/api/NoAccessMeasurements/LoadAll", "Select UOM", pSlName, pWhereClause);
    GetListWithNameAndWhereClause(pID, "/api/NoAccessMeasurements/LoadAll", "Select UOM", pSlName, pWhereClause);
}
function Payables_PayableSupplierInvoiceOrReceiptNoChanged(pSupplierControl, pSupplierInvoiceControlID, pSupplierReceiptControlID) { //pSupplierControl is a control not ID so dont use #
    debugger;
    //if ($(pSupplierInvoiceControlID).val() == "" && $(pSupplierReceiptControlID).val() == "") {
    if ($(pSupplierInvoiceControlID).val() == "") {
        $(pSupplierControl).removeAttr("disabled");
    }
    else {
        $(pSupplierControl).attr("disabled", "disabled");
    }
}
function CalculatePayablesAmount() {
    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0; var decTaxPercentage = 0.0;
    var decDiscountAmount = 0; var decDiscountPercentage = 0.0;

    decAmountWithoutVAT = $("#txtPayableQuantity").val() * $("#txtPayableUnitPrice").val();
    $("#txtPayableAmountWithoutVAT").val(decAmountWithoutVAT);
    decTaxPercentage = $("#slPayableTax option:selected").attr("CurrentPercentage");
    decTaxAmount = decAmountWithoutVAT * decTaxPercentage / 100;
    decDiscountPercentage = $("#slPayableDiscount option:selected").attr("CurrentPercentage");
    decDiscountAmount = decAmountWithoutVAT * decDiscountPercentage / 100;
    $("#txtPayableTaxPercentage").val(decTaxPercentage);
    $("#txtPayableTaxAmount").val(decTaxAmount.toFixed(4));
    $("#txtPayableDiscountPercentage").val(decDiscountPercentage);
    $("#txtPayableDiscountAmount").val(decDiscountAmount.toFixed(4));
    $("#txtPayableAmount").val((decAmountWithoutVAT + decTaxAmount - decDiscountAmount).toFixed(4));
}
function Payables_CurrencyChanged() {
    $("#txtPayableExchangeRate").val($("#slPayableCurrency option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slPayableCurrency").val())
        $("#txtPayableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtPayableExchangeRate").removeAttr("disabled");
}

//------------------------AccNotes-----------------------------------------------------------
function AccNotes_ClearAllControls(pDebitOrCredit) {
    debugger;
    var pTblName = ""; var pClassOfCurrencyTd = ""; var pClassOfAmountTd = "";
    if (pDebitOrCredit == constTransactionDebitNote) { //i.e. pDebitOrCredit=90
        pTblName = "tblReceivables";
        pClassOfCurrencyTd = "ReceivableCurrency";
        pClassOfAmountTd = "ReceivableSaleAmount";
    }
    else if (pDebitOrCredit == constTransactionCreditNote) { //i.e. pDebitOrCredit=100
        pTblName = "tblPayables";
        pClassOfCurrencyTd = "PayableCurrency";
        pClassOfAmountTd = "PayableCostAmount";
    }
    $("#slAccNoteTax").attr("onchange", 'Invoices_SetInvoiceAmount(' + '"' + pTblName + '","AccNote","' + pClassOfAmountTd + '");');
    $("#slAccNoteDiscount").attr("onchange", 'Invoices_SetInvoiceAmount(' + '"' + pTblName + '","AccNote","' + pClassOfAmountTd + '");');
    ClearAll("#AccNoteModal");
    if (GetAllSelectedIDsAsString(pTblName) != "")
        if (Invoices_CheckSameCurrency(pTblName, pClassOfCurrencyTd)) {

            // Check if it is approved from C#

            CallGETFunctionWithParameters("/api/Payables/CheckIfApprovedOrNot", {
                pIDs: GetAllSelectedIDsAsString(pTblName)
                //, IsPayNotRec: pDebitOrCredit == constTransactionCreditNote
            }

                , function (pData) {
                    debugger;
                    var AllIsUnApproved = pData[0];
                    if (AllIsUnApproved || pDebitOrCredit == constTransactionDebitNote) {   // this check is on Payables Only
                        debugger;
                        jQuery("#AccNoteModal").modal("show");
                        $("#slAccNoteType").val(pDebitOrCredit);
                        GetListWithCodeAndOperationPartnerIDAttr(null, "/api/Invoices/LoadAll", "Select Invoice", "slAccNoteInvoice", "WHERE OperationID=" + $("#hOperationID").val(), null);
                        InvoiceOperations_GetList($("#hOperationID").val(), "slAccNoteOperations");
                        AccNotePartners_GetList(null, $("#hOperationID").val(), "slAccNotePartner", null);
                        Invoices_SetInvoiceAmount(pTblName, "AccNote", pClassOfAmountTd);
                        InvoiceAddressTypes_GetList(null, "slAccNoteAddressTypes", "slAccNotePartner", null);//the 3rd parameter is the sl name of the partner control
                        //get the invoice currency from the 1st item (i checked they have the same currency)
                        var pAccNoteCurrencyID = $('#' + pTblName).find('input[name="Delete"]:checked:first').parent().parent().find("td." + pClassOfCurrencyTd).attr('val');
                        InvoiceCurrency_GetList(pAccNoteCurrencyID, "slAccNoteCurrency", "AccNote");
                        //InvoicePaymentTerms_GetList(null, "slInvoicePaymentTerms");
                        GetListTaxTypeWithNameAndPercAttr(null, "/api/TaxeTypes/LoadAllWithWhereClause"
                            , TranslateString("SelectFromMenu"), "slAccNoteTax", "WHERE IsInactive=0 ORDER BY Name"
                            , function () {
                                $("#slAccNoteDiscount").html($("#slAccNoteTax").html());
                                $("#slAccNoteTax option[IsDiscount='true']").addClass('hide');
                                $("#slAccNoteDiscount option[IsDiscount='false']").addClass('hide');
                            });
                        $("#txtAccNoteDate").val(ConvertDateFormat(FormattedTodaysDate));
                    } else {
                        swal(strSorry, "Some Payables are Approved. Please Refresh the Operation");
                    }

                });


        }
        else //there are different currencies
            swal(strSorry, "The items must be of the same currency.");
    else { //no items are selected
        //jQuery("#InvoiceModal").modal("hide");
        swal(strSorry, "Please, Select at least one item.");
    }
}
function AccNotes_Insert(pSaveandAddNew) {
    debugger;
    FadePageCover(true);
    var pParametersWithValues = {
        pWhereClauseCurrencyDetails: ("WHERE ID=" + $("#slAccNoteCurrency").val() + " AND '" + GetDateWithFormatyyyyMMdd($("#txtAccNoteDate").val()) + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
            + " AND '" + GetDateWithFormatyyyyMMdd($("#txtAccNoteDate").val()) + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
            + " ORDER BY CODE"
        )
    };
    CallGETFunctionWithParameters("/api/Currencies/LoadCurrencyDetails", pParametersWithValues
        , function (pData) {
            if (pData[0] == "[]") {
                $("#txtAccNoteMasterDataExchangeRate").val(0);
                swal("Sorry", "Exchange rate is not set for " + $("#slAccNoteCurrency option:selected").text() + " in the Master Data.");
                FadePageCover(false);
            }
            else {
                $("#txtAccNoteMasterDataExchangeRate").val(JSON.parse(pData[0])[0].ExchangeRate);
                if ($("#txtAccNoteAmount").val() == 0) {
                    FadePageCover(false);
                    swal(strSorry, "The total amount can't be 0.");
                }
                else {
                    var pSelectedItemsIDs = $("#slAccNoteType").val() == constTransactionDebitNote ? GetAllSelectedIDsAsString('tblReceivables') : GetAllSelectedIDsAsString('tblPayables');
                    var data = {
                        "pSelectedItemsIDs": pSelectedItemsIDs
                        , "pNoteType": $("#slAccNoteType").val()
                        , "pNoteDate": ($("#txtAccNoteDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtAccNoteDate").val().trim()))

                        , "pOperationID": $("#slAccNoteOperations").val()
                        , "pOperationPartnerID": $("#slAccNotePartner").val() //in table OperationPartners
                        , "pInvoiceID": $("#slAccNoteInvoice").val() == "" ? 0 : $("#slAccNoteInvoice").val()
                        , "pAddressID": $("#slAccNoteAddressTypes").val() == "" ? 0 : $("#slAccNoteAddressTypes").val()
                        , "pPrintedAddress": "0"

                        , "pCurrencyID": $("#slAccNoteCurrency").val()
                        , "pExchangeRate": ($("#txtAccNoteMasterDataExchangeRate").val() == "" ? 1 : $("#txtAccNoteMasterDataExchangeRate").val())

                        , "pAmountWithoutVAT": $("#txtAccNoteAmountWithoutVAT").val() == "" ? 0 : $("#txtAccNoteAmountWithoutVAT").val()
                        , "pTaxTypeID": $("#slAccNoteTax").val() == "" ? 0 : $("#slAccNoteTax").val()
                        , "pTaxPercentage": $("#txtAccNoteTaxPercentage").val() == "" ? 0 : $("#txtAccNoteTaxPercentage").val()
                        , "pTaxAmount": $("#txtAccNoteTaxAmount").val() == "" ? 0 : parseFloat($("#txtAccNoteTaxAmount").val()).toFixed(2)
                        , "pDiscountTypeID": $("#slAccNoteDiscount").val() == "" ? 0 : $("#slAccNoteDiscount").val()
                        , "pDiscountPercentage": $("#txtAccNoteDiscountPercentage").val() == "" ? 0 : $("#txtAccNoteDiscountPercentage").val()
                        , "pDiscountAmount": $("#txtAccNoteDiscountAmount").val() == "" ? 0 : $("#txtAccNoteDiscountAmount").val()

                        , "pAmount": $("#txtAccNoteAmount").val() == "" ? 0 : parseFloat($("#txtAccNoteAmount").val()).toFixed(2)
                        , "pNoteStatusID": 1
                        , "pRemarks": ($("#txtAccNoteRemarks").val().trim() == "" ? "0" : $("#txtAccNoteRemarks").val().trim().toUpperCase())
                    }
                    InsertUpdateFunction("form", "/api/AccNote/Insert", data, pSaveandAddNew, "AccNoteModal"
                        , function (data) {

                            //if ($("#slAccNoteType").val() == constTransactionDebitNote)
                            //    Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                            //else
                            //    Payables_LoadWithPagingWithWhereClause($("#hOperationID").val());

                            DebitAndCreditClose__FillPayablesAndReceivables($("#slFilterOperation").val(), $("#hID").val());

                            OperationPartners_LoadWithPagingWithWhereClause($("#hOperationID").val());
                            AccNotes_LoadAll($("#hOperationID").val());
                            if (data[0]) {
                                if (pDefaults.UnEditableCompanyName != 'CHM' && pDefaults.UnEditableCompanyName != 'CSL')
                                    AccNotes_Print(data[1], $("#slAccNoteType").val(), 3/*$("#slAccNoteReportTypes").val()*/);
                            }
                            else
                                swal("Sorry", "Connection Failure, please refresh then try again.");
                        });
                }
            } //of else exchange rate is ok
        } //of callback function in CallGetFunctionWithParameters
        , null);
}

function Invoices_CheckSameCurrency(pTblName, pClassOfCurrencyTd) {
    debugger;
    var isSameCurrency = true;
    //get the currencyID of the first item checked and then compare it to currencies of other items
    var firstCurrencyIDChecked = $('#' + pTblName).find('input[name="Delete"]:checked:first').parent().parent().find("td." + pClassOfCurrencyTd).attr('val');
    $('#' + pTblName + ' td').find('input[name="Delete"]:checked').each(function () {
        if (firstCurrencyIDChecked != $("#" + pTblName + " tr[id=" + $(this).attr('value') + "]").find("td." + pClassOfCurrencyTd).attr('val'))
            isSameCurrency = false;
    });
    return isSameCurrency;
}
function InvoiceOperations_GetList(pOperationID, pSlName, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    debugger;
    //parameters: ID, strFnName, First Row in select list, select list name
    var pWhereClause = " WHERE ID = " + pOperationID + " OR MasterOperationID = " + pOperationID;
    //GetListWithOpCodeAndHouseNoAndClientEmailAttr(pOperationID, "/api/Operations/LoadAll", null, pSlName, pWhereClause);
    GetListWithOpCodeAndHouseNoAndClientEmailAttr(pOperationID, "/api/Operations/LoadWithParameters", null, pSlName, { pPageNumber: 1, pPageSize: 99999, pWhereClause: pWhereClause, pOrderBy: "HouseNumber" }
        , callback);
}
function AccNotePartners_GetList(pID, pAccNoteOperationID, pSlName, callback) {
    var pWhereClause = " WHERE OperationID = " + pAccNoteOperationID;
    pWhereClause += " AND PartnerID IS NOT NULL ";
    pWhereClause += " OR ID = " + pID;
    pWhereClause += " ORDER BY PartnerTypeName ";
    //parameters: ID, strFnName, First Row in select list, select list name, whereClause, callback
    GetListOperationPartnersWithPartnerTypeIDAndPartnerIDAttrAndWhereClause(pID, "/api/OperationPartners/LoadAll", TranslateString("SelectFromMenu"), pSlName, pWhereClause
        , function () {
            //if ((pID == null || pID == undefined) && $("#" + pSlName + " :nth-of-type(2)").val() != undefined) {
            //    $("#" + pSlName).val($("#" + pSlName + " :nth-of-type(2)").val());//to select the 1st item
            if (callback != null && callback != undefined)
                callback();
            //}
        });
}
function Invoices_SetInvoiceAmount(pTblName, pControlPrefix, pClassOfAmountTd) {
    debugger;
    var decInvoiceAmount = 0;
    var decInvoiceTaxAmount = 0; var decInvoiceTaxPercentage = 0.0;
    var decInvoiceDiscountAmount = 0; var decInvoiceDiscountPercentage = 0.0;
    var decInvoiceFixedDiscount = 0.0;
    $("#" + pTblName + " td input[name='Delete']:checked").each(function () {
        var RowSaleAmount = $("#" + pTblName + " tr[ID=" + this.value + "] td." + pClassOfAmountTd).text();
        if (!isNaN(RowSaleAmount) && RowSaleAmount.length != 0) {
            decInvoiceAmount += parseFloat(RowSaleAmount);
        }
    });

    if ($("#txt" + pControlPrefix + "FixedDiscount").val() != undefined && $("#txt" + pControlPrefix + "FixedDiscount").val() != 0) {
        decInvoiceFixedDiscount = $("#txt" + pControlPrefix + "FixedDiscount").val();
        decInvoiceAmount -= decInvoiceFixedDiscount;
    }

    if ($("#sl" + pControlPrefix + "Tax option:selected").attr("CurrentPercentage") != undefined) {
        decInvoiceTaxPercentage = $("#sl" + pControlPrefix + "Tax option:selected").attr("CurrentPercentage");
        decInvoiceTaxAmount = (decInvoiceAmount * decInvoiceTaxPercentage / 100).toFixed(2);
    }
    if ($("#sl" + pControlPrefix + "Discount option:selected").attr("CurrentPercentage") != undefined) {
        decInvoiceDiscountPercentage = $("#sl" + pControlPrefix + "Discount option:selected").attr("CurrentPercentage");
        decInvoiceDiscountAmount = (decInvoiceAmount * decInvoiceDiscountPercentage / 100).toFixed(2);
    }

    $("#txt" + pControlPrefix + "AmountWithoutVAT").val(decInvoiceAmount.toFixed(2)); //its w/o VAT before adding tax and discount
    decInvoiceAmount += decInvoiceTaxAmount - decInvoiceDiscountAmount;
    $("#txt" + pControlPrefix + "TaxAmount").val(decInvoiceTaxAmount);
    $("#txt" + pControlPrefix + "DiscountAmount").val(decInvoiceDiscountAmount);
    $("#txt" + pControlPrefix + "TaxPercentage").val(decInvoiceTaxPercentage);
    $("#txt" + pControlPrefix + "DiscountPercentage").val(decInvoiceDiscountPercentage);
    $("#txt" + pControlPrefix + "Amount").val(decInvoiceAmount.toFixed(2));
}
function InvoiceAddressTypes_GetList(pID, pSlName, pOperationPartnerSlName, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    debugger;
    pWhereClause = "";
    pWhereClause = " Where (PartnerID = " + ($("#" + pOperationPartnerSlName + " option:selected").attr("PartnerID") == "" ? 0 : $("#" + pOperationPartnerSlName + " option:selected").attr("PartnerID"));
    pWhereClause += "  AND PartnerTypeID=" + ($("#" + pOperationPartnerSlName + " option:selected").attr("PartnerTypeID") == "" ? 0 : $("#" + pOperationPartnerSlName + " option:selected").attr("PartnerTypeID")) + ") ";
    if (pID != null)
        pWhereClause += " OR ID = " + pID;
    pWhereClause += " ORDER BY AddressTypeID ";
    debugger;
    GetListAddressesWithMultipleAttr(pID, "/api/Addresses/LoadAll", TranslateString("SelectFromMenu"), pSlName, pWhereClause
        , function () {
            if ((pID == null || pID == undefined) && $("#" + pSlName + " :nth-of-type(2)").val() != undefined)
                $("#" + pSlName).val($("#" + pSlName + " :nth-of-type(2)").val());//to select the 1st item
        });
}
function InvoiceCurrency_GetList(pID, pSlName, pControlPrefix) {
    if (pSlName != null && pSlName != undefined && pSlName != 0)
        $("#" + pSlName).val(pID);
    else
        $("#" + pSlName).val($("#hDefaultCurrencyID").val());
    $("#txt" + pControlPrefix + "MasterDataExchangeRate").val($("#" + pSlName + " option:selected").attr("MasterDataExchangeRate"));
}




function UpDateQuoteAfterClose() {
    debugger;

    swal({
        title: "Are you sure?",
        text: "Quotation In Dynamics CRM Will Be Updated",
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
                    pWhereClause: "where id = " + $("#slFilterOperation").val()
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


            //CallGETFunctionWithParameters("/api/SetOperationStage/UpdateClosedOperationsInDynamic",
            //    {
            //        pWhereClause: "where id = " + $("#slFilterOperation").val()
            //    }
            //    , function (pData) {
            //        let pReturnedMessage = pData[0];
            //        if (pData[0] != "") {

            //            var pMessageFromSP = pData[0];
            //            var word = "Transaction";
            //            var index = pMessageFromSP.indexOf(word);
            //            if (index !== -1) {
            //                pMessageFromSP = pMessageFromSP.substring(0, index + word.length - 12);
            //                swal("Sorry", pMessageFromSP);
            //            }
            //            else
            //                swal("Sorry", pReturnedMessage);

            //            FadePageCover(false);
            //        }
            //        else {
            //            swal("Success", "Done successfully.");
            //            FadePageCover(false);
            //        }
            //    });
        });







}


function Receivables_CurrencyChanged() {
    $("#txtReceivableExchangeRate").val($("#slReceivableCurrency option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slReceivableCurrency").val() || pDefaults.UnEditableCompanyName == "ICS") {
        $("#txtReceivableExchangeRate").attr("disabled", "disabled");
    }
    else {
        $("#txtReceivableExchangeRate").attr("disabled", "disabled");
    }
}



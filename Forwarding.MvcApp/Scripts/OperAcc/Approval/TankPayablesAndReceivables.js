
function onFileSelected(event) {
    debugger;
    var selectedFile = event.target.files[0];
    if (selectedFile != undefined) { //to handle the case of not choosing a file
        var sFilename = selectedFile.name;
        // Create A File Reader HTML5
        var reader = new FileReader();
        var result = document.getElementById("hExtractedData");
        reader.onload = function (e) {
            var data = e.target.result;
            var cfb = XLS.CFB.read(data, { type: 'binary' });
            var wb = XLS.parse_xlscfb(cfb);
            // Loop Over Each Sheet
            wb.SheetNames.forEach(function (sheetName) {
                //// Obtain The Current Row As CSV
                //var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
                var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
                //$("#hExtractedData").val(sCSV);
                if (oJS.length > 0 && oJS[0].ContainerNumber != undefined) //if (sCSV != "")
                    ImportFromExcelFile(oJS);
                else {
                    swal("Sorry", "Please, revise data and version of the file.");
                    $("#btnAddFromExcel").val("");
                }
            });
        };
        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(selectedFile);
    }
}

//Kelany Tanks Start 19-01-2020
function onFileSelectedTanksGhabour(event) {
    debugger;
    ImportExcel("#btnAddFromExcel", '#tblTanksExcel')

}

function InsertTanksFinal() {
    debugger;
    var TankNumber = "";
    var Operator = "";
    var Cost1 = "";
    var Revenue1 = "";
    var Date1 = "";
    var Notes1 = "";
    var Cost2 = "";
    var Revenue2 = "";
    var Date2 = "";
    var Notes2 = "";
    var Cost3 = "";
    var Revenue3 = "";
    var Date3 = "";
    var Notes3 = "";
    var Cost4 = "";
    var Revenue4 = "";
    var Date4 = "";
    var Notes4 = "";
    var Cost5 = "";
    var Revenue5 = "";
    var Date5 = "";
    var Notes5 = "";
    var Cost6 = "";
    var Revenue6 = "";
    var Date6 = "";
    var Notes6 = "";
    var Cost7 = "";
    var Revenue7 = "";
    var Date7 = "";
    var Notes7 = "";
    var Cost8 = "";
    var Revenue8 = "";
    var Date8 = "";
    var Notes8 = "";
    var Cost9 = "";
    var Revenue9 = "";
    var Date9 = "";
    var Notes9 = "";
    var Cost10 = "";
    var Revenue10 = "";
    var Date10 = "";
    var Notes10 = "";
    var Cost11 = "";
    var Revenue11 = "";
    var Date11 = "";
    var Notes11 = "";
    var Cost12 = "";
    var Revenue12 = "";
    var Date12 = "";
    var Notes12 = "";
    var Cost13 = "";
    var Revenue13 = "";
    var Date13 = "";
    var Notes13 = "";
    var Cost14 = "";
    var Revenue14 = "";
    var Date14 = "";
    var Notes14 = "";
    var Cost15 = "";
    var Revenue15 = "";
    var Date15 = "";
    var Notes15 = "";
    var Cost16 = "";
    var Revenue16 = "";
    var Date16 = "";
    var Notes16 = "";
    var Cost17 = "";
    var Revenue17 = "";
    var Date17 = "";
    var Notes17 = "";
    var Cost18 = "";
    var Revenue18 = "";
    var Date18 = "";
    var Notes18 = "";
    var ColumnNames = "";

    var str = "";
    var Groupitems = new Array();
    var i = 1;
    for (i = 1; i < 75; i++) {
        var ColumnName = $("#tblTanksExcel  tr:first").find('th:nth-child(' + i + ')').text();
        var res = ColumnName.split(" ");  //split by space
        if (i > 2)
            res.pop();  //remove last element
        if (i == 18)
            str += res.join(" ");
        else
            str += res.join(" ") + " , ";

        var items = new Array();
        $('#tblTanksExcel  td:nth-child(' + i + ')').each(function () {
            items.push($(this).html());
        });
        Groupitems.push(items);
    }
    var j = 1;
    for (j = 0; j < 74; j++) {
        var counterRows = 0;
        for (counterRows = 0; counterRows < Groupitems[j].length; counterRows++) {
            j == 0 ? (TankNumber += Groupitems[j][counterRows] + " , ") : j;
            j == 1 ? Operator += Groupitems[j][counterRows] + " , " : j;
            j == 2 ? Cost1 += Groupitems[j][counterRows] + " , " : j;
            j == 3 ? Revenue1 += Groupitems[j][counterRows] + " , " : j;
            j == 4 ? Date1 += Groupitems[j][counterRows] + " , " : j;
            j == 5 ? Notes1 += Groupitems[j][counterRows] + " , " : j;
            j == 6 ? Cost2 += Groupitems[j][counterRows] + " , " : j;
            j == 7 ? Revenue2 += Groupitems[j][counterRows] + " , " : j;
            j == 8 ? Date2 += Groupitems[j][counterRows] + " , " : j;
            j == 9 ? Notes2 += Groupitems[j][counterRows] + " , " : j;
            j == 10 ? Cost3 += Groupitems[j][counterRows] + " , " : j;
            j == 11 ? Revenue3 += Groupitems[j][counterRows] + " , " : j;
            j == 12 ? Date3 += Groupitems[j][counterRows] + " , " : j;
            j == 13 ? Notes3 += Groupitems[j][counterRows] + " , " : j;
            j == 14 ? Cost4 += Groupitems[j][counterRows] + " , " : j;
            j == 15 ? Revenue4 += Groupitems[j][counterRows] + " , " : j;
            j == 16 ? Date4 += Groupitems[j][counterRows] + " , " : j;
            j == 17 ? Notes4 += Groupitems[j][counterRows] + " , " : j;
            j == 18 ? Cost5 += Groupitems[j][counterRows] + " , " : j;
            j == 19 ? Revenue5 += Groupitems[j][counterRows] + " , " : j;
            j == 20 ? Date5 += Groupitems[j][counterRows] + " , " : j;
            j == 21 ? Notes5 += Groupitems[j][counterRows] + " , " : j;
            j == 22 ? Cost6 += Groupitems[j][counterRows] + " , " : j;
            j == 23 ? Revenue6 += Groupitems[j][counterRows] + " , " : j;
            j == 24 ? Date6 += Groupitems[j][counterRows] + " , " : j;
            j == 25 ? Notes6 += Groupitems[j][counterRows] + " , " : j;
            j == 26 ? Cost7 += Groupitems[j][counterRows] + " , " : j;
            j == 27 ? Revenue7 += Groupitems[j][counterRows] + " , " : j;
            j == 28 ? Date7 += Groupitems[j][counterRows] + " , " : j;
            j == 29 ? Notes7 += Groupitems[j][counterRows] + " , " : j;
            j == 30 ? Cost8 += Groupitems[j][counterRows] + " , " : j;
            j == 31 ? Revenue8 += Groupitems[j][counterRows] + " , " : j;
            j == 32 ? Date8 += Groupitems[j][counterRows] + " , " : j;
            j == 33 ? Notes8 += Groupitems[j][counterRows] + " , " : j;
            j == 34 ? Cost9 += Groupitems[j][counterRows] + " , " : j;
            j == 35 ? Revenue9 += Groupitems[j][counterRows] + " , " : j;
            j == 36 ? Date9 += Groupitems[j][counterRows] + " , " : j;
            j == 37 ? Notes9 += Groupitems[j][counterRows] + " , " : j;
            j == 38 ? Cost10 += Groupitems[j][counterRows] + " , " : j;
            j == 39 ? Revenue10 += Groupitems[j][counterRows] + " , " : j;
            j == 40 ? Date10 += Groupitems[j][counterRows] + " , " : j;
            j == 41 ? Notes10 += Groupitems[j][counterRows] + " , " : j;
            j == 42 ? Cost11 += Groupitems[j][counterRows] + " , " : j;
            j == 43 ? Revenue11 += Groupitems[j][counterRows] + " , " : j;
            j == 44 ? Date11 = Groupitems[j][counterRows] + " , " : j;
            j == 45 ? Notes11 += Groupitems[j][counterRows] + " , " : j;
            j == 46 ? Cost12 += Groupitems[j][counterRows] + " , " : j;
            j == 47 ? Revenue12 += Groupitems[j][counterRows] + " , " : j;
            j == 48 ? Date12 += Groupitems[j][counterRows] + " , " : j;
            j == 49 ? Notes12 += Groupitems[j][counterRows] + " , " : j;
            j == 50 ? Cost13 += Groupitems[j][counterRows] + " , " : j;
            j == 51 ? Revenue13 += Groupitems[j][counterRows] + " , " : j;
            j == 52 ? Date13 += Groupitems[j][counterRows] + " , " : j;
            j == 53 ? Notes13 += Groupitems[j][counterRows] + " , " : j;
            j == 54 ? Cost14 += Groupitems[j][counterRows] + " , " : j;
            j == 55 ? Revenue14 += Groupitems[j][counterRows] + " , " : j;
            j == 56 ? Date14 += Groupitems[j][counterRows] + " , " : j;
            j == 57 ? Notes14 += Groupitems[j][counterRows] + " , " : j;
            j == 58 ? Cost15 += Groupitems[j][counterRows] + " , " : j;
            j == 59 ? Revenue15 += Groupitems[j][counterRows] + " , " : j;
            j == 60 ? Date15 += Groupitems[j][counterRows] + " , " : j;
            j == 61 ? Notes15 += Groupitems[j][counterRows] + " , " : j;
            j == 62 ? Cost16 += Groupitems[j][counterRows] + " , " : j;
            j == 63 ? Revenue16 += Groupitems[j][counterRows] + " , " : j;
            j == 64 ? Date16 += Groupitems[j][counterRows] + " , " : j;
            j == 65 ? Notes16 += Groupitems[j][counterRows] + " , " : j;
            j == 66 ? Cost17 += Groupitems[j][counterRows] + " , " : j;
            j == 67 ? Revenue17 += Groupitems[j][counterRows] + " , " : j;
            j == 68 ? Date17 += Groupitems[j][counterRows] + " , " : j;
            j == 69 ? Notes17 += Groupitems[j][counterRows] + " , " : j;
            j == 70 ? Cost18 += Groupitems[j][counterRows] + " , " : j;
            j == 71 ? Revenue18 += Groupitems[j][counterRows] + " , " : j;
            j == 72 ? Date18 += Groupitems[j][counterRows] + " , " : j;
            j == 73 ? Notes18 += Groupitems[j][counterRows] + " , " : j;
        }
    }

    var pParametersWithValues = {
        pTankNumber: TankNumber
    , pOperator: Operator
    , Cost1: Cost1
    , Revenue1: Revenue1
    , Date1: Date1
    , Notes1: Notes1
    , Cost2: Cost2
    , Revenue2: Revenue2
    , Date2: Date2
    , Notes2: Notes2
    , Cost3: Cost3
    , Revenue3: Revenue3
    , Date3: Date3
    , Notes3: Notes3
    , Cost4: Cost4
    , Revenue4: Revenue4
    , Date4: Date4
    , Notes4: Notes4
    , Cost5: Cost5
    , Revenue5: Revenue5
    , Date5: Date5
    , Notes5: Notes5
    , Cost6: Cost6
    , Revenue6: Revenue6
    , Date6: Date6
    , Notes6: Notes6
    , Cost7: Cost7
    , Revenue7: Revenue7
    , Date7: Date7
    , Notes7: Notes7
    , Cost8: Cost8
    , Revenue8: Revenue8
    , Date8: Date8
    , Notes8: Notes8
    , Cost9: Cost9
    , Revenue9: Revenue9
    , Date9: Date9
    , Notes9: Notes9
    , Cost10: Cost10
    , Revenue10: Revenue10
    , Date10: Date10
    , Notes10: Notes10
    , Cost11: Cost11
    , Revenue11: Revenue11
    , Date11: Date11
    , Notes11: Notes11
    , Cost12: Cost12
    , Revenue12: Revenue12
    , Date12: Date12
    , Notes12: Notes12
    , Cost13: Cost13
    , Revenue13: Revenue13
    , Date13: Date13
    , Notes13: Notes13
    , Cost14: Cost14
    , Revenue14: Revenue14
    , Date14: Date14
    , Notes14: Notes14
    , Cost15: Cost15
    , Revenue15: Revenue15
    , Date15: Date15
    , Notes15: Notes15
    , Cost16: Cost16
    , Revenue16: Revenue16
    , Date16: Date16
    , Notes16: Notes16
    , Cost17: Cost17
    , Revenue17: Revenue17
    , Date17: Date17
    , Notes17: Notes17
    , Cost18: Cost18
    , Revenue18: Revenue18
    , Date18: Date18
    , Notes18: Notes18
    , ColumnNames: str
    };
    debugger;
    CallPOSTFunctionWithParameters("/api/TankPayablesAndReceivables/InsertListFromExcelTanks", pParametersWithValues
        , function (pData) {
            debugger;
            if (pData[0]) {
                var pOperationContainersAndPackages = JSON.parse(pData[1]);
                var TanksNotExisted = pData[2].split(",").length > 0 ? (pData[2].split(",").length-1) : 0;
                swal("Success", "Saved Successfully " + (TanksNotExisted) + " Tank Is Not Exist");
                OperationContainersAndPackages_BindTableRows(pOperationContainersAndPackages);
            }
            else {
                swal("Sorry", "Please, revise data and version of the file.");
            }
            FadePageCover(false);
        }
        , null);

}

function InsertTanks() {
    debugger;
    var TankNumber = "";
    var Operator = "";
    var HANDLINGINATEDSCost = "";
    var HANDLINGINATEDSRevenue = "";
    var HANDLINGINATEDSDate = "";
    var HANDLINGINATEDSNotes = "";
    var CLEANINGATEDSCost = "";
    var CLEANINGATEDSRevenue = "";
    var CLEANINGATEDSDate = "";
    var CLEANINGATEDSNotes = "";
    var M_R_ATEDS1Cost = "";
    var M_R_ATEDS1Revenue = "";
    var M_R_ATEDS1Date = "";
    var M_R_ATEDS1Notes = "";
    var StorageATEDSCost = "";
    var StorageATEDSRevenue = "";
    var StorageATEDSDate = "";
    var StorageATEDSNotes = "";

    var str = "";
    var Groupitems = new Array();
    var i = 1;
    for (i = 1; i < 19; i++) {
        var ColumnName = $("#tblTanksExcel  tr:first").find('th:nth-child(' + i + ')').text();
        var res = ColumnName.split(" ");  //split by space
        if (i > 2)
            res.pop();  //remove last element
        if (i == 18)
            str += res.join(" ");
        else
            str += res.join(" ") + " , ";

        var items = new Array();
        $('#tblTanksExcel  td:nth-child(' + i + ')').each(function () {
            items.push($(this).html());
        });
        Groupitems.push(items);
    }
    var j = 1;
    for (j = 0; j < 18; j++) {
        var counterRows = 0;
        for (counterRows = 0; counterRows < Groupitems[j].length; counterRows++) {
            j == 0 ? (TankNumber += Groupitems[j][counterRows] + " , ") : j;
            j == 1 ? Operator += Groupitems[j][counterRows] + " , " : j;
            j == 2 ? HANDLINGINATEDSCost += Groupitems[j][counterRows] + " , " : j;
            j == 3 ? HANDLINGINATEDSRevenue += Groupitems[j][counterRows] + " , " : j;
            j == 4 ? HANDLINGINATEDSDate += Groupitems[j][counterRows] + " , " : j;
            j == 5 ? HANDLINGINATEDSNotes += Groupitems[j][counterRows] + " , " : j;
            j == 6 ? CLEANINGATEDSCost += Groupitems[j][counterRows] + " , " : j;
            j == 7 ? CLEANINGATEDSRevenue += Groupitems[j][counterRows] + " , " : j;
            j == 8 ? CLEANINGATEDSDate += Groupitems[j][counterRows] + " , " : j;
            j == 9 ? CLEANINGATEDSNotes += Groupitems[j][counterRows] + " , " : j;
            j == 10 ? M_R_ATEDS1Cost += Groupitems[j][counterRows] + " , " : j;
            j == 11 ? M_R_ATEDS1Revenue += Groupitems[j][counterRows] + " , " : j;
            j == 12 ? M_R_ATEDS1Date += Groupitems[j][counterRows] + " , " : j;
            j == 13 ? M_R_ATEDS1Notes += Groupitems[j][counterRows] + " , " : j;
            j == 14 ? StorageATEDSCost += Groupitems[j][counterRows] + " , " : j;
            j == 15 ? StorageATEDSRevenue += Groupitems[j][counterRows] + " , " : j;
            j == 16 ? StorageATEDSDate += Groupitems[j][counterRows] + " , " : j;
            j == 17 ? StorageATEDSNotes += Groupitems[j][counterRows] + " , " : j;
        }
    }

    var pParametersWithValues = {
        pTankNumber: TankNumber
    , pOperator: Operator
    , pHANDLINGINATEDSCost: HANDLINGINATEDSCost
    , pHANDLINGINATEDSRevenue: HANDLINGINATEDSRevenue
    , pHANDLINGINATEDSDate: HANDLINGINATEDSDate
    , pHANDLINGINATEDSNotes: HANDLINGINATEDSNotes
    , pCLEANINGATEDSCost: CLEANINGATEDSCost
    , pCLEANINGATEDSRevenue: CLEANINGATEDSRevenue
    , pCLEANINGATEDSDate: CLEANINGATEDSDate
    , pCLEANINGATEDSNotes: CLEANINGATEDSNotes
    , pM_R_ATEDS1Cost: M_R_ATEDS1Cost
    , pM_R_ATEDS1Revenue: M_R_ATEDS1Revenue
    , pM_R_ATEDS1Date: M_R_ATEDS1Date
    , pM_R_ATEDS1Notes: M_R_ATEDS1Date
    , pStorageATEDSCost: StorageATEDSCost
    , pStorageATEDSRevenue: StorageATEDSRevenue
    , pStorageATEDSDate: StorageATEDSDate
    , pStorageATEDSNotes: StorageATEDSNotes

    };
    debugger;
    CallPOSTFunctionWithParameters("/api/OperationContainersAndPackages/InsertListFromExcelTanks", pParametersWithValues
        , function (pData) {
            debugger;
            if (pData[0]) {
                var pOperationContainersAndPackages = JSON.parse(pData[1]);
                swal("Success", "Saved Successfully.");
                OperationContainersAndPackages_BindTableRows(pOperationContainersAndPackages);
            }
            else {
                swal("Sorry", "Please, revise data and version of the file.");
            }
            FadePageCover(false);
        }
        , null);

}
//Kelany Tanks End
function ImportFromExcelFile_Tanks(pDataRows) {
    debugger;
    FadePageCover(true);
    var TankNumber = "";
    var Operator = "";
    var HANDLINGINATEDSCost = "";
    var HANDLINGINATEDSRevenue = "";
    var HANDLINGINATEDSDate = "";
    var HANDLINGINATEDSNotes = "";
    var CLEANINGATEDSCost = "";
    var CLEANINGATEDSRevenue = "";
    var CLEANINGATEDSDate = "";
    var CLEANINGATEDSNotes = "";
    var M_R_ATEDS1Cost = "";
    var M_R_ATEDS1Revenue = "";
    var M_R_ATEDS1Date = "";
    var M_R_ATEDS1Notes = "";
    var StorageATEDSCost = "";
    var StorageATEDSRevenue = "";
    var StorageATEDSDate = "";
    var StorageATEDSNotes = "";
    //var HANDLING OUT AT EDS Cost = "";
    //var HANDLING OUT AT EDS Revenue = "";
    //var HANDLING OUT AT EDS Date = "";
    //var HANDLING OUT AT EDS Notes = "";
    //var HANDLING IN AT EDS (1) Cost = "";
    //var HANDLING IN AT EDS (1) Revenue = "";
    var TankNumber = "";
    var pContainerNumberList = "";
    var pCarrierSealList = "";
    var pTareWeightList = "";
    var pVolumeList = "";
    var pNetWeightList = "";
    var pGrossWeightList = "";
    var pVGMList = "";
    var pDescriptionOfGoodsList = "";
    for (var i = 0; i < pDataRows.length; i++) { //replace '\', ' ', ',' with space
        pContainerNumberList += (pContainerNumberList == ""
            ? (pDataRows[i].ContainerNumber == undefined || pDataRows[i].ContainerNumber.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ContainerNumber.replace(/[\, ]/g, ' ').toUpperCase().trim().slice(0, 11))
            : ("," + (pDataRows[i].ContainerNumber == undefined || pDataRows[i].ContainerNumber.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ContainerNumber.replace(/[\, ]/g, ' ').toUpperCase().trim().slice(0, 11)))
            );
        pCarrierSealList += (pCarrierSealList == ""
            ? (pDataRows[i].CarrierSeal == undefined || pDataRows[i].CarrierSeal.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].CarrierSeal.replace(/[\, ]/g, ' ').toUpperCase().trim().slice(0, 15))
            : ("," + (pDataRows[i].CarrierSeal == undefined || pDataRows[i].CarrierSeal.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].CarrierSeal.replace(/[\, ]/g, ' ').toUpperCase().trim().slice(0, 15)))
            );
        pTareWeightList += (pTareWeightList == ""
            ? (pDataRows[i].TareWeight == undefined || pDataRows[i].TareWeight.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].TareWeight.replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows[i].TareWeight == undefined || pDataRows[i].TareWeight.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].TareWeight.replace(/[\, ]/g, ' ').toUpperCase().trim()))
            );
        pVolumeList += (pVolumeList == ""
            ? (pDataRows[i].Volume == undefined || pDataRows[i].Volume.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Volume.replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows[i].Volume == undefined || pDataRows[i].Volume.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Volume.replace(/[\, ]/g, ' ').toUpperCase().trim()))
            );
        pNetWeightList += (pNetWeightList == ""
            ? (pDataRows[i].NetWeight == undefined || pDataRows[i].NetWeight.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].NetWeight.replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows[i].NetWeight == undefined || pDataRows[i].NetWeight.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].NetWeight.replace(/[\, ]/g, ' ').toUpperCase().trim()))
            );
        pGrossWeightList += (pGrossWeightList == ""
            ? (pDataRows[i].GrossWeight == undefined || pDataRows[i].GrossWeight.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].GrossWeight.replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows[i].GrossWeight == undefined || pDataRows[i].GrossWeight.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].GrossWeight.replace(/[\, ]/g, ' ').toUpperCase().trim()))
            );
        pVGMList += (pVGMList == ""
            ? (pDataRows[i].VGM == undefined || pDataRows[i].VGM.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].VGM.replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows[i].VGM == undefined || pDataRows[i].VGM.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].VGM.replace(/[\, ]/g, ' ').toUpperCase().trim()))
            );
        pDescriptionOfGoodsList += (pDescriptionOfGoodsList == ""
            ? (pDataRows[i].DescriptionOfGoods == undefined || pDataRows[i].DescriptionOfGoods.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].DescriptionOfGoods.replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows[i].DescriptionOfGoods == undefined || pDataRows[i].DescriptionOfGoods.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].DescriptionOfGoods.replace(/[\, ]/g, ' ').toUpperCase().trim()))
            );
    }
    var pParametersWithValues = {
        pOperationID: $("#hOperationID").val()
        , pContainerNumberList: pContainerNumberList
        , pCarrierSealList: pCarrierSealList
        , pTareWeightList: pTareWeightList
        , pVolumeList: pVolumeList
        , pNetWeightList: pNetWeightList
        , pGrossWeightList: pGrossWeightList
        , pVGMList: pVGMList
        , pDescriptionOfGoodsList: pDescriptionOfGoodsList
    };
    debugger;
    CallPOSTFunctionWithParameters("/api/OperationContainersAndPackages/InsertListFromExcelTanks", pParametersWithValues
        , function (pData) {
            if (pData[0]) {
                var pOperationContainersAndPackages = JSON.parse(pData[1]);
                swal("Success", "Saved Successfully.");
                OperationContainersAndPackages_BindTableRows(pOperationContainersAndPackages);
            }
            else {
                swal("Sorry", "Please, revise data and version of the file.");
            }
            FadePageCover(false);
        }
        , null);
    $("#btnAddFromExcel").val(""); //if removed the last selected file remains till unselected
}





function SendExcelDatatable()
{
    debugger;
    $.ajax({
        type: 'POST',
        url: '/TankPayablesAndReceivables/Importexcel',
        data: {
           
        },
        dataType: 'json',
        success: function (data) {
            //$.busyLoadFull("hide");
            //AgeGroup_AfterAdd(data.result);

        }

    });


    //var pParametersWithValues={}
    //CallPOSTFunctionWithParameters("/TankPayablesAndReceivables/Importexcel", pParametersWithValues
    //  , function (pData) {
    //      debugger;
    //      if (pData[0]) {
    //          var pOperationContainersAndPackages = JSON.parse(pData[1]);
    //          var TanksNotExisted = pData[2].split(",").length > 0 ? (pData[2].split(",").length - 1) : 0;
    //          swal("Success", "Saved Successfully " + (TanksNotExisted) + " Tank Is Not Exist");
    //          OperationContainersAndPackages_BindTableRows(pOperationContainersAndPackages);
    //      }
    //      else {
    //          swal("Sorry", "Please, revise data and version of the file.");
    //      }
    //      FadePageCover(false);
    //  }
    //  , null);
}

function UploadExcelFile() {
    debugger;

    // Checking whether FormData is available in browser  
    if (window.FormData !== undefined) {
        FadePageCover(true);
        var data = new FormData();

        var files = $("#UploadEmptyContainersFile").get(0).files;

        // Add the uploaded image content to the form data collection
        if (files.length > 0) {
            data.append(files[0].name, files[0]);
        }
       
        $.ajax({
            url: '/api/TankPayablesAndReceivables/UploadExcelFileData',
            type: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: data,
            success:
                function (result) {
                    debugger;
                    FadePageCover(false);
                    //LoadAllWithFilter(function () {
                        //if (result[2] != undefined)
                            //MessageBox("Information"," Tank(s) Uploaded successfully! ", "info", false, "btn btn-lg btn-primary sweet-10", "Ok", true, null);
                    swal("Success", "File Uploaded successfully.");
                    $('#txtRemarks').html(" TANKS NOT EXIST:- ( " + result[0] + " )  ERROR IN CHARGE TYPES IN CONTAINERS:- (" + result[1] + ")")
                    //});

                }
            ,
            //success: function (result) {

            //    //if (result[0] == true && JSON.parse(result[2]) == "" && JSON.parse(result[3]) == "" && JSON.parse(result[4]) == "" && JSON.parse(result[13]) == "" && JSON.parse(result[5]) == "Finish...") {
            //    //    swal("Success", "File Uploaded successfully.");
            //    //    $("#LblBillsCount").html(JSON.parse(result[9]));
            //    //    $("#LblContainerCount").html(JSON.parse(result[8]));
            //    //    $("#LblImportExport").html(JSON.parse(result[10]));
            //    //    $("#LblVesselName").html(JSON.parse(result[11]));
            //    //    $("#LblVoyage").html(JSON.parse(result[12]));
            //    //    //////LoadAllWithPaging(result);
            //    //    EdiBill_BindTableRows(JSON.parse(result[6]));
            //    debugger;
            //    console.log(result);

            //    //}

            //    FadePageCover(false);
            //},
            error: function (err) {
                swal("Sorry", err.statusText);

            }

        });


    }
    else {
        alert("FormData is not supported.");
    }

}


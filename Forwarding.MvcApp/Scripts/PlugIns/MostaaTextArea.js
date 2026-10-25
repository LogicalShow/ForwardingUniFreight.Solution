function getLineNumber(textarea)
{
    try {
        var a = $(textarea).val().substr(0, $(textarea).prop('selectionStart')).split("\r\n").length;
        // $('#lineNo').text(a);
        return a;
    }
    catch(Ex)
    {

        return 0;
    }




}


//------------------------------------------------------------------------------------------


function getCursorNumber(textarea) {
    try {
        var a = $(textarea).prop('selectionStart');
        // $('#lineNo2').text(a);
        return a;
    }
    catch(Ex)
    {

        return 0;
    }




}



//---------------------------------------------------------------------------------------------

function GetLastLineIndex(textarea) {
    var lines = "";
    try {
        lines = ($(textarea).val()).split("\r\n");
        //  $('#lineNo1').text(lines.length);
        return lines.length;
    }
    catch(Ex)
    {

        return 0;
    }

}

//---------------------------------------------------------------------------------------------------

function ApplyLineBreaks(strTextAreaId, cursorindex, rows, textareaID) {
    var oTextarea = document.getElementById(strTextAreaId);
    if (oTextarea.wrap) {
        oTextarea.setAttribute("wrap", "off");
    }
    else {
        oTextarea.setAttribute("wrap", "off");
        var newArea = oTextarea.cloneNode(true);
        newArea.value = oTextarea.value;
        oTextarea.parentNode.replaceChild(newArea, oTextarea);
        oTextarea = newArea;
    }

    var strRawValue = oTextarea.value;
    oTextarea.value = "";
    var nEmptyWidth = oTextarea.scrollWidth;
    var nLastWrappingIndex = -1;
    for (var i = 0; i < strRawValue.length; i++) {
        var curChar = strRawValue.charAt(i);
        if (curChar == ' ' || curChar == '-' || curChar == '+')
            nLastWrappingIndex = i;
        oTextarea.value += curChar;
        if (oTextarea.scrollWidth > nEmptyWidth) {
            var buffer = "";
            if (nLastWrappingIndex >= 0) {
                for (var j = nLastWrappingIndex + 1; j < i; j++)
                    buffer += strRawValue.charAt(j);
                nLastWrappingIndex = -1;
            }
            buffer += curChar;
            oTextarea.value = oTextarea.value.substr(0, oTextarea.value.length - buffer.length);
            oTextarea.value += "\r\n" + buffer;
            // plus_index = plus_index ;
        }
    }
    oTextarea.setAttribute("wrap", "");
    // document.getElementById("pnlPreview").innerHTML =
    // console.log(document.getElementById("pnlPreview").innerHTML);

    $('#' + strTextAreaId).val(oTextarea.value);

    // $('#' + strTextAreaId).prop('selectionStart', cursorindex);
    ///////  $('#' + strTextAreaId).focus();
    // var newIndex = getCursorNumber(textarea);
    /////////// oTextarea.selectionEnd = cursorindex;

    //  setTimeout(function ()
    //  {
    /////////  var lastline = GetLastLineIndex('mm');

    //if (lastline > 3)
    //{
    //    $('#' + strTextAreaId).val($('#' + strTextAreaId).val().substring(0, $('#' + strTextAreaId).val().length - 2));

    //}

    //   }, 30);
    setTimeout(function () {
        //////// var linenumber = getLineNumber(('#' + strTextAreaId));


        //  getCursorNumber('#mm');
        //  $('#A').text('A:' + a);

        //  console.log('key' + event.keyCode)
        //console.log('a' + a);
        // console.log(event.keyCode);




        //if (GetLastLineIndex('#mm') > 3)
        //{

        GetTextareaWithoutOverLine(('#' + strTextAreaId), '\n', rows, textareaID);






    }, 30);
    //  $('#aftertxt').text($('#' + strTextAreaId).val());
}


//--------------------------------------------------------------------------------------------------


function GetTextareaWithoutOverLine(str, charr, index, textareaID) {
    debugger;
    var oTextarea = document.getElementById(textareaID);
    console.log("val : " + $('textarea' + str).val());
    // alert("txt : " + $('textarea' + str).text());
    // alert("value : " + $('textarea' + str).value);
    //var textAnswer = document.getElementById("text-1");
    var i = $('textarea' +str).val().lastIndexOf(charr);
    var countofchar = ($('textarea'+str).val().match(new RegExp(charr, "g")) || []).length;
    if (countofchar == parseInt(index)) {
      
        $('textarea' +str).val($('textarea' +str).val().slice(0, i));
        console.log($('textarea' + str).val());
        //  console.log($('textarea' + textareaID).val());
        //  console.log($('textarea' + textareaID).text());
        $(str).val($('textarea' + str).val());
        $('#' + textareaID).val($('textarea' + str).val().replace(/\n/g, ''));

        // var different_Length = 0;
        // different_Length = ( ($('textarea' + str).val().length - 3 ) - oTextarea.value.length);
        // console.log($(str).val().length, 'helper length');
        // console.log(oTextarea.value.length, 'master length');



        // console.log(oTextarea.value + "+master");
        // console.log($(str).val() + "+helper");

        // if (different_Length < 0) {
        //     different_Length = different_Length * -1;
        //     console.log(different_Length + "diff - ");
        //     var a = ((oTextarea.value.length) - (different_Length) ) ;
        //     if (a < 0)
        //         a = a * -1;
        //     console.log('هنشيل لحد ' + a);
        //     oTextarea.value = oTextarea.value.slice(0, (a));
        //     //  oTextarea.value = oTextarea.value.slice(0, a);
        // }
        // else if (different_Length == 0  )
        // {
        //     //  $('textarea' + textareaID).val($('textarea' + textareaID).val().slice(0, $('textarea' +textareaID).val().length - index));
        //     var a = (oTextarea.value.length) - (index);
        //     if (a < 0)
        //         a = a * -1;
        //     console.log('هنشيل لحد ' + a);
        //     console.log(different_Length + "diff 0 ");
        //     oTextarea.value = oTextarea.value.slice(0, a );
        // }
        // else {
        //   //  $('textarea' + textareaID).val($('textarea' + textareaID).val().slice(0, $('textarea' +textareaID).val().length - different_Length));
        //     var a = (oTextarea.value.length) - ((index) - different_Length  );
        //     if (a < 0)
        //         a = a * -1;
        //     console.log('هنشيل لحد ' + a);
        //     console.log(different_Length + "diff + ");
        //     oTextarea.value = oTextarea.value.slice(0,(a-1));

        // }
        //// alert("val2 : " + $('textarea' + str).val());
    }
    else if (countofchar > parseInt(index)) {
        $('textarea' + str).val($('textarea' +str).val().slice(0, (i - 1)));
        
        GetTextareaWithoutOverLine(str, charr, index, textareaID);


    }

    //alert('long');


}


function settext_AfterKeyDown(event, textareaID, helpertextareaID, rows) {
    // var a = 1;

    debugger;





    //  event.preventDefault();
    //}
    //else
    //{

    //if (event.keyCode == 13) {
    //    event.preventDefault();

    //    IsEnter = '1';
    //    //   a = a -1
    //    $("#mm").val($("#mm").val() + '\n');
    //    //  a = newline();
    //    // return false ;
    //}

    // if (a > 3 && event.keyCode != 8) {
    //  event.preventDefault();
    //  return false;

    //  }
    //  else {
    //'textarea' +
    setTimeout(function () { $('textarea#' + helpertextareaID).val($('#' + textareaID).val()); }, 30);

    // if (event.keyCode == 38 || event.keyCode == 37 || event.keyCode == 40 || event.keyCode == 39 || event.keyCode == 32 || event.keyCode == 8) {
    //  setTimeout(function () { ApplyLineBreaks(helpertextareaID, getCursorNumber('#' + helpertextareaID), rows); }, 31);
    // }
    // else if ((getCursorNumber('#' + helpertextareaID) - 1) % 50 == 0) {
    //  setTimeout(function () { ApplyLineBreaks(helpertextareaID, getCursorNumber('#' + helpertextareaID) + 1, rows); }, 31);

    //   }
    //   else {

    setTimeout(function () { ApplyLineBreaks(helpertextareaID, /*getCursorNumber('#' + helpertextareaID)*/ 0, rows, textareaID); }, 31);
    //   }

}

function settext_AfterClick(event, textareaID, helpertextareaID, rows) {
    // ApplyLineBreaks('mm');

    //  setTimeout(function () { $('#' + helpertextareaID).val($('#' + textareaID).val()); }, 30);
    // getLineNumber('#' + helpertextareaID);

    // GetLastLineIndex('#' + helpertextareaID);
    console.log(getCursorNumber('#' + textareaID) + 'cursor');


    // setTimeout(function () { ApplyLineBreaks('mm', getCursorNumber('#' + textareaID)); }, 30);
}



function settext_AfterPaste(textareaID, helpertextareaID, rows) {
    // ApplyLineBreaks('mm');
    //  getLineNumber('#' + textareaID);
    debugger;
    //  GetLastLineIndex('#' + textareaID);
    // getCursorNumber('#' + textareaID);


    setTimeout(function () {
        $('#' + textareaID).val($('#' + textareaID).val().replace(/\n/g, ''));



    }, 100);
    setTimeout(function () {
       
        $('textarea#' + helpertextareaID).val($('#' + textareaID).val());

        //  alert($('#' + textareaID).val());



    }, 200);
    setTimeout(function () { ApplyLineBreaks(helpertextareaID, /*getCursorNumber('#' + helpertextareaID)*/ 0, rows, textareaID); }, 201);
}
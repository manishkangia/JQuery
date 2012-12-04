var divIndex = 0;
//to bind a function to add a new div on the click button
$(function() {
    $('#addDivButton').bind( 'click' , function() {
        divIndex++;
        $newDiv = $("<div class=stackDiv><p style=margin:0px;>" + divIndex + "</p></div>'");
        $newDiv.insertBefore($('#container div:first'));
    });
});

//using live to define the click function on the paragraph in div
$('div.stackDiv').live( 'click' , function() {
    $(this).css( 'background-color' , 'red' );
});

//the last div to be deleted
$('#container div.stackDiv:nth-child(1)').live( 'click' , function() {
    $(this).remove();
});

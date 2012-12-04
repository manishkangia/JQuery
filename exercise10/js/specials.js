$newDiv = $( '<div></div>' );
$newDiv.insertAfter($( '#specials form' ));
$select = $( '#specials form select' );
var specialsDetailsJSON;

//using the 'one' function on the select menu 
//the first funtion which is called only once performs the ajax request
//the second function will be called all other times and even the first time to fill the div with the required content
$select.one( "change", function() {
    $.ajax({
       url : 'data/specials.json', // url
       type : 'GET',               // request type
       dataType : 'json',          // data type requested
       success : function(json) {  //function to be performed on success of recieving data
                     specialsDetailsJSON = json;
                     $select.change(); // called the second function atleast once to fill the data
                 }
    });
    //the second function
    $select.change( function () {
        var selectedValue = $select.val(); 
        $newDiv.html(specialsDetailsJSON[selectedValue].title + '<br><br>' + specialsDetailsJSON[selectedValue].text);
        $newDiv.css({"color":specialsDetailsJSON[selectedValue].color});
        var url = "url('" + specialsDetailsJSON[selectedValue].image + "')";
        $newDiv.css({ "background-image" : url});
    });
});

//remove the submit button                  
$('#specials form li.buttons').remove();

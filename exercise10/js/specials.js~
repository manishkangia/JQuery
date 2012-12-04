$newDiv = $('<div></div>');
$newDiv.insertAfter($('#specials form'));
$select = $('#specials form select');
var specialsDetailsJSON;

//using the 'one' function on the select menu 
//the first funtion which is called only once performs the ajax request
//the second function will be called all other times and even the first time to fill the div with the required content
$select.one("change",function() {
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
        if(selectedValue == "monday" ) {
           $newDiv.html(specialsDetailsJSON.monday.title + '<br><br>' + specialsDetailsJSON.monday.text);
           $newDiv.css({"color":specialsDetailsJSON.monday.color});
           var url = "url('" + specialsDetailsJSON.monday.image + "')";
           $newDiv.css({ "background-image" : url});
        }
        else if( selectedValue == "tuesday" ) {
           $newDiv.html(specialsDetailsJSON.tuesday.title + '<br><br>' + specialsDetailsJSON.tuesday.text);
           $newDiv.css("color",specialsDetailsJSON.tuesday.color);
           var url = "url('" + specialsDetailsJSON.tuesday.image + "')";
           $newDiv.css({ "background-image" : url});
        }
        else if( selectedValue == "friday" ) {
           $newDiv.html(specialsDetailsJSON.friday.title + '<br><br>' + specialsDetailsJSON.friday.text);
           $newDiv.css("color",specialsDetailsJSON.friday.color);
           var url = "url('" + specialsDetailsJSON.friday.image + "')";
           $newDiv.css({ "background-image" : url});
        } 
    });
});

//remove the submit button                  
$('#specials form li.buttons').remove();

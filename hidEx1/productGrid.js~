//JSON object
var myJSONObject ;
//ajax request
$.ajax({
        url : 'products.json' ,
        type : 'GET',
        dataType : 'json',
        success : function(response) { 
            myJSONObject = response ;
        }
});

$(function () {
    var list = myJSONObject;
    //display all initially in various divs
    for (var i = 0; i < list.length; i++) {
        var $newDiv = $( '<div class=ad style=float:left></div>' );
        src = "images/" + list[i].url;
        var $image = $( "'<img src=" + src + "></img>'");
        $newDiv.append($image);
        $newDiv.data( "object", myJSONObject[i]);
        $( '#container' ).append($newDiv);
    }
    //assigning a function on click of each parameter
    $( '#parameters ul li input' ).click( function() {
        updateTable();
    });
    
    //function to update the table 
    function updateTable() {
        var $divlist = $( 'div.ad' );
        var selectedParameter = [];
        
    //collecting the values which are checked in each list of parameters(brands,color,availability) and displaying only those divs
        $( '#parameters ul' ).each( function () {
            $(this).find('li input' ).each( function() {
                if ( $(this).attr( 'checked' )) {
                     selectedParameter.push($(this).val());
                } 
            });
            //if none selected then do nothing
            if ( selectedParameter.length == 0) {
                $divlist.show();
            }
            //else show only selected divs and then update the div list to work only on the visible divs for next iteration
            else {
                $divlist.hide();
                showdivs( $divlist, selectedParameter, $(this).attr('class') );
                selectedParameter=[];
                $divlist = $( 'div#container div.ad:visible' );
            }
        });
    }
    
    //function to show divs that match the value that has been selected in the json object attached to them as data
    function showdivs($divs,selectedvalues,factor) {
        for ( var i = 0; i < $divs.length; i++ ) {
            $currentDiv = $divs.eq(i);
            for ( var j = 0; j < selectedvalues.length; j++ ) {
                if ( $currentDiv.data("object")[factor] == selectedvalues[j] ) {
                    $currentDiv.show();
                }    
            }
        }
    }
});

//JSON object
var myJSONObject ;
var selectedbrand;
var selectedcolor;
var checkAvailability;
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
    for (var i = 0; i < list.length; i++) {
        var $newDiv = $( '<div class=ad style=float:left></div>' );
        src = "images/" + list[i].url;
        var $image = $( "'<img src=" + src + "></img>'");
        $newDiv.append($image);
        $newDiv.data( "object", myJSONObject[i]);
        $( '#container' ).append($newDiv);
    }
    
    $( '#selectbrand li input' ).click(function() {        
        updateTable();
    });
    
    $( '#selectcolor li input' ).click(function() {
        updateTable();
    
    });
    
    $( '#toggler' ).click(function() {
        updateTable();
    });
    
    function updateTable() {
        var selectedBrands = [];
        var selectedColors = [];
        var $divlist = $( 'div.ad' );
        $divlist.hide();
        
        
        $( '#selectbrand li input' ).each( function() {
            if ( $(this).attr('checked') ) {
                selectedBrands.push( $(this).val() );
            }
        });
        
        if ( selectedBrands.length == 0 ) {
        $divlist.show();
        }
        else {
        showdivs( $divlist, selectedBrands, "brand" );
        }
        
        $divlist = $( 'div#container div.ad:visible' );
        
        $( '#selectcolor li input' ).each( function() {
            if ( $(this).attr( 'checked' )) {
                selectedColors.push($(this).val());
                $divlist.hide();
            } 
        });
        showdivs( $divlist, selectedColors, "color" );
        
        $divlist = $( 'div#container div.ad:visible' );
        
        checkAvailability = $( '#toggler' ).attr( 'checked' );
        if ( checkAvailability ) {
            $divlist.hide();
            showdivs( $divlist, ["0"], "sold_out" );
        }
        
    }
    
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


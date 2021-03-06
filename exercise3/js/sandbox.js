$(document).ready(function() {
    //to add 5 items in list myList
    for( var i = 0; i < 5; i++ ) {
        $lastListItem = $( 'ul#myList li:last' );
        $lastListItem.after($( "'<li>List item " + (i+8) + "</li>'" ));
    }
    
    //to remove odd elements by name
    $list_odd = $( "ul#myList li:nth-child(odd)" );
    $list_odd.remove();

    //to insert a new heading and paragraph
    $( '<h2>A New Second Heading</h2>' ).appendTo( 'div .module:last' );
    $( '<p>A New Second Paragraph</p>' ).appendTo( 'div .module:last' ); 

    //to add a new option
    $opt = $( '<option value=wednesday>Wednesday</option>' );
    $opt.appendTo($( 'select' ));

    //to add a new div.module after the last div.module and insert an existing image in it
    $newDiv = $( '<div class=module></div>' );
    $( 'div .module:last' ).after($newDiv);
    $( 'img[alt="fruit"]' ).clone().appendTo( 'div .module:last' );                             
});         

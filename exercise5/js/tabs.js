$(document).ready( function() {
    //hide the div.module divs
    $( 'div.module' ).hide();

    //create a new ul list 
    $newList = $( '<ul></ul>' );
    $newList.css( 'list-style', 'none' );
    $firstModule = $( 'div.module' ).eq(0);
    $firstModule.before($newList);

    //for each div create corresponding li and bind its click event
    $( 'div.module' ).each( function() {
        text = $(this).find( 'h2' ).text();
        $newListElement = $( "'<li>" + text + "</li>'" );
        $newListElement.data( 'associatedDiv', $(this) );
        bindAction($newListElement);
        $newList.append($newListElement);
    });

    //making the first tab visible and add class to it by calling its click function
    $newList.find('li').eq(0).addClass('current').click();

    //styling for the list elements
    $list = $newList.find('li');
    $list.each( function() { 
        $(this).css({'text-align':'center','height':'20px','width':'100px','float':'left','border':'solid 2px black','background':'gray'});})
    });

//function to bind each list element                      
function bindAction( $newListElement ) {
    $newListElement.click( function() { 
        //find the parent ul and then all its li which have visible div
        $unorderedList = $newListElement.closest('ul');
        $current_list = $unorderedList.find( 'li.current' ); 
        $current_list.data( 'associatedDiv' ).hide();
        $current_list.removeClass( 'current' );
        
        //show the associated div for the list item clicked
        $newListElement.data( 'associatedDiv' ).show();
        $newListElement.addClass( 'current' );
    })
}

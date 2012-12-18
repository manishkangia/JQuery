//add qty column in json

var collections;
$(function() {
    var $itemDisplayDiv = $( '#containDisplay' );
    var $boughtItemsDisplay = $( '#buyDisplayMain' );
    var $footer = $('#footer');
    var $bill = $('#bill');
    //Ajax Call
    $.ajax({
        url : 'shopCart.json',
        type : 'GET',
        dataType : 'json',
        success : function( response ) {
            collections = response;
            display();
        }
    });
    
    //Display the list of available items for a category
    function display() {
        $( '#categories' ).val( 'All' );
        //get the image and all the information from the json and append them together
        $.each(collections, function( index, item) {
            var html = "";
            var category = item["category"].split(':')[1].trim();
            html = "<img src=images/" + category + ".jpg></img>";
            $.each( item, function( attr, value) {
            if(attr != 'id') {
                html = html + value + "<br>" ;
            }
            });
            
            //create the main div and within that two divs
            //first for all the information
            //second for quantity and Add to Cart button
            var $newMainDiv = $( '<div class=displayItem></div>' );
            
            var $newDiv = $( '<div class=displayInfo>' + html + '</div>' );
            $newMainDiv.append( $newDiv );
            
            $newDiv = $( '<div class=qtyAdd>Quantity : <input type=text style="width:30px" value="0"></input><input type="button" value="Add to Cart"></input></div>' );
            $newMainDiv.append( $newDiv );
            
            //save the index and the object with the mainDiv 
            $newMainDiv.data( "linkedTo", [ index, item ] );
            
            $itemDisplayDiv.append( $newMainDiv );
        });    
        
        //hide the buy display div(the one associated with heading 'My Cart'
        $boughtItemsDisplay.hide();
    

    //the action to be performed on the click on 'add to cart' button
    $( 'div.qtyAdd').delegate( 'input[type="button"]','click', function() {
        var productQuantity = parseInt($(this).siblings( 'input' ).val());
        var objNumber;
        var product;
        var productPrice;
        //to check the quantity
        if(productQuantity > 0) {
            var $parentDiv = $(this).parents( 'div.displayItem' ); 
            var jsonobj = $parentDiv.data( "linkedTo" )[1];
            var productIndex = $parentDiv.data( "linkedTo" )[0];
            var productPrice = ( jsonobj[ "price" ].split(':')[1] ).trim();
            addDisplay( productIndex,jsonobj, productPrice, productQuantity, $parentDiv.find( 'img' ));
        }
        else {
            alert( "please select appropriate quatity" );
        }                        
    });
}
    //function to add the element in the second div'my cart'    
    function addDisplay( index,jsonobj, productPrice, productQuantity, image ) {
        //to find the entry of the same item if it exists and add that quantity to the new one
        $.each( $('div#buyDisplay div.boughtItem'),function() {
            if($(this).data("index") == index) {
                $(this).find('input').eq(0).click();
                var initialQty = parseInt($(this).find('div.quantity p').text());
                productQuantity += initialQty;
            }
        });
        
        var $newMainDiv = $( '<div class=boughtItem></div>' );
        $newMainDiv.append( image.clone() );
        
        var $newDiv = $( '<div style="width:240px;"><p>' + jsonobj['title'] + '</p></div>' );
        $newMainDiv.append( $newDiv );
        
        $newDiv = $( '<div style="width:70px"><p>' + productPrice + '</p></div>' );
        $newMainDiv.append( $newDiv );
        
        $newDiv = $( '<div class=quantity style="width:78px;"><p>' + productQuantity + '</p></div>' );
        $newMainDiv.append( $newDiv );
        
        var totalPrice = (productPrice * productQuantity).toFixed(2);
        $newDiv = $( '<div style="width:119px;"><p>' + (totalPrice) + '</p></div>' );
        $newMainDiv.append( $newDiv );
        
        $newDiv = $( '<div style="width:100px;margin-left:20px;"><input type=button value=Remove></input></div>' );
        $newMainDiv.append( $newDiv );
        $newMainDiv.data("index",index); 
        $('#buyDisplay').append( $newMainDiv );
        
        //update the total
        var $totalDisplay = $( '#footer input' ).eq(1);
        var totalBill = (parseFloat( $totalDisplay.val() ) + parseFloat(totalPrice)).toFixed(2);
        $totalDisplay.val( totalBill );
        
        //Update the MyCart heading
        $( 'div.headings' ).eq(1).find( 'p' ).text( "My Cart (" + $boughtItemsDisplay.find('div.boughtItem').length + ")" );
        

        //action of the remove button
        $newMainDiv.find('input').eq(0).bind('click', function() {
            var $parentDiv = $(this).parents( 'div.boughtItem' );
            
            //the amount to delete
            var removeValue = $parentDiv.find( 'p:last' ).text();
                      
            //update the total display
            var $totalDisplay = $( '#footer input' ).eq(1);
            $totalDisplay.val( ( parseFloat($totalDisplay.val()) - parseFloat(removeValue) ).toFixed(2) );
            $parentDiv.remove();
            
            //update the heading with the total number of boughtItem divs in the buyDisplay div
            $( 'div.headings' ).eq(1).find( 'p' ).text( "My Cart (" + $boughtItemsDisplay.find( 'div.boughtItem' ).length + ")" );
        });
    }    

    //assign the click function to the headings: 'Products'
    $( 'div.headings' ).eq(0).click( function() {
        $( 'div.headings.active' ).removeClass('active');
        $(this).addClass('active');
        $itemDisplayDiv.show();
        $( 'div.extraitems' ).show();
        $boughtItemsDisplay.hide();
    });

    //assign the click function to the headings: 'Mycart'
    $( 'div.headings' ).eq(1).click( function() {
        $( 'div.headings.active' ).removeClass('active');
        $(this).addClass('active');
        $itemDisplayDiv.hide();
        $( 'div.extraitems' ).hide();
        $boughtItemsDisplay.show();
    });

    //action for a change in the dropdown menu for categories
    $( '#categories' ).change( function() {
        var displayOnly = $(this).val().trim();
        $displayedDivs = $( 'div.displayItem' );
        if( displayOnly != ("all")) {    
            $displayedDivs.hide();
            $.each( $displayedDivs, function(){
                var productCategory = $(this).data( 'linkedTo' )[1][ "category" ].split(':')[1].trim().toLowerCase();
                if ( productCategory == displayOnly ) {
                    $(this).show();
                }
            });
        }
        else {
            $displayedDivs.show();
        }
    });
    
    
    //action for the search button
    //change the category in the dropdown menu and call its change function
    $( '#search' ).click(function() {
        var $categories = $( '#categories' );
        $categories.val( $( '#searchItem' ).val().trim().toLowerCase() );
        $categories.change();
    });
    
    //action for the clear button
    $('#clear').click(function() {
        $( '#searchItem' ).val("");
        $( '#search' ).click();
    });
    
    //checkout button
    $('#checkout').click(function() {
        var totalBill = parseFloat($bill.val());
        if(totalBill > 0) {
            alert("Checking Out!!...\n Please Submit your bill of "+totalBill+" to avoid harmful actions");
        }
        alert("Thank you for shopping with us");
    });
});

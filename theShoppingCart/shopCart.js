var collections;
$(function() {
    $mainDiv = $( '#containDisplay' );
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
            html = html + value + "<br>" ;
            });
            
            //create the main div and within that two divs
            //first for all the information
            //second for quantity and Add to Cart button
            $newMainDiv = $( '<div class=displayItem></div>' );
            
            $newDiv = $( '<div class=displayInfo>' + html + '</div>' );
            $newMainDiv.append( $newDiv );
            
            $newDiv = $( '<div class=qtyAdd>Quantity : <input type=text style="width:30px" value="0"></input><input type="button" value="Add to Cart"></input></div>' );
            $newMainDiv.append( $newDiv );
            
            //save the index and the object with the mainDiv 
            $newMainDiv.data( "linkedTo", [ index, item ] );
            
            $mainDiv.append( $newMainDiv );
            
            //hide the buy display div(the one associated with heading 'My Cart'
            $('#buyDisplay').hide();
        });
    
        //assign the click function to the headings: 'Products'
        $( 'div.headings' ).eq(0).click( function() {
            $(this).css({ 'background' : 'Lightgray', 'border-bottom' : '1px solid LightGray' });
            $( 'div.headings' ).eq(1).css({ 'background' : 'white', 'border-bottom' : '1px solid black' });
            $( '#containDisplay' ).show();
            $( 'div.extraitems' ).show();
            $( '#buyDisplay' ).hide();
        });
    
        //assign the click function to the headings: 'Mycart'
        $( 'div.headings' ).eq(1).click( function() {
            $(this).css({ 'background' : 'Lightgray', 'border-bottom' : '1px solid LightGray' });
            $( 'div.headings' ).eq(0).css({ 'background' : 'white', 'border-bottom' : '1px solid black' });
            $( '#containDisplay' ).hide();
            $( 'div.extraitems' ).hide();
            $( '#buyDisplay' ).show();
        });
        
        //the action to be performed on the click on 'add to cart' button
        $( 'div.qtyAdd input[type="button"]' ).click( function() {
            var productQuantity = parseInt($(this).siblings( 'input' ).val());
            $(this).siblings( 'input' ).val("0");
            var objNumber;
            var product;
            var productPrice;
            //to check the quantity
            if(productQuantity > 0) {
                var $parentDiv = $(this).parents( 'div.displayItem' ); 
                var objNumber = $parentDiv.data( "linkedTo" )[0];
                var product = collections[objNumber];
                var productPrice = parseFloat( collections[objNumber][ "price" ].split(':')[1] ).toFixed(2);
                addDisplay($parentDiv.find( 'img' ));
            }
            else {
                alert( "please select appropriate quatity" );
            }
            
            //function to add the element in the second div'my cart'
            function addDisplay( image ) {
                $newMainDiv = $( '<div class=boughtItem></div>' );
                $newMainDiv.append( image.clone() );
                
                $newDiv = $( '<div style="width:240px;"><p>' + product['title'] + '</p></div>' );
                $newMainDiv.append( $newDiv );
                
                $newDiv = $( '<div style="width:70px"><p>' + productPrice + '</p></div>' );
                $newMainDiv.append( $newDiv );
                
                $newDiv = $( '<div style="width:69px;"><p>' + productQuantity + '</p></div>' );
                $newMainDiv.append( $newDiv );
                
                var totalPrice = (productPrice * productQuantity).toFixed(2);
                console.log(totalPrice);
                $newDiv = $( '<div style="width:119px;"><p>' + (totalPrice) + '</p></div>' );
                $newMainDiv.append( $newDiv );
                
                $newDiv = $( '<div style="width:100px;margin-left:20px;"><input type=button value=Remove></input></div>' );
                $newMainDiv.append( $newDiv );
                
                $( '#buyDisplay' ).append( $newMainDiv );
                
                //update the total
                var $totalDisplay = $( '#footer input' ).eq(1);
                console.log(parseFloat( $totalDisplay.val() ));
                $totalDisplay.val( parseFloat( $totalDisplay.val() ) + parseFloat(totalPrice) );
                
                alert( "Successfully added " + productQuantity + " " + product["title"] + "\nCurrentTotal : " + $('#footer input').eq(1).val());
                
                //Update the MyCart heading
                $( 'div.headings' ).eq(1).find( 'p' ).text( "My Cart (" + $('#buyDisplay').find('div.boughtItem').length + ")" );
            }
        });
    }
        //action of the remove button
        $( 'div.boughtItem input' ).live( 'click', function() {
            
            //the amount to delete
            var removeValue = ($(this).parents( 'div.boughtItem' ).find( 'p:last' ).text());
            
            //update the total display
            var $totalDisplay = $( '#footer input' ).eq(1);
            $totalDisplay.val( parseFloat( $totalDisplay.val() ) - removeValue );
            $(this).parents( 'div.boughtItem' ).remove();
            
            //update the heading with the total number of boughtItem divs in the buyDisplay div
            $( 'div.headings' ).eq(1).find( 'p' ).text( "My Cart (" + $( '#buyDisplay' ).find( 'div.boughtItem' ).length + ")" );
        });
        
        //action for a change in the dropdown menu for categories
        $( '#categories' ).change( function() {
            var displayOnly = $(this).val();
            if( displayOnly != "All" ) {
                $displayedDivs = $( 'div.displayItem' );
                $displayedDivs.hide();
                $.each( $displayedDivs, function(){
                    var displayedCategory = $(this).data( 'linkedTo' )[1][ "category" ].split(':')[1].trim();
                    if ( displayedCategory == displayOnly ) {
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
            $( '#categories' ).val( $( '#searchItem' ).val().trim() );
            $( '#categories' ).change();
        });
        
        //action for the clear button
        $('#clear').click(function() {
            $( '#searchItem' ).val("");
            $( '#search' ).click();    
        });     
});
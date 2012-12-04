$(document).ready(function() { 
    $( "div.module" ).css( "background", "gray" );
                               
    //three methods to find the third item in the list
    $("ul#myList li").eq(2).css("background","gray");
    //$("ul#myList li#myListItem").css("background","blue");
    //$("ul#myList li:first").next().next().css("background","yellow");
    //the first method is the best as in second the id of the element might get changed, in third there are two function calls which makes it slower.Plus the first method is short,simple and quick. 
                               
                               
    $( "#search label[for=q]" ).css( "background", "gray" );
    
    console.log( "number of hidden elements : " + $( "*:hidden" ).length );
    
    console.log( "number of images with alt : " + $( "img[alt]" ).length );
    
    $("tr:odd").css("background","gray");
});
                             
                             

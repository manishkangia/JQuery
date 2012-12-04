$theDiv = $( 'div#blog' );
$theUl = $theDiv.find('ul').eq(0);
$theUl.find( 'a' ).click(function(e) {
    var $this = $(this);
    
    //list of paragraphs in the unordered list
    $lisParas = $theUl.find( 'p.excerpt' );
    
    //slide up the current visible paragraph
    $theUl.find('p:visible').slideUp();
    
    //find the current para to be displayed and then slide it down using displayPara function
    $current_para = $this.closest('li').find('p');
    displayPara( $current_para );
    
    //prevent the click event on anchor tag
    e.preventDefault();  
});

//function to display the current para needed
function displayPara() {
    $current_para.css({ 'display' : 'block' });
    $current_para.hide().delay(450).slideDown();
}

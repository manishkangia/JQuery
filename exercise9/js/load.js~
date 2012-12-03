$theDiv = $('div#blog');
$theUl = $theDiv.find('ul').eq(0);
$headingsList = $theUl.find('li h3');

//add a div element after each heading
$headingsList.each(function() {
                        $newDiv = $('<div></div>');
                        $newDiv.insertAfter($(this));
                        $(this).data("associatedDiv",$newDiv);
                   });
                    
//bind the click event with a function that loads its assoicated div content                    
$headingsList.click(function(e) {
    //find the href in the anchor tag in the heading
    $heading = $(this);
    var $anchor = $heading.find('a');
    var href = $anchor.attr('href');
    
    //extracting the id and forming the link
    var tempArray = href.split('#');
    var id = '#' + tempArray[1];
    contentLink = "data/blog.html "+id;
    
    //find the targetdiv and load it
    $targetDiv = $heading.data("associatedDiv");
    $targetDiv.load(contentLink);
    
    //prevent the click event on anchor tag
    e.preventDefault();  
});

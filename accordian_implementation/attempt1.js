$(document).ready(function() {
    //to retrieve the search element from the href if any
    var highlightItem = window.location.search.split("=")[1];
    //find the leaf elements and assign a click function to them to edit their hrefs
    $targetLinks = $('li.dcjq-parent-li li:not(.dcjq-parent-li) a');
    $targetLinks.click(function(e) {
        var link = $(this).attr('href')+"?value=" + $(this).parent().attr("id");
        $(this).attr('href',link);
    });
    
    //if there is an element to be highlighted
    if(highlightItem!= undefined) {
        $('#' + highlightItem).parents('ul').css('display','block');
        $('#' + highlightItem +' a').addClass('dcjq-parent');
    }
});
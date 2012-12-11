function assignid() {
    var $targetli = $('ul.accordion li');
    var id=0;
    $.each($targetli,function() {
        $(this).attr("id",id);
        id++;
    });
}

function activateLink(linkId) {
    $choosenItem = $('#' + linkId);
    $anchorItem = $choosenItem.find('a');
    $parents = $choosenItem.parents('ul.accordion');
    
    for( var i = $parents.length-1; i >= 0; i--) {
        $parents.eq(i).parent('li').find('a').eq(0).click();
    }
    
    $anchorItem.addClass('dcjq-parent');
}

$(document).ready(function() {
    assignid();
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
        activateLink(highlightItem);
    }    
});

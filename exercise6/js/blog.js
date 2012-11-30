$theDiv = $('div#blog');
$theUl = $theDiv.find('ul').eq(0);
console.log($theUl);

$theUl.find('a').click(function(e) {
    var $this = $(this);
    console.log($theUl.find('li').length);
    $lis = $theUl.find('li');
    for ( var i = 0; i<$lis.length; i++ ) {
        $lis.eq(i).find('p').css({'display':'none'});
    }
    
    $(this).closest('li').find('p').css({'display':'block'});
    $(this).closest('li').find('p').hide();
    $(this).closest('li').find('p').slideDown();
    e.preventDefault();
    $this.addClass('evil');
    
});

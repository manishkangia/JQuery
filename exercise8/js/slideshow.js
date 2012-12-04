$navigationBar = $( '<div align=center style=width:900px;height:20px;background:gray;><p style=width:30px;background:white;>some text</p></div>' );
$(document).ready( function animation() {
    $('div#header').before($('ul#slideshow'));
    $('ul#slideshow').after($navigationBar);
    $animationItems = $('ul#slideshow').find('li');
    $animationItems.hide();
    //$animationItems.eq(2).prevAll().hide();
    toAnimate($animationItems,0);
});

function toAnimate( $items, index) {
    $navigationBar.find('p').html( (index+1) + "/" + $items.length );
    $items.eq(index).fadeIn(1000).delay(3000).fadeOut(1000, function() {
        if(index == 2) {
           index = 0;
        }
        else {
           index++;
        }
        toAnimate( $items, index);
    });
}


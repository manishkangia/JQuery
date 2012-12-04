$List = $('ul#nav').children();

$List.each(function() {
    $this = $(this);
    $this.hover(function() {  // function for mouse enter
        $(this).addClass('selected');
        $(this).find('ul').addClass('hover');
    },
      function() {  // function for mouse leave
          $(this).removeClass('selected');
          $(this).find('ul').removeClass('hover');
    });  
});

$(function() {
  var firstmove = true;
  var search = document.getElementById("search"); 
  $(document).bind('keydown', 'j', function(){
    if (firstmove) { firstmove = false; $('#firstmove').focus(); return; }
    $(".move:focus").closest('li').next().find('a.move').focus();
  })
  $(document).bind('keydown', 'k', function(){      
    if (firstmove) { firstmove = false; $('#firstmove').focus(); return; }
    $(".move:focus").closest('li').prev().find('a.move').focus();
  })
  //  $(document).bind('keydown', 'ctrl+[', function(){      
  //      document.location.href = '/';
  //  })
  //  $(document).bind('keydown', 'ctrl+return', function(){      
  //      document.location.href = '/terminal';
  //  })
  $(document).bind('keydown', '/', function(){      
	search.focus();
        $('#search').val('');
  })
  $(document).bind('keydown', 'ctrl+s', function(){      
	search.focus();
  })
  $('.move').click(function() {
    this.focus();
  });
});

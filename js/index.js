
function FixedAnime() {
  var headerH = $('#header').outerHeight(true);
  var scroll = $(window).scrollTop();
  if (scroll >= headerH){
      $('#header').addClass('fixed');
    }else{//それ以外は
      $('#header').removeClass('fixed');
    }
}

$('#g-navi a').click(function () {
  var elmHash = $(this).attr('href');
  var pos = Math.round($(elmHash).offset().top-120);
  $('body,html').animate({scrollTop: pos}, 500);
  return false;
});


$(window).scroll(function () {
  FixedAnime();
});

$(window).on('load', function () {
  FixedAnime();
});

$('#g-navi a[href*="#"]').click(function () {
  var elmHash = $(this).attr('href');
  var pos = $(elmHash).offset().top-70;
  $('body,html').animate({scrollTop: pos}, 500);
});

function PageTopAnime() {
  var scroll = $(window).scrollTop();
  if (scroll >= 200){
    $('#bottom-btn').removeClass('DownMove');
    $('#bottom-btn').addClass('UpMove');
  }else{
    if($('#bottom-btn').hasClass('UpMove')){
      $('#bottom-btn').removeClass('UpMove');
      $('#bottom-btn').addClass('DownMove');
    }
  }
}

$(window).scroll(function () {
  PageTopAnime();
});

$(window).on('load', function () {
  PageTopAnime();
});

$('#top-btn a').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 500);
    return false;
});

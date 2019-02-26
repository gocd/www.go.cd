$(document).ready(function(){

  $('.play-button').on('click', function(){
    $('.overlay-video-container').fadeIn(10);
    var times = 0, playY;
    var Player = $('.video-iframe');
    $('.overlay-video-container').addClass('show-overlay');
    
    if(times == 0){
      playY = Player.attr('src');
      playY+= '?modestbranding=1&rel=0&html5=1&autoplay=1';
      Player.attr('src', playY)
      times = 1;
    }
  });

  
  $('.player-close').on('click', function(){  
    var playY;
    var Player = $('.video-iframe');
    playY = Player.attr('src');
    playY = playY.slice(0, -11);
    Player.attr('src', playY);
    $('.overlay-video-container').removeClass('show-overlay');    
  })

  setTimeout(function(){
    $('.overlay-video-container').on('click', function(){
      if($(this).hasClass('show-overlay')){
        var playY;
        var Player = $('.video-iframe');
        playY = Player.attr('src');
        playY = playY.slice(0, -11);
        Player.attr('src', playY);
        $(this).removeClass('show-overlay'); 
      }
    });
  }, 10);
});
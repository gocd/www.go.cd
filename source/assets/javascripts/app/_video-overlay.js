$(document).ready(function(){

  $('.play-button').on('click', function(){
    var times = 0, playY;
    var Player = $('.video-iframe');
    $('.overlay-video-container').addClass('show-overlay');
    
    if(times == 0){
      playY = Player.attr('src');
      Player+= '?autoplay=1&mute=1&enablejsapi=1';
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

});
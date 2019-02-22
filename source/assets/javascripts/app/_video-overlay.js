$(document).ready(function(){

  $('.play-button').on('click', function(){
    var times = 0, playY;
    var Player = $('.video-iframe');
    $('.overlay-video-container').addClass('show-overlay');
    
    if(times == 0){
        playY = Player.attr('src');
        playY+= '?autoplay=1&mute=1&enablejsapi=1';
      console.log(playY);
        times = 1;
      }
  });
  
});
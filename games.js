$(document).ready(function(){
  var games_list = [];
  $.ajax({
    
    url: 'api/games',
    
    type: "GET",
    
    data: {"minplayers":"3"},
    
    success: function(data){
      //$(".games").append("HELLO");
      games_list = data;
      console.log(data);
      //$("#test").html(games_list);
      
      for (var i = 0; i < data.length; i++) {
        $('.games').append("<li class=\"game\" data-index="+i+">"+data[i].game+ "</li>");

        //populate carousel
        if(i == 0){
          $('.carousel-inner').append("<div class=\"item active\"><img src=\"https://cf.geekdo-images.com/images/pic2419375_t.jpg\" alt=\"...\"><div class=\"carousel-caption\"><h3>"+data[i].game+"</h3></div></div>");
        }else{
          $('.carousel-inner').append("<div class=\"item\"><img src=\"https://cf.geekdo-images.com/images/pic2419375_t.jpg\" alt=\"...\"><div class=\"carousel-caption\"><h3>"+data[i].game+"</h3></div></div>");
        }
          //$('.games').append("<li class=\"game\" data-index="+i+">"+data[i].game+ " :: "+data[i].playingtime +" minutes</li>");
      };


      
      $(".game").click(function(ev){
        var j = parseInt($(ev.currentTarget).data('index'));
        var game_json = games_list[j];
        alert(game_json.game + " :: "+game_json.playingtime + " minutes");
      });
    
    }, 
    
    error: function(){
      $('body').html("Error happened");
    }
    
  });
});
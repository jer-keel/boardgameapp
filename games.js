$(document).ready(function(){
  var games_list = [];

  $("form").submit(function(event) {
    // Stop the browser from submitting the form.
    event.preventDefault();
    console.log("Submitted the form");

    var minPlayersInput = (parseInt($("#minPlayersInput").val()) - 1).toString();
    var maxPlayersInput = (parseInt($("#maxPlayersInput").val()) + 1).toString();
    var rankInput = $("#rankInput").val();

    var minString;
    var maxString;
    var rankString;

    var urlArr = [];
    var inpNum = 0;

    if (minPlayersInput){
      console.log(minPlayersInput);
      minString = "minplayers>" + minPlayersInput;
      urlArr[inpNum] = minString;
      inpNum++;
    }
    if (maxPlayersInput){
      maxString = "maxplayers<" + maxPlayersInput;
      urlArr[inpNum] = maxString;
      inpNum++;
    }
    if (rankInput){
      rankString = "rank=" + rankInput
      urlArr[inpNum] = rankString;
      inpNum++;
    }
    var urlEnd = "";
    if (inpNum !== 0){
      urlEnd = urlArr[0];
      mUrl = 'api/games?' + urlEnd;
    }
    for (var i = 1; i < urlArr.length; i++){
      mUrl += "&" + urlArr[i];
    }
    console.log(mUrl);

    $.ajax({

      url: mUrl,

      type: "GET",

      success: function(data){
        $(".games").empty();
        games_list = data;
        console.log(data);

        for (var i = 0; i < data.length; i++) {
          //populate carousel
          if(i == 0){
            //$('.carousel-inner').append("<div class=\"item active\"><img src=\"https://cf.geekdo-images.com/images/pic2419375_t.jpg\" alt=\"...\"><div class=\"carousel-caption\"><h3>"+data[i].game+"</h3></div></div>");
          }else{
            //$('.carousel-inner').append("<div class=\"item\"><img src=\"https://cf.geekdo-images.com/images/pic2419375_t.jpg\" alt=\"...\"><div class=\"carousel-caption\"><h3>"+data[i].game+"</h3></div></div>");
          }
          //$('.games').append("<li class=\"game\" data-index="+i+">"+data[i].game+ " :: "+data[i].playingtime + " minutes</li>");
          $("#gameTable").append("<tr><td>" + data[i].game + "</td><td>" + data[i].minplayers + "</td><td>" + 
            data[i].maxplayers + "</td></tr>")
      };

/*
      $(".game").click(function(ev){
        var j = parseInt($(ev.currentTarget).data('index'));
        var game_json = games_list[j];
        alert(game_json.game + " :: "+game_json.playingtime + " minutes");
      });
*/

    }, 

    error: function(){
      $('body').html("Error happened");
    }

  });

    // TODO
  });




});
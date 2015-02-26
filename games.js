$(document).ready(function(){
  var games_list = [];

  $("form").submit(function(event) {
    // Stop the browser from submitting the form.
    event.preventDefault();
    console.log("Submitted the form");

    var minPlayersInput = $("#minPlayersInput").val();
    var maxPlayersInput = $("#maxPlayersInput").val();
    var rankInput = $("#rankInput").val();
    var playingTimeInput = $("#playingTimeInput").val();

    var minString;
    var maxString;
    var rankString;
    var playingTimeString;

    //Bools for sorting the table
    var gameColumnBool;
    var minPlayerColumnBool;
    var maxPlayerColumnBool;
    var playingTimeColumnBool;
    var rankColumnBool;

    var urlArr = [];
    var mUrl = [];
    var inpNum = 0;

    if (minPlayersInput){
      minPlayersInput = (parseInt(minPlayersInput) - 1).toString();
      //console.log(minPlayersInput);
      minString = "minplayers>" + minPlayersInput;
      urlArr[inpNum] = minString;
      inpNum++;
    }
    if (maxPlayersInput){
      maxPlayersInput = (parseInt(maxPlayersInput) - 1).toString();
      maxString = "maxplayers<" + maxPlayersInput;
      urlArr[inpNum] = maxString;
      inpNum++;
    }
    if (rankInput){
      rankString = "rank=" + rankInput
      urlArr[inpNum] = rankString;
      inpNum++;
    }
    if (playingTimeInput){
      playingTimeString = "playingtime=" + playingTimeInput;
      urlArr[inpNum] = playingTimeString;
      inpNum++;
    }
    var urlEnd = "";
    if (inpNum !== 0){
      urlEnd = urlArr[0];
      mUrl = 'api/games?' + urlEnd;
    }else{
      mUrl = '';
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
        $("#gameTable tbody").remove();
        games_list = data;
        console.log(data);
        if(mUrl){
         updateTable();
        }else{
          alert("Please specify search parameters...");
        }

        /*for (var i = 0; i < data.length; i++) {
          //$('.games').append("<li class=\"game\" data-index="+i+">"+data[i].game+ " :: "+data[i].playingtime + " minutes</li>");
          $("#gameTable").append("<tr><td>" + data[i].game + "</td><td>" + data[i].minplayers + "</td><td>" + 
            data[i].maxplayers + "</td></tr>")
      }*/;

/*
      $(".game").click(function(ev){
        var j = parseInt($(ev.currentTarget).data('index'));
        var game_json = games_list[j];
        alert(game_json.game + " :: "+game_json.playingtime + " minutes");
      });
*/

      $("#gameColumn").click(function(ev){
        gameColumnBool = !gameColumnBool

        if(gameColumnBool){
          games_list.sort(function(a,b){
            return a.game.toLowerCase() > b.game.toLowerCase();
          });
        }else{
          games_list.sort(function(a,b){
            return b.game.toLowerCase() > a.game.toLowerCase();
          });
        }
        updateTable();
        
      });

      $("#minPlayerColumn").click(function(ev){
        minPlayerColumnBool = !minPlayerColumnBool

        if(minPlayerColumnBool){
          games_list.sort(function(a,b){
            return a.minplayers - b.minplayers;
          });
        }else{
          games_list.sort(function(a,b){
            return b.minplayers - a.minplayers;
          });
        }
        updateTable();
        
      });

      $("#maxPlayerColumn").click(function(ev){
        maxPlayerColumnBool = !maxPlayerColumnBool

        if(maxPlayerColumnBool){
          games_list.sort(function(a,b){
            return a.maxplayers - b.maxplayers;
          });
        }else{
          games_list.sort(function(a,b){
            return b.maxplayers - a.maxplayers;
          });
        }
        updateTable();
        
      });

      $("#playingTimeColumn").click(function(ev){
        playingTimeColumnBool = !playingTimeColumnBool

        if(playingTimeColumnBool){
          games_list.sort(function(a,b){
            return a.playingtime - b.playingtime;
          });
        }else{
          games_list.sort(function(a,b){
            return b.playingtime - a.playingtime;
          });
        }
        updateTable();
        
      });

      $("#rankColumn").click(function(ev){
        rankColumnBool = !rankColumnBool

        if(rankColumnBool){
          games_list.sort(function(a,b){
            return a.rank - b.rank;
          });
        }else{
          games_list.sort(function(a,b){
            return b.rank - a.rank;
          });
        }
        updateTable();
        
      });

    }, 

    error: function(){
      $('body').html("Error happened");
    }

  });

    // TODO
  });

  function updateTable(){
    $(".games").empty();
    $("#gameTable tbody").remove();
    console.log("Updating table...");

    for (var i = 0; i < games_list.length; i++) {
          //$('.games').append("<li class=\"game\" data-index="+i+">"+data[i].game+ " :: "+data[i].playingtime + " minutes</li>");
      $("#gameTable").append("<tr><td><a href=\"http://www.boardgamegeek.com/boardgame/" + games_list[i].objectid + "\" target=\"_blank\">" + games_list[i].game + "</a></td><td>" + games_list[i].minplayers + "</td><td>" + 
      games_list[i].maxplayers + "</td><td>" + games_list[i].playingtime + "</td><td>" + games_list[i].rank + "</td></tr>");
    }
  }




});
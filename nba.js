//go to website to look up the player, get the id.
$(function() {

  $('#searchParams').on("submit", function(e) {
    e.preventDefault();

    var first = $("#firstName").val().toLowerCase();
    var last = $("#lastName").val().toLowerCase();

    $.ajax(
    {
      url: "http://www.nba.com/playerfile/"+first+"_"+last+"/",
      dataType: "text",
      success: function myResult(result) {

        if(result.response === "False") {
          alert("Bad response! please try again.");

        }
        else {

          $('#playerFace').empty();

          var playerKey = result.match(/href="http:\/\/stats.nba.com\/player\/\#\!\/\d+/)[0].split("/")
          [result.match(/href="http:\/\/stats.nba.com\/player\/\#\!\/\d+/)[0].split("/").length-1];
          var playerImage = '<img id="'+first+last+'" src="http://i.cdn.turner.com/nba/nba/.element/img/2.0/sect/statscube/players/large/'+
          first+'_'+last+'.png" />';
          

          $.ajax(
          {
            url: "http://stats.nba.com/stats/commonplayerinfo?LeagueId=00",
            data: {
              LeagueId: "00",
              PlayerID: playerKey

            },
            dataType: "jsonp",
            success: function useId(result) {
              if(result.response === "False") {
                alert("Bad response! Please try again.");
              }
              else {
                var pointsPerGame = result.resultSets[1].rowSet[0][3];
                var assistsPerGame = result.resultSets[1].rowSet[0][4];
                var reboundsPerGame = result.resultSets[1].rowSet[0][5];
                
                $("#ppg")[0].innerText = pointsPerGame;
                $("#apg")[0].innerText = assistsPerGame;
                $("#rpg")[0].innerText = reboundsPerGame;
                $("#playerFace").append(playerImage);

              }
            }
          });
        }
      }
    });
  });
});


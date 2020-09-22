$(document).ready(function(){

  $( ".bottone" ).click(function() {

    $("#list_film").html("");

    var searchFilm = $(".barra").val();
    
    $.ajax(
      {
        "url" : "https://api.themoviedb.org/3/search/movie",
        "data" : {
          "api_key" : "c0328fab8702a24e23778bd6bd73ba4b",
          "query" : searchFilm,
          "language" : "it-IT",
        },
        "method": "GET",
        "success" : function (data) {
          renderFilm(data.results);
        },
        "error": function (errore) {
          alert("Errore!");
        }
      }
    );
  });

});

var source = $("#film-template").html();
var template = Handlebars.compile(source);

function renderFilm(film) {
  for (var i=0; i<film.length; i++ ){
    var context = {
      "title": film[i].title,
      "original_title": film[i].original_title,
      "language": film[i].original_language,
      "vote": film[i].vote_average,
    };

    var html = template(context);
    $("#list_film").append(html);
  }
}

// function chiamataApi(si) {
//
// }

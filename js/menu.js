$(document).ready(function(){
  //Al click invoco la funzione "chiamataApi" ,pulisco la pagine e collego il testo scritto negli input con i titoli dei film
  $( ".bottone" ).click(function() {

    $("#list_film").html("");
    var searchFilm = $(".barra").val();

    chiamataApi(searchFilm);
  });
  //Premendo invoco la funzione "chiamataApi" ,pulisco la pagine e collego il testo scritto negli input con i titoli dei film
  $(".barra").keyup(
    function (event) {
      if(event.which == 13){
        $("#list_film").html("");
        var searchFilm = $(".barra").val();

        chiamataApi(searchFilm);
      }
    }
  );
});

//-------------------------------------------------//
var source = $("#film-template").html();
var template = Handlebars.compile(source);
//Funzione per stampare il titolo, il titolo originale, la lingua e il voto del film
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
//Funzione per la chiamata API
function chiamataApi(searchFilm) {
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
}

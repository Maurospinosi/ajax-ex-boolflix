$(document).ready(function(){
  //Al click invoco la funzione "chiamataApi" ,pulisco la pagine e collego il testo scritto negli input con i titoli dei film
  $( ".bottone" ).click(function() {
    var searchFilm = $(".barra").val();
    resetSearch()
    chiamataApi(searchFilm);
  });

  //Premendo "Invio" invoco la funzione "chiamataApi" ,pulisco la pagine e collego il testo scritto negli input con i titoli dei film
  $(".barra").keyup(
    function (event) {
      if(event.which == 13){
        var searchFilm = $(".barra").val();
        resetSearch()
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

    var vote = parseInt(Math.ceil(film[i].vote_average / 2));

   if(vote == 1){
     for(var j = 1; j = 1; j++){
      var star = "<li>" + '<i class="fas fa-star" id="piena"></i>' + "</li>";
     }
   } else if (vote == 2){
     for(var j = 1; j <= 2; j++){
      var star = "<li>" + '<i class="fas fa-star" id="piena"></i>' + "</li>";
     }
   } else if (vote == 3){
     for(var j = 1; j <= 3; j++){
      var star = "<li>" + '<i class="fas fa-star" id="piena"></i>' + "</li>";
     }
   } else if (vote == 4){
     for(var j = 1; j <= 4; j++){
      var star = "<li>" + '<i class="fas fa-star" id="piena"></i>' + "</li>";
     }
   } else if (vote == 5){
     for(var j = 1; j <= 2; j++){
      var star = "<li>" + '<i class="fas fa-star" id="piena"></i>' + "</li>";
     }
   } else if (vote == 0){
     for(var j = 1; j <= 5; j++){
      var star = "<li>" + '<i class="far fa-star" id="vuota"></i>' + "</li>";
     }
   }

    var context = {
      "title": film[i].title,
      "original_title": film[i].original_title,
      "language": film[i].original_language,
      "vote": star,
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
//Funzione per pulire la barra input e la pagina html
function resetSearch() {
  $("#list_film").html("");
  $(".barra").val("");
}

$(document).ready(function(){
  //Al click invoco la funzione "chiamataApi" ,pulisco la pagine e collego il testo scritto negli input con i titoli dei film
  $( ".bottone" ).click(function() {
    var searchFilm = $(".barra").val();
    resetSearch()
    chiamataApiFilm(searchFilm);
  });

  //Premendo "Invio" invoco la funzione "chiamataApi" ,pulisco la pagine e collego il testo scritto negli input con i titoli dei film
  $(".barra").keyup(
    function (event) {
      if(event.which == 13){
        var searchFilm = $(".barra").val();
        resetSearch()
        chiamataApiFilm(searchFilm);
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
      "language": langFunction(film[i].original_language),
      "vote": voteFunction(film[i].vote_average),
    };

    var html = template(context);
    $("#list_film").append(html);
  }
}

//Funzione per la chiamata API Film
function chiamataApiFilm(searchFilm) {
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

//Funzione per la chiamata API serie TV
function chiamataApiTV(searchFilm) {
  $.ajax(
    {
      "url" : "https://api.themoviedb.org/3/search/tv",
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

//Funzione per la sostituzione della scala di valutazione del film (voto) : da 1 a 10 a 1 a 5 arrotondato per eccesso (con stelle)
function voteFunction(num) {
  //Cmabio la scala (da 1 a 10 a 1 a 15 arrotondoto per eccesso)
  var num = parseInt(Math.ceil(num/ 2));

  var stringa = " ";

  for (var i = 1; i<=5; i++){
    if(i <= num){
      var stringa = stringa + '<i class="fas fa-star"></i>';
    } else{
      var stringa = stringa + '<i class="far fa-star"></i>';
    }
  }
  return stringa;
}

//Funzione per sostituire la lingua con la bandiera corrispondente
function langFunction(lang) {
  if(lang == "en"){
    return "<img src='img/engs.jpg'>";
  } else if (lang == "it"){
    return "<img src='img/ita.jpg'>";
  }else if (lang == "fr"){
    return "<img src='img/fra.jpg'>";
  }else if (lang == "de"){
    return "<img src='img/tede.jpg'>";
  }else if (lang == "es"){
    return "<img src='img/span.jpg'>";
  } else{
    return lang;
  }
}

//Funzione per pulire la barra input e la pagina html
function resetSearch() {
  $("#list_film").html("");
  $(".barra").val("");
}

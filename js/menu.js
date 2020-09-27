$(document).ready(function(){
  //Al click invoco le funzioni "chiamataApi" ,pulisco la pagine e collego il testo scritto nell' input con i titoli dei film e/o serie Tv
  $( ".bottone" ).click(function() {
    var searchFilm = $(".barra").val();

    resetSearch()
    chiamataApiFilm("film", searchFilm);
    chiamataApiTV("tv", searchFilm);

  });

  //Premendo "Invio" invoco le funzioni "chiamataApi" ,pulisco la pagine e collego il testo scritto nell' input con i titoli dei film e/o serie Tv
  $(".barra").keyup(
    function (event) {
      if(event.which == 13){
        var searchFilm = $(".barra").val();

        resetSearch()
        chiamataApiFilm(searchFilm);
        chiamataApiTV(searchFilm);
        $(".td").hover(function() {
          $( this ).fadeOut( 100 );
          $( this ).fadeIn( 500 );
        });
      }
    }
  );
});

//-------------------------------------------------//
var source = $("#film-template").html();
var template = Handlebars.compile(source);
//Funzione per stampare il titolo, il titolo originale, la lingua e il voto del film
function renderResult(type, cin) {

  var title;
  var original_title;
  var containers;

  for (var i=0; i<cin.length; i++ ){
    //Stampo il poster del film se è presente nell'API, altrimenti stampo "not found"
    if(cin[i].poster_path == null){
      var url = "img/mobile.png";
    } else{
      var url = "https://image.tmdb.org/t/p/w342" + cin[i].poster_path;
    }

    //Distinzione tra il titolo/ titolo originale dei film e delle serie tv
    if(type == "film"){
      title = cin[i].title;
      original_title = cin[i].original_title;
      containers = $("#list_film");
    } else if (type == "serietv"){
      title = cin[i].name;
      original_title = cin[i].original_name;
      containers = $("#list_tv");
    }

    var context = {
      "title": title,
      "type" : type,
      "original_title": original_title,
      "language": langFunction(cin[i].original_language),
      "vote": voteFunction(cin[i].vote_average),
      "poster" : url,
    };

    var html = template(context);
    containers.append(html);
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
        renderResult("film", data.results);
        if(data.total_results == 0){
          alert("Attenzione devi inserire il titolo di un film o di una serie Tv!");
        }
      },
      "error": function (errore) {
        alert("Attenzione devi inserire il titolo di un film o di una serie Tv!");
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
        renderResult("serietv", data.results);
        console.log(data.results);
      },
      "error": function (errore) {
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
    return "<img class='flag' src='img/engs.jpg'>";
  } else if (lang == "it"){
    return "<img class='flag' src='img/ita.jpg'>";
  }else if (lang == "fr"){
    return "<img class='flag' src='img/fra.jpg'>";
  }else if (lang == "de"){
    return "<img class='flag' src='img/tede.jpg'>";
  }else if (lang == "es"){
    return "<img class='flag' src='img/span.jpg'>";
  } else{
    return lang;
  }
}

//Funzione per pulire la barra input e la pagina html
function resetSearch() {
  $("#list_film").html("");
  $("#list_tv").html("");
  $(".barra").val("");
}

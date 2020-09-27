$(document).ready(function(){
  //Al click invoco le funzioni "chiamataApi" ,pulisco la pagine e collego il testo scritto nell' input con i titoli dei film e/o serie Tv
  $( ".bottone" ).click(function() {
   search()
  });

  //Premendo "Invio" invoco le funzioni "chiamataApi" ,pulisco la pagine e collego il testo scritto nell' input con i titoli dei film e/o serie Tv
  $(".barra").keyup(
    function (event) {
      if(event.which == 13){
        search();
      }
    }
  );
});

//-------------------------------------------------//
//Funzione generica per richiamare le altre funzioni
function search(){
  var searchFilm = $(".barra").val();

  resetSearch();
  chiamataApi("movie", searchFilm);
  chiamataApi("tv", searchFilm);
}

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
    if(type == "movie"){
      title = cin[i].title;
      original_title = cin[i].original_title;
      containers = $("#list_film");
    } else if (type == "tv"){
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

//Funzione per le chiamate API di serie TV e film
function chiamataApi(type, searchFilm) {
  $.ajax(
    {
      "url" : "https://api.themoviedb.org/3/search/" + type,
      "data" : {
        "api_key" : "c0328fab8702a24e23778bd6bd73ba4b",
        "query" : searchFilm,
        "language" : "it-IT",
      },
      "method": "GET",
      "success" : function (data) {
        if(data.total_results > 0){
          renderResult(type, data.results);
        } else {
          notFoundFilm(type);
          notFoundTv(type);
        }

        $(".col").mouseenter(function() {
          $(this).find(".td").removeClass("display");
          $(this).find(".larg").addClass("display");
        });
        $(".col").mouseleave(function() {
          $(this).find(".td").addClass("display");
          $(this).find(".larg").removeClass("display");
        });
      },
      "error": function (errore) {
        alert("Attenzione devi inserire il titolo di un film o di una serie Tv!");
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

//Funzione che stampa "La ricerca non ha prodotto nessun Film" se non sono presenti film con quel titolo,oppure stampa "La ricerca non ha prodotto nessuna serie Tv" se non ci sono serie Tv con quel nome
function notFoundFilm(type){


  var containers;

  if(type == "movie"){
    var source = $("#notfound_film-template").html();
    var template = Handlebars.compile(source);
    containers = $("#list_film");
    var html = template()
    containers.append(html);
  } else if (type == "tv") {
    var source = $("#notfound_tv-template").html();
    var template = Handlebars.compile(source);
    containers = $("#list_tv");
    var html = template()
    containers.append(html);
  }
}

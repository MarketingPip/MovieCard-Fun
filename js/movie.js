



getDetails(`https://api.themoviedb.org/3/search/movie?api_key=6b4357c41d9c606e4d7ebe2f4a8850ea&language=en-US&query=The Matrix`).then(function(result) {
var MovieID = result.results[0].id
  
var endpoint1 = `https://api.themoviedb.org/3/movie/${result.results[0].id}?&api_key=6b4357c41d9c606e4d7ebe2f4a8850ea`  
 getDetails(endpoint1).then(function(result) {
  
   
var posterPaths = "https://image.tmdb.org/t/p/w370_and_h556_bestv2";
var backgroundPaths = "http://image.tmdb.org/t/p/w1280";
   
    document.querySelector(".title1").innerHTML = result.belongs_to_collection.name
     document.querySelector(".title2").innerHTML = result.title
   
     document.querySelector(".column2 p").innerHTML = result.overview 
   
        document.querySelector(".movie-card .container img").src =  posterPaths + result.poster_path
   document.querySelector(".column1").innerHTML = "" 
   
  var styleElem = document.head.appendChild(document.createElement("style"));

styleElem.innerHTML = `.hero:before {background: url("${backgroundPaths + result.backdrop_path}");

 
    background-size: cover;
  object-fit: cover;
}`;
   for (const genre in result.genres){
       document.querySelector(".column1").innerHTML += `   <span class="tag" tabindex="0">${result.genres[genre].name}</span>`
   }
   getDetails(`https://api.themoviedb.org/3/movie/${MovieID}/casts?&api_key=6b4357c41d9c606e4d7ebe2f4a8850ea`).then(function(result) {
    var actor_count = 0 
     document.querySelector(".avatars").innerHTML = ''
     
    while (actor_count != 5){



      
       document.querySelector(".avatars").innerHTML += ` <a href="#" data-tooltip="${result.cast[actor_count].name}" data-placement="top">
             <img src="https://image.tmdb.org/t/p/w500${result.cast[actor_count].profile_path}" alt="avatar1" />
          </a>`
  actor_count += 1
 
    }  
      
    });     
});

});



async function getDetails(endpoint) {
    try {
      const response = await fetch(endpoint, {
        mode: 'cors'
      })
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse
      } else{
        const jsonResponse = await response.json();
        return jsonResponse.status_message
      }
    } catch(error) {
      return error.message
    }
  }

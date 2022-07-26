// function that gets API1, changes it into backend and adds to .user-list. Also make the array a string
//function that makes an html element with the ${} thingie

const popularURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3a6a4801c4e1409a0655b5db3e583c55";

const searchURL =
  "https://api.themoviedb.org/3/search/movie?api_key=3a6a4801c4e1409a0655b5db3e583c55&query=";

const form = document.querySelector(".form");
const search = document.querySelector(".search__field");
const main = document.querySelector(".main");

async function getMovies(url) {
  const movies = await fetch(url);
  const moviesData = await movies.json();
  const movieListEl = document.querySelector(".movie-list");
  movieListEl.innerHTML = moviesData.results
    .map((movie) => moviesHTML(movie))
    .join("");

  /*
    ONLY DISPLAY BETTER THAN 7.5
            const rating = moviesData.results.map((movie) => {
            return movie.vote_average;
          });
    */
}

getMovies(popularURL);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchValue = search.value;
  console.log(searchValue);
  if (searchValue && searchValue !== "") {
    getMovies(searchURL + searchValue);
    searchValue = "";
  } else {
    window.location.reload();
  }
});

function slideToMovies() {
  document.querySelector(".main").scrollIntoView();
}

function displayByRating() {
  if (rating > 7.5) {
    return "display-rating";
  }
}

function moviesHTML(movie) {
  return `<div class="movie-card" onclick="showUserPost()">
              <div class="movie-card__container">
                <div class="movie-card__front">
                  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                </div>
                <div class="movie-card__back">
                  <h2>${movie.original_title}</h2>
                  <div class="movie-card__back--plot">
                    <h3>
                    ${movie.overview}
                    </h3>
                   </div>
                  <div class="btn btn--red">
                    <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank">Play here</a>
                  </div>
                </div>
              </div>
            </div>`;
}

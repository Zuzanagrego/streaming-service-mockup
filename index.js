const popularURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3a6a4801c4e1409a0655b5db3e583c55";

const searchURL =
  "https://api.themoviedb.org/3/search/movie?api_key=3a6a4801c4e1409a0655b5db3e583c55&query=";

const form = document.querySelector(".form");
const search = document.querySelector(".search__field");
const main = document.querySelector(".main");
const favorites = document.querySelector(".favorites-list");
const slider = document.querySelector(".slider");
const output = document.getElementById("value");
const movieListEl = document.querySelector(".movie-list");

let isModalOpen = false;
let isFavorite = false;

async function getMovies(url) {
  const movies = await fetch(url);
  const moviesData = await movies.json();

  movieListEl.innerHTML = moviesData.results
    .map((movie) => moviesHTML(movie))
    .join("");

  output.innerHTML = slider.value;
  slider.oninput = function () {
    output.innerHTML = this.value;
    movieListEl.innerHTML = moviesData.results
      .filter((movie) => movie.vote_average > this.value)
      .map((movie) => moviesHTML(movie))
      .join("");
  };
}

getMovies(popularURL);

function toggleModal() {
  isModalOpen = !isModalOpen;
  if (isModalOpen) {
    return (document.body.classList += " modal--open");
  }
  document.body.classList.remove("modal--open");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchValue = search.value;
  console.log(searchValue);
  if (searchValue && searchValue !== "") {
    getMovies(searchURL + searchValue);
    searchValue = "";
  }
});

function slideToMovies() {
  document.querySelector(".main").scrollIntoView();
}

async function addToFavorites(id) {
  //by clicking heart add to modal and remove from displaying
  isFavorite = !isFavorite;
  const movies = await fetch(popularURL);
  const moviesData = await movies.json();
  let movieId = id;

  let favoriteMovies = moviesData.results.filter(
    (movie) => movie.id == movieId
  );

  if (isFavorite) {
    favoriteMovieEl = moviesHTML(favoriteMovies[0]);
    favorites.innerHTML = favoriteMovieEl;
  }
  //favoriteMovieEl.classList.remove("favorited");

  favorites.innerHTML = favoriteMovieEl;

  // favorites.removeChild(this);
  //movie.classList.remove("favorited");
}

function moviesHTML(movie) {
  return `<div class="movie-card">
              <div class="movie-card__container">
                <div class="movie-card__front">
                  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                </div>
                <div class="movie-card__back">
                  <h2><i class="fas fa-heart click" onclick="addToFavorites(${movie.id})"></i> ${movie.original_title}</h2>
                  <div>Rating: ${movie.vote_average}</div>
                  <div class="movie-card__back--plot">
                    <h3>
                    ${movie.overview}
                    </h3>
                   </div>
                  <div class="btn">
                    <a class="btn--red" href="https://youtu.be/dQw4w9WgXcQ" target="_blank">Play here</a>
                  </div>
                </div>
              </div>
            </div>`;
}

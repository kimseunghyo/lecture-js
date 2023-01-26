const movieList = document.querySelector(".movie-list");

const myFetch = fetch(
  "https://api.themoviedb.org/3/movie/popular?api_key=e96e756e7329e7a1793d60d020ff0de4&language=ko-KR"
);

myFetch
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {
    result.results.forEach(function (item, idx) {
      movieList.innerHTML += `<li>
        <div class="movie-list-img">
          <img src="https://image.tmdb.org/t/p/w500${item.poster_path}">
        </div>
        <div class="movie-list-txt">
          <h2>${item.title}</h2>
          <p>${item.original_title}</p>
          <p>${item.release_date}</p>
          <p>${item.overview}</p>
        </div>
      </li>`;
    });
  })
  .catch();

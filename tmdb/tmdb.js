const movieList = document.querySelector(".movie-list");
const btnMore = document.querySelector(".btn-more");
const movieDetail = document.querySelector(".movie-detail");
const searchTxt = document.querySelector(".search-txt");
const TMDB_KEY = "e96e756e7329e7a1793d60d020ff0de4";

let pageNum = 1;

function loadMovie(pageNum) {
  const myFetch = fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&language=ko-KR&page=${pageNum}`
  );

  myFetch
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      movieList.innerHTML = "";
      makeList(result);
    })
    .catch();
}

function makeList(result) {
  result.results.forEach(function (item, idx) {
    movieList.innerHTML += `<li data-id="${item.id}">
      <div class="img-box">
        <img src="https://image.tmdb.org/t/p/w500${item.poster_path}">
      </div>
      <div class="contents-box">
        <h2>${item.title}</h2>
        <p>${item.original_title}</p>
        <p>${item.release_date}</p>
        <p class="overview">${item.overview}</p>
      </div>
    </li>`;
  });
  gsap.from(".movie-list li", { opacity: 0, stagger: 0.02 });

  const movieItems = document.querySelectorAll(".movie-list li");
  movieItems.forEach(function (item, each) {
    item.addEventListener("click", function () {
      const movieId = item.dataset.id;
      const movieFetch = fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=e96e756e7329e7a1793d60d020ff0de4&language=ko-KR`
      );

      movieFetch
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          //console.log(result);
          movieDetail.innerHTML = "";
          movieDetail.classList.add("on");
          document.body.classList.add("off");
          gsap.fromTo(
            ".movie-detail",
            { y: "100%" },
            { y: 0, duration: 2, ease: "power4" }
          );

          let txtGenres = "";
          result.genres.forEach(function (item, idx) {
            if (idx == 0) {
              txtGenres += item.name;
            } else {
              txtGenres += "/" + item.name;
            }
          });
          movieDetail.innerHTML += `
          <div class="img-box">
            <img src="https://image.tmdb.org/t/p/original${result.backdrop_path}">
          </div>
          <div class="contents-box">
          <h2 class="title">${result.title}</h2>
          <p>${result.original_title}</p>
          <p>${txtGenres}</p>
          <p><a href="${result.homepage}" target="_blank">${result.homepage}</a></p>
          <p>${result.release_date}</p>
          <p>${result.popularity}</p>
          <p>${result.runtime}</p>
          <p class="overview">${result.overview}</p>
        </div>
        <button class="btn-close"><span class="material-icons md-48">close</span></button>
        `;
          const btnClose = document.querySelector(".btn-close");
          btnClose.addEventListener("click", function () {
            movieDetail.classList.remove("on");
            document.body.classList.remove("off");
          });
        })
        .catch();
    });
  });
}

loadMovie(pageNum);

btnMore.addEventListener("click", function () {
  pageNum++;
  loadMovie(pageNum);
});

searchTxt.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    const myFetch = fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&language=ko-KR&page=1&include_adult=false&query=${searchTxt.value}`
    );

    myFetch
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        console.log(result);
        movieList.innerHTML = "";
        makeList(result);
      })
      .catch();
  }
});

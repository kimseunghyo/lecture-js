// promise 이행을 하거나 거절을 하거나
const searchTxt = document.querySelector(".search-txt");
const btnSearch = document.querySelector(".btn-search");
const thumbList = document.querySelector(".list");
const recentSearchWord = document.querySelector(".recent-search-word");
//let recentSearchWordArray = [];
const recentSearchWordArray =
  JSON.parse(localStorage.getItem("recentSearchWord")) ?? [];

recentSearchWordArray.forEach(function (item, idx) {
  recentSearchWord.innerHTML += `<li>${item}</li>`;
});

searchTxt.addEventListener("keyup", function (e) {
  const txt = searchTxt.value;

  if (e.keyCode === 13) {
    searchImg(txt);

    if (!recentSearchWordArray.includes(txt)) {
      recentSearchWordArray.push(txt);
      recentSearchWord.innerHTML += `<li>${txt}</li>`;

      localStorage.setItem(
        "recentSearchWord",
        JSON.stringify(recentSearchWordArray)
      );
    }
  }
});

function searchImg(searchTxt) {
  thumbList.innerHTML = "";

  const myFetch = fetch(
    `http://dapi.kakao.com/v2/search/image?query=${searchTxt}`,
    {
      headers: { Authorization: "KakaoAK 7025b57e2c141dff70e233b7612ec4ee" },
    }
  );

  myFetch
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      result.documents.forEach(function (item, idx) {
        console.log(item.thumbnail_url);
        thumbList.innerHTML += `<li><a href="${item.image_url}" data-fancybox="gallery"><img src="${item.thumbnail_url}"></a></li>`;
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

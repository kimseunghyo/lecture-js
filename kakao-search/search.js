// promise 이행을 하거나 거절을 하거나
const ul = document.querySelector(".list");
const myFetch = fetch("http://dapi.kakao.com/v2/search/image?query=김태희", {
  headers: { Authorization: "KakaoAK 7025b57e2c141dff70e233b7612ec4ee" },
});

myFetch
  .then(function (response) {
    const json = response.json();

    json.then(function (result) {
      //console.log(result.documents[0]);
      const list = result.documents;

      for (let i = 0; i < list.length; i++) {
        ul.innerHTML += `<li><img src="${list[i].thumbnail_url}"></li>`;
      }
    });
  })
  .catch(function (error) {
    console.log(error);
  });

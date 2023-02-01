const searchTxt = document.querySelector(".search-txt");
const container = document.querySelector("#map");
const mapOption = {
  center: new kakao.maps.LatLng(37.66826, 126.9786557),
  level: 13,
};
const map = new kakao.maps.Map(container, mapOption);
const clusterer = new kakao.maps.MarkerClusterer({
  map: map,
  averageCenter: true,
  minLevel: 10,
  disableClickZoom: true,
});
const customOverlay = new kakao.maps.CustomOverlay({
  map: map,
  zIndex: 99,
});

function loadMap(address) {
  fetch(
    `https://api.odcloud.kr/api/EvInfoServiceV2/v1/getEvSearchList?serviceKey=UHvOGc0JhYQnrF%2Bx7qrklC5AYkaWLzl6OP8YMOaqGfa22ApZ4DndiBo5pai%2BuNOtIjPVAZegBWv1hri6ZkvIuQ%3D%3D&perPage=5000&cond[addr::LIKE]=${address}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      const charList = result.data;
      const markers = [];

      charList.forEach(function (item, idx) {
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(item.lat, item.longi),
        });
        markers.push(marker);
        kakao.maps.event.addListener(marker, "click", function () {
          map.panTo(marker.getPosition());
          customOverlay.setMap(map);
          customOverlay.setPosition(marker.getPosition());
          customOverlay.setContent(`
          <div class="contents-box">
          <h2 class="title">${item.csNm}</h2>
          <p class="addr">${item.addr}</p>
          <p class="type">${item.cpNm}</p>
          <button class="close"><span class="material-icons">close</span></button>
        </div>`);
        });
      });
      clusterer.addMarkers(markers);
    })
    .catch();
}

searchTxt.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    loadMap(searchTxt.value);
  }
});

container.addEventListener("click", function (e) {
  if (e.target.closest("button")) {
    customOverlay.setMap(null);
  }
});

kakao.maps.event.addListener(clusterer, "clusterclick", function (cluster) {
  const level = map.getLevel() - 1;

  map.setLevel(level, { anchor: cluster.getCenter() });
});

const myFetch = fetch(
  "https://api.odcloud.kr/api/EvInfoServiceV2/v1/getEvSearchList?serviceKey=UHvOGc0JhYQnrF%2Bx7qrklC5AYkaWLzl6OP8YMOaqGfa22ApZ4DndiBo5pai%2BuNOtIjPVAZegBWv1hri6ZkvIuQ%3D%3D&perPage=300"
);
const container = document.querySelector("#map");
const mapOption = {
  center: new kakao.maps.LatLng(36, 128),
  level: 13,
};
const map = new kakao.maps.Map(container, mapOption);
const clusterer = new kakao.maps.MarkerClusterer({
  map: map,
  averageCenter: true,
  minLevel: 10,
  disableClickZoom: true,
});
let customOverlay = null;

function searchCharging(result) {
  const markers = [];
  customOverlay = new kakao.maps.CustomOverlay({
    map: map,
  });

  result.forEach(function (item, idx) {
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(item.lat, item.longi),
    });
    markers.push(marker);

    kakao.maps.event.addListener(marker, "click", function () {
      customOverlay.setContent(`
      <div class="contents-box">
      <div class="title">${item.csNm}</div>
      <div style="font-size: 12px">${item.cpNm}, ${chargerType(item.cpTp)}</div>
      <div>${item.addr}</div>
      <button class="close" onClick="close()"><span class="material-icons">close</span></button>
      </div>`);
      customOverlay.setMap(map);
      customOverlay.setPosition(marker.getPosition());
    });
  });
  clusterer.addMarkers(markers);
}

function loadCharging() {
  myFetch
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      searchCharging(result.data);
    })
    .catch();
}

function chargerType(cpTp) {
  if (cpTp === "1") return "B타입(5핀)";
  else if (cpTp === "2") return "C타입(5핀)";
  else if (cpTp === "3") return "BC타입(5핀)";
  else if (cpTp === "4") return "BC타입(7핀)";
  else if (cpTp === "5") return "DC차 데모";
  else if (cpTp === "6") return "AC 3상";
  else if (cpTp === "7") return "DC콤보";
  else if (cpTp === "8") return "DC차데모+DC콤보";
  else if (cpTp === "9") return "DC차데모+AC3상";
  else if (cpTp === "10") return "DC차데모+DC콤보, AC3상";
}

loadCharging();

container.addEventListener("click", function (e) {
  if (e.target.closest("button")) {
    customOverlay.setMap(null);
  }
});

kakao.maps.event.addListener(clusterer, "clusterclick", function (cluster) {
  const level = map.getLevel() - 1;

  map.setLevel(level, { anchor: cluster.getCenter() });
});

const myFetch = fetch(
  "https://apis.data.go.kr/B551011/GoCamping/basedList?MobileOS=ETC&MobileApp=tis&serviceKey=UHvOGc0JhYQnrF%2Bx7qrklC5AYkaWLzl6OP8YMOaqGfa22ApZ4DndiBo5pai%2BuNOtIjPVAZegBWv1hri6ZkvIuQ%3D%3D&_type=json&numOfRows=1000"
);
const container = document.querySelector("#map");
const mapOption = {
  center: new kakao.maps.LatLng(36, 128),
  level: 13,
};
const map = new kakao.maps.Map(container, mapOption);
const markers = [];
const clusterer = new kakao.maps.MarkerClusterer({
  map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
  averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
  minLevel: 10, // 클러스터 할 최소 지도 레벨
  disableClickZoom: true, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
});
let customOverlay = null;

function searchCamping(result) {
  customOverlay = new kakao.maps.CustomOverlay({
    map: map,
  });

  result.forEach(function (item, idx) {
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(item.mapY, item.mapX),
    });
    //marker.setMap(map);
    markers.push(marker);

    kakao.maps.event.addListener(marker, "click", function () {
      customOverlay.setContent(`
      <div class="contents-box">
      <div class="title">${item.facltNm}</div>
      <div class="phone">${item.tel}</div>
      <div class="address">${item.addr1}</div>
      <div class="info"><a href="${item.homepage}" target="_blank">매장정보</a></div>
      <button class="close" onClick="close()"><span class="material-icons">close</span></button>
      </div>`);
      customOverlay.setMap(map);
      customOverlay.setPosition(marker.getPosition());
    });
  });

  // 클러스터러에 마커들을 추가합니다
  clusterer.addMarkers(markers);
}

function loadCamping() {
  myFetch
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      //console.log(result);
      searchCamping(result.response.body.items.item);
    })
    .catch();
}

loadCamping();

container.addEventListener("click", function (e) {
  if (e.target.closest("button")) {
    customOverlay.setMap(null);
  }
});

// 마커 클러스터러에 클릭이벤트를 등록합니다
// 마커 클러스터러를 생성할 때 disableClickZoom을 true로 설정하지 않은 경우
// 이벤트 헨들러로 cluster 객체가 넘어오지 않을 수도 있습니다
kakao.maps.event.addListener(clusterer, "clusterclick", function (cluster) {
  // 현재 지도 레벨에서 1레벨 확대한 레벨
  const level = map.getLevel() - 1;

  // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
  map.setLevel(level, { anchor: cluster.getCenter() });
});

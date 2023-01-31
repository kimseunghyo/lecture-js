const searchTxt = document.querySelector(".search-txt");
const container = document.querySelector("#map");
const mapOption = {
  center: new kakao.maps.LatLng(37.566826, 126.9786567),
  level: 3,
};
let customOverlay = null;

function searchPlace(searchTxt) {
  container.innerHTML = "";

  const map = new kakao.maps.Map(container, mapOption);
  const place = new kakao.maps.services.Places();
  //const infoWindow = new kakao.maps.InfoWindow({ zindex: 99, removable: true });
  customOverlay = new kakao.maps.CustomOverlay({
    map: map,
    content: `<div class="contents-box"><h1>나는 커스텀 오버레이</h1></div>`,
  });

  place.keywordSearch(`${searchTxt}`, function (result, status) {
    console.log(status);
    if (status === "OK") {
      const bounds = new kakao.maps.LatLngBounds();
      result.forEach(function (item, idx) {
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(item.y, item.x),
        });
        // kakao.maps.event.addListener(marker, "click", function () {
        //   infoWindow.setContent(
        //     `<div>${item.place_name}</div>
        //     <div>${item.phone}</div>
        //     <div>${item.road_address_name}</div>
        //     <div><a href="${item.place_url}" target="_blank">매장정보</a></div>`
        //   );
        //   infoWindow.open(map, marker);
        // });
        kakao.maps.event.addListener(marker, "click", function () {
          customOverlay.setContent(`
            <div class="contents-box">
            <div class="title">${item.place_name}</div>
            <div class="phone">${item.phone}</div>
            <div class="address">${item.road_address_name}</div>
            <div class="info"><a href="${item.place_url}" target="_blank">매장정보</a></div>
            <button class="close" onClick="close()"><span class="material-icons">close</span></button>
            </div>`);
          customOverlay.setMap(map);
          customOverlay.setPosition(marker.getPosition());
        });
        bounds.extend(new kakao.maps.LatLng(item.y, item.x));
      });
      map.setBounds(bounds);
    } else {
      alert("검색 결과가 존재하지 않습니다.");
    }
  });
}

searchTxt.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    const txt = searchTxt.value;
    searchPlace(txt);
  }
});

container.addEventListener("click", function (e) {
  if (e.target.closest("button")) {
    customOverlay.setMap(null);
  }
});

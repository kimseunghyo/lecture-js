const searchTxt = document.querySelector(".search-txt");
let marker = null;
let customOverlay = null;

navigator.geolocation.getCurrentPosition(function (position) {
  const { coords } = position;
  const { latitude, longitude } = coords;
});

const container = document.querySelector("#map"),
  mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  }; //지도를 담을 영역의 DOM 레퍼런스

// 지도를 생성합니다
const map = new kakao.maps.Map(container, mapOption);

function loadMap(searchTxt) {
  // 주소-좌표 변환 객체를 생성합니다
  const geocoder = new kakao.maps.services.Geocoder();

  // 주소로 좌표를 검색합니다
  geocoder.addressSearch(`${searchTxt}`, function (result, status) {
    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      const imageSrc = "./images/flags.png"; // 마커이미지의 주소입니다
      const imageSize = new kakao.maps.Size(64, 64); // 마커이미지의 크기입니다
      const imageOption = { offset: new kakao.maps.Point(32, 64) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      const markerPosition = coords; // 마커가 표시될 위치입니다

      if (marker !== null || customOverlay !== null) {
        marker.setMap(null); // 지도에서 제거한다.
        customOverlay.setMap(null);
      }

      // 마커를 생성합니다
      marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage, // 마커이미지 설정
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);

      // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      const content = `<div class="customoverlay">
      <a href="" target="_blank">
      <span class="title">${result[0].road_address.building_name}</span>
      </a></div>`;

      // 커스텀 오버레이가 표시될 위치입니다
      const position = coords;

      // 커스텀 오버레이를 생성합니다
      customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: position,
        content: content,
        yAnchor: 1,
      });
      map.setCenter(coords);
    }
  });
}

searchTxt.addEventListener("keyup", function (e) {
  const txt = searchTxt.value;

  if (e.keyCode === 13) {
    loadMap(txt);
  }
});

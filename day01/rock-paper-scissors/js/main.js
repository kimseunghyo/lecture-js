const comItems = document.querySelectorAll("#com ul li");
const playerItem = document.querySelectorAll("#player ul li");
let num = 0;

const idx = setInterval(function () {
  comItems[0].style.display = "none";
  comItems[1].style.display = "none";
  comItems[2].style.display = "none";

  num++;
  num %= 3;

  comItems[num].style.display = "block";
}, 100);

playerItem[0].addEventListener("click", function () {
  clearInterval(idx);

  if (num === 0) {
    console.log("비김");
  } else if (num === 1) {
    console.log("짐");
  } else {
    console.log("이김");
  }
});

playerItem[1].addEventListener("click", function () {
  clearInterval(idx);

  if (num === 0) {
    console.log("이김");
  } else if (num === 1) {
    console.log("비김");
  } else {
    console.log("짐");
  }
});

playerItem[2].addEventListener("click", function () {
  clearInterval(idx);

  if (num === 0) {
    console.log("짐");
  } else if (num === 1) {
    console.log("이김");
  } else {
    console.log("비김");
  }
});

const comItems = document.querySelectorAll("#com ul li");
const playerItem = document.querySelectorAll("#player ul li");
const resultList = document.querySelector("#result ul");
const blocking = document.querySelector(".blocking");
const cover = document.querySelector("#cover");
const btnRestart = document.querySelector("#btnRestart");
const msg = document.querySelector(".msg");

let idx = setInterval(random, 20);
let num = 0;
let cnt = 0;
let winCnt = 0;
let drawCnt = 0;
let loseCnt = 0;

function appendItem(classTxt, txt) {
  const li = document.createElement("li");
  li.classList.add(classTxt);
  li.textContent = txt;
  resultList.appendChild(li);
}

function random() {
  for (let i = 0; i < 3; i++) {
    comItems[i].style.display = "none";
  }

  num = parseInt(Math.random() * comItems.length);
  comItems[num].style.display = "block";
}

for (let i = 0; i < playerItem.length; i++) {
  playerItem[i].addEventListener("click", function () {
    blocking.classList.add("on");
    cnt++;
    clearInterval(idx);
    idx = setTimeout(restart, 1000);

    if (i === num) {
      appendItem("draw", "D");
      drawCnt++;
    } else if (
      (i === 0 && num === 2) ||
      (i === 1 && num === 0) ||
      (i === 2 && num === 1)
    ) {
      appendItem("win", "W");
      winCnt++;
    } else {
      appendItem("lose", "L");
      loseCnt++;
    }

    if (cnt >= 3) {
      clearTimeout(idx);
      const msg = cover.querySelector(".msg");

      if (winCnt >= 2 || (drawCnt === 2 && winCnt === 1)) {
        msg.textContent = "YOU WIN!!!";
      } else if (loseCnt >= 2 || (drawCnt === 2 && loseCnt === 1)) {
        msg.textContent = "YOU LOSE!!!";
      } else {
        msg.textContent = "YOU DRAW!!!";
      }
      cover.classList.add("on");
    }
  });
}

btnRestart.addEventListener("click", function () {
  cover.classList.remove("on");
  cnt = 0;
  winCnt = 0;
  drawCnt = 0;
  loseCnt = 0;
  resultList.innerHTML = "";
  restart();
});

function restart() {
  blocking.classList.remove("on");
  idx = setInterval(random, 20);
}

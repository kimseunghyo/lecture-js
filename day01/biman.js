const inputheight = document.querySelector(".height");
const inputweight = document.querySelector(".weight");
const btn = document.querySelector(".btn");
const result = document.querySelector(".result");

btn.addEventListener("click", function () {
  const height = parseFloat(inputheight.value);
  const weight = parseInt(inputweight.value);

  const centiHeight = height / 100;
  let biman = weight / Math.pow(centiHeight, 2);

  //biman = Math.round(biman * 10) / 10;

  if (biman <= 18.5) {
    result.textContent = "저체중";
  } else if (biman > 22.9) {
    result.textContent = "비만";
  } else {
    result.textContent = "정상";
  }
});

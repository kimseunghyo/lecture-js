// const candidate = Array(45)
//   .fill(0)
//   .map((item, idx) => idx + 1);
const candidate = Array(45)
  .fill(0)
  .map(function (item, idx) {
    return idx + 1;
  });

const colors = ["yellow", "blue", "red", "gray", "green"];
const paper = document.querySelector(".paper");

function MakeLotto(num) {
  paper.innerHTML = "";
  for (let i = 0; i < num; i++) {
    const lotto = _.shuffle(candidate).filter(function (item, idx) {
      if (idx < 6) {
        return item;
      }
    });
    const myLotto = _.sortBy(lotto);
    const html = myLotto.reduce(function (acc, item, idx) {
      const selectColor = Math.ceil(item / 10) - 1;

      if (idx < myLotto.length - 1) {
        console.log(colors[selectColor]);
        return (acc += `<li class="${colors[selectColor]}">${item}</li>`);
      } else {
        return (acc += `<li class="${colors[selectColor]}">${item}</li></ul>`);
      }
    }, "<ul>");

    paper.innerHTML += html;
  }
}

const radios = document.querySelectorAll(".btns input");
radios.forEach(function (item, idx) {
  item.addEventListener("change", function () {
    MakeLotto(idx + 1);
  });
});

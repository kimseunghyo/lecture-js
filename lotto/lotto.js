const candidate = Array(45)
  .fill(0)
  .map(function (item, idx) {
    return idx + 1;
  });

// const candidate = Array(45)
//   .fill(0)
//   .map((item, idx) => idx + 1);

for (let i = 0; i < 46; i++) {
  const first = parseInt(Math.random() * 45); // 0~45
  const second = parseInt(Math.random() * 45);
  const num = candidate[first];
  candidate[first] = candidate[second];
  candidate[second] = num;
}

const myLotto = _.shuffle(candidate).filter(function (item, idx) {
  if (idx < 6) {
    return item;
  }
});

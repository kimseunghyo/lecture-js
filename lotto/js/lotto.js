const candidateNum = [];
const lotto = [];

for (let i = 1; i < 46; i++) {
  candidateNum.push(i);
}

for (let i = 0; i < 6; i++) {
  const selectedNum = candidateNum.splice(
    parseInt(Math.random() * candidateNum.length),
    1
  );

  lotto.push(selectedNum[0]);
}

lotto.sort(function (a, b) {
  return a - b;
  /*
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
  */
});

console.log(lotto);

//Math.random() * 45; // 0+1 < Math.random() * 45+1 < 45+1
// Math.floor(Math.random() * 45);
// Math.ceil(Math.random() * 45);
// Math.ceil(Math.round() * 45);

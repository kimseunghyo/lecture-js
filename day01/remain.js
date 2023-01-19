const money = 136780;
let remain = money;

const m50000 = parseInt(remain / 50000);
remain %= 50000;

const m10000 = parseInt(remain / 10000);
remain %= 10000;

const m5000 = parseInt(remain / 5000);
remain %= 5000;

const m1000 = parseInt(remain / 1000);
remain %= 1000;

const m500 = parseInt(remain / 500);
remain %= 500;

const m100 = parseInt(remain / 100);
remain %= 100;

const m50 = parseInt(remain / 50);
remain %= 50;

const m10 = parseInt(remain / 10);

console.log(
  `5만원: ${m50000}장 1만원: ${m10000}장 5천원: ${m5000}장 1천원: ${m1000}장 5백원: ${m500}개 1백원: ${m100}개 5십원: ${m50}개 1십원: ${m10}개`
);

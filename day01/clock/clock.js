const time = document.querySelector(".time");

function hello(name, callback) {
  console.log("name===", name);
  callback();
}

const myCallBack = function () {
  console.log("나는 callback 함수입니다.");
};

hello("김승효", function () {
  console.log("나는 callback 함수입니다.");
});

hello("남진", myCallBack);

function addZero(num) {
  if (num < 10) {
    return "0" + num;
  }

  return num;
}

function makeTime() {
  const now = new Date();
  let hour = addZero(now.getHours());
  let min = addZero(now.getMinutes());
  let sec = addZero(now.getSeconds());

  time.textContent = `${hour} : ${min} : ${sec}`;
}

setInterval(makeTime, 1000);

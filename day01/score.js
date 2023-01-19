const inputKor = document.querySelector(".kor");
const inputEng = document.querySelector(".eng");
const inputMath = document.querySelector(".math");
const result = document.querySelector(".result");
const btn = document.querySelector(".btn");

btn.addEventListener("click", function () {
  const kor = parseInt(inputKor.value);
  const eng = parseInt(inputEng.value);
  const math = parseInt(inputMath.value);

  if (isNaN(kor)) {
    alert("국어 점수를 입력해 주세요.");
    return;
  }
  if (isNaN(eng)) {
    alert("영어 점수를 입력해 주세요.");
    return;
  }
  if (isNaN(math)) {
    alert("수학 점수를 입력해 주세요.");
    return;
  }

  let sum = kor + eng + math;
  let avg = sum / 3;

  if (avg >= 90) {
    score = "A";
  } else if (avg >= 80) {
    score = "B";
  } else if (avg >= 70) {
    score = "C";
  } else if (avg >= 60) {
    score = "D";
  } else {
    score = "F";
  }
  result.textContent = `총점: ${sum} 평균: ${avg} 학점: ${score}`;
});

console.log("hello js");

let name = "김승효"; // 할당 Assignment
let age = 23;

const pi = 3.14;

let address; // 변수 선언시 값을 할당하지 않으면 자동으로 undefined
console.log(address);

let weight = null;
console.log(weight);

let isOld = true; // boolean

// 자바스크립트의 기본 타입 String, Number, boolean, undefined, null
console.log(typeof pi);
console.log(typeof weight);
console.log(typeof address);
console.group(typeof isOld);

name = 90; // typescript

let nan = 10 * "김승효";
console.log(isNaN(nan));
console.log(10 == "10");
console.log(10 === "10");

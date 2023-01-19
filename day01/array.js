// 배열
const animals = ["lion", "tiger", "rabbit"];
const myAnimals = animals;

animals.push("dog");
//animals.unshift("cat");
console.log(animals);

const total = animals.length;
for (let i = 0; i < total; i++) {
  console.log(animals[i]);
}

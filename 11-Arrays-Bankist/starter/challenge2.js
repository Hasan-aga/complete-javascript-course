"use strict";

// function calculateAverageHumanAge(dogAges) {
//   const humanAges = dogAges
//     .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 4 * dogAge + 16))
//     .filter(humanAge => humanAge >= 18);

//   const average =
//     humanAges.reduce(function (acc, age) {
//       return acc + age;
//     }, 0) / humanAges.length;

//   return { humanAges, average };
// }

// console.log(calculateAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

// const dogAges = [5, 2, 4, 1, 15, 8, 3];

// const calculateAverageHumanAge = (dogAges) =>
//   dogAges
//     .map((dogAge) => (dogAge <= 2 ? 2 * dogAge : 4 * dogAge + 16))
//     .filter((humanAge) => humanAge >= 18)
//     .reduce(function (acc, age, i, arr) {
//       return acc + age / arr.length;
//     }, 0);

// console.log(calculateAverageHumanAge(dogAges));

// challenge 4
const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

function recommendPortion(dogWeight) {
  return Math.trunc(dogWeight ** 0.75 * 28);
}

dogs.forEach(function (dog) {
  dog.recommendPortion = recommendPortion(dog.weight);
});

console.log(dogs[1]);

const ownerName = "Michael";
const ownersDog = dogs.find((dog) =>
  dog.owners.find((owner) => owner === `${ownerName}`)
);

console.log(
  `${ownerName}'s dog is eating ${
    ownersDog.curFood > ownersDog.recommendPortion ? "more than" : "less than"
  } recommended portion`
);

const ownersEatTooMuch = dogs
  .filter((dog) => dog.curFood > dog.recommendPortion)
  .map((dog) => dog.owners)
  .flat();
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter((dog) => dog.curFood < dog.recommendPortion)
  .map((dog) => dog.owners)
  .flat();
console.log(ownersEatTooLittle);

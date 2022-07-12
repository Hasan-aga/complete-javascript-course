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

const dogAges = [5, 2, 4, 1, 15, 8, 3];

const calculateAverageHumanAge = (dogAges) =>
  dogAges
    .map((dogAge) => (dogAge <= 2 ? 2 * dogAge : 4 * dogAge + 16))
    .filter((humanAge) => humanAge >= 18)
    .reduce(function (acc, age, i, arr) {
      return acc + age / arr.length;
    }, 0);

console.log(calculateAverageHumanAge(dogAges));

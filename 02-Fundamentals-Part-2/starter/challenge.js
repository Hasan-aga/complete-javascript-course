"stric mode";

const clacAvg = (firstScore, secondScore, thirdScore) =>
  (firstScore + secondScore + thirdScore) / 3;

const checkWinner = function (avgDolphins, avgCoalas) {
  if (avgDolphins >= 2 * avgCoalas) {
    return `Dolphins win (${avgDolphins} vs ${avgCoalas})`;
  } else if (avgCoalas >= 2 * avgDolphins) {
    return `Coalas win (${avgCoalas} vs ${avgDolphins})`;
  }
  return `no winner`;
};

let avgDolphins = clacAvg(44, 23, 71);
let avgCoalas = clacAvg(65, 54, 49);

console.log(avgDolphins, avgCoalas);

console.log(checkWinner(avgDolphins, avgCoalas));

avgDolphins = clacAvg(85, 54, 41);
avgCoalas = clacAvg(23, 34, 27);

console.log(avgDolphins, avgCoalas);

console.log(checkWinner(avgDolphins, avgCoalas));

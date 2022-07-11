'use strict';

const juliaData = [3, 5, 2, 12, 7];
const kateData = [4, 1, 15, 8, 3];

function checkDogs(juliaData, kateData) {
  const correctJuliaData = [...juliaData].slice(1, -2);
  const totalData = [...correctJuliaData, ...kateData];
  totalData.forEach((age, index) =>
    console.log(
      `Dog number ${index + 1} is a${age >= 3 ? 'n' : ''} ${
        age >= 3 ? 'adult' : 'puppy'
      } and is ${age} year${age > 1 ? 's' : ''} old`
    )
  );

  console.log(totalData);
}

checkDogs(juliaData, kateData);

'use strict';
// console.log(this);

// const username = 'hasan';

// function greetUser() {
//   const username = 'ali';
//   const arr = () => {};

//   arr();
// }

// greetUser();

function add(first, second, third) {
  let sum = 0;
  for (let index = 0; index < arguments.length; index++) {
    sum += arguments[index];
  }

  return sum;
}

console.log(add(1, 2, 3));

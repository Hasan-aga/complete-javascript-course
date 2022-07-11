'use strict';

// let bookings = [];
// function createBooking(
//   flightNum,
//   passengerNum = 1,
//   price = 100 * passengerNum
// ) {
//   //  old way
//   //   passengerNum ||= 1;
//   //   price ||= 100;

//   const booking = {
//     flightNum,
//     passengerNum,
//     price,
//   };

//   bookings.push(booking);
// }

// createBooking('LH3');
// createBooking('LH3', 2);
// createBooking('LH3', undefined, 2500);

// console.log(bookings);

// const flight = 'LH31';
// const passenger = {
//   fullName: 'Hasan Ali',
//   Age: '30',
// };

// function checkIn(flight, { ...passenger }) {
//   flight = '0000';
//   passenger.fullName = 'Mr.' + passenger.fullName;

//   if (passenger.Age > 17) {
//     console.log('Welcome aboard ' + passenger.fullName);
//   } else {
//     console.log('Go home');
//   }
// }

// checkIn(flight, passenger);
// console.log(flight);
// console.log({ ...passenger });

// function oneWord(str) {
//   return str.toLowerCase().replaceAll(' ', '');
// }

// const capitalizeFirstWord = function (str) {
//   const [first, ...rest] = str.split(' ');
//   return [first.toUpperCase(), ...rest].join(' ');
// };

// function transform(str, func) {
//   console.log(`Original: ${str}`);
//   console.log(`New: ${func(str)}`);
//   console.log(`Transformed by: ${func.name}`);
// }

// transform('js is good!', capitalizeFirstWord);
// transform('js is good!', oneWord);

// function greet(greeting) {
//   return function (fullname) {
//     console.log(`${greeting} ${fullname}`);
//   };
// }

// // same above function using arrow
// const greetArrow = greeting => fullname =>
//   console.log(`${greeting} ${fullname}`);

// const greeterHello = greet('hello');
// greeterHello('Hasan');
// greet('selam')('Hasan');
// greetArrow('selam')('Hasan Ali');

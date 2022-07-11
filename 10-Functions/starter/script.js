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

//the call and apply methods
// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   book(passengerName, flightNum) {
//     console.log(
//       `${passengerName} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({
//       flight: `${this.airline}${this.iataCode}${flightNum}`,
//       passengerName,
//     });
//   },
// };
// lufthansa.book('Hasan Ali', 123);
// lufthansa.book('John Ali', 103);
// console.log(lufthansa);

// const eurowings = {
//   airline: 'eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const book = lufthansa.book;

// // book('hawawa', 20);
// book.call(eurowings, 'hawawa', '20');
// book.apply(eurowings, ['kawasaki', 110]);

// // bind method
// const bookEW = book.bind(eurowings);
// bookEW('jack sparrow', 19);

// // with event listner
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   this.planes++;
//   console.log(`${this.airline} has ${this.planes} plane`);
// };

// will not work since 'this' points to DOM element
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// //   partial application of bind
// function greet(greeting, fullname) {
//   console.log(`${greeting} ${fullname}`);
// }

// const greetHello = greet.bind(null, 'hello');

// greetHello('hasan');

// // imediately invoked function expression

// (function () {
//   console.log('this only runs once');
// })();

// // closure
// const secureBooking = function () {
//   let passengerCount = 0;
//   return function () {
//     passengerCount++;
//     console.log(`${passengerCount} passengers exist.`);
//   };
// };

// const booker = secureBooking();

// let passengerCount = 100;
// booker();
// booker();

// console.dir(booker);

'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// let [a, b, c] = [1, 2, 3];

// [a, b] = [b, a];

// console.log(a, b, c);

// let { name: restaurantName } = restaurant;

// // let openingHours;
// // ({ openingHours } = restaurant);

// let {
//   openingHours: {
//     fri: { open: fridayOpeningHour },
//   },
// } = restaurant;
// console.log(fridayOpeningHour);

// function passArgumentsUsingSpreadOperator(first, second, third) {
//   console.log(`hello ${first}, hi ${second}, hi ${third}`);
// }

// let names = ['hasan', 'john', 'ali'];
// passArgumentsUsingSpreadOperator(...names);

// let firstArray = [1, 2];
// let secondArray = [...firstArray, 3, 4];

// let firstArrayCopy = [...firstArray];
// let mergeFirstAndScondArrays = [...firstArray, ...secondArray];
// console.log(secondArray);

// let restaurantCopy = { ...restaurant };

// const numbers = [1, 2, 3, 4, 5, 6];
// const [first, second, ...otherNumbers] = numbers;

// function add(...params) {
//   let sum = 0;
//   for (let index = 0; index < params.length; index++) {
//     sum += params[index];
//   }
//   return sum;
// }

// console.log(add(1, 2));
// console.log(add(1, 2, 3, 4, 5, 6));

// default values
// restaurant.numGuests = 0;
// const guests = restaurant.numGuests || 10;
// const guests2 = restaurant.numGuests ? restaurant.numGuests : 10;
// const correctGuests = restaurant.numGuests ?? 10;

// // optional chainging
// restaurant.openingHours.mon.open; // error since mon is underfined and undefined.open throws error
// restaurant.openingHours.mon?.open; // not error, it throws undefined when mon is read

// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// for (const day of days) {
//   const open = restaurant.openingHours[day]?.open ?? 'never';
//   console.log(`on ${day} we are open at ${open}`);
// }

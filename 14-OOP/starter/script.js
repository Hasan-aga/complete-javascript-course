'use strict';

// const Person = function (firstName, age) {
//   (this.firstName = firstName), (this.age = age);
// };

// Person.prototype = {
//   calcBirthYear: function () {
//     return new Date().getFullYear() - this.age;
//   },
// };

// Person.prototype.job = 'programmer';

// const hasan = new Person('Hasan', 30);

// const matilda = new Person('Matilda', 19);

// // prototypes

// console.dir(Person.prototype.constructor);

// // prototypal inheritance

// const arr = [1, 2, 3, 1, 2, 3];
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(arr.unique());

// classes

// class Person {
//   constructor(fullname, age) {
//     (this.fullname = fullname), (this.age = age);
//   }

//   static hi() {
//     console.log('hello world');
//   }
// }

// Person.hi();

// const hasan = new Person('hasan ali', 30);
// console.log(hasan.birthYear);

// const Personas = function (name) {
//   this.name = name;
// };

// Personas.hi = function () {
//   console.log('hello world');
// };

// Personas.hi();
// console.log(Personas);

//iherit between classes
// const Person = function (firstName, age) {
//   (this.firstName = firstName), (this.age = age);
// };

// Person.prototype.calcBirthYear = function () {
//   return new Date().getFullYear() - this.age;
// };

// const Student = function (firstName, age, course) {
//   Person.call(this, firstName, age); //Step 1: person's `this` will be Student object
//   this.course = course;
// };

// Student.prototype = Object.create(Person.prototype); //step 2
// Student.prototype.introduceSelf = function () {
//   console.log(
//     `I am ${
//       this.firstName
//     } I was born in ${this.calcBirthYear()} and I am studying ${this.course}`
//   );
// };

// const hasan = new Student('hasan', 30, 'programming');
// hasan.introduceSelf();
// hasan.calcBirthYear();

const Person = function (firstName, age) {
  (this.firstName = firstName), (this.age = age);
};

Person.prototype.calcBirthYear = function () {
  return new Date().getFullYear() - this.age;
};

const Student = Object.create(Person);

const hasan = Object.create(Student);

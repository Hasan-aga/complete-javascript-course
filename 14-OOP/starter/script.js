'use strict';

const Person = function (firstName, age) {
  (this.firstName = firstName), (this.age = age);
  this.calcBirthYear = () => new Date().getFullYear() - this.age;
};

const hasan = new Person('Hasan', 30);

const matilda = new Person('Matilda', 19);

console.log(hasan.calcBirthYear());

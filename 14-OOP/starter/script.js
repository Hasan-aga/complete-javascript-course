'use strict';

const Person = function (firstName, age) {
  (this.firstName = firstName), (this.age = age);
};

Person.prototype = {
  calcBirthYear: function () {
    return new Date().getFullYear() - this.age;
  },
};

Person.prototype.job = 'programmer';

const hasan = new Person('Hasan', 30);

const matilda = new Person('Matilda', 19);

// prototypes

console.dir(Person.prototype.constructor);

// prototypal inheritance

const arr = [1, 2, 3, 1, 2, 3];
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

'use strict';

const Car = function (make, speed) {
  this.make = make.toUpperCase();
  this.speed = speed;
};

Car.prototype.accelarate = function () {
  this.speed += 10;
};

Car.prototype.brake = function () {
  this.speed -= 5;
};

const bmw = new Car('bmw', 120);
const mercedes = new Car('mercedes', 95);
console.log(bmw);
bmw.accelarate();
console.log(bmw);
bmw.brake();
console.log(bmw);

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
// console.log(bmw);
// bmw.accelarate();
// console.log(bmw);
// bmw.brake();
// console.log(bmw);

// ch 2

const ev = Object.create(Car);

ev.charge = 23;
ev.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
ev.accelarate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} is going at ${this.speed} with ${this.charge}% charged battery`
  );
};

ev.make = 'tesla';
ev.speed = 120;
ev.chargeBattery(90);
ev.accelarate();
ev.accelarate();
ev.accelarate();
ev.accelarate();
ev.accelarate();

'use strict';

class Car {
  constructor(make, speed) {
    this.make = make.toUpperCase();
    this.speed = speed;
  }

  accelarate() {
    this.speed += 10;
  }

  brake() {
    this.speed -= 5;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const bmw = new Car('bmw', 120);
const mercedes = new Car('mercedes', 95);
console.log(bmw);
bmw.accelarate();
console.log(bmw);
bmw.brake();
console.log(bmw);

console.log(bmw.speedUS);
bmw.speedUS = 60;
console.log(bmw.speedUS);

// ch 3
class EV extends Car {
  constructor(make, speed, charge) {
    super(make, speed);
    this.charge = charge;
  }
}

const tesla = new EV('tesla', 120, 90);
console.log(tesla);

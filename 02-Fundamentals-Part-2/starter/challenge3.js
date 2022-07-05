let mark = {
  firstname: "Mark",
  lastname: "Miller",
  weight: 78,
  height: 1.69,
  clacBMI: function () {
    this.bmi = this.weight / this.height ** 2;
    return this.bmi;
  },
};

let john = {
  firstname: "John",
  lastname: "Smith",
  weight: 92,
  height: 1.95,
  clacBMI: function () {
    this.bmi = this.weight / this.height ** 2;
    return this.bmi;
  },
};

mark.clacBMI();
john.clacBMI();

winner = mark.bmi > john.bmi ? mark : john;
loser = mark.bmi < john.bmi ? mark : john;

console.log(
  `${winner.firstname}'s BMI (${winner.bmi}) is higher than ${loser.firstname}'s (${loser.bmi})`
);

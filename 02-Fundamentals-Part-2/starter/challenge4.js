let bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
let tips = [];
let totals = [];

function calcTip(bill) {
  return bill >= 50 && bill <= 300 ? 0.15 * bill : 0.2 * bill;
}

for (let index = 0; index < bills.length; index++) {
  const bill = bills[index];
  const tip = calcTip(bill);
  const total = tip + bill;
  tips.push(tip);
  totals.push(total);
}

const calcAvg = function (arr) {
  let sum = 0;
  for (let index = 0; index < arr.length; index++) {
    sum += arr[index];
  }
  return sum / arr.length;
};

console.log(calcAvg([1, 2, 3]));

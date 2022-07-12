"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

function displayMovements(movements) {
  // reset content before writing our own
  containerMovements.innerHTML = "";

  // for each movement create html elements to display movement data
  movements.forEach(function (movement, index) {
    const type = movement > 0 ? "deposit" : "withdrawal";

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${index} ${type}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${movement}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

displayMovements(account1.movements);

function calculateDisplayBalance(movements) {
  const balance = movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);

  labelBalance.textContent = `${balance}€`;
}

calculateDisplayBalance(account1.movements);

function calculateDisplaySummary(movements) {
  const totalIncome = movements
    .filter((movement) => movement > 0)
    .reduce((acc, movement) => acc + movement);

  const totalOutcome = Math.abs(
    movements
      .filter((movement) => movement < 0)
      .reduce((acc, movement) => acc + movement)
  );

  const totalInterest = movements
    .filter((movement) => movement > 0)
    .map((number) => number * 0.012)
    .filter((interest) => interest >= 1)
    .reduce((acc, movement) => acc + movement);

  labelSumIn.textContent = `${totalIncome}€`;
  labelSumOut.textContent = `${totalOutcome}€`;
  labelSumInterest.textContent = `${totalInterest}€`;
}

calculateDisplaySummary(account1.movements);
function computeUsername(fullname) {
  return fullname
    .split(" ")
    .map((oneName) => oneName[0].toLowerCase())
    .join("");
}

function computeUsernamesOfAccounts(accounts) {
  accounts.forEach(function (account) {
    account.username = computeUsername(account.owner);
  });
}
computeUsernamesOfAccounts(accounts);

// ////////////////////////////////
// event handlers
// ///////////////////////////////

let currentAcount;
btnLogin.addEventListener("click", function (event) {
  // prevent form from submitting
  event.preventDefault();
  // find current user from login username
  currentAcount = accounts.find(
    (acc) => acc?.username === inputLoginUsername.value
  );
  // match input pin
  if (Number(inputLoginPin.value) === currentAcount.pin) {
    console.log("login");
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// // getting the last element
// const arr = [1, 2, 3, 4, 5];
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));

// movements.forEach((movement, index) => {
//   if (movement > 0) {
//     console.log(`${index}: you deposited ${movement}`);
//   } else {
//     console.log(`${index}: you withdrew ${movement}`);
//   }
// });

// // forEach with maps and sets
// const uniqueSymbols = new Set();

// currencies.forEach((fullname, symbol) => {
//   console.log(`${symbol} is short for ${fullname}`);
//   uniqueSymbols.add(symbol);
// });

// console.log(uniqueSymbols);

////map
// const usdTryRate = 17.38;

// const movementsTry = movements.map(movement => movement * usdTryRate);

// console.log(movements);
// console.log(movementsTry);

// const movementDescriptions = movements.map(function (movement, index) {
//   if (movement > 0) {
//     return `movement ${index}: you deposited ${Math.abs(movement)}`;
//   } else {
//     return `movement ${index}: you withdrew ${Math.abs(movement)}`;
//   }
// });

// console.log(movementDescriptions);

// // filter
// const deposits = movements.filter(movement => movement > 0);
// console.log(deposits);

// reduce
// const balance = movements.reduce(function (acc, mov) {
//   return acc + mov;
// }, 0);
// console.log(balance);

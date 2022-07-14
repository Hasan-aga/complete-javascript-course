'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

function displayMovements(movements, sort = false) {
  //sort
  const moves = sort ? [...movements].sort((a, b) => a - b) : [...movements];
  // reset content before writing our own
  containerMovements.innerHTML = '';

  // for each movement create html elements to display movement data
  moves.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${index} ${type}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${movement.toFixed(2)}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function calculateDisplayBalance(currentAcount) {
  const movements = currentAcount.movements;
  const balance = movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);

  labelBalance.textContent = `${balance.toFixed(2)}€`;
  currentAcount.balance = balance;
}

function calculateDisplaySummary(currentAcount) {
  const movements = currentAcount.movements;
  const totalIncome = movements
    .filter(movement => movement > 0)
    .reduce((acc, movement) => acc + movement);

  const totalOutcome = Math.abs(
    movements
      .filter(movement => movement < 0)
      .reduce((acc, movement) => acc + movement)
  );

  const totalInterest = movements
    .filter(movement => movement > 0)
    .map(number => number * (currentAcount.interestRate / 100))
    .filter(interest => interest >= 1)
    .reduce((acc, movement) => acc + movement);

  labelSumIn.textContent = `${totalIncome.toFixed(2)}€`;
  labelSumOut.textContent = `${totalOutcome.toFixed(2)}€`;
  labelSumInterest.textContent = `${totalInterest.toFixed(2)}€`;
}

function computeUsername(fullname) {
  return fullname
    .split(' ')
    .map(oneName => oneName[0].toLowerCase())
    .join('');
}

function computeUsernamesOfAccounts(accounts) {
  accounts.forEach(function (account) {
    account.username = computeUsername(account.owner);
  });
}
computeUsernamesOfAccounts(accounts);

function updateUi(currentAcount) {
  // calculate and display balance
  calculateDisplayBalance(currentAcount);

  // calculate and display summary
  calculateDisplaySummary(currentAcount);

  // display movements
  displayMovements(currentAcount.movements);
}

// ////////////////////////////////
// event handlers
// ///////////////////////////////

let currentAcount;
btnLogin.addEventListener('click', function (event) {
  // prevent form from submitting
  event.preventDefault();
  // find current user from login username
  currentAcount = accounts.find(
    acc => acc?.username === inputLoginUsername.value
  );
  // match input pin
  if (Number(inputLoginPin.value) === currentAcount?.pin) {
    // clear login fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';

    // display ui and welcome
    containerApp.style.opacity = '100';
    labelWelcome.textContent = `Welcome back ${currentAcount.owner}`; // calculate and display balance

    // calculate and display data
    updateUi(currentAcount);

    // start/restart logout timer
  }
});

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const destinationAccount = accounts.find(
    account => account.username === inputTransferTo.value.toLowerCase().trim()
  );

  // clean input fields
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  if (
    amount > 0 &&
    amount <= currentAcount.balance &&
    destinationAccount &&
    destinationAccount?.username !== currentAcount.username
  ) {
    currentAcount.movements.push(-amount);
    destinationAccount?.movements.push(amount);
    displayMovements(currentAcount.movements);
    calculateDisplayBalance(currentAcount);
    calculateDisplaySummary(currentAcount);
  }
});

btnLoan.addEventListener('click', function (event) {
  event.preventDefault();

  const loan = Math.floor(inputLoanAmount.value);
  const validLoan = currentAcount.movements.some(move => move >= 0.1 * loan);
  if (validLoan) {
    currentAcount.movements.push(loan);
    updateUi(currentAcount);
  }
});

btnClose.addEventListener('click', event => {
  event.preventDefault();

  if (
    inputCloseUsername.value === currentAcount.username &&
    Number(inputClosePin.value) === currentAcount.pin
  ) {
    const indexOfCurrentAccount = accounts.findIndex(
      account => account.username === currentAcount.username
    );
    // delete user account from data
    const removed = accounts.splice(indexOfCurrentAccount, 1);

    // hide ui
    containerApp.style.opacity = '0';
  }
});
let sortMoves = false;
btnSort.addEventListener('click', function () {
  sortMoves = !sortMoves;
  console.log(sortMoves);
  displayMovements(currentAcount.movements, sortMoves);
  btnSort.textContent = `${sortMoves ? '⨯' : '↓'} sort`;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// console.log(Number.parseFloat('2.5rem', 10));
// console.log(Number.parseInt('2px', 10));

// // check for number
// console.log(Number.isFinite(20));
// console.log(Number.isFinite('20'));
// console.log(Number.isFinite('hh'));

// // random
// const randomBetween = (max, min) =>
//   Math.trunc(Math.random() * (max - min) + 1) + min;

// console.log(randomBetween(0, 13));

// // bigint

// console.log(2837683475638465832467583765);
// console.log(BigInt(2837683475638465832467583765));
// console.log(2837683475638465832467583765n);

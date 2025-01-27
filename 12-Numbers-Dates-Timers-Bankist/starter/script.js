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
    '2019-12-23T07:42:02.383Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-07-11T10:51:36.790Z',
    '2022-07-13T10:51:36.790Z',
    '2022-07-14T10:51:36.790Z',
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

function displayMovements(currentAcount, sort = false) {
  const movements = currentAcount.movements;
  //sort
  const moves = sort ? [...movements].sort((a, b) => a - b) : [...movements];
  // reset content before writing our own
  containerMovements.innerHTML = '';

  // for each movement create html elements to display movement data
  moves.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const money = formatMoney({ movement, currency: 'eur' });
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${index} ${type}</div>
      <div class="movements__date">${formatDate(
        new Date(currentAcount.movementsDates[index])
      )}</div>
      <div class="movements__value">${money}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function formatMoney({
  movement,
  local = 'de-DE',
  currency = 'usd',
  fixed = 2,
}) {
  const options = {
    style: 'currency',
    currency: `${currency}`,
  };
  const money = Intl.NumberFormat(local, options).format(
    Math.abs(movement.toFixed(fixed))
  );
  return money;
}

function calculateDisplayBalance(currentAcount) {
  const movements = currentAcount.movements;
  const balance = movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);

  labelBalance.textContent = `${formatMoney({
    movement: balance,
    currency: 'eur',
  })}`;
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

  labelSumIn.textContent = `${formatMoney({
    movement: totalIncome,
    currency: 'eur',
  })}`;
  labelSumOut.textContent = `${formatMoney({
    movement: totalOutcome,
    currency: 'eur',
  })}`;
  labelSumInterest.textContent = `${formatMoney({
    movement: totalInterest,
    currency: 'eur',
  })}`;
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
  calculateDisplayBalance(currentAcount);

  calculateDisplaySummary(currentAcount);

  displayMovements(currentAcount);

  displayDate(formatDate());
}

function displayDate(formattedDate) {
  labelDate.textContent = formattedDate;
}

function formatDate(date = new Date()) {
  const timeSpanInDays = calcTimeSpanInDays(date, new Date());
  const locale = navigator.language;
  const options = {
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  const todayFormatted = Intl.DateTimeFormat(locale, options).format(date);
  const todayFormattedParts = Intl.DateTimeFormat(
    locale,
    options
  ).formatToParts(date);
  const time12h = todayFormattedParts
    .slice(todayFormattedParts.findIndex(obj => obj.type === 'hour')) //find the object where the hour notation starts
    .map(hour => hour.value)
    .join('');
  if (timeSpanInDays >= 4 || timeSpanInDays === 0) {
    return todayFormatted;
  } else if (timeSpanInDays <= 1) return `today at ${time12h}`;
  else if (timeSpanInDays > 1 && timeSpanInDays < 2)
    return `yesterday at ${time12h}`;
  else return `${Math.round(timeSpanInDays)} days ago.`;
}

function calcTimeSpanInDays(date1, date2) {
  return Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);
}

// ////////////////////////////////
// event handlers
// ///////////////////////////////

let currentAcount;

// fake always logged in (for testing)
currentAcount = account1;
updateUi(currentAcount);
containerApp.style.opacity = '100';

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
    labelWelcome.textContent = `Welcome back ${currentAcount.owner}`;

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
    currentAcount.movementsDates.push(new Date());
    destinationAccount?.movements.push(amount);
    destinationAccount?.movementsDates.push(new Date());
    updateUi(currentAcount);
  }
});

btnLoan.addEventListener('click', function (event) {
  event.preventDefault();

  const loan = Math.floor(inputLoanAmount.value);
  const validLoan = currentAcount.movements.some(move => move >= 0.1 * loan);
  if (validLoan) {
    currentAcount.movements.push(loan);
    currentAcount.movementsDates.push(new Date());
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
  displayMovements(currentAcount, sortMoves);
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

// // dates
// const future = new Date(2030, 0, 1);
// console.log(future);
// console.log(future.getFullYear());

// internationalization

// const now = new Date();
// const options = {
//   hour12: true,
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'long',
//   year: 'numeric',
// };
// const formatted = Intl.DateTimeFormat('en-GB', options).format(now);
// console.log(formatted);

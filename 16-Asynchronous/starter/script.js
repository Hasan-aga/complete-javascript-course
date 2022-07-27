'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// const country = 'iraq';

// function addCountry(country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener('load', function (e) {
//     const [country] = JSON.parse(this.responseText);
//     const countryHtmlCode = `<article class="country">
//         <img class="country__img" src="${country.flags.svg}" />
//         <div class="country__data">
//           <h3 class="country__name">${country.name.common}</h3>
//           <h4 class="country__region">${country.region}</h4>
//           <p class="country__row"><span>👫</span>${(
//             country.population / 1000_000
//           ).toFixed(0)} million people</p>
//           <p class="country__row"><span>🗣️</span>${
//             Object.values(country.languages)[0]
//           }</p>
//           <p class="country__row"><span>💰</span>${Object.keys(
//             country.currencies
//           )}</p>
//         </div>
//       </article>
//       `;

//     countriesContainer.insertAdjacentHTML('afterbegin', countryHtmlCode);
//     countriesContainer.style.opacity = 1;
//   });
// }

// addCountry('france');

function createCountryElement(country, className = '') {
  const countryHtmlCode = `<article class="country ${className}">
            <img class="country__img" src="${country.flags.svg}" />
            <div class="country__data">
          <h3 class="country__name">${country.name.common}</h3>
          <h4 class="country__region">${country.region}</h4>
          <p class="country__row"><span>👫</span>${(
            country.population / 1000_000
          ).toFixed(0)} million people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(country.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${Object.keys(
            country.currencies
          )}</p>
        </div>
      </article>
      `;

  countriesContainer.style.opacity = 1;
  countriesContainer.insertAdjacentHTML('afterbegin', countryHtmlCode);
  return country?.borders;
}

// function getCountryData(response, className = '') {
//   if (!response.ok)
//     throw new Error(`no country was found! status: ${response.status}`);

//   return response.json().then(data => createCountryElement(data[0], className));
// }

// function getCountryData(country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => getCountryData(response))
//     .then(borders =>
//       fetch(`https://restcountries.com/v3.1/alpha/${borders[0]}`)
//     )
//     .then(response => getCountryData(response))
//     .catch(error => console.log('FAILED!', error.message));
// }

// btn.addEventListener('click', () => getCountryData('turkey'));

// setTimeout(() => console.log('hello callback queue'), 0);
// Promise.resolve('Hello microtask queue').then(res => console.log(res));

// // building a promise
// const lotteryPromise = new Promise(function (resolve, reject) {
//   if (Math.random() >= 0.5) resolve('you won');
//   else reject('you lost');
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // promisify setTimeout

// function wait(seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// }

// wait(2)
//   .then(() => {
//     console.log(`waited for 2 seconds`);
//     return wait(1);
//   })
//   .then(() => {
//     console.log(`waited for 1 seconds`);
//     return wait(0.5);
//   });

// promisfying the geolocation api

// async await
const whereAmI = async function (country) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );
    const data = await response.json();
    createCountryElement(data[0]);
  } catch (error) {
    console.error(`FAIL: ${error.message}`);
  }
};

whereAmI('iraqd');
console.log('log');

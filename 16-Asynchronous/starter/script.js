'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const country = 'iraq';

function addCountry(country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function (e) {
    const [country] = JSON.parse(this.responseText);
    const countryHtmlCode = `<article class="country">
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

    countriesContainer.insertAdjacentHTML('afterbegin', countryHtmlCode);
    countriesContainer.style.opacity = 1;
  });
}

addCountry('israel');
addCountry('egypt');

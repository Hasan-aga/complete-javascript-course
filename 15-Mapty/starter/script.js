'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

function renderMap(latitude, longitude) {
  let map = L.map('map').setView([latitude, longitude], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  }).addTo(map);

  map.addMarkerToMap = function (latitude, longitude, popUp = null) {
    const marker = L.marker([latitude, longitude]).addTo(this);
    if (popUp) marker.bindPopup(`${popUp}`).openPopup();
    return map;
  };

  return map;
}

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      const map = renderMap(latitude, longitude);
      map.addMarkerToMap(
        latitude,
        longitude,
        '<b>Hello world!</b><br>I am a popup.'
      );
    },
    function () {
      console.log('Could not get position.');
    }
  );

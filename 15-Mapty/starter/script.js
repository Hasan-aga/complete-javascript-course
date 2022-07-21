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

class User {
  workouts = [];
  latlng;
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.latlng = [this.latitude, this.longitude];
  }
}

function renderMap(latlong) {
  let map = L.map('map').setView(latlong, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  }).addTo(map);

  map.addMarkerToMap = function (latlong, popUp = false) {
    console.log(this);
    const marker = L.marker(latlong).addTo(this);
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
      const latlong = [latitude, longitude];
      const user = new User(latitude, longitude);
      console.log(latitude, longitude, user);
      const map = renderMap(user.latlng);
      map.addMarkerToMap(latlong, '<b>Hello world!</b><br>I am a popup.');
      map.on('click', function (event) {
        map.addMarkerToMap(event.latlng, 'hello');
      });
    },
    function () {
      console.log('Could not get position.');
    }
  );

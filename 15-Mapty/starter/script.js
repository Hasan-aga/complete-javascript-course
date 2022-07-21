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

class Workout {
  timeStamp;
  shortDate;
  options = {
    weekday: 'long',
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  };
  constructor(type, distance, duration, cadence, elevation, latlng) {
    this.type = type;
    this.distance = distance;
    this.duration = duration;
    this.cadence = cadence;
    this.elevation = elevation;
    this.latlng = latlng;
    this.timeStamp = new Date();
    this.shortDate = Intl.DateTimeFormat('en-GB', this.options).format(
      this.timeStamp
    ); // 14 July 2022
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

function displayInputForm() {
  form.classList.remove('hidden');
}

function getWorkoutDetails(latlng, map, user) {
  const type = inputType.value;
  const duration = inputDuration.value;
  const distance = inputDistance.value;
  const cadence = inputCadence.value;
  const elevation = inputElevation.value;
  const workout = new Workout(
    type,
    distance,
    duration,
    cadence,
    elevation,
    latlng
  );
  saveWorkout(user, workout);
  console.log(user.workouts);
  map.addMarkerToMap(workout.latlng, `${workout.type} at ${workout.shortDate}`);
  displayWorkouts(user);
}

function saveWorkout(user, workout) {
  user.workouts.push(workout);
}

function displayWorkouts(user) {
  const workout = user.workouts.at(-1);

  const html = `
        <li class="workout workout--${workout.type}" data-id="${workout.timeStamp}">
        <h2 class="workout__title">${workout.type} on ${workout.shortDate}</h2>
        <div class="workout__details">
          <span class="workout__icon">🏃‍♂️</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.elevation}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
          `;
  containerWorkouts.insertAdjacentHTML('beforeend', html);
}

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      const latlong = [latitude, longitude];
      const user = new User(latitude, longitude);
      const map = renderMap(user.latlng);
      map.addMarkerToMap(user.latlng, '<b>Hello world!</b><br>I am a popup.');
      map.on('click', function (event) {
        displayInputForm();
        const latlng = event.latlng;
        getWorkoutDetails(latlng, map, user);
      });
    },
    function () {
      console.log('Could not get position.');
    }
  );

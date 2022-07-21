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
const statAverageDistance = document.querySelector('.avg__distance');
const statAverageDuration = document.querySelector('.avg__duration');

class User {
  workouts = [];
  latlng;
  stats;
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
    this.distance = Number(distance);
    this.duration = Number(duration);
    this.cadence = Number(cadence);
    this.elevation = Number(elevation);
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
    const marker = L.marker(latlong).addTo(this);
    if (popUp) marker.bindPopup(`${popUp}`).openPopup();
    return map;
  };

  return map;
}

function displayInputForm() {
  form.classList.remove('hidden');
}

function getWorkoutDetails(latlng) {
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
  return workout;
}

function saveWorkout(user, workout) {
  user.workouts.push(workout);
}

function displayWorkoutsAndStats(user) {
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
  form.insertAdjacentHTML('afterend', html);
  calculateStats(user);
  displayStats(user.stats);
}

function calculateStats(user) {
  const totalDistance = user.workouts.reduce(
    (acc, workout) => acc + workout.distance,
    0
  );
  const totalDuration = user.workouts.reduce(
    (acc, workout) => acc + workout.duration,
    0
  );
  const avgDistance = (totalDistance / user.workouts.length).toFixed(1);
  const avgDuration = (totalDuration / user.workouts.length).toFixed(1);
  user.stats = { totalDistance, totalDuration, avgDistance, avgDuration };
}

function displayStats(stats) {
  statAverageDistance.textContent = `Avg Distance: ${stats.avgDistance} Km`;
  statAverageDuration.textContent = `Avg Duration: ${stats.avgDuration} Min`;
}

function centerMapOn(latlng, map) {
  map.setView(latlng, 13);
}

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      const user = new User(latitude, longitude);
      const map = renderMap(user.latlng);
      map.addMarkerToMap(user.latlng, '<b>Hello world!</b><br>I am a popup.');

      map.on('click', function (event) {
        displayInputForm();
        const latlng = Object.values(event.latlng);
        const workout = getWorkoutDetails(latlng);
        saveWorkout(user, workout);
        map.addMarkerToMap(
          workout.latlng,
          `${workout.type} at ${workout.shortDate}`
        );
        displayWorkoutsAndStats(user);
        containerWorkouts.addEventListener('click', function (event) {
          const clicked = event.target.closest('.workout');
          if (!clicked) return;
          const workoutID = clicked.dataset.id;
          const clickedWorkoutPosition = user.workouts.filter(
            workout => workout.timeStamp == workoutID
          )[0].latlng;
          centerMapOn(clickedWorkoutPosition, map);
        });
      });
    },
    function () {
      console.log('Could not get position.');
    }
  );

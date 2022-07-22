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

let currentWorkoutPosition, map;
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

function renderMap(latlng) {
  let map = L.map('map').setView(latlng, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  }).addTo(map);

  map.addPermenantMarker = function (latlng, popUp = false) {
    const marker = L.marker(latlng).addTo(this);
    if (popUp) {
      marker.bindPopup(`${popUp}`).openPopup();
    }
    return map;
  };

  map.addTemporaryMarker = function (latlng) {
    // if map already has marker -> move it to new coordinates
    if (map.temporaryWorkoutMarker) {
      map.temporaryWorkoutMarker.setLatLng(latlng);
      return map;
    }
    map.temporaryWorkoutMarker = L.marker(latlng).addTo(this);
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
  localStorage.setItem(workout.timeStamp, JSON.stringify(workout));
}

function clearLocalStorage() {
  localStorage.clear();
}

clearLocalStorage();

function displayStoredWrokouts() {
  const keys = Object.keys(localStorage);
  for (let key of keys) {
    // console.log(`${key}: ${JSON.parse(localStorage.getItem(key))}`);
    const workout = JSON.parse(localStorage.getItem(key));
    console.log(workout);

    displayWorkout(workout);
  }
}

function displayWorkoutsAndStats(user) {
  const workout = user.workouts.at(-1);

  displayWorkout(workout);
  calculateStats(user);
  displayStats(user.stats);
}

function displayWorkout(workout) {
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

displayStoredWrokouts();

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      const user = new User(latitude, longitude);
      map = renderMap(user.latlng);
      map.addPermenantMarker(user.latlng, '<b>This is you</b>');

      map.on('click', function (event) {
        displayInputForm();
        const latlng = Object.values(event.latlng);
        currentWorkoutPosition = latlng;
        map.addTemporaryMarker(currentWorkoutPosition);
      });

      form.addEventListener('submit', function (event) {
        event.preventDefault();
        const workout = getWorkoutDetails(currentWorkoutPosition);
        saveWorkout(user, workout);
        map.addPermenantMarker(
          workout.latlng,
          `<b>${workout.type}</b> <br> ${workout.shortDate}`
        );
        displayWorkoutsAndStats(user);
      });

      containerWorkouts.addEventListener('click', function (event) {
        const clicked = event.target.closest('.workout');
        if (!clicked) return;
        const workoutID = clicked.dataset.id;
        const clickedWorkoutPosition = user.workouts.find(
          workout => workout.timeStamp == workoutID
        ).latlng;

        console.log(clickedWorkoutPosition);
        centerMapOn(clickedWorkoutPosition, map);
      });
    },
    function () {
      console.log('Could not get position.');
    }
  );

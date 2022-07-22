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

class App {
  map;
  constructor(user) {
    this.user = user;
  }
  renderMap(latlng) {
    this.map = L.map('map').setView(latlng, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    this.map.addPermenantMarker = function (latlng, popUp = false) {
      const marker = L.marker(latlng).addTo(this);
      if (popUp) {
        marker.bindPopup(`${popUp}`).openPopup();
      }
      return this;
    };

    this.map.addTemporaryMarker = function (latlng) {
      // if map already has marker -> move it to new coordinates
      if (this.temporaryWorkoutMarker) {
        this.temporaryWorkoutMarker.setLatLng(latlng);
        return this;
      }
      this.temporaryWorkoutMarker = L.marker(latlng).addTo(this);
      return this;
    };

    return this.map;
  }

  displayInputForm() {
    form.classList.remove('hidden');
  }
}

class User {
  workouts = [];
  latlng;
  stats;
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.latlng = [this.latitude, this.longitude];
  }

  addWorkout(type, latlng) {
    console.log(type);
    if (type === 'cycling') this.workouts.push(Cycling.createWorkout(latlng));
    if (type === 'running') this.workouts.push(Running.createWorkout(latlng));

    const workout = this.workouts.at(-1);
    localStorage.setItem(workout.timeStamp, JSON.stringify(workout));
  }

  get lastWorkout() {
    return this.workouts.at(-1);
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
  constructor(type, distance, duration, latlng) {
    this.type = type;
    this.distance = Number(distance);
    this.duration = Number(duration);
    this.latlng = latlng;
    this.timeStamp = new Date();
    this.shortDate = Intl.DateTimeFormat('en-GB', this.options).format(
      this.timeStamp
    ); // 14 July 2022
  }
}

class Cycling extends Workout {
  constructor(type, distance, duration, elevation, latlng) {
    super(type, distance, duration, latlng);
    this.elevation = elevation;
  }

  static createWorkout(latlng) {
    let type = inputType.value;
    let duration = inputDuration.value;
    let distance = inputDistance.value;
    let elevation = inputElevation.value;
    return new Cycling(type, distance, duration, elevation, latlng);
  }
}
class Running extends Workout {
  constructor(type, distance, duration, cadence, latlng) {
    super(type, distance, duration, latlng);
    this.cadence = cadence;
  }

  static createWorkout(latlng) {
    let type = inputType.value;
    let duration = inputDuration.value;
    let distance = inputDistance.value;
    let cadence = inputCadence.value;
    return new Running(type, distance, duration, cadence, latlng);
  }
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

function clearForm() {
  inputDistance.value =
    inputCadence.value =
    inputDuration.value =
    inputElevation.value =
      '';
}

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      const user = new User(latitude, longitude);
      const app = new App(user);
      map = app.renderMap(user.latlng);
      map.addPermenantMarker(user.latlng, '<b>This is you</b>');

      //   map.on('click', function (event) {
      //     app.displayInputForm();
      //     const latlng = Object.values(event.latlng);
      //     currentWorkoutPosition = latlng;
      //     map.addTemporaryMarker(currentWorkoutPosition);
      //   });

      //   handle submit form
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        user.addWorkout(inputType.value, currentWorkoutPosition);
        map.addPermenantMarker(
          user.lastWorkout.latlng,
          `<b>${user.lastWorkout.type}</b> <br> ${user.lastWorkout.shortDate}`
        );
        displayWorkoutsAndStats(user);
        clearForm();
      });

      inputType.addEventListener('change', function (event) {
        inputElevation
          .closest('.form__row')
          .classList.toggle('form__row--hidden');
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

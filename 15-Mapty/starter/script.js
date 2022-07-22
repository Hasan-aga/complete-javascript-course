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

  centerMapOn(latlng) {
    this.map.setView(latlng, 13);
  }

  displayInputForm() {
    form.classList.remove('hidden');
  }

  clearForm() {
    inputDistance.value =
      inputCadence.value =
      inputDuration.value =
      inputElevation.value =
        '';
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
    if (type === 'cycling') this.workouts.push(Cycling.createWorkout(latlng));
    if (type === 'running') this.workouts.push(Running.createWorkout(latlng));

    const workout = this.lastWorkout;
    localStorage.setItem(workout.timeStamp, JSON.stringify(workout));
  }

  removeWorkout(workoutToRemove) {
    console.log('removing:', workoutToRemove);
    this.workouts = this.workouts.filter(
      workout => !workout === workoutToRemove
    );
    console.log(this.workouts);
  }

  calculateStats() {
    const totalDistance = this.workouts.reduce(
      (acc, workout) => acc + workout.distance,
      0
    );
    const totalDuration = this.workouts.reduce(
      (acc, workout) => acc + workout.duration,
      0
    );
    const avgDistance = (totalDistance / this.workouts.length).toFixed(1);
    const avgDuration = (totalDuration / this.workouts.length).toFixed(1);
    this.stats = { totalDistance, totalDuration, avgDistance, avgDuration };
  }

  displayStats() {
    statAverageDistance.textContent = `Avg Distance: ${this.stats.avgDistance} Km`;
    statAverageDuration.textContent = `Avg Duration: ${this.stats.avgDuration} Min`;
  }

  displayWorkoutsAndStats() {
    this.lastWorkout.displayWorkout();
    this.calculateStats();
    this.displayStats();
  }

  getStoredWorkouts() {
    const keys = Object.keys(localStorage);
    for (let key of keys) {
      let workout;

      if (
        Workout.getTypeFromWorkoutString(localStorage.getItem(key)) ===
        'running'
      ) {
        workout = Running.createWorkoutFromString(localStorage.getItem(key));
      } else {
        workout = Cycling.createWorkoutFromString(localStorage.getItem(key));
      }
      this.workouts.push(workout); //adds workout without writing to storage since its already in storage
    }
  }

  displayAllWorkouts() {
    console.log(this.workouts);
    this.workouts.forEach(workout => workout.displayWorkout());
  }

  getWorkoutFromId(workoutID) {
    return this.workouts.find(workout => workout.timeStamp == workoutID);
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

  static getTypeFromWorkoutString(workout) {
    return JSON.parse(workout).type;
  }
}

class Cycling extends Workout {
  constructor(type, distance, duration, elevation, latlng) {
    super(type, distance, duration, latlng);
    this.elevation = elevation;
  }

  static createWorkoutFromString(workoutString) {
    const workout = JSON.parse(workoutString);
    return new Cycling(
      workout.type,
      workout.distance,
      workout.duration,
      workout.elevation,
      workout.latlng
    );
  }
  displayWorkout() {
    const html = `
          <li class="workout workout--${this.type}" data-id="${this.timeStamp}">
          <div class="workout__title">
          <h2 class="workout__title">${this.type} on ${this.shortDate}</h2>
          <button class="workout__remove">❌️</button>
        </div>
          <div class="workout__details">
            <span class="workout__icon">🏃‍♂️</span>
            <span class="workout__value">${this.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${this.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${this.elevation}</span>
            <span class="workout__unit">min/km</span>
          </div>
        </li>
            `;
    form.insertAdjacentHTML('afterend', html);
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

  static createWorkoutFromString(workoutString) {
    const workout = JSON.parse(workoutString);
    return new Running(
      workout.type,
      workout.distance,
      workout.duration,
      workout.cadence,
      workout.latlng
    );
  }

  displayWorkout() {
    const html = `
          <li class="workout workout--${this.type}" data-id="${this.timeStamp}">
          <div class="workout__title">
          <h2 class="workout__title">${this.type} on ${this.shortDate}</h2>
          <button class="workout__remove">❌️</button>
        </div>
          <div class="workout__details">
            <span class="workout__icon">🏃‍♂️</span>
            <span class="workout__value">${this.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${this.duration}</span>
            <span class="workout__unit">min</span>
          </div>

          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${this.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
            `;
    form.insertAdjacentHTML('afterend', html);
  }

  static createWorkout(latlng) {
    let type = inputType.value;
    let duration = inputDuration.value;
    let distance = inputDistance.value;
    let cadence = inputCadence.value;
    return new Running(type, distance, duration, cadence, latlng);
  }
}

// localStorage.clear();

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      const user = new User(latitude, longitude);
      user.getStoredWorkouts();
      user.displayAllWorkouts();
      const app = new App(user);
      app.renderMap(user.latlng);
      app.map.addPermenantMarker(user.latlng, '<b>This is you</b>');

      app.map.on('click', function (event) {
        app.displayInputForm();
        const latlng = Object.values(event.latlng);
        currentWorkoutPosition = latlng;
        app.map.addTemporaryMarker(currentWorkoutPosition);
      });

      //   handle submit form
      form.addEventListener('submit', function (event) {
        console.log(event.target);
        event.preventDefault();
        user.addWorkout(inputType.value, currentWorkoutPosition);
        app.map.addPermenantMarker(
          user.lastWorkout.latlng,
          `<b>${user.lastWorkout.type}</b> <br> ${user.lastWorkout.shortDate}`
        );
        user.displayWorkoutsAndStats();
        app.clearForm();
      });

      //toggle cadence and elevation by workout type
      inputType.addEventListener('change', function (event) {
        inputElevation
          .closest('.form__row')
          .classList.toggle('form__row--hidden');
        inputCadence
          .closest('.form__row')
          .classList.toggle('form__row--hidden');
      });

      containerWorkouts.addEventListener('click', function (event) {
        const clicked = event.target;
        if (clicked.classList.contains('workout__remove')) {
          // handle click on remove button
          const workoutElement = event.target.closest('.workout');
          const workoutID = workoutElement.dataset.id;
          const workoutToRemove = user.getWorkoutFromId(workoutID);
          user.removeWorkout(workoutToRemove);
        } else if (!clicked || /form/gm.test(clicked.classList))
          return; //handle click on empty section or input form
        else {
          //handle click on workout
          const workoutElement = event.target.closest('.workout');
          const workoutID = workoutElement.dataset.id;
          const clickedWorkoutPosition =
            user.getWorkoutFromId(workoutID).latlng;

          app.centerMapOn(clickedWorkoutPosition, map);
        }
      });

      //   TODO: handle creating workout without clicking on map
    },
    function () {
      alert('Could not get position.');
    }
  );

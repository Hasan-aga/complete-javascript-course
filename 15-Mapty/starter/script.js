'use strict';
// localStorage.clear();

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

  addWorkout(type, latlng) {
    if (type === 'cycling') this.workouts.push(Cycling.createWorkout(latlng));
    if (type === 'running') this.workouts.push(Running.createWorkout(latlng));

    const workout = this.lastWorkout;
    localStorage.setItem(workout.timeStamp, JSON.stringify(workout));
  }

  removeWorkout(workoutToRemove) {
    console.log('remove:', workoutToRemove.timeStamp);
    console.log(this.workouts);
    this.workouts.forEach(w => {
      if (w.timeStamp === workoutToRemove.timeStamp) console.log(true);
    });
    this.workouts = this.workouts.filter(
      workout => workout.timeStamp != workoutToRemove.timeStamp
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

  updateStorage() {
    localStorage.clear();
    this.workouts.forEach(workout =>
      localStorage.setItem(workout.timeStamp, JSON.stringify(workout))
    );
  }

  displayAllWorkouts() {
    this.workouts.forEach(workout => {
      workout.displayWorkout();
      console.log(workout.timeStamp);
    });
  }

  getWorkoutFromId(workoutID) {
    return this.workouts.find(workout => workout.timeStamp == workoutID);
  }

  get lastWorkout() {
    return this.workouts.at(-1);
  }
}
class App {
  map;
  user;
  currentWorkoutPosition;
  constructor() {
    this.getPosition();

    //   handle submit form
    form.addEventListener('submit', this.handleSubmit.bind(this));

    //toggle cadence and elevation by workout type
    inputType.addEventListener('change', this.toggleFormWithType);

    //   handle click on workout list
    containerWorkouts.addEventListener(
      'click',
      this.handleClickOnWorkoutList.bind(this)
    );
  }

  handleClickOnWorkoutList(event) {
    const clicked = event.target;
    if (clicked.classList.contains('workout__remove')) {
      // handle click on remove button
      const workoutElement = event.target.closest('.workout');
      const workoutID = workoutElement.dataset.id;
      const workoutToRemove = this.user.getWorkoutFromId(workoutID);
      this.user.removeWorkout(workoutToRemove);
      this.user.updateStorage();
      workoutElement.remove();
    } else if (clicked.classList.contains('reset-storage')) {
      console.log('reset local storage');
      localStorage.clear();
    } else if (!clicked || /form/gm.test(clicked.classList))
      return; //handle click on empty section or input form
    else {
      //handle click on workout
      const workoutElement = event.target.closest('.workout');
      const workoutID = workoutElement.dataset.id;
      const clickedWorkoutPosition =
        this.user.getWorkoutFromId(workoutID).latlng;
      this.centerMapOn(clickedWorkoutPosition);
    }
  }

  toggleFormWithType() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  handleSubmit(event) {
    event.preventDefault();
    this.user.addWorkout(inputType.value, this.currentWorkoutPosition);
    this.map.addPermenantMarker(
      this.user.lastWorkout.latlng,
      `<b>${this.user.lastWorkout.type}</b> <br> ${this.user.lastWorkout.shortDate}`
    );
    this.user.displayWorkoutsAndStats();
    form.classList.add('hidden');

    this.clearForm();
  }

  getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this.initiateMap.bind(this),
        function () {
          alert('please provide position.');
        }
      );
  }

  initiateMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    this.user = new User(latitude, longitude);
    console.log(this.user);
    this.user.getStoredWorkouts();
    this.user.displayAllWorkouts();
    this.renderMap(this.user.latlng);
    this.map.addPermenantMarker(this.user.latlng, '<b>This is you</b>');
    this.addMarkerForEachWorkout();
    this.map.on('click', this.handleMapClick.bind(this));
  }

  handleMapClick(event) {
    form.classList.remove('hidden');
    const latlng = Object.values(event.latlng);
    this.currentWorkoutPosition = latlng;
    this.map.addTemporaryMarker(this.currentWorkoutPosition);
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

  addMarkerForEachWorkout() {
    this.user.workouts.forEach(workout =>
      this.map.addPermenantMarker(workout.latlng)
    );
  }

  clearForm() {
    inputDistance.value =
      inputCadence.value =
      inputDuration.value =
      inputElevation.value =
        '';
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
    console.log(this.timeStamp);
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
    const timeStamp = workout.timeStamp;
    const cyclingWorkout = new Cycling(
      workout.type,
      workout.distance,
      workout.duration,
      workout.elevation,
      workout.latlng
    );
    cyclingWorkout.timeStamp = timeStamp;
    return cyclingWorkout;
  }
  displayWorkout() {
    const html = `
          <li class="workout workout--${this.type}" data-id="${this.timeStamp}">
          <div class="workout__title">
          <h2 class="workout__title">${this.type} on ${this.shortDate}</h2>
          <button class="workout__remove" title="Remove Item">❌️</button>
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
    const timeStamp = workout.timeStamp;
    const runningWorkout = new Running(
      workout.type,
      workout.distance,
      workout.duration,
      workout.cadence,
      workout.latlng
    );
    runningWorkout.timeStamp = timeStamp;
    return runningWorkout;
  }

  displayWorkout() {
    const html = `
          <li class="workout workout--${this.type}" data-id="${this.timeStamp}">
          <div class="workout__title">
          <h2 class="workout__title">${this.type} on ${this.shortDate}</h2>
          <button class="workout__remove" title="Remove Item">❌️</button>
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

const app = new App();

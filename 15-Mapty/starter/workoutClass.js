import {
  form,
  containerWorkouts,
  inputType,
  inputDistance,
  inputDuration,
  inputCadence,
  inputElevation,
  statAverageDistance,
  statAverageDuration,
  sort,
} from './DOMelements.js';

export class Workout {
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

export class Cycling extends Workout {
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
    sort.insertAdjacentHTML('afterend', html);
  }

  static createWorkout(latlng) {
    let type = inputType.value;
    let duration = inputDuration.value;
    let distance = inputDistance.value;
    let elevation = inputElevation.value;
    return new Cycling(type, distance, duration, elevation, latlng);
  }
}
export class Running extends Workout {
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
    sort.insertAdjacentHTML('afterend', html);
  }

  static createWorkout(latlng) {
    let type = inputType.value;
    let duration = inputDuration.value;
    let distance = inputDistance.value;
    let cadence = inputCadence.value;
    return new Running(type, distance, duration, cadence, latlng);
  }
}

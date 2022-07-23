import { Workout, Cycling, Running } from './workoutClass.js';
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
} from './DOMelements.js';

export class User {
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
    this.workouts = this.workouts.filter(
      workout => workout.timeStamp != workoutToRemove.timeStamp
    );
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
    });
  }

  getWorkoutFromId(workoutID) {
    return this.workouts.find(workout => workout.timeStamp == workoutID);
  }

  get lastWorkout() {
    return this.workouts.at(-1);
  }
}
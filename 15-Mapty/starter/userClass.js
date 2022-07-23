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
  workoutElements;
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

  sortWorkouts(ascend, sortBy) {
    console.log(this.workouts[0]);
    if (ascend) this.workouts.sort((a, b) => b[sortBy] - a[sortBy]);
    else this.workouts.sort((a, b) => a[sortBy] - b[sortBy]);
    this.refreshWorkoutList();
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

  //main way of displaying items
  displayWorkoutsAndStats() {
    // this.lastWorkout.displayWorkout();
    this.refreshWorkoutList();
    this.calculateStats();
    this.displayStats();
  }

  refreshWorkoutList() {
    this.clearWorkoutScreen();
    this.displayAllWorkouts();
  }

  displayAllWorkouts() {
    this.workouts.forEach(workout => {
      workout.displayWorkout();
    });
    this.workoutElements = containerWorkouts.querySelectorAll('.workout');
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
      workout.timeStamp = new Date(workout.timeStamp);
      this.workouts.push(workout); //adds workout without writing to storage since its already in storage
    }
  }

  updateStorage() {
    localStorage.clear();
    this.workouts.forEach(workout =>
      localStorage.setItem(workout.timeStamp, JSON.stringify(workout))
    );
  }

  clearWorkoutScreen() {
    if (!this.workoutElements) return;
    this.workoutElements.forEach(w => w.remove());
  }

  getWorkoutFromId(workoutID) {
    return this.workouts.find(workout => workout.timeStamp == workoutID);
  }

  get lastWorkout() {
    return this.workouts.at(-1);
  }

  removeAllWorkouts() {
    this.workouts = [];
  }
}

'use strict';
// localStorage.clear();
import { User } from './userClass.js';
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
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const sortLabels = {
  time: 'timeStamp',
  distance: 'distance',
  duration: 'duration',
  type: 'type',
};

class App {
  map;
  user;
  currentWorkoutPosition;
  allMarkers = [];
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
    } else if (
      clicked.classList.contains('sort__order') ||
      clicked.classList.contains('sort__input')
    ) {
      const ascend = clicked.classList.contains('sort__order--ascend');
      const sortBy = document.querySelector('.sort__input--sortby').value;
      const label = sortLabels[sortBy];
      this.user.sortWorkouts(ascend, label);
      console.log(ascend);
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
    this.user.getStoredWorkouts();
    this.user.displayAllWorkouts();
    this.renderMap(this.user.latlng);
    this.map.addPermenantMarker(this.user.latlng, '<b>This is you</b>');
    this.addMarkerForEachWorkout();
    this.fitMapOnAllMarkers();
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
      return marker;
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
      this.allMarkers.push(this.map.addPermenantMarker(workout.latlng))
    );
  }

  fitMapOnAllMarkers() {
    if (0 == this.allMarkers.length) return;
    const group = new L.featureGroup([...this.allMarkers]);
    this.map.fitBounds(group.getBounds());
  }

  clearForm() {
    inputDistance.value =
      inputCadence.value =
      inputDuration.value =
      inputElevation.value =
        '';
  }
}

const app = new App();

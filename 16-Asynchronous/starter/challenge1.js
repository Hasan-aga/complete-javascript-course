'use strict';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function whereAmI() {
  getPosition()
    .then(position => {
      const { latitude: lat, longitude: lng } = position.coords;
      console.log(lat, lng);
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error(`Could not make api call, status: ${res.status}`);
    })
    .then(data => console.log(`You are in ${data.city} / ${data.country}`))
    .catch(err => console.error('Failed!', err.message));
}

whereAmI();

'use strict';

function whereAmI(lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
      if (res.ok) return res.json();
      throw new Error(`Could not make api call, status: ${res.status}`);
    })
    .then(data => console.log(`You are in ${data.city} / ${data.country}`))
    .catch(err => console.error('Failed!', err.message));
}

whereAmI(52.508, 13.381);

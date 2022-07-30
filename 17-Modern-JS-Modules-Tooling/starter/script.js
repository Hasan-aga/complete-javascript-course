// import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 2 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
const stateDestructurClone = { ...state };
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(state);
console.log(stateClone);
console.log(stateDestructurClone);
console.log(stateDeepClone);
console.log(state.cart.find(el => el.quantity >= 5));

if (module.hot) {
  module.hot.accept();
}

// import pollyfilling lib
import 'core-js/stable';

import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
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

// import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

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

if (module.hot) {
  module.hot.accept();
}

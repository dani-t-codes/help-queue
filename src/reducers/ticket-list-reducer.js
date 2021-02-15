//export statement includes default because this file will only have one fxn - the reducer for ticket list
//the fxn has two params, 1) state to be changed, 2) action to be applied to that state
//1st param has a default value (ES6 feature) so if an arg isn't passed into the param, fxn can use default
export default (state ={}, action) => {
  return state;
};
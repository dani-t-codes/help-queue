//export statement includes default because this file will only have one fxn - the reducer for ticket list
//the fxn has two params, 1) state to be changed, 2) action to be applied to that state
//1st param has a default value (ES6 feature) so if an arg isn't passed into the param, fxn can use default

export default (state = {}, action) => {
  const { names, location, issue, id } = action; // ES6 obj destructuring of properties from the `action` object into variables
  //switch case is just simplified syntax for conditionals
  switch (action.type) { // switch will be based on action.type
    //`action` param takes an obj, so reducer needs to look at its `type` prop to determine action to take
    case 'ADD_TICKET':
      //Obj.assign(1 *must* be empty obj {}, 2 the obj that will be cloned, 3 the change to make to new copy)
      // 1 must be empty obj otherwise will mutate state passed in instead of 1st cloning
      return Object.assign({}, state, { // clones - not mutates - the `state` obj
        [id]: {
          //creates new key-value pair where key is ticket's id, value is an obj w/ all tix props
          names: names,
          location: location,
          issue: issue,
          id: id
        }
      });
    default:
      return state;
  }
};
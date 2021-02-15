import ticketListReducer from '../../reducers/ticket-list-reducer';

describe("ticketListReducer", () => {
  //simplest behavior is initial state of help queue
  //initial state will be an empty object {}
  //each key-value pair inside the object represents a ticket
  test("Should return default state if there is no action type passed into the reducer", () => {
    //imported code is stored in a variable ticketListReducer
    expect(ticketListReducer({}, { type: null }).toEqual({}));
    //reducer takes two arguments: 1) current state, 2) an action that will be applied to state (and action's type is stored inside an object)
  });
});
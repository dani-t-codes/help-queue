import rootReducer from '../../reducers/index';
import { createStore } from 'redux';
import formVisibleReducer from "../../reducers/form-visible-reducer";
import ticketListReducer from "../../reducers/ticket-list-reducer";

//creates a store for testing to see if root reducer ( reducers/index.js ) works
//allows for use of Redux's getState() method
let store = createStore(rootReducer);

describe("rootReducer", () => {

  //simplest behavior - test that reducer returns default state
  test('Should return default state if no action type is recognized', () => {
    expect(rootReducer({}, { type: null })).toEqual({
      //the default state - stores multiple slices of state
      masterTicketList: {},
      formVisibleOnPage: false
    });
  });

  //next two tests are for testing reducers/index.js root reducer
  test("Check that initial state of ticketListReducer matches root reducer", () => {
    expect(store.getState().masterTicketList).toEqual(ticketListReducer(undefined, { type: null }));
  });

  test('Check that initial state of formVisibleReducer matches root reducer', () => {
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, { type: null }));
  });

});
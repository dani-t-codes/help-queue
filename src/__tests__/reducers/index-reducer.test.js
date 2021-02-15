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

  //next two tests ensures that when actions as passed into combined reducers, root reducer reflects those changes
  //both tests dispatch an action
  //those actions passed into root reducer should properly handle those actions
  //store's state slice should be updated accordingly & equal to return result of individual reducer that handled the action
  test("Check that ADD_TICKET action works for ticketListReducer and room reducer", () => {
    const action = {
      type: 'ADD_TICKET',
      names: 'Ryan & Aimen',
      location: '4b',
      issue: 'Redux action is not working correctly.',
      id: 1
    }
    store.dispatch(action);
    expect(store.getState().masterTicketList).toEqual(ticketListReducer(undefined, action));
  });

  test("Check that TOGGLE_FORM action works for formVisibleReducer and root reducer", () => {
    const action = {
      type: 'TOGGLE_FORM'
    }
    store.dispatch(action);
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, action));
  });

});
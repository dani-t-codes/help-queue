import rootReducer from '../../reducers/index';
import { createStore } from 'redux';

//creates a store for testing to see if root reducer ( reducers/index.js ) works
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

});
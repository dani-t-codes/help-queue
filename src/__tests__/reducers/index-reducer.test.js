import rootReducer from '../../reducers/index';

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
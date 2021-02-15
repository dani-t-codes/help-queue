import formVisibleReducer from '../../reducers/form-visible-reducer';

describe("formVisibleReducer", () => {

  //first test checks to make sure reducer can accept a boolean and return default state if no action type is provided
  test('Should return default state if no action type is recognized', () => {
    expect(formVisibleReducer(false, { type: null })).toEqual(false);
  });

  //next simplest behavior - reducer toggling btw T and F
  test('Should toggle form visibility state to true', () => {
    expect(formVisibleReducer(false, { type: 'TOGGLE_FORM' })).toEqual(true);
  });

});
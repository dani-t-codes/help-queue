//action creator test file
//a Note: actions themselves have already been tested, so all that needs to be done is test that the action creator creates the right action - not execute the action.
import * as actions from './../../actions';
import * as c from './../actions/ActionTypes';

describe('help queue actions', () => {
  it('deleteTicket should create DELETE_TICKET action', () => {
    expect(actions.deleteTicket(1)).toEqual({
      type: c.DELETE_TICKET,
      id: 1
    });
  });

  it('toggleForm should create TOGGLE_FORM action', () => {
    expect(actions.toggleForm()).toEqual({
      type: c.TOGGLE_FORM
    });
  });

  it('addTicket should create ADD_TICKET action', () => {
    expect(actions.addTicket({names: 'Jo and Jasmine', location: '3E', issue: 'Redux not working!', id: 1})).toEqual({
      type: c.ADD_TICKET,
      names: 'Jo and Jasmine',
      location: '3E',
      issue: 'Redux not working!',
      id: 1
    });
  });
});
//action creator test file
//a Note: actions themselves have already been tested, so all that needs to be done is test that the action creator creates the right action - not execute the action.
import * as actions from './../../actions';

describe('help queue actions', () => {
  it('deleteTicket should create DELETE_TICKET action', () => {
    expect(actions.deleteTicket(1)).toEqual({
      type: 'DELETE_TICKET',
      id: 1
    });
  });
});
import ticketListReducer from '../../reducers/ticket-list-reducer';
//imported code is stored in a variable ticketListReducer

describe("ticketListReducer", () => {
  //simplest behavior is initial state of help queue
  //initial state will be an empty object {}
  //each key-value pair inside the object represents a ticket

  let action; //declares a new undefined action
  const ticketData = { //create a ticketData constant for testing
    names: 'Ryan & Aimen',
    location: '4b',
    issue: 'Redux action is not working correctly.',
    id: 1
  };

  test('Should return default state if there is no action type passed into the reducer', () =>{

    expect(ticketListReducer({}, { type: null })).toEqual({});
    //reducer takes two arguments: 1) current state, 2) an action that will be applied to state (and action's type is stored inside an object)
  });

  test('Should successfully add new ticket data to masterTicketList', () => {
    const { names, location, issue, id } = ticketData;
    //would be a code smell to pass too many arguments into a function which is why a reducer taking an object as an argument is so useful
    //^^ also can take multiple key-value pairs w/ additional info about action reducer needs to take
    action = {
      type: 'ADD_TICKET', //Redux naming convention for action type
      names: names,
      location: location,
      issue: issue,
      id: id
    };

    expect(ticketListReducer({}, action)).toEqual({
      [id] : {
        names: names,
        location: location,
        issue: issue,
        id: id
      }
    });

  });
});
import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";

import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'

function TicketList(props){
  //from react-redux-firebase
  useFirestoreConnect([
    { collection: 'tickets' }
  ]);
  //from react-redux
  const tickets = useSelector(state => state.firestore.ordered.tickets);

  //react-redux-firebase offers isLoaded() fxn
  if (isLoaded(tickets)){
  return(
    <React.Fragment>
      <hr/>
      {/* Now need to map over values of an obj not an array */}
      {ticket.map((ticket) => {
        return <Ticket
          whenTicketClicked = { props.onTicketSelection }
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          formattedWaitTime={ticket.formattedWaitTime}
          id={ticket.id}
          key={ticket.id}/>
      })}
      </React.Fragment>
    );
  } else {
    return (
      <>
        <h3>Loading...</h3>
      </>
    )
  }
}

TicketList.propTypes = {
  onTicketSelection: PropTypes.func
};

export default TicketList;
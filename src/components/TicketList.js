import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'; //hook to extract data from a Redux store
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'; //hook that allows to listen for changes to Firestore w/o using an HOC in a class component

function TicketList(props){
  //from react-redux-firebase
  useFirestoreConnect([ //hook that listens for changes
    { collection: 'tickets' } //specify a collection or docs to listen to in Firestore
  ]);
  //from react-redux
  const tickets = useSelector(state => state.firestore.ordered.tickets); //useSelector() is a React Redux hook that makes state available through the store through firestoreReducer

  //react-redux-firebase offers isLoaded() fxn
  if (isLoaded(tickets)){ // verifies tix collection has been loaded *before* rendering component
  return(
    <React.Fragment>
      <hr/>
      {/* Now need to map over values of an obj not an array */}
      {tickets.map((ticket) => {
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
import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase';

function EditTicketForm(props) {
  const firestore = useFirestore();
  const { ticket } = props;

  //Function that captures form values & triggers handleEditingTicketInList method in Control
  function handleEditTicketFormSubmission(event) {
    event.preventDefault();
    props.onEditTicket();
    const propertiesToUpdate = {
      names: event.target.names.value,
      location: event.target.location.value,
      issue: event.target.issue.value,
      id: ticket.id
    }
    return firestore.update({collection: 'tickets', doc: ticket.id }, propertiesToUpdate)
    //^Firestore exposes update() method made avail. via React Redux Firebase bindings
    //^^Takes two args - 1) an object describing the item to be updated
    //^^^2) an object containing the properties to be updated
  }

  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler={handleEditTicketFormSubmission}
        buttonText="Update Ticket" />
    </React.Fragment>
  );
}

EditTicketForm.propTypes = {
  ticket: PropTypes.object,
  onEditTicket: PropTypes.func
}

export default EditTicketForm;
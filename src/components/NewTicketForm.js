import React from "react";
//import { v4 } from 'uuid';
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { useFirestore } from 'react-redux-firebase';

function NewTicketForm(props){
  //allows for use of Firestore methods in the component
  const firestore = useFirestore();
  function addTicketToFirestore(event) {
    event.preventDefault();
    props.onNewTicketCreation();
    //how to add a ticket to firestore with a firestore method
    return firestore.collection('tickets').add(
      {
        names: event.target.names.value,
        location: event.target.location.value,
        issue: event.target.issue.value,
        timeOpen: firestore.FieldValue.serverTimestamp()
      }
    );
  }
  return (
    <React.Fragment>
      <ReusableForm
      formSubmissionHandler={addTicketToFirestore}
      buttonText="Help!" />
    </React.Fragment>
  );
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;
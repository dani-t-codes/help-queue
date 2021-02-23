import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from "./EditTicketForm";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import { withFirestore } from 'react-redux-firebase'; // a wrapper method similar to React Redux connect() method
import { withFirestore, isLoaded } from 'react-redux-firebase';

class TicketControl extends React.Component {

  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      //formVisibleOnPage: false, //React's form handling
      selectedTicket: null,
      editing: false
    };
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        //formVisibleOnPage: false, //React's form handling
        selectedTicket: null,
        editing: false
      });
    } else {
      // this.setState(prevState => ({ //React's state
      //   formVisibleOnPage: !prevState.formVisibleOnPage
      // }));
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
      }
    }

  handleAddingNewTicketToList = () => {
    //could call this.props.dispatch but this way deconstructing dispatch from `this.props` is cleaner
    const { dispatch } = this.props;
    //need to deconstruct values from newTicket to pass into action that reqs. 4 props
    //const { id, names, location, issue } = newTicket;
    //store action in a constant
    //const action = a.addTicket(newTicket); //Redux way pre-firestore
    //dispatch(action); //Redux magic
    //this.setState({formVisibleOnPage: false}); //React's state
    const action = a.toggleForm();
    dispatch(action);
  }

  //masterTicketList is no longer part of this.state, but the Redux store
  // need to pass it into the component via this.props
  //masterTicketList is also an object now, not an array, so no need for filter(), just bracket notation
  handleChangingSelectedTicket = (id) => {
    //const selectedTicket = this.props.masterTicketList[id]; //pre-Firestore
    this.props.firestore.get({collection: 'tickets', doc: id}).then((ticket) => {
      // ^Firestore's get() method for collections
      // ^^id is passed into a property called doc which returns a pending promise
      // ^^^can chain a promise to .then() to return a DocumentSnapshot
      const firestoreTicket = {
        names: ticket.get("names"), //diff. get() to retrieve ea. specific property
        location: ticket.get("location"),
        issue: ticket.get("issue"),
        id: ticket.id
      }
      this.setState({selectedTicket: firestoreTicket});
    });
  }
  //^^ better practice especially for scalability would be to skip using get(), add error handling and perhaps a try/catch block (Lsn 10, last 3 paragraphs)
  //**EXTRA - TRY A REFACTOR */

  handleEditClick = () => {
    this.setState({editing: true});
  }

  //method for updating state, changed selectedTicket to false since the previous version won't exist anymore, and setting editing to false so TicketList component shows instead of EditTicketForm
  handleEditingTicketInList = () => {
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  handleDeletingTicket = (id) => {
    this.props.firestore.delete({collection: 'tickets', doc: id});
    //^^ access firestore then call the delete() method
    //pass in two props - 1) a key-value pair w/ collection as the key
    //2) key-value pair with doc as the property and the id of the document to delete
    this.setState({ selectedTicket: null });
  }

  render(){
    const auth = this.props.firebase.auth(); // auth itself is provided by Firebase even though we are using Firestore for db
    if (!isLoaded(auth)) {
      return (
        <>
          <h1>Loading...</h1>
        </>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser == null)) {
      return (
        <>
          <h1>You must be signed in to access the queue.</h1>
        </>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser != null)) {
      let currentlyVisibleState = null;
      let buttonText = null;

      if (this.state.editing){
        currentlyVisibleState = <EditTicketForm
          ticket = {this.state.selectedTicket}
          onEditTicket = {this.handleEditingTicketInList} />
        buttonText = "Return to Ticket List";
      } else if (this.state.selectedTicket != null) {
        currentlyVisibleState = <TicketDetail
        ticket={this.state.selectedTicket}
        onClickingDelete = {this.handleDeletingTicket}
        onClickingEdit = {this.handleEditClick} />; // pass method as a prop
        buttonText = "Return to Ticket List";
      } else if (this.props.formVisibleOnPage) {
        currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;
        buttonText = "Return to Ticket List";
      } else {
        currentlyVisibleState = <TicketList
          ticketList={this.props.masterTicketList}
          onTicketSelection={this.handleChangingSelectedTicket} />;
        buttonText = "Add ticket";
      }
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
};

TicketControl.propTypes = {
  masterTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    //key-value pairs of state to be mapped from Redux to React component go here.
    //^^they determine state slices that should be mapped to component's props
    //^^(i.e. masterTicketList from store to be mapped to TicketControl's props)
    //masterTicketList: state.masterTicketList, // pre Firestore
    formVisibleOnPage: state.formVisibleOnPage
  }
}
//next pass mapStateTOProps into connect() fxn

TicketControl = connect(mapStateToProps)(TicketControl);
//connect() fxn redefines entire TicketControl component as a new TicketControl comp w/ add'l fxnality
//ensures TicketControl component has mapStateToProps functionality when connect() redefines the component

export default withFirestore(TicketControl);
//^^higher order fxn to give component the ability to use Firestore
//makes Firestore available to app via `this.props.firestore`
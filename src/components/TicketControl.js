import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from "./EditTicketForm";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';

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
      }
      dispatch(action);
    }

  handleAddingNewTicketToList = (newTicket) => {
    //could call this.props.dispatch but this way deconstructing dispatch from `this.props` is cleaner
    const { dispatch } = this.props;
    //need to deconstruct values from newTicket to pass into action that reqs. 4 props
    //const { id, names, location, issue } = newTicket;
    //store action in a constant
    const action = a.addTicket(newTicket);
    dispatch(action); //Redux magic
    //this.setState({formVisibleOnPage: false}); //React's state
    const action2 = a.toggleForm();
    dispatch(action2);
  }

  //masterTicketList is no longer part of this.state, but the Redux store
  // need to pass it into the component via this.props
  //masterTicketList is also an object now, not an array, so no need for filter(), just bracket notation
  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.masterTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  //method for updating state, changed selectedTicket to false since the previous version won't exist anymore, and setting editing to false so TicketList component shows instead of EditTicketForm
  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const action = a.addTicket(ticketToEdit);
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteTicket(id);
    dispatch(action);
    this.setState({ selectedTicket: null });
  }

  render(){
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
    masterTicketList: state.masterTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}
//next pass mapStateTOProps into connect() fxn

TicketControl = connect(mapStateToProps)(TicketControl);
//connect() fxn redefines entire TicketControl component as a new TicketControl comp w/ add'l fxnality
//ensures TicketControl component has mapStateToProps functionality when connect() redefines the component

export default TicketControl;
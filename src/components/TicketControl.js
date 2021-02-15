import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from "./EditTicketForm";
import { connect } from 'react-redux';

class TicketControl extends React.Component {

  constructor(props){
    super(props);
    console.log(props)
    this.state = {
      formVisibleOnPage: false,
      selectedTicket: null,
      editing: false
    };
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
    }
  }

  handleAddingNewTicketToList = (newTicket) => {
    //could call this.props.dispatch but this way deconstructing dispatch from `this.props` is cleaner
    const { dispatch } = this.props;
    //need to deconstruct values from newTicket to pass into action that reqs. 4 props
    const { id, names, location, issue } = newTicket;
    //store action in a constant
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    //Redux magic
    dispatch(action);
    this.setState({formVisibleOnPage: false});
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.masterTicketList.filter(ticket => ticket.id === id)[0];
    this.setState({selectedTicket: selectedTicket});
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  //method for updating state, changed selectedTicket to false since the previous version won't exist anymore, and setting editing to false so TicketList component shows instead of EditTicketForm
  handleEditingTicketInList = (ticketToEdit) => {
    const editedMasterTicketList = this.state.masterTicketList
      .filter(ticket => ticket.id !== this.state.selectedTicket.id)
      .concat(ticketToEdit); // filter & concat method allows for not mutating the ticket, just replaces old with new
    this.setState({
      masterTicketList: editedMasterTicketList, // to be equal to list w/ update tix
      editing: false,
      selectedTicket: null
    });
  }

  handleDeletingTicket = (id) => {
    const newMasterTicketList = this.state.masterTicketList.filter(ticket => ticket.id !== id);
    this.setState({
      masterTicketList: newMasterTicketList,
      selectedTicket: null
    });
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
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.state.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
      buttonText = "Add ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }

}

TicketControl = connect()(TicketControl);
//connect() fxn redefines entire TicketControl component as a new TicketControl comp w/ add'l fxnality

export default TicketControl;
import React, { Component } from 'react';
// bindActionCreators: make the action accessible
import { bindActionCreators } from 'redux';
// connect: permits to export the containers
import { connect } from 'react-redux';
// actions that we import directly
import { createMessage } from '../actions/index';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  // focus
  componentDidMount() {
    this.messageBox.focus();
  }

  // When filling the form
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  // handleSubmit: access the createMessage action
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createMessage(this.props.selectedChannel, this.props.currentUser, this.state.value);
    this.setState({ value: '' }); // Reset message input
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="channel-editor">
        <input
          ref={(input) => { this.messageBox = input; }}
          type="text"
          className="form-control"
          autoComplete="off"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button type="submit">Send</button>
      </form>
    );
  }
}

// mapDispatchToProps: bind the action to the props of the component.
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createMessage }, dispatch);
}

// mapStateToProps: bind the this.props.state to the Redux State tree (index.jsx)
// Receive the Redux State in state, returns the props you want to update.
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    selectedChannel: state.selectedChannel
  };
}

// connect: connect our class to mapStateToProps and mapDispatchToProps so we are connected to the Reducers and Actions
export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);

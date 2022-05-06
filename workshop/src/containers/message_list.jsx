import React, { Component } from 'react';
// bindActionCreators: make the action accessible
import { bindActionCreators } from 'redux';
// connect: permits to export the containers
import { connect } from 'react-redux';
// actions that we import directly
import { fetchMessages } from '../actions';

import Message from '../components/message';
import MessageForm from '../containers/message_form';

class MessageList extends Component {

  // componentWillMount() is invoked just before mounting occurs.
  // It is called before render(), therefore calling setState() synchronously in this method will not trigger an extra rendering.
  // Generally, we recommend using the constructor() instead for initializing state.

  // Is triggered only one time, when component mounts, fetch messages.
  // Permits new messages to appear automatically
  componentWillMount() {
    this.fetchMessages();
  }

  // componentDidMount() is invoked immediately after a component is mounted(inserted into the tree).
  // Initialization that requires DOM nodes should go here.
  // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.

  // This method is a good place to set up any subscriptions.
  // If you do that, don’t forget to unsubscribe in componentWillUnmount().

  // implement an interval that loads the messages every 5000sec
  // The setInterval() method repeatedly calls a function or executes a code snippet, with a fixed time delay between each call.
  // This method returns an interval ID which uniquely identifies the interval, so you can remove it later by calling clearInterval().
  componentDidMount() {
    this.refresher = setInterval(this.fetchMessages, 5000);
  }

  // componentDidUpdate() is invoked immediately after updating occurs. This method is not called for the initial render.
  componentDidUpdate() {
    this.list.scrollTop = this.list.scrollHeight;
  }

  // componentWillUnmount() is invoked immediately before a component is unmounted and destroyed.
  // Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests,
  // or cleaning up any subscriptions that were created in componentDidMount().

  // You should not call setState() in componentWillUnmount() because the component will never be re - rendered.
  // Once a component instance is unmounted, it will never be mounted again.

  // Clear the interval and the messages when component unmount
  componentWillUnmount() {
    clearInterval(this.refresher);
  }

  fetchMessages = () => {
    this.props.fetchMessages(this.props.selectedChannel);
  }

  render() {
    return (
      <div className="channel-container">
        <div className="channel-title">
          <span>Channel #{this.props.selectedChannel}</span>
        </div>
        <div className="channel-content" ref={(list) => { this.list = list; }}>
          {
            this.props.messages.map((message) => {
              return <Message key={message.id} message={message} />;
            })
          }
        </div>
        <MessageForm />
      </div>
    );
  }
}

// mapDispatchToProps: bind the action to the props of the component.
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMessages }, dispatch);
}

// mapStateToProps: bind the this.props.state to the Redux State tree (index.jsx)
// Receive the Redux State in state, returns the props you want to update.
function mapStateToProps(state) {
  return {
    messages: state.messages,
    selectedChannel: state.selectedChannel
  };
}

// connect: connect our class to mapStateToProps and mapDispatchToProps so we are connected to the Reducers and Actions
export default connect(mapStateToProps, mapDispatchToProps)(MessageList);

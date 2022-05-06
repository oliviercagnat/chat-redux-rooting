/* eslint no-bitwise:off */

import React, { Component } from 'react';
// bindActionCreators: make the action accessible
import { bindActionCreators } from 'redux';
// connect: permits to export the containers
import { connect } from 'react-redux';
// actions that we import directly
import { selectChannel, fetchMessages } from '../actions/index';

class ChannelList extends Component {
  // componentWillReceiveProps(): everytime it mounts, it will check if the nextProps
  // is a different channel. If so, will trigger fetchMessages to load the messages.
  // Normally is called componentWillMount()
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedChannel !== this.props.selectedChannel) {
      this.props.fetchMessages(nextProps.selectedChannel);
    }
  }

  // handleClick to select the channel and trigger the action
  handleClick = (channel) => {
    this.props.selectChannel(channel);
  }

  // rendChannel() returns the channel
  renderChannel = (channel) => {
    return (
      <li
        key={channel}
        className={channel === this.props.selectedChannel ? 'active' : null}
        onClick={() => this.handleClick(channel)}
        role="presentation"
      >
        #{channel}
      </li>
    );
  }

  // Map through the different channels and render them with a renderChannel()
  render() {
    return (
      <div className="channels-container">
        <span>Redux Chat</span>
        <ul>
          {this.props.channels.map(this.renderChannel)}
        </ul>
      </div>
    );
  }
}

// mapDispatchToProps: bind the action to the props of the component.
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectChannel, fetchMessages }, dispatch);
}

// mapStateToProps: bind the this.props.state to the Redux State tree (index.jsx)
// Receive the Redux State in state, returns the props you want to update.
function mapStateToProps(state) {
  return {
    // Direct access to the Channels and SelectedChannel props
    channels: state.channels,
    selectedChannel: state.selectedChannel
  };
}

// connect: connect our class to mapStateToProps and mapDispatchToProps so we are connected to the Reducers and Actions
export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);

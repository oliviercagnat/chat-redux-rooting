/* eslint no-bitwise:off */



import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// We don't need the selectChannel anymore
// import { selectChannel, fetchMessages } from '../actions/index';
import { fetchMessages } from '../actions/index';

// How do I switch channels?
// I need a Link: a way to click on an element and change the URL
// Instead of having a handleClick() to trigger manually the State,
// we will replace it with a link_to
import { Link } from 'react-router-dom';


class ChannelList extends Component {

  // FULL FLOW:
  // 7: componentWillReceiveProps() receives new props.
  // which is the new Channel of the URL.
  // 8: we trigger the fetchMessages() with the new Channel


  // lifecycle function that react can call on your component
  // everytime the props are going to change.
  // So everytime the ChannelList changes, it will be triggered.
  componentWillReceiveProps(nextProps) {
    // Here modified selectedChannel to channelFromParams
    if (nextProps.channelFromParams !== this.props.channelFromParams) {
      this.props.fetchMessages(nextProps.channelFromParams);
    }
  }

  // With the Link, we don't need the handleClick() anymore
  // handleClick = (channel) => {
  //   this.props.selectChannel(channel);
  // }

  // Link below is able to handle route changes.
  renderChannel = (channel) => {
    return (
      <li
        key={channel}
        className={channel === this.props.channelFromParams ? 'active' : null}
        // onClick={() => this.handleClick(channel)}
        role="presentation"
      >
        {/* FULL FLOW:
        1: I click on the link => the URL updates.
        // => See index.jsx */}
        <Link to={`/${channel}`}>
          #{channel}
        </Link>
      </li>
    );
  }

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

// Same here
function mapDispatchToProps(dispatch) {
  // return bindActionCreators({ selectChannel, fetchMessages }, dispatch);
  return bindActionCreators({ fetchMessages }, dispatch);

}

// 1: how can I use channelFromParams in the channelList?
// Does the channelList uses the selectedChannel?
// yes, in mapStateToProps. We take the selectedChannel from the State,
// to use it in the component.
// 2: We don't need the line selectedChannel anymore since we don't want to use the Redux State.
// Consequence: selectedChannel is not working in my app anymore.
// 3: I put the props from the parent to replace.
// We avoid this way to have the information stored at 2 different places
// here would be the Redux State and the URL.
function mapStateToProps(state) {
  return {
    channels: state.channels
    // selectedChannel: state.selectedChannel
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);

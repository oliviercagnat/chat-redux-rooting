import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMessages } from '../actions';

import Message from '../components/message';
import MessageForm from '../containers/message_form';

class MessageList extends Component {

  componentWillMount() {
    this.fetchMessages();
  }

  componentDidMount() {
    this.refresher = setInterval(this.fetchMessages, 5000);
  }

  componentDidUpdate() {
    this.list.scrollTop = this.list.scrollHeight;
  }

  componentWillUnmount() {
    clearInterval(this.refresher);
  }

  // Here modified selectedChannel to channelFromParams
  fetchMessages = () => {
    this.props.fetchMessages(this.props.channelFromParams);
  }

  // Here modified selectedChannel to channelFromParams
  render() {
    return (
      <div className="channel-container">
        <div className="channel-title">
          <span>Channel #{this.props.channelFromParams}</span>
        </div>
        <div className="channel-content" ref={(list) => { this.list = list; }}>
          {
            this.props.messages.map((message) => {
              return <Message key={message.id} message={message} />;
            })
          }
        </div>
        <MessageForm channelFromParams={this.props.channelFromParams}/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMessages }, dispatch);
}

// 1: Here as well we use selectedChannel.
// 2: We remove it.
function mapStateToProps(state) {
  return {
    messages: state.messages
    // selectedChannel: state.selectedChannel
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);

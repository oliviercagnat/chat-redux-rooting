import React from 'react';
import ChannelList from '../containers/channel_list';
import MessageList from '../containers/message_list';


// 1: pass the information from the Route from App to its childen.
// props.match.params.channel is provided by the Router.
// channel is the name of the parameter in the route.
// what you have at the end of param is what you had in the route.

// FULL FLOW:
// 5: the App has a new value for the props.
// 6: it updates the ChannelList channelFromParams
// => See containers/channel_list.jsx
const App = (props) => {
  return (
    <div className="messaging-wrapper">
      <div className="logo-container">
        <img className="messaging-logo" src="assets/images/logo.svg" alt="logo" />
      </div>
      <ChannelList channelFromParams={props.match.params.channel} />
      <MessageList channelFromParams={props.match.params.channel} />
    </div>
  );
};

export default App;

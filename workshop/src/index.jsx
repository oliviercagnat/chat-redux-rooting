/* eslint no-alert:off */

// external modules
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reduxPromise from 'redux-promise';

// internal modules
import App from './components/app';
import '../assets/stylesheets/application.scss';

// State and reducers
import messagesReducer from './reducers/messages_reducer';
// import selectedChannelReducer from './reducers/selected_channel_reducer';

import { BrowserRouter as Router, Route, Redirect, Switch }
  from 'react-router-dom';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const identityReducer = (state = null) => state;

// after replacing all the selectedChannel by channelFromParams
// I can remove the ones of the State too.
const initialState = {
  messages: [],
  channels: ['general', 'react', 'paris'],
  currentUser: `anonymous${Math.floor(10 + (Math.random() * 90))}`
  // selectedChannel: 'general'
};

// Here as well.
const reducers = combineReducers({
  messages: messagesReducer,
  channels: identityReducer,
  currentUser: identityReducer
  // selectedChannel: selectedChannelReducer
});

const middlewares = applyMiddleware(reduxPromise, logger);
const store = createStore(reducers, initialState, middlewares);

// Rooter: History is the library handling the URL.
// It sees what the URL in the browser address bar, it mounts the correct component.
// ==> just needed.

// Switch: with all the routes we need.
// Route: start with generated root /channel
// will mount the component App
// For now, just one root.
// Looks like Rails, column parameter with routes with ids.

// Redirect: we go directly to /general
// Now, our selectedChannel is provided by the Route.
// We remove it out of the Redux State (reducers() above)
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {/* FULL FLOW:
      2: The URL is updated.
      3: We go through the Switch and look which routes we are in.
      4: We mount a new version of the App
      => See App.jsx */}
      <Switch>
        <Route path="/:channel" component={App} />
        <Redirect from="/" to="/general" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
);

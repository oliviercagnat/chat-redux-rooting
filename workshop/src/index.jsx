/* eslint no-alert:off */

// external modules
import React from 'react';
import ReactDOM from 'react-dom';

// Wrap the application
import { Provider } from 'react-redux';
// createStore: hold the redux state
// combineReducers: Create one reducers for all the Redux State tree.
// applyMiddleware: takes an action and can do something before it reaches any reducer.
import { createStore, combineReducers, applyMiddleware } from 'redux';
// logger: permits to see the logger in the console
import logger from 'redux-logger';
// reduxPromise: permits the middleware to receive the promise, resolves it and
// dispatches the plain action to all of the reducers
import reduxPromise from 'redux-promise';

// internal modules
import App from './components/app';
import '../assets/stylesheets/application.scss';

// State and reducers
import messagesReducer from './reducers/messages_reducer';
import selectedChannelReducer from './reducers/selected_channel_reducer';

// function that always returns the value that was used as its argument, unchanged
// We first start with a state = null
// it is then changed in the initialState
const identityReducer = (state = null) => state;

// Redux state tree
// Initial DB that we pass in the Store
const initialState = {
  messages: [],
  channels: ['general', 'react', 'paris'],
  currentUser: prompt("What is your username?") || `anonymous${Math.floor(10 + (Math.random() * 90))}`,
  selectedChannel: 'general'
};

// combine reducers
// make the link between the reducers and the State
// selectedChannelReducer => selectedChannel State
const reducers = combineReducers({
  messages: messagesReducer,
  channels: identityReducer,
  currentUser: identityReducer,
  selectedChannel: selectedChannelReducer
});

// Middlewares
// We apply the middleware on the Promise and logger
// We have now in our ReduxDevTool all the actions.
const middlewares = applyMiddleware(reduxPromise, logger);
// We createStore with the middlewares.
const store = createStore(reducers, initialState, middlewares);

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

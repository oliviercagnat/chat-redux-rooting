import { FETCH_MESSAGES, MESSAGE_POSTED, CHANNEL_SELECTED } from '../actions';

// 3 actions in one.
export default function (state = null, action) {
  switch (action.type) {
    case FETCH_MESSAGES: {
      return action.payload.messages;
    }
    case MESSAGE_POSTED: {
      // Here creates a new array similar to the previous one that we return after
      const copiedState = state.slice(0);
      copiedState.push(action.payload);
      return copiedState;
    }
    // When changing Channel, clears view first,
    // then displays the messages from the State.
    case CHANNEL_SELECTED: {
      return []; // Channel has changed. Clearing view.
    }
    default:
      return state;
  }
}

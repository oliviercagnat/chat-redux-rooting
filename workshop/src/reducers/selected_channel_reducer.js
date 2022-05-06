import { CHANNEL_SELECTED } from '../actions';


export default function (state = null, action) {
  switch (action.type) {
    case CHANNEL_SELECTED: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
// => See index.jsx for the reducer => state operation

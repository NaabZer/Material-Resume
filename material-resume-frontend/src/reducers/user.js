import {
  USER_SUBMIT_LOG_IN,
  USER_GET_USER,
  USER_GET_TOKEN,
} from '../actions/user';

const initialState = {
  isFetching: false,
  error: false,
  token: null,
  user: null
}

export function user(state = initialState, action){
  switch(action.type){
    case USER_SUBMIT_LOG_IN: {
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
      });
    }
    case USER_GET_USER: {
      let {user} = action;
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        user: user,
      });
    }
    case USER_GET_TOKEN: {
      let {token} = action;
      return Object.assign({}, state, {
        ...state,
        token: token,
      });
    }
    default:
      return state;
  }
}

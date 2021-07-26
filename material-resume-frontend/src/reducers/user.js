import {
  USER_LOG_IN,
  USER_LOG_IN_SUCCESS,
  USER_LOG_IN_FAIL,
  USER_SET_TOKEN,
} from '../actions/user';

const initialState = {
  isFetching: false,
  error: false,
  errorObj: null,
  token: null,
  user: null
}

export function user(state = initialState, action){
  switch(action.type){
    case USER_LOG_IN: {
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
        error: false
      });
    }
    case USER_LOG_IN_SUCCESS: {
      let {user} = action;
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        user: user,
      });
    }
    case USER_LOG_IN_FAIL: {
      let {errorObj} = action;
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        error: true,
        errorObj: errorObj,
      });
    }
    case USER_SET_TOKEN: {
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

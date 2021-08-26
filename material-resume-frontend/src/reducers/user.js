import {
  USER_TRANSACTION_START,
  USER_LOG_IN_SUCCESS,
  USER_SAVE_SUCCESS,
  USER_FAIL,
  USER_SET_TOKEN,
  USER_RESET,
  USER_CHANGE_VALUE,
  USER_RESET_CHANGES,
} from '../actions/user';

const initialState = {
  isFetching: false,
  error: false,
  errorObj: null,
  token: null,
  user: null,
  userChanges: {}
}

export function user(state = initialState, action){
  switch(action.type){
    case USER_TRANSACTION_START: {
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
    case USER_SAVE_SUCCESS: {
      return Object.assign({}, state, {
        userChanges: {}
      });
    }
    case USER_FAIL: {
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
    case USER_RESET: {
      return Object.assign({}, state, {
        ...state,
        user: null,
        token: null,
      });
    }
    case USER_CHANGE_VALUE: {
      let {key, value} = action;
      let newChanges = Object.assign({}, state.userChanges)
      if(!(key in newChanges)){
        newChanges[key] = state.user[key]
      }
      return Object.assign({}, state, {
        user: {
          ...state.user,
          [key]: value
        },
        userChanges: newChanges
      });
    }
    case USER_RESET_CHANGES: {
      let newUser = Object.assign({}, state.user)
      Object.keys(state.userChanges).forEach(key => {
        newUser[key] = state.userChanges[key]
      });
      return Object.assign({}, state, {
        user: newUser,
        userChanges: {}
      });
    }
    default:
      return state;
  }
}

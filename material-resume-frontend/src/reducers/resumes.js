import {
  RESUME_START_TRANSACTION,
  RESUME_LOAD_SUCCESS,
  RESUME_NEW_SUCCESS,
  RESUME_FAIL,
  RESUME_RESET,
} from '../actions/resumes';

const initialState = {
  isFetching: false,
  error: false,
  errorObj: null,
  resumes: []
}

export function resumes(state = initialState, action){
  switch(action.type){
    case RESUME_START_TRANSACTION: {
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
        error: false
      });
    }
    case RESUME_LOAD_SUCCESS: {
      let {values} = action;
      return Object.assign({}, state, {
        ...state,
        resumes: values
      });
    }
    case RESUME_NEW_SUCCESS: {
      let {values} = action;
      return Object.assign({}, state, {
        ...state,
        resumes: [
          ...state.resumes,
          values
        ]
      });
    }
    case RESUME_FAIL: {
      let {errorObj} = action;
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        error: true,
        errorObj: errorObj,
      });
    }
    case  RESUME_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

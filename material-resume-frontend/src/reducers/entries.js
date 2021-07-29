import {
  ENTRY_TRANSACTION_START,
  ENTRY_RESET,
  ENTRY_LOAD_SUCCESS,
  ENTRY_CREATE_SUCCESS,
  ENTRY_EDIT_SUCCESS,
  ENTRY_REMOVE_SUCCESS,
  ENTRY_TRANSACTION_FAIL,
} from '../actions/entries';

const initialState = {
  isFetching: false,
  error: false,
  errorObject: null,
  text:{
    fetched: false,
    initial:{
      id: 'initial',
      entries:{
        sv: {'text': "Exempeltext"},
        en: {'text': "Example Text"},
      }
    },
  },
  experience:{
    fetched: false,
    initial:{
      id: 'initial',
      start: "2020-03-01",
      end: "2020-08-01",
      entries:{
        sv:{
          title: "Titel",
          location: "Arbetsplats",
          description: "Jobba jobba på ett företag"
        },
        en:{
          title: "Title",
          location: "Location",
          description: "Here is a job description"
        }
      }
    },
  }
}

export function entries(state = initialState, action){
  switch(action.type){
    case ENTRY_TRANSACTION_START: {
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
      });
    }
    case ENTRY_RESET: return Object.assign({}, state, initialState);
    case ENTRY_LOAD_SUCCESS: {
      let {entryType, entries} = action;
      return Object.assign({}, state, {
        ...state,
        [entryType]: {
          ...entries,
          'initial': state[entryType]['initial'],
          fetched: true}
      });
    }
    case ENTRY_CREATE_SUCCESS: {
      let {entryType, values} = action;

      return Object.assign({}, state, {
        ...state,
        [entryType]: {
          ...state[entryType],
          ...values
        },
      });
    }
    case ENTRY_EDIT_SUCCESS: {
      let {id, entryType, values} = action;
      return Object.assign({}, state, {
        ...state,
        [entryType]: {
          ...state[entryType],
          ...values
        },
      });
    }
    case ENTRY_REMOVE_SUCCESS: {
      let {id, entryType} = action;
      const {[id]:_ , ...newState} = state[entryType];
      return Object.assign({}, state, {
        ...state,
        [entryType]: {
          ...newState
        },
      });
    }
    default:
      return state
  }
}

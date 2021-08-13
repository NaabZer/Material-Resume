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
        sv: {'text': ""},
        en: {'text': ""},
      }
    },
    sample:{
      id: 'sample',
      entries:{
        sv: {'text': "Exempeltext"},
        en: {'text': "Sampletext"},
      }
    },
    entries:{}
  },
  experience:{
    fetched: false,
    initial:{
      id: 'initial',
      start: "",
      end: "",
      entries:{
        sv:{
          title: "",
          location: "",
          description: ""
        },
        en:{
          title: "",
          location: "",
          description: ""
        }
      }
    },
    sample:{
      id: 'sample',
      start: new Date("2020-03-01"),
      end: new Date("2020-08-01"),
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
    entries:{}
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
          ...state[entryType],
          fetched: true,
          'entries': {
            ...entries,
          }
        }
      });
    }
    case ENTRY_CREATE_SUCCESS: {
      let {entryType, values} = action;

      return Object.assign({}, state, {
        ...state,
        [entryType]: {
          'entries':{
            ...state[entryType]['entries'],
            ...values
          }
        },
      });
    }
    case ENTRY_EDIT_SUCCESS: {
      let {id, entryType, values} = action;
      return Object.assign({}, state, {
        ...state,
        [entryType]: {
          'entries':{
            ...state[entryType]['entries'],
            ...values
          }
        },
      });
    }
    case ENTRY_REMOVE_SUCCESS: {
      let {id, entryType} = action;
      const {[id]:_ , ...newState} = state[entryType]['entries'];
      return Object.assign({}, state, {
        ...state,
        [entryType]: {
          'entries':{
            ...newState
          }
        },
      });
    }
    default:
      return state
  }
}

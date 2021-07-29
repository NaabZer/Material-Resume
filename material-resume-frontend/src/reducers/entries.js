import {
  ENTRY_TRANSACTION_START,
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
  max_ids:{
    text: 1,
    work: 2,
  },
  text:{
    initial:{
      id: 'initial',
      entries:{
        sv: {'text': "Exempeltext"},
        en: {'text': "Example Text"},
      }
    },
    1:{
      id: 1,
      entries:{
        sv: {"text": "Arbetserfarenhet"},
        en: {"text": "Work experience"},
      }
    },
  },
  experience:{
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
    1: {
      id: 1,
      start: "2020-04-01",
      end: "2020-06-01",
      entries: {
        sv:{
          title: "Webbutvecklare",
          location: "Linköpings universitet",
          description: "Utvecklade en and drop cv skapare med material design, i kursen TDDD27"
        },
        en:{
          title: "Web developer",
          location: "Linköpings University",
          description: "Developed a drag and drop resume creator with material design, for the course TDDD27"
        }
      }
    },
    2: {
      id: 2,
      start: "2020-04-01",
      end: "2020-07-01",
      entries: {
        sv:{
          title: "Datavetare",
          location: "Coolt företag",
          description: "Machine learning är väldigt coolt!"
        },
        en:{
          title: "Data scientist",
          location: "Cool company",
          description: "Machine learning is very cool!"
        }
      }
    }
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
    case ENTRY_LOAD_SUCCESS: {
      let {entryType, entries} = action;
      return Object.assign({}, state, {
        ...state,
        [entryType]: {...entries, 'initial': state[entryType]['initial']}
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

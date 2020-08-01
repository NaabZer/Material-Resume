import {
  ENTRY_CREATE,
  ENTRY_EDIT,
  ENTRY_REMOVE,
} from '../actions/entries';

const initialState = {
  max_ids:{
    text: 1,
    work: 2,
  },
  text:{
    initial:{
      id: 'initial',
      sv: "Exempeltext",
      en: "Example Text",
    },
    1:{
      id: 1,
      sv: "Arbetserfarenhet",
      en: "Work experience",
    },
  },
  work:{
    initial:{
      id: 'initial',
      sv:{
        title: "Titel",
        location: "Arbetsplats",
        dateStart: "Mar 2020",
        dateEnd: "Aug 2020",
        description: "Jobba jobba på ett företag"
      },
      en:{
        title: "Title",
        location: "Location",
        dateStart: "Mar 2020",
        dateEnd: "Aug 2020",
        description: "Here is a job description"
      }

    },
    1: {
      id: 1,
      sv:{
        title: "Webbutvecklare",
        location: "Linköpings universitet",
        dateStart: "Apr 2020",
        dateEnd: "Jun 2020",
        description: "Developed a drag and drop resume creator with material design, for the course TDDD27"
      },
      en:{
        title: "Web developer",
        location: "Linköpings University",
        dateStart: "Apr 2020",
        dateEnd: "Jun 2020",
        description: "Developed a drag and drop resume creator with material design, for the course TDDD27"
      }
    },
    2: {
      id: 2,
      sv:{
        title: "Datavetare",
        location: "Coolt företag",
        dateStart: "Apr 2020",
        dateEnd: "Jun 2020",
        description: "Machine learning is very cool!"
      },
      en:{
        title: "Data scientist",
        location: "Cool company",
        dateStart: "Apr 2020",
        dateEnd: "Jun 2020",
        description: "Machine learning is very cool!"
      }
    }
}
}

export function entries(state = initialState, action){
  switch(action.type){
    case ENTRY_CREATE: {
      let {entryType, values} = action;
      let id = state[entryType].max_id + 1;

      return Object.assign({}, state, {
        [entryType]: {
          [id]: {
            id: id,
            values
          },
          ...state[entryType]
        },
        max_ids: {
          [entryType]: id,
          ...state.max_id
        },
        ...state
      });
    }
    case ENTRY_EDIT: {
      let {id, entryType, values} = action;
      return Object.assign({}, state, {
        [entryType]: {
          [id]: {
            id: id,
            values
          },
          ...state[entryType]
        },
        max_ids: {
          [entryType]: id,
          ...state.max_id
        },
        ...state
      });
    }
    case ENTRY_REMOVE: {
      let {id, entryType} = action;
      const {[id]:_ , ...newState} = state[entryType];
      return Object.assign({}, state, {
        [entryType]: {
          newState
        },
        ...state,
      });
    }
    default:
      return state
  }
}

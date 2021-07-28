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
  experience:{
    initial:{
      id: 'initial',
      dateStart: "2020-03-01",
      dateEnd: "2020-08-01",
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

    },
    1: {
      id: 1,
      dateStart: "2020-04-01",
      dateEnd: "2020-06-01",
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
    },
    2: {
      id: 2,
      dateStart: "2020-04-01",
      dateEnd: "2020-07-01",
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

export function entries(state = initialState, action){
  switch(action.type){
    case ENTRY_CREATE: {
      let {entryType, values} = action;
      let id = state.max_ids[entryType] + 1;

      return Object.assign({}, state, {
        ...state,
        max_ids: {
          [entryType]: id,
          ...state.max_id
        },
        [entryType]: {
          [id]: {
            id: id,
            ...values
          },
          ...state[entryType]
        },
      });
    }
    case ENTRY_EDIT: {
      let {id, entryType, values} = action;
      return Object.assign({}, state, {
        ...state,
        [entryType]: {
          ...state[entryType],
          [id]: {
            id: id,
            ...values
          },
        },
      });
    }
    case ENTRY_REMOVE: {
      let {id, entryType} = action;
      const {[id]:_ , ...newState} = state[entryType];
      console.log('---')
      console.log(newState)
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

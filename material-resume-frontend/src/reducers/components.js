import {
  COMPONENT_TRANSACTION_START,
  COMPONENT_SAVE_SUCCESS,
  COMPONENT_LOAD_SUCCESS,
  COMPONENT_REMOVE_SUCCESS,
  COMPONENT_FAIL,
  COMPONENT_RESET,
  COMPONENT_ADD,
  COMPONENT_DELETE,
  COMPONENT_RESIZE,
  COMPONENT_MOVE,
  PAGE_ADD,
  PAGE_REMOVE,
  COMPONENT_SETTINGS_CHANGE,
  RESUME_SETTINGS_CHANGE,
  defaultResumeSettings,
} from '../actions/components';

import { 
  getComponentFromType,
} from '../creator/components/ComponentFactory';

const initialState = {
  removedComponents: [], // List of components to remove on save
  error: false,
  errorObj: null,
  loading: false,
  components: {},
  fetched: 0,
  grids: {},
  componentSettings: {},
  pages: [],
  pageSettings: {
    cols: 12,
    rows: 12,
    gap: '8px'
  },
  resumeSettings: defaultResumeSettings,
}

function getAllInnerIds(parentId, state){
  let ids = []
  if (parentId in state.grids) {
    state.grids[parentId].forEach(child => {
      ids.push(child)
      let innerIds = getAllInnerIds(child, state)
      ids = [...ids, ...innerIds]
    })
  }
  return ids
}

function toIntIfPossible(str){
  if(!isNaN(str*1)){
    return str*1
  } else {
    return str
  }
}

function idAndPageIdToInt(id){
  if(("" + id)[0] === 'p'){
    return id.substr(1) * 1
  } else{
    return id * 1
  }
}

export function components(state = initialState, action){
  switch(action.type){
    case COMPONENT_TRANSACTION_START: {
      return Object.assign({}, state, {
        loading: true,
      });
    }
    case COMPONENT_LOAD_SUCCESS: {
      let {values, resumeId} = action;
      return Object.assign({}, state, {
        loading: false,
        fetched: resumeId,
        pageSettings: state.pageSettings,
        ...values
      });
    }
    case COMPONENT_SAVE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false
      });
    }
    case COMPONENT_REMOVE_SUCCESS: {
      return Object.assign({}, state, {
        removedComponents: [],
      });
    }
    case COMPONENT_FAIL: {
      let {error} = action;
      return Object.assign({}, state, {
        error: true,
        errorObj: error,
        loading: false
      });
    }
    case COMPONENT_RESET: {
      return initialState
    }
    case COMPONENT_ADD: {
      let {id, componentType, containerId, col, row, width, height} = action;

      let gridVal = null;
      if(containerId in state.grids){
        gridVal = [...state.grids[containerId], id]
      } else{
        gridVal = [id]
      }

      const settings = getComponentFromType(componentType).defaultSettings;

      let gridsState = null;
      // Add grid if new component is a grid
      gridsState={
        ...state.grids,
        [containerId]: gridVal
      }
     

      return Object.assign({}, state, {
        components: {
          ...state.components,
          [id]: {
            componentType, containerId, col, row, width, height
          }
        },
        componentSettings:{
          ...state.componentSettings,
          [id]: settings
        },
        grids: gridsState
      });
    }
    case COMPONENT_MOVE: {
      let {id, containerId, col, row} = action;

      let gridState = state.grids;
      const old_container_id = state.components[id].containerId;

      // Create grid if it doesn't exist
      if(!(containerId in state.grids)){
        gridState = {
          ...gridState,
          [containerId]: []
        }
      }

      if(old_container_id !== containerId){
        const old_id_grid = gridState[old_container_id].filter( l_id => {
          return l_id !== id
        });
        // Remove grid if empty
        if(old_id_grid.length === 0){
          delete gridState[old_container_id]
        } else{
          gridState = {
            ...gridState,
            [old_container_id]: old_id_grid,
          }
        }

        const new_id_grid = gridState[containerId].concat([Number(id)]);
        gridState = {
          ...gridState,
          [containerId]: new_id_grid
        }
      }

      return Object.assign({}, state, {
        components: {
          ...state.components,
          [id]: {
            ...state.components[id], containerId, col, row
          }
        },
        grids: gridState
      });
    }
    case COMPONENT_RESIZE: {
      let {id, width, height} = action;
      return Object.assign({}, state, {
        ...state,
        components: {
          ...state.components,
          [id]: {
            ...state.components[id], width, height
          }
        },
      });
    }
    case COMPONENT_DELETE: {
      let {id} = action;
      const containerId = state.components[id].containerId;
      let removeIds = getAllInnerIds(id, state);
      removeIds.push(id);
      
      const newComponents = Object.keys(state.components).map(toIntIfPossible)
        .filter(key => !removeIds.includes(key))
        .reduce((obj, key) => {
          obj[key] = state.components[key];
          return obj;
        }, {});

      const newSettings = Object.keys(state.componentSettings).map(toIntIfPossible)
        .filter(key => !removeIds.includes(key))
        .reduce((obj, key) => {
          obj[key] = state.componentSettings[key];
          return obj;
        }, {});

      let newGrids = Object.keys(state.grids).map(toIntIfPossible)
        .filter(key => !removeIds.includes(key))
        .reduce((obj, key) => {
          obj[key] = state.grids[key];
          return obj;
        }, {});

      const newGrid = state.grids[containerId].filter(val => {
        return val !== id;
      });
      newGrids = {...newGrids, [containerId]: newGrid}

      let removedComponents = state.removedComponents;
      removeIds.forEach(id => {
        if(idAndPageIdToInt(id) > 0){
          removedComponents.push(id);
        }
      });

      return Object.assign({}, state, {
        removedComponents: removedComponents,
        componentSettings: newSettings,
        components: newComponents,
        grids: newGrids,
      });
    }
    case PAGE_ADD: {
      let {id} = action;
      return Object.assign({}, state, {
        ...state,
        grids:{
          ...state.grids,
          ["p" + id]: []
        },
        pages: [...state.pages, "p" + id]
      });
    }
    case PAGE_REMOVE: {
      let {id} = action;
      let removeIds = getAllInnerIds(id, state);
      
      const newComponents = Object.keys(state.components).map(toIntIfPossible)
        .filter(key => !removeIds.includes(key))
        .reduce((obj, key) => {
          obj[key] = state.components[key];
          return obj;
        }, {});

      const newSettings = Object.keys(state.componentSettings).map(toIntIfPossible)
        .filter(key => !removeIds.includes(key))
        .reduce((obj, key) => {
          obj[key] = state.componentSettings[key];
          return obj;
        }, {});

      removeIds.push(id);
      const newGrids = Object.keys(state.grids).map(toIntIfPossible)
        .filter(key => !removeIds.includes(key))
        .reduce((obj, key) => {
          obj[key] = state.grids[key];
          return obj;
        }, {});

      const newPages = state.pages.filter(key => (key !== id))

      const removedComponents = state.removedComponents;
      removeIds.forEach(id => {
        if(idAndPageIdToInt(id) > 0){
          removedComponents.push(id);
        }
      });

      return Object.assign({}, state, {
        removedComponents: removedComponents,
        componentSettings: newSettings,
        components: newComponents,
        grids: newGrids,
        pages: newPages,
      });
    }
    case COMPONENT_SETTINGS_CHANGE: {
      let {id, settings} = action;
      return Object.assign({}, state,{
        ...state,
        componentSettings:{
          ...state.componentSettings,
          [id]: settings
        }
      });
    }
    case RESUME_SETTINGS_CHANGE: {
      let {settings} = action;
      return Object.assign({}, state,{
        resumeSettings: settings
      });
    }
    default:
      return state
  }
}

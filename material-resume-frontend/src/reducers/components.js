import {
  COMPONENT_TRANSACTION_START,
  COMPONENT_LOAD_SUCCESS,
  COMPONENT_ADD,
  COMPONENT_DELETE,
  COMPONENT_RESIZE,
  COMPONENT_MOVE,
  PAGE_ADD,
  PAGE_REMOVE,
  SETTINGS_CHANGE,
} from '../actions/components';

import { 
  getComponentFromType,
  getIsGridFromType 
} from '../creator/components/ComponentFactory';

const initialState = {
  components: {},
  grids: {},
  componentSettings: {},
  pages: [],
  pageSettings: {
    cols: 12,
    rows: 12,
    gap: '8px'
  }
}

function getAllInnerIds(parentId, state){
  var ids = []
  if (parentId in state.grids) {
    state.grids[parentId].forEach(child => {
      ids.push(child)
      var innerIds = getAllInnerIds(child, state)
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

export function components(state = initialState, action){
  switch(action.type){
    case COMPONENT_LOAD_SUCCESS: {
      let {values} = action;
      return Object.assign({}, state, {
        'pageSettings': state.pageSettings,
        ...values
      });
    }
    case COMPONENT_ADD: {
      let {id, componentType, containerId, col, row, width, height} = action;

      var gridVal = null;
      if(containerId in state.grids){
        gridVal = [...state.grids[containerId], id]
      } else{
        gridVal = [id]
      }

      const settings = getComponentFromType(componentType).defaultSettings;

      var gridsState = null;
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

      var gridState = state.grids;
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
      var removeIds = getAllInnerIds(id, state);
      removeIds.push(id);
      //const {[id]:_ , ...newComponents} = state.components;
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

      var newGrids = Object.keys(state.grids).map(toIntIfPossible)
        .filter(key => !removeIds.includes(key))
        .reduce((obj, key) => {
          obj[key] = state.grids[key];
          return obj;
        }, {});

      const newGrid = state.grids[containerId].filter(val => {
        return val !== id;
      });

      newGrids = {...newGrids, [containerId]: newGrid}
      return Object.assign({}, state, {
        ...state,
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
    case SETTINGS_CHANGE: {
      let {id, settings} = action;
      return Object.assign({}, state,{
        ...state,
        componentSettings:{
          ...state.componentSettings,
          [id]: settings
        }
      });
    }
    default:
      return state
  }
}

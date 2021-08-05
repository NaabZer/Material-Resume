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

export function components(state = initialState, action){
  switch(action.type){
    case COMPONENT_LOAD_SUCCESS: {
      let {values} = action;
      console.log(values);
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
      const isGrid = getIsGridFromType(componentType);

      var gridsState = null;
      // Add grid if new component is a grid
      if(isGrid){
        gridsState={
          ...state.grids,
          [id]: [],
          [containerId]: gridVal
        }
      } else{
        gridsState={
          ...state.grids,
          [containerId]: gridVal
        }
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
      if(old_container_id !== containerId){
        const old_id_grid = state.grids[old_container_id].filter( l_id => {
          return l_id !== id
        });
        const new_id_grid = state.grids[containerId].concat([Number(id)]);
        gridState = {
          ...gridState,
          [old_container_id]: old_id_grid,
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
      // TODO: Be able to remove grid objects containing stuff
      // TODO: Remove settings for removed objects
      const containerId = state.components[id].containerId;
      const {[id]:_ , ...newComponents} = state.components;
      const newGrid = state.grids[containerId].filter(val => {
        return val !== id;
      });
      return Object.assign({}, state, {
        ...state,
        components: newComponents,
        grids:{
          ...state.grids,
          [containerId]: newGrid
        }
      });
    }
    case PAGE_ADD: {
      let {id} = action;
      return Object.assign({}, state, {
        ...state,
        grids:{
          ...state.grids,
          [id]: []
        },
        pages: [...state.pages, id]
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

import {COMPONENT_ADD, COMPONENT_DELETE, COMPONENT_RESIZE, COMPONENT_MOVE} from '../actions/components';

const initialState = {
  components: {},
  grids: {
    0: [],
    1: []
  },
}

export function components(state = initialState, action){
  switch(action.type){
    case COMPONENT_ADD: {
      let {id, componentType, containerId, col, row, width, height} = action;

      var gridVal = null;
      if(containerId in state.grids){
        gridVal = [...state.grids[containerId], id]
      } else{
        gridVal = [id]
      }

      return Object.assign({}, state, {
        components: {
          ...state.components,
          [id]: {
            componentType, containerId, col, row, width, height
          }
        },
        grids: {
          ...state.grids,
          [containerId]: gridVal
        }
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
        console.log(old_id_grid)
        const new_id_grid = state.grids[containerId].concat([Number(id)]);
        console.log(new_id_grid)
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
    case COMPONENT_DELETE:
      return state
    default:
      return state
  }
}

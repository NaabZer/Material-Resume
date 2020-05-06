import {COMPONENT_ADD, COMPONENT_DELETE, COMPONENT_RESIZE} from '../actions/components';

const initialState = {
  components: {},
  grids: {
    0: []
  },
}

export function components(state = initialState, action){
  switch(action.type){
    case COMPONENT_ADD:
      const {id, componentType, containerId, row, col, width, height} = action;

      var gridVal = null;
      if(containerId in action.grids){
        gridVal = [...state.grids.containerId, id]
      } else{
        gridVal = [id]
      }

      return Object.assign({}, state, {
        components: {
          ...state.components,
          id: {
            componentType, containerId, row, col, width, height
          }
        },
        grids: {
          ...state.grids,
          containerId: gridVal
        }
      });
    case COMPONENT_DELETE:
      return state
    case COMPONENT_RESIZE:
      return state
    default:
      return state
  }
}

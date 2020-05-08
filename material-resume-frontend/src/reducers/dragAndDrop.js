import {DRAG_END, DRAG_START} from '../actions/dragAndDrop';

const initialState = {
  dragging:false,
  componentType: null,
  width: 0,
  height: 0,
  grab_x: 0,
  grab_y: 0
}

export function dragAndDrop(state = initialState, action){
  switch(action.type){
    case DRAG_START: {
      let {componentType, width, height, grab_x, grab_y} = action;
      return Object.assign({}, state, {
        dragging: true,
        componentType, width , height, grab_x, grab_y
      });
    }
    case DRAG_END:
      return Object.assign({}, state, {
        ...state,
        dragging: false
      });
    default:
      return state;
  }
}
